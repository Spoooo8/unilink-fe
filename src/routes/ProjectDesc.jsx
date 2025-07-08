import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import HostedProjectDesc from './HostedProjectDesc';

const ProjectDesc = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Define constant sidebar items
  const sidebarItems = [
    { name: 'Description', path: `/project/${id}/description` },
    { name: 'Code', path: `/project/${id}/code` },
    { name: 'Chat', path: `/project/${id}/chat` },
    { name: 'Task', path: `/project/${id}/task` },
  
  ];

  // Handle sidebar item click
  const handleSidebarClick = (path) => {
    navigate(path);
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 h-full p-4 transition-all duration-300 ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } fixed`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="mb-4 p-2 border rounded hover:bg-gray-100"
        >
          {isSidebarOpen ? '<' : '>'}
        </button>

        {isSidebarOpen && (
          <>
            <h2 className="text-sm font-semibold mb-3 text-gray-800">
              Project Menu
            </h2>
            <ul className="space-y-2 text-sm">
              {sidebarItems.map((item, index) => (
                <li
                  key={index}
                  className={`border border-gray-200 p-2 rounded cursor-pointer hover:bg-gray-100 transition ${
                    location.pathname === item.path ? 'bg-gray-100 font-bold' : ''
                  }`}
                  onClick={() => handleSidebarClick(item.path)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Right Side Content */}
      <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <HostedProjectDesc />
      </div>
    </div>
  );
};

export default ProjectDesc;
