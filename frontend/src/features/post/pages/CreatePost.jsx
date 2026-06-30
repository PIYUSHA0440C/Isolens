import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import usePost from '../hooks/usePost'
import '../styles/createpost.scss'

const CreatePost = () => {

    const [caption, setCaption] = useState("")
    const postImageInputFieldRef = useRef(null)

    const { loading, handleCreatePost } = usePost()
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const file = postImageInputFieldRef.current.files[0];

        await handleCreatePost(file, caption);

        navigate('/')
    }

    if (loading) {
        return <h1>Loading....</h1>
    }

    return (
        <main className='create-post-page'>
            <div className="form-container">
                <h1>Create Post</h1>

                <form onSubmit={handleSubmit}>

                    <label className='post-image-label' htmlFor="postImage">Select Image</label>
                    <input ref={postImageInputFieldRef} hidden type="file" name="postImage" id="postImage" />
                    <input
                        value={caption}
                        onChange={(e) => { setCaption(e.target.value) }}
                        type="text" name="caption" id="caption" placeholder='Enter Caption' />
                    <button className='button primary-button'>Create Post</button>
                </form>
            </div>

        </main>
    )
}

export default CreatePost
