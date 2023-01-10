import { createTRPCProxyClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { httpLink } from '@trpc/client'
import type { AppRouter } from 'api-server/server'
import { useMutation } from '@tanstack/vue-query'
const url = import.meta.env.VITE_TRPC_URL

const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url })],
})

export const useCreatePost = (options: any) => {
    const { mutate } = useMutation({
        mutationFn: async ({ title, text }: { title: string, text: string }) => {
            client.post.mutate({ title, text })
        },
        ...options
    })

    return { mutate }
}