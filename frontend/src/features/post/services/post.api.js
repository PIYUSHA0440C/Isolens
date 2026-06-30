import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/posts",
    withCredentials: true,
})



export async function getFeed() {
    try {
        const response = await api.get('/feed')
        return response.data;
    }
    catch (error) {
        console.error('Error fetching feed');
        throw error;
    }
}

export async function createPost(imageFile, caption) {
    
    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("caption", caption);

    try {
        const response = await api.post('/', formData);

        return response.data;
    } 
    catch (error) {
        console.error('Error creating post');
        throw error;
    }
}