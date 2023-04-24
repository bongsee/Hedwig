// 회원가입 페이지는 Auth Page를 통해서만 진입할 수 있게 설계
// 로그인 페이지 링크는 페이지에서 제외하고, 대신 이전 페이지로 라우팅해주는 뒤로가기 버튼 배치.

import { Box, Container } from '@mui/material'
import RegisterForm from '@/components/auth/RegisterForm'
import { register } from '@/apis/Auth'
import { useMutation } from 'react-query'
import { setCookie } from '@/utils/cookies'
import { AxiosError } from 'axios'
import { useRouter } from 'next/router'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack'

function RegisterPage() {
    const router = useRouter()
    const { mutate, isLoading } = useMutation(register, {
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
        <Container maxWidth="sm" sx={{ border: 1, display: 'flex', justifyContent: 'center' }}>
            {/* 뒤로가기 IconButton */}
            <Box
                sx={{
                    width: '90%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#DDD',
                    height: '400px',
                }}
            >
                <p>계정을 생성하세요.</p>
                <RegisterForm mutate={mutate} />
            </Box>
        </Container>
    )
}

export default RegisterPage
