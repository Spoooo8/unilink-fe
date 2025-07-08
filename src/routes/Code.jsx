import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Code = () => {
  // ✅ Get projectId from the URL path
  const { id } = useParams();

  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch commit history when component mounts
  useEffect(() => {
    const fetchCommits = async () => {
      try {
        // ✅ Correct API call using axiosInstance and projectId
        const response = await axiosInstance.get(`/projects/${id}/history`);
        setCommits(response.data);
      } catch (error) {
        console.error('Error fetching commit history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, [id]);

  // ✅ Optional: Handle clone API (change path if needed)
  const handleClone = async () => {
    try {
      await axiosInstance.post(`/projects/${id}/clone`);
      alert('Repository cloned successfully!');
    } catch (error) {
      console.error('Error cloning repository:', error);
      alert('repository already exists');
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-white p-6 mt-[70px]">
      {/* Clone Repository Button */}
      <div className="flex justify-between items-center w-full max-w-5xl mb-6">
        <h1 className="text-2xl font-semibold">Clone Repository</h1>
        <button
          onClick={handleClone}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
        >
          Clone
        </button>
      </div>

      {/* Commit History Table */}
      <div className="w-full max-w-5xl mx-auto mb-8 shadow rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold px-6 py-4 border-b border-gray-200 bg-gray-50">
          Commit History
        </h2>

        <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-200 font-semibold text-gray-700">
          <div className="col-span-2">#</div>
          <div className="col-span-4">Commit Message</div>
          <div className="col-span-3">Author</div>
          <div className="col-span-3">Timestamp</div>
        </div>

        {loading ? (
          <div className="text-center py-6 text-gray-500">Loading...</div>
        ) : commits.length === 0 ? (
          <div className="text-center py-6 text-gray-500">No commits found.</div>
        ) : (
          commits.map((commit, index) => {
            const [messagePart, authorPart] = commit.split('\n by ');
            const [author, timestamp] = authorPart.split(' at ');

            return (
              <div
                key={index}
                className="grid grid-cols-12 items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
              >
                <div className="col-span-2">{index + 1}</div>
                <div className="col-span-4">{messagePart}</div>
                <div className="col-span-3">{author}</div>
                <div className="col-span-3">{new Date(timestamp).toLocaleString()}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Code;
