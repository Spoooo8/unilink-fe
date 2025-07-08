import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, Outlet } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ProjectDesc = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHost, setIsHost] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const userId = parseInt(localStorage.getItem('userId')); // Adjust as per auth setup

  useEffect(() => {
    const fetchHostDetails = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}/host`);
        const hostData = response.data;

        // Check host
        if (hostData.userId === hostData.hostId) {
          setIsHost(true);
        } else {
          setIsHost(false);
        }

        // Check membership
        if (hostData.teamMemberId != null) {
          setIsMember(true);
        } else {
          setIsMember(false);
        }

      } catch (error) {
        console.error('Error fetching host details:', error);
      }
    };

    fetchHostDetails();
  }, [id]);

  const sidebarItems = [
    { name: 'Description', path: `/project/${id}/desc` },
    { name: 'Team', path: `/project/${id}/team` },
    { name: 'Code', path: `/project/${id}/code` },
    { name: 'Chat', path: `/project/${id}/chat` },
    { name: 'Task', path: `/project/${id}/task` },
  ];

  const handleSidebarClick = (path) => {
    navigate(path, { state: { isHost, isMember } });
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      {isMember && (
        <div
          className={`bg-white border-r border-gray-200 h-full p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'
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
                    className={`border border-gray-200 p-2 rounded cursor-pointer hover:bg-gray-100 transition ${location.pathname === item.path ? 'bg-gray-100 font-bold' : ''
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
      )}

      {/* Right Side Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${isMember ? (isSidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0'}`}
      >
        <Outlet context={{ isHost, isMember }} />
      </div>
    </div>
  );
};

export default ProjectDesc;
