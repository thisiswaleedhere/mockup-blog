import Main from "./pages/Main";
import { Route, Routes } from "react-router-dom";
import AddBlog from './pages/AddBlog';
import BlogPage from './pages/BlogPage';
import { useState } from 'react';
import EditBlog from "./pages/EditBlog";

function App() {

  const [blogPosts, setBlogPosts] = useState([]);

  return (
    <Routes>
      <Route index exact path='/' element={<Main blogPosts={blogPosts} setBlogPosts={setBlogPosts} />} />
      <Route path='/new' element={<AddBlog blogPosts={blogPosts} setBlogPosts={setBlogPosts} />} />
      <Route path='/:id' element={<BlogPage />} />
      <Route path='/edit/:id' element={<EditBlog />} />
    </Routes>
  );
}

export default App;
