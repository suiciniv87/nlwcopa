import Fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { poolRoutes } from './routes/pool'
import { userRoutes } from './routes/user'
import { guessRoutes } from './routes/guess'
import { authRoutes } from './routes/auth'
import { gameRoutes } from './routes/game'
import * as dotenv from 'dotenv'

dotenv.config()

async function SECRET_JWT() { return process.env.SECRET_JWT };

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })

    await fastify.register(jwt, {
        secret: SECRET_JWT,
    })

    fastify.register(authRoutes)
    fastify.register(userRoutes)
    fastify.register(gameRoutes)
    fastify.register(guessRoutes)
    fastify.register(poolRoutes)    

    await fastify.listen({ port: 3333, host: '0.0.0.0' })
}

bootstrap()