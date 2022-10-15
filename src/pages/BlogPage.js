import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const BlogPage = () => {

    const { id } = useParams();

    const [blog, setBlog] = useState({});


    useEffect(() => {
        fetchBlog();
        console.log(blog);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchBlog = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const blogContent = await data.json();

        setBlog(blogContent);
    }



    return (
        <div className='font-poppins pt-8 px-8'>
            <h1 className='text-7xl font-semibold uppercase pb-2'>The Mockup Blog</h1>

            <hr className='pt-2' />
            <img src='https://images.unsplash.com/photo-1662012964119-b369140576f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='Blog Post' className='h-96 mx-auto' />
            <div className='text-4xl font-medium pt-3'>{blog.title}</div>

            <div className='pt-3 text-gray-700'>{blog.body}</div>


        </div>

    )
}

export default BlogPage