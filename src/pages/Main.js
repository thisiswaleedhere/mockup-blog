import React, { useEffect } from 'react'
import BlogCard from '../components/BlogCard';
import { Link } from 'react-router-dom';

const Main = ({ blogPosts, setBlogPosts }) => {


    useEffect(() => {
        fetchAllBlogs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAllBlogs = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const blogContent = await data.json();

        setBlogPosts(blogContent);
    }

    return (
        <div className='font-poppins pt-8 px-8'>
            <div className='flex justify-between pb-6'>
                <div>
                    <h1 className='text-7xl font-semibold uppercase'>The Mockup Blog</h1>
                    <h4 className='text-gray-600 pl-2 pt-1 text-2xl'> A blog that is good in every way possible without a single shred of doubt. </h4>
                </div>
                <Link to='/new' ><button className='bg-yellow-400 hover:bg-yellow-500 hover:font-semibold hover:text-gray-100 px-4 mt-10 font-semibold rounded-2xl h-16'>  Add New Post </button> </Link>
            </div>

            <hr className='pb-10' />

            {blogPosts.filter((everyBlog) => everyBlog.id < 11).map((eachBlog) => {
                return (
                    < BlogCard key={eachBlog.id} id={eachBlog.id} userId={eachBlog.userId} title={eachBlog.title} body={eachBlog.body} />
                )

            })}


        </div >
    )
}

export default Main