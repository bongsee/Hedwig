// Login Page도 Register Page와 마찬가지로 Auth Page로부터만 진입할 수 있게 설계.
// Auth Page로 이동할 수 있는 뒤로가기 버튼 배치.

import { login } from '@/apis/Auth'
import LoginForm from '@/components/auth/LoginForm'
import { setCookie } from '@/utils/cookies'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'

function LoginPage() {
    const router = useRouter()
    const { mutate, isLoading } = useMutation(login, {
        onSuccess: (data) => {
            setCookie('accessToken', data.accessToken, { path: '/', maxAge: data.content.exp - data.content.iat })
            router.push('/post')
        },
        onError: (err: AxiosError) => {
            console.log(`로그인 에러: ${err}`)
        },
    })

    if (isLoading) return <>loading...</>
    return (
        <div>
            <p>계정에 로그인하세요.</p>
            <LoginForm mutate={mutate} />
        </div>
    )
}

export default LoginPage
