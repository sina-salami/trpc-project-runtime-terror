import { createTRPCProxyClient } from '@trpc/client'
import { httpBatchLink } from '@trpc/client/links/httpBatchLink'
import { httpLink } from '@trpc/client'
import type { AppRouter } from 'api-server/server'
import { useQuery } from '@tanstack/vue-query'
const url = import.meta.env.VITE_TRPC_URL

const client = createTRPCProxyClient<AppRouter>({
    links: [httpBatchLink({ url })],
})

export const useHello = () => {
    const { data, refetch } = useQuery(['hello'], async () =>
        client.hello.query('sina')
    )
    return { data, refetch }
}

export const useGetPosts = () => {
    const { data, refetch } = useQuery(['posts'], async () => client.posts.query())
    return { data, refetch }
}