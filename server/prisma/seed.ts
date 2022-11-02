import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john@gmail.com',
            avatarUrl: 'https://github.com/suiciniv87.png'
        }
    })

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    })

    await prisma.game.create({
        data: {
            date: '2022-11-03T14:03:53.201Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR',
        }
    })
    await prisma.game.create({
        data: {
            date: '2022-11-05T14:03:53.201Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoint: 3,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id,
                            }
                        }
                    }
                }
            }
        }
    })
}

main()