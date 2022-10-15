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
        <div className='py-6 font-poppins hover:bg-gray-100' key={seed} >

            {message ? <div className='text-center text-red-400'> Blog Post Deleted</div> :
                <div className='flex px-6 w-full'>

                    <div className='flex w-4/5 cursor-pointer' onClick={openBlog}>

                        <img src='https://images.unsplash.com/photo-1662012964119-b369140576f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' alt='Blog Post' className='w-60' />
                        <div className='pl-5 pt-3 w-3/5'>
                            <div className='text-4xl'>{title}</div>
                            <div className='pt-1 truncate overflow-clip'> {body}</div>
                        </div>

                    </div>

                    <div className='flex justify-between space-x-4 text-gray-100 place-self-center'>
                        <Link to={`/edit/${id}`} ><div className='bg-blue-400 px-6 h-6 rounded-xl hover:font-medium hover:bg-blue-600'>Edit</div></Link>

                        <button className='bg-red-400 px-6 h-6 rounded-xl hover:font-medium hover:bg-red-600' onClick={handleDelete}>Delete</button>
                    </div>
                </div>

            }
        </div >
    )
}

export default BlogCard