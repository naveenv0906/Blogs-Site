import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      if (res && res.data) {
        return res.data; // Assuming API returns { blogs: [...] }
      }
      throw new Error("Unexpected API response");
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setError("Failed to fetch blogs. Please try again later.");
      return null;
    }
  };

  useEffect(() => {
    sendRequest().then((data) => {
      if (data && data.blogs) {
        setBlogs(data.blogs);
      }
    });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))
      ) : (
        <p>Loading blogs...</p>
      )}
    </div>
  );
};

export default Blogs;
