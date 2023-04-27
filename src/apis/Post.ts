import { PostRequest, Post } from '@/types/Post'
import { axiosInstance } from './axios'

export const createPost = async (createPostData: FormData) => {
    const { data } = await axiosInstance.post<Post>('/post', createPostData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    console.log(data)
}

export const getPost = async (id: number) => {
    const response = await axiosInstance.get(`/post/${id}`)
    return response.data
}

export const getPosts = async () => {
    const response = await axiosInstance.get<Post[]>('/post')
    return response.data
}

export const likePost = async (postId: number) => {
    const response = await axiosInstance.post(`/like/${postId}`)
    return response.data
}
