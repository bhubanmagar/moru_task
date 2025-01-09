import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const EditPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });
  const navigate = useNavigate();
  const { id: postId } = useParams();

  // Fetch existing post details
  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          title: data.title,
          body: data.body,
        });
      })
      .catch((error) => console.error("Error fetching post data:", error));
  }, [postId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: "PUT",
      body: JSON.stringify({
        id: postId,
        ...formData,
        userId: 1, //asuming user id as 1
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("Post updated successfully!", {
          position: "top-center",
        });
        navigate(`/view-post/${postId}`);
      })
      .catch((error) => {
        toast.error("Failed to update the post.", {
          position: "top-center",
        });
        console.error("Error updating post:", error);
      });
  };
  return (
    <>
      <div className="h-screen w-full  flex items-center justify-center bg-gradient-to-r from-green-500 to-blue-300">
        <div className="p-6 max-w-3xl w-1/2 mx-auto bg-cyan-100 border border-gray-300 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 font-serif">Edit Post</h1>
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
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPage;
