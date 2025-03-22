import { InvalidFileFormat } from '@/app/functions/erros/invlid-file-format'
import { uploadImage } from '@/app/functions/upload-image'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { isRight, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const uploadImageRoute: FastifyPluginAsyncZod = async server => {
  server.post(
    '/uploads',
    {
      schema: {
        tags: ['uploads'],
        summary: 'Upload an image',
        consumes: ['multipart/form-data'],
        response: {
          201: z.object({
            url: z.string(),
          }),
          409: z
            .object({
              message: z.string(),
            })
            .describe('Upload already exists'),
        },
      },
    },
    async (request, reply) => {
      const uploadFile = await request.file({
        limits: {
          fileSize: 5 * 1024 * 1024, // 5MB
        },
      })

      if (!uploadFile) {
        return reply.status(400).send({
          message: 'No file uploaded',
        })
      }

      const result = await uploadImage({
        fileName: uploadFile.filename,
        contentType: uploadFile.mimetype,
        contentStream: uploadFile.file,
      })

      if (uploadFile.file.truncated) {
        return reply.status(400).send({
          message: 'File size limit reached',
        })
      }

      if (isRight(result)) {
        console.log(unwrapEither(result))
        return reply.status(201).send({ url: unwrapEither(result).url })
      }

      const erro = unwrapEither(result)

      switch (erro.constructor) {
        case InvalidFileFormat:
          return reply.status(400).send({
            message: erro.message,
          })
      }
    }
  )
}
