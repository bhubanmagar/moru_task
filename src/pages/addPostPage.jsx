import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const AddPostPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        ...formData,
        userId: 1, // Assuming userId is 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Post created successfully!", {
          position: "top-center",
        });
        navigate("/"); // Redirect to the post list page
      })
      .catch((error) => {
        toast.error("Failed to create the post.", {
          position: "top-center",
        });
        console.error("Error creating post:", error);
      });
  };
  return (
    <>
      <div className="h-screen max-w-full flex justify-center items-center bg-gradient-to-r from-green-800 to-blue-400">
        <div className="p-6 w-1/2 mx-auto bg-cyan-100 border border-gray-300 rounded-lg shadow-md relative">
          <h1 className="text-2xl font-bold mb-4 font-serif">Add New Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-lg font-medium mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="body" className="block text-lg font-medium mb-2">
                Body
              </label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                rows="5"
                required
              ></textarea>
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddPostPage;
