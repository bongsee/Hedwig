// Auth Page는 로그인 페이지와 회원가입 페이지로 이동할 수 있는 버튼링크를 배치.

import React from 'react'
import CustomButton from '@/components/CustomButton'
import Link from 'next/link'

function AuthPage() {
    return (
        <div>
            <p>서비스를 이용하시려면 로그인이 필요합니다.</p>
            <Link href="/auth/login">
                <CustomButton>로그인</CustomButton>
            </Link>
            <Link href="/auth/register">
                <CustomButton>가입하기</CustomButton>
            </Link>
        </div>
    )
}

export default AuthPage
