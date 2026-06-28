import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";


const usePost = () => {
    
    const context = useContext(PostContext);

    const {loading, setLoading, post, setPost, feed, setFeed} = context;

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


    return { loading, feed, post, handleGetFeed }
}

export default usePost
