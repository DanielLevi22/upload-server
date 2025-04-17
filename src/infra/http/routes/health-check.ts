import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const healthCheckRoute: FastifyPluginAsyncZod = async server => {
  server.get(
    '/health',
    {
      schema: {
        summary: 'Health Check',
        tags: ['health'],
      },
    },
    async (request, reply) => {
      return reply.status(200).send({ message: 'Tudo ok' })
    }
  )
}
