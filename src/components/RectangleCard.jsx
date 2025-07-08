import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function RectangleCard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axiosInstance.get('/projects/myProjects');
        if (Array.isArray(response.data)) {
          setProjects(response.data);
        } else {
          console.error('API did not return an array:', response.data);
          setProjects([]);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (projectId) => {
    navigate(`/project/${projectId}/desc`);
  };

  return (
    <div className="space-y-4 px-4 md:px-10 py-10">
      {projects.length === 0 ? (
        <p className="text-center text-gray-500">No projects found.</p>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            onClick={() => handleCardClick(project.id)}
            className="border border-gray-300 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
          >
            <h3 className="font-semibold text-lg mb-2 text-gray-800">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default RectangleCard;
