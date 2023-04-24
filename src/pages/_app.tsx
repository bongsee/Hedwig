import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import CheckAuth from '@/components/auth/CheckAuth'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {},
    },
})

export default function App({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <CheckAuth>
                <Component {...pageProps} />
            </CheckAuth>
        </QueryClientProvider>
    )
}
