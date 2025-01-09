import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  // Fetch posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleView = (post) => {
    navigate(`/view-post/${post.id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <Link to="/add-post">
        <button className="m-1 p-1 bg-green-300 rounded-md hover:bg-green-200 font-thin hover:font-bold">
          Add Post
        </button>
      </Link>
      <p className="p-2 m-1">Posts:</p>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className="border px-4 py-2">{post.id}</td>
              <td className="border px-4 py-2">{post.title}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleView(post)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
