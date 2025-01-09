import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

const ViewPage = () => {
  const [post, setPost] = useState();
  const navigate = useNavigate();
  const getParams = useParams();
  const getPostID = getParams.id;
  console.log(getPostID);

  //edit Handler
  const handleEdit = () => {
    // Redirect to an edit page for this post
    navigate(`/edit-post/${getPostID}`);
  };

  //deleting post functionality
  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      // Perform the delete operation
      fetch(`https://jsonplaceholder.typicode.com/posts/${getPostID}`, {
        method: "DELETE",
      })
        .then(() => {
          toast.success("Post Deleted Sucessfully!", {
            position: "top-center",
            autoClose: 1000,
          });
          navigate("/"); // Redirect back to the homepage or list page
        })
        .catch((error) => {
          console.error("Error deleting the post:", error);
        });
    }
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${getPostID}`)
      .then((response) => response.json())
      .then((data) => {
        setPost(data);
        console.log(post);
      });
  }, [post]);
  return (
    <>
      <div className="h-screen max-w-full flex justify-center items-center bg-gradient-to-r from-green-800 to-blue-400">
        <div className="p-6 max-w-3xl mx-auto bg-cyan-100 border border-gray-300 rounded-lg shadow-md relative">
          {/* Edit and Delete Icons */}
          <div className="absolute top-4 right-4 flex gap-4">
            <button
              onClick={handleEdit}
              className="p-2 text-blue-500 bg-blue-100 rounded-full hover:bg-blue-200"
            >
              <FiEdit size={13} />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-500 bg-red-100 rounded-full hover:bg-red-200"
            >
              <FiTrash size={13} />
            </button>
          </div>
          <div className="">
            {post && (
              <>
                <span className="font-bold text-lg font-serif">
                  {" "}
                  Post Details :
                </span>
                <div className="ml-2 p-2">
                  <h1 className="text-xl font-bold mb-2 rounded p-1">
                    {post.title}
                  </h1>
                  <hr />
                  <p className="text-gray-700 text-sm mt-3">{post.body}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
