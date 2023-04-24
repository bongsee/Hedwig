interface AuthUser {
    id: number
    username: string
    email: string
    iat: number
    exp: number
}

// 회원가입
export interface SignUpRequest {
    username: string
    email: string
    password: string
}

// 로그인
export interface SignInRequest {
    email: string
    password: string
}

// 응답
export interface AuthResponse {
    accessToken: string
    content: AuthUser
    message: string
}

// verify userPayload
export interface userPayload {
    content: AuthUser
}

// {
//     "content": {
//       "id": 22,
//       "username": "test123",
//       "email": "test123@test.com",
//       "iat": 1682153306,
//       "exp": 1682156906
//     },
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsInVzZXJuYW1lIjoidGVzdDEyMyIsImVtYWlsIjoidGVzdDEyM0B0ZXN0LmNvbSIsImlhdCI6MTY4MjE1MzMwNiwiZXhwIjoxNjgyMTU2OTA2fQ.OFx9C9i460RLPpwSm5cW51dVS7pq7vzGXlQ7fsQzMPI",
//     "message": "로그인 성공!"
//   }
