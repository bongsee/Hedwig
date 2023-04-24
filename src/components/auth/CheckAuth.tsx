import React, { useEffect } from 'react'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/router'

type ASD = {
    children?: React.ReactNode
}

function CheckAuth({ children }: ASD) {
    console.log(typeof window === 'undefined')
    console.log('checkauth')
    const router = useRouter()
    const isAuthenticated = useAuth() //
    useEffect(() => {
        // 인증에 실패하면 auth 페이지로 리다이렉트
        if (isAuthenticated === 'FAILED') {
            router.push('/auth')
        }
    }, [isAuthenticated])

    useEffect(() => {
        if (typeof window !== 'undefined' && isAuthenticated === 'FAILED') {
            console.log('auth?')
            router.push('/auth')
        }
    }, [isAuthenticated])

    // 인증 처리가 아직 안됐을 때 대신 보여줄 컴포넌트 삽입
    if (isAuthenticated !== 'SUCCESS' && isAuthenticated !== 'IDLE') {
        return <>loading...</>
    }

    console.log('useEffect', isAuthenticated)
    return <div>{children}</div>
}

export default CheckAuth
