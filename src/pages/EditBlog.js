import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const EditBlog = () => {

    const { id } = useParams();
    let navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [userId, setUserId] = useState(0);
    const [seed, setSeed] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        setTimeout(() => {
            if (message) {
                navigate('/');
                setMessage('');
            }
        }, 4000)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])


    useEffect(() => {
        fetchBlog();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const fetchBlog = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        const blogContent = await data.json();

        console.log(blogContent);
        setTitle(blogContent.title);
        setBody(blogContent.body);
        setUserId(blogContent.userId);

    }





    const newBlog = {
        userId,
        id,
        title,
        body
    }


    function handleCancel(event) {
        event.preventDefault();
        navigate('/');
        setSeed(Math.random());

    }

    function handleEdit(event) {
        event.preventDefault();
        editBlog();
        setTitle('');
        setBody('');
        setUserId('');
        setMessage("Post Edited Successfully")
    }

    const editBlog = async () => {
        const data = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify(newBlog),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const editedBlog = await data.json();

        console.log(editedBlog);
    }



    return (
        <div className='font-poppins pt-8 px-8'>
            <Link to='/' >
                <h1 className='text-7xl font-semibold uppercase pb-2'>The Mockup Blog</h1>
            </Link>

            <hr className='pt-2' />

            <div className='pt-8 pl-3 text-center text-2xl '>Edit the selected blog post</div>

            {message &&
                <div className='py-4'>
                    <div className=' text-center font-medium text-lg text-green-600 border-green-600'>{message}</div>
                    <div className='text-sm text-center text-gray-400'> Redirecting you to Homepage.</div>
                </div>
            }

            <form className='' key={seed} onSubmit={handleEdit}  >
                <div>

                    <div className="mt-3">
                        <input
                            className="w-full rounded-full bg-gray-50 shadow-xl border-0 appearance-none  text-gray-800 p-1 sm:p-2 md:p-3 indent-2 focus:ring-0 focus:border-yellow-400 focus:border-2 "
                            id="blog-title"
                            type="text"
                            placeholder="Blog Title"
                            name="blogTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}

                        />
                    </div>


                    <div className="mt-3">
                        <input
                            className="w-full rounded-full bg-gray-50 shadow-xl border-0 appearance-none  text-gray-800 p-1 sm:p-2 md:p-3 indent-2 focus:ring-0 focus:border-yellow-400 focus:border-2 "
                            id="blog-body"
                            type="text"
                            placeholder="Blog Body"
                            name="blogBody"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}

                        />
                    </div>


                    <div>
                        <input
                            className="mt-3 mr-2 max-w-max rounded-full max-w-60 bg-gray-50 shadow-xl border-0 appearance-none text-gray-800 p-1 sm:p-2 md:p-3 indent-2 focus:ring-0 focus:border-yellow-400 focus:border-2 "
                            id="user-Id"
                            type="number"
                            min="1"
                            max="10"
                            placeholder="User ID"
                            name="userIdr"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                </div>
                <button
                    className="mt-5 w-full py-1 sm:py-2 md:py-3 hover:bg-blue-500 hover:tracking-wider transition-all bg-blue-400 shadow-xl px-5 rounded-full text-mono font-bold hover:shadow-xl">
                    Edit Post
                </button>

                <div className="pt-4 hover:underline cursor-pointer text-center" onClick={handleCancel}>
                    Cancel
                </div>
            </form>
        </div>
    )
}

export default EditBlog