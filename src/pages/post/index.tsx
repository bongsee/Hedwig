import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import CreateIcon from '@mui/icons-material/Create'
import HomeIcon from '@mui/icons-material/Home'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Post } from '@/types/Post'

import PostCard from '@/components/cards/postCard'
import { getPosts } from '@/apis/Post'
import { useQuery } from 'react-query'
import { verify } from '@/apis/Auth'
import withAuth from '@/routes/ProtectedRoute'
import { queryKeys } from '@/constants/queryKey'
import Loader from '@/components/Loader'

// tab 컴포넌트 스타일 객체
const tabStyles = {
    fontSize: '17px',
    fontWeight: '600',
    '&.Mui-selected': {
        color: '#5c940d',
    },
    mx: 1.1,
}

// bottom 컴포넌트 스타일 객체
const navStyles = {
    wdith: '90px',
    height: '50px',
    '&.Mui-selected': {
        color: '#5c940d',
    },
    // 간격 넓히기
    mx: 2,
}

// type Props = {
//     posts: Post[]
// }

// export const getStaticProps: GetStaticProps<Props> = async () => {
//     const posts = await getPosts()
//     return { props: { posts } }
// }

// const Post = ({ posts }: Props) => {
//     // 토큰에 들어있는 암호 정보속에 userName을 가져올수 있다면....

const Post = () => {
    // 토큰에 들어있는 암호 정보속에 userName을 가져올수 있다면....    }
    const { data: allPost, isLoading } = useQuery(queryKeys.post.allPosts, getPosts)
    const { data: userdata } = useQuery('userdata', verify)
    const currentUser = userdata?.content.username

    const [value, setValue] = useState('main')
    const [btValue, setBtValue] = useState('home')
    const [drawerState, setDrawerState] = useState(false)
    const [dialogState, setDialogState] = useState(false)
    const [loadingVisible, setLoadingVisible] = useState(false)

    // 내가 쓴 글 필터링
    let myPost = null
    if (value === 'my') {
        myPost = allPost?.filter((post: Post) => post.userName === currentUser)
    }
    if (value === 'liked') {
        myPost = allPost?.filter((post: Post) => post.isLiked === true)
    }
    const selectedPost = myPost || allPost

    const cardContainerRef = useRef<HTMLDivElement>(null)

    const router = useRouter()
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }
    const handleBtNavChange = (event: React.SyntheticEvent, newValue: string) => {
        setBtValue(newValue)
    }

    const toggleDrawer = (open: boolean) => () => {
        setDrawerState(open)
    }

    const toggleDialog = () => {
        setDialogState(!dialogState)
    }

    const logout = (): void => {
        //TODO 페이지만 이동할게 아니라 api 호출을 통해서 로그아웃 로직을 요청해야한다!
        router.push('/')
    }

    const handleTouchStart = () => {
        setLoadingVisible(true)
    }

    const handleTouchEnd = () => {
        setLoadingVisible(false)
    }

    const list = () => (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <List>
                <ListItem key="Logout" disablePadding>
                    <ListItemButton onClick={toggleDialog}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
    if (isLoading) {
        return <Loader />
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
            <Link href="/post">
                <img src="logo.svg" style={{ width: '30px', height: '30px', paddingTop: '10px' }} alt="arrow" />
            </Link>

            <Tabs
                value={value}
                onChange={handleChange}
                // 선택 되었을때 하단의 bar 스타일 속성
                sx={{
                    paddingTop: '10px',
                    '& .MuiTabs-indicator': {
                        backgroundColor: '#5c940d',
                    },
                }}
            >
                <Tab value="main" label="Main" sx={tabStyles} />
                <Tab value="liked" label="Liked" sx={tabStyles} />
                <Tab value="my" label="My" sx={tabStyles} />
            </Tabs>
            <div className="CardContainer" style={{ width: '100%' }} ref={cardContainerRef}>
                {/* <div style={{ textAlign: 'center' }}>
                    <CircularProgress />
                </div> */}
                <div
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#fff',
                        transition: 'background-color 0.3s ease',
                        paddingBottom: '75px',
                    }}
                >
                    {selectedPost &&
                        selectedPost.map((post: Post) => {
                            /** 동일한 유저가 좋아요 했다는것을 어떻게 파악할까  */
                            // loginUser 가 post에 있는 userName과 같은가?

                            // const postData = {
                            //     postId: post.id,
                            //     userName: post.userName,
                            //     profileImg: '/default.png',
                            //     content: post.content,
                            //     img: post.img,
                            //     createdAt: new Date(post.createdAt),
                            //     updatedAt: new Date(post.updatedAt),
                            //     likeCount: post.likesCount,
                            //     commentCount: post.commentsCount,
                            //     isLiked: post.isLiked,
                            //     isDetailPost: false,
                            //     moreBtn: currentUser === post.userName,
                            //     commentOnly: false,
                            // }
                            const moreBtn = currentUser === post.userName

                            return <PostCard key={post.id} {...post} moreBtn={moreBtn} />
                        })}
                </div>
            </div>

            <BottomNavigation value={btValue} onChange={handleBtNavChange} sx={{ position: 'fixed', bottom: '0' }}>
                <BottomNavigationAction label="new" value="new" icon={<CreateIcon sx={{ fontSize: '30px' }} />} sx={navStyles} href="post/new" />
                <BottomNavigationAction label="home" value="home" icon={<HomeIcon sx={{ fontSize: '30px' }} />} sx={navStyles} href="post/" />
                <BottomNavigationAction label="profile" value="profile" icon={<AccountCircleIcon sx={{ fontSize: '30px' }} />} sx={navStyles} onClick={toggleDrawer(true)} />
                <Drawer anchor={'bottom'} open={drawerState} onClose={toggleDrawer(false)}>
                    {list()}
                </Drawer>
            </BottomNavigation>
            {/* 로그아웃 옵션을 선택했을때 나타나는 dialog*/}
            <Dialog open={dialogState} onClose={toggleDialog} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="confirm-dialog-title">{'로그아웃하시겠습니까?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="confirm-dialog-description">진짜로 가실거에요?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* TODO 로그아웃 요청 메소드 추가할것 */}
                    <Button onClick={logout}>로그아웃</Button>
                    <Button onClick={toggleDialog} autoFocus>
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default withAuth(Post)
