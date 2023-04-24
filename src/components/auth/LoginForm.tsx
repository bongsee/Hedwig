import React, { useState, ChangeEvent } from 'react'
import TextField from '@mui/material/TextField'
import CustomButton from '@/components/CustomButton'
import { UseMutateFunction } from 'react-query'
import { AuthResponse, SignInRequest } from '@/types/Auth'
import { AxiosError } from 'axios'

interface LoginFormProps {
    mutate: UseMutateFunction<AuthResponse, AxiosError, SignInRequest>
}

function LoginForm({ mutate: login }: LoginFormProps) {
    const [loginData, setLoginData] = useState({ email: '', password: '' })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLoginData({ ...loginData, [name]: value })
    }

    const onLoginBtnClick = () => {
        login(loginData)
    }

    return (
        <div>
            <TextField label="email" name="email" value={loginData.email} onChange={onChange} />
            <TextField type="password" label="password" name="password" value={loginData.password} onChange={onChange} />
            <CustomButton onClick={onLoginBtnClick}>로그인</CustomButton>
        </div>
    )
}

export default LoginForm
