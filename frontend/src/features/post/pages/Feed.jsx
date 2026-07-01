import React, { useEffect } from 'react'
import '../styles/feed.scss'
import Post from '../components/Post'
import usePost from '../hooks/usePost'
import Navbar from '../../shared/components/Navbar'

const Feed = () => {

    const { feed, loading, handleGetFeed, handleLike, handleUnlike } = usePost();

    useEffect(() => {
        handleGetFeed();
    }, [])

    if (loading || !feed) {
        return ( <main><h1>Feed is Loading....</h1></main>)
    }

    return (
        <main className='feed-page'>
            <Navbar />
            <div className="feed">
                <div className="posts">
                    {feed.map((post) => {
                        return <Post user={post.user} post={post} handleLike={handleLike} handleUnlike={handleUnlike}/>
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed
