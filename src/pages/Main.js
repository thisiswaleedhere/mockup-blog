import React, { useEffect, useRef, useState, useMemo } from 'react'
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';

const Main = ({ blogPosts, setBlogPosts }) => {

    let navigate = useNavigate();

    const bottomRef = useRef(null);

    const [num, setNum] = useState(1);

    function OpenAddPage() {
        navigate('/new');
    }

    const callBackFunction = entries => {
        const [entry] = entries;
        if (entry.isIntersecting) { console.log('there you go') }
    }

    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(callBackFunction, options);
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        }
    }, [bottomRef, options])




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

        <div className='font-poppins min-w-[370px] max-w-[1600px] mx-auto '>
            <div className='flex flex-col lg:flex-row lg:justify-between pt-8 pb-6 px-6'>
                <div className=''>
                    <h1 className='text-6xl text-center lg:text-left md:text-7xl font-semibold uppercase'>The Mockup Blog</h1>
                    <h4 className='text-gray-600 text-center lg:text-left pl-2 pt-3 lg:pt-1 text-lg sm:text-xl md:text-2xl'> A blog that is good in every way possible without a single shred of doubt. </h4>
                </div>
                <button className='bg-yellow-400 hover:bg-yellow-500 hover:font-semibold hover:tracking-widest transition-all px-8 lg:px-6 mt-6 sm:mt-8 lg:mt-10 font-semibold rounded-full h-10 sm:h-12 lg:h-14 w-52 sm:w-60 mx-auto lg:mx-0' onClick={OpenAddPage}>  Add New Post </button>
            </div>
            <hr className='pb-10' />

            {
                blogPosts.filter((everyBlog) => everyBlog.id < (Number(num) * 10) + 1).map((eachBlog) => {
                    return (
                        < BlogCard key={eachBlog.id} id={eachBlog.id} userId={eachBlog.userId} title={eachBlog.title} body={eachBlog.body} />
                    )

                })
            }
            <footer ref={bottomRef}></footer>


        </div >

    )
}

export default Main