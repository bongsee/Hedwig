import React, { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@mui/material/TextField'
import CustomButton from '../CustomButton'

interface RegisterForm {
    [key: string]: string
}

const defaultValues: RegisterForm = {
    email: '',
    password: '',
    username: '',
    password_check: '',
}

function RegisterForm() {
    const {
        handleSubmit,
        formState: { errors },
        control,
        watch,
    } = useForm<RegisterForm>({ defaultValues })

    const passwordRef = useRef('')
    passwordRef.current = watch('password')

    return (
        <form
            onSubmit={handleSubmit(
                (data: RegisterForm) => {
                    // password_check 항목 제거
                    const reqData = Object.assign(
                        {},
                        ...Object.keys(data)
                            .filter((key) => key !== 'password_check')
                            .map((key) => ({ [key]: data[key] })),
                    )
                    console.log(reqData)
                },
                () => {
                    console.log('양식 에러 발생')
                },
            )}
        >
            <Controller
                control={control}
                name="email"
                rules={{
                    required: '필수 입력 항목입니다.',
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: '올바르지 않은 이메일 형식입니다.',
                    },
                }}
                render={({ field }) => <TextField {...field} label="email" error={!!errors.email} helperText={errors.email?.message} />}
            />
            <Controller
                control={control}
                name="username"
                rules={{
                    required: '필수 입력 항목입니다.',
                    pattern: {
                        value: /^[a-z0-9]{3,10}$/,
                        message: '3~10자의 영문 소문자와 숫자의 조합이어야 합니다.',
                    },
                }}
                render={({ field }) => <TextField {...field} label="username" error={!!errors.username} helperText={errors.username?.message} />}
            />
            <Controller
                control={control}
                name="password"
                rules={{
                    required: '필수 입력 항목입니다.',
                    pattern: {
                        value: /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/,
                        message: '8 ~ 16자 영문, 숫자를 조합하세요',
                    },
                }}
                render={({ field }) => <TextField type="password" {...field} inputRef={passwordRef} label="password" error={!!errors.password} helperText={errors.password?.message} />}
            />
            <Controller
                control={control}
                name="password_check"
                rules={{
                    required: '필수 입력 항목입니다.',
                    validate: (value) => passwordRef.current === value || '비밀번호가 일치하지 않습니다.',
                }}
                render={({ field }) => <TextField type="password" {...field} label="password check" error={!!errors.password_check} helperText={errors.password_check?.message} />}
            />
            <CustomButton type="submit">가입하기</CustomButton>
        </form>
    )
}

export default RegisterForm