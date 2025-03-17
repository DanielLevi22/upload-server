import fastifyCors from '@fastify/cors'
import fastify from 'fastify'

export const serve = fastify()

serve.register(fastifyCors, { origin: '*' })

serve.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log('HTTP Server Running 3333!')
})
