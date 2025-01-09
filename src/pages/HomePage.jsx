import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Posts per page
  const navigate = useNavigate();

  // Fetch posts
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Logic for pagination: Get the current posts to display
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Pagination Logic for displaying only 3 page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 1 > 0 ? currentPage - 1 : 1; // Start page should not be less than 1
    let endPage = startPage + 2 > totalPages ? totalPages : startPage + 2; // End page should not exceed total pages

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-teal-400 min-h-screen">
      <h1 className="text-3xl font-semibold text-white mb-6 font-serif">
        Dashboard
      </h1>
      <Link to="/add-post">
        <button className="m-2 p-2 bg-green-500 rounded-lg text-white font-semibold hover:bg-green-400 transition duration-200 ease-in-out">
          Add Post
        </button>
      </Link>
      <p className="text-lg text-white font-semibold mb-4">Your Posts:</p>

      {/* Table with styled elements */}
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700">
            <th className="px-6 py-4 font-medium">Post ID</th>
            <th className="px-6 py-4 font-medium">Title</th>
            <th className="px-6 py-4 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-gray-700">{post.id}</td>
              <td className="px-6 py-4 text-gray-700">{post.title}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => {
                    navigate(`/view-post/${post.id}`);
                  }}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition duration-200 ease-in-out"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        >
          Prev
        </button>

        {/* Dynamically render page numbers (max 3 at a time) */}
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
            className={`px-4 py-2 mx-2 rounded-lg text-white ${
              currentPage === pageNumber
                ? "bg-teal-500 hover:bg-teal-400"
                : "bg-gray-300 hover:bg-gray-200"
            } transition duration-200 ease-in-out`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 ease-in-out"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
