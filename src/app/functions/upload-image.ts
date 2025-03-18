import { Readable } from 'node:stream'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeLeft, makeRight } from '@/shared/either'
import { z } from 'zod'
import { InvalidFileFormat } from './erros/invlid-file-format'

const uploadImageInput = z.object({
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadImageInput = z.input<typeof uploadImageInput>

const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg']

export async function uploadImage(
  input: UploadImageInput
): Promise<Either<InvalidFileFormat, { url: string }>> {
  const { contentStream, contentType, fileName } = uploadImageInput.parse(input)

  if (!allowedMimeTypes.includes(contentType)) {
    makeLeft(new InvalidFileFormat())
  }

  // TODO: Upload the image to the storage

  await db.insert(schema.uploads).values({
    name: fileName,
    remoteKey: 'remote-key',
    remoteUrl: 'remote-url',
  })

  return makeRight({
    url: 'https://www.google.com/d',
  })
}
