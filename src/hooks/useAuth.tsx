import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { verify } from '../apis/Auth'
import { getCookie, setCookie } from '../utils/cookies'
import { useRouter } from 'next/router'

type AuthType = 'PENDING' | 'SUCCESS' | 'FAILED' | 'IDLE'

function useAuth() {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState<AuthType>('PENDING')
    console.log(`router: ${router.pathname}`) //
    if (router.pathname === '/auth') {
        console.log('asdasd')
        setIsAuthenticated('IDLE')
        return isAuthenticated
    }

    const token = getCookie('accessToken')
    const verifyResult = useQuery(['auth', 'verify'], verify, {
        enabled: !!token,
        onSuccess: () => {
            setIsAuthenticated('SUCCESS')
        },
        onError: () => {
            setIsAuthenticated('FAILED')
        },
        retry: 0,
    })

    // 엑세스 토큰이 없을 때 refresh 로직 추가 예정(프론트 배포 후)
    console.log(isAuthenticated)
    if (!token) setIsAuthenticated('FAILED')

    return isAuthenticated
}

export default useAuth
