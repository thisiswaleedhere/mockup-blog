import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const BlogCard = ({ id, title, body }) => {

    const [message, setMessage] = useState('');
    const [seed, setSeed] = useState(0);

    let navigate = useNavigate();

    const deleteBlog = async (id) => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
        });
    }

    function openBlog() {
        navigate(`/${id}`);
    }

    function handleDelete(id) {

        deleteBlog(id);
        setMessage('Deleted');
        setSeed(Math.random());

    }

    return (
        <div className='mx-auto py-6 font-poppins hover:bg-gray-100' key={seed} >

            {message ? <div className='text-center text-red-400'> Blog Post Deleted</div> :

                <div className='flex flex-col md:flex-row mx-auto px-6'>

                    <div className='flex flex-col md:flex-row mx-auto w-4/5 cursor-pointer' onClick={openBlog}>

                        <img src='https://images.unsplash.com/photo-1662012964119-b369140576f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                            alt='Blog Post' className='md:w-60 mx-auto lg:mx-0' />
                        <div className='md:pl-5 pt-3 md:w-3/5 '>
                            <div className='text-xl md:text-2xl lg:text-4xl'>{title}</div>
                            <div className='text-sm md:text-base pt-1 truncate overflow-clip'> {body}</div>
                        </div>

                    </div>

                    <div className='flex flex-row md:flex-col lg:flex-row justify-start space-x-4 md:space-x-0 lg:space-x-4 text-gray-100 place-self-center pt-6'>
                        <Link to={`/edit/${id}`} >
                            <div className='bg-blue-400 px-6 h-6 text-sm md:text-base md:h-8 py-0.5 md:py-1 rounded-full hover:font-medium hover:tracking-wider transition-all text-center hover:bg-blue-600'>Edit</div></Link>

                        <button className='bg-red-400 md:mt-2 lg:mt-0 px-6 h-6 text-sm md:text-base md:h-8 md:py-1 rounded-full hover:font-medium hover:tracking-wider transition-all hover:bg-red-600' onClick={handleDelete}>Delete</button>
                    </div>
                </div>

            }
        </div >
    )
}

export default BlogCard