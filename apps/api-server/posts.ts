import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type PostPayload = Omit<Prisma.PostGetPayload<{}>, 'id' | 'createdAt' | 'updatedAt'>

export const createPost = async (post: PostPayload) => {
    const newPost = { ...post, createdAt: new Date(), updatedAt: new Date() };
    await prisma.post.create({ data: newPost })
}

export const getPosts = async () => {
    const posts = await prisma.post.findMany();
    return posts
}