import { createPost, getFeed, likePost, unlikePost } from "../services/post.api";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context";


const usePost = () => {

    const context = useContext(PostContext);

    const { loading, setLoading, post, setPost, feed, setFeed } = context;

    const handleGetFeed = async () => {

        setLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts);
        }
        catch (error) {
            console.error('Error fetching feed');
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleCreatePost = async (imageFile, caption) => {

        setLoading(true);
        try {
            const data = await createPost(imageFile, caption);
            setFeed([data.post, ...feed]);
            return data.post;
        }
        catch (error) {
            console.error('Error creating post');
            throw error;
        }
    }

    const handleLike = async (postId) => {
        const data = await likePost(postId);
        await handleGetFeed();
    }

    const handleUnlike = async (postId) => {
        const data = await unlikePost(postId);
        await handleGetFeed();
    }

    useEffect(() => {
        handleGetFeed();
    }, [])

    return { loading, feed, post, handleGetFeed, handleCreatePost, handleLike, handleUnlike }
}

export default usePost
