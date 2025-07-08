import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const UserProfile = () => {
  const { id } = useParams(); // ✅ Get ID from URL
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(`/projects/user/profile/${id}`); // ✅ Dynamic ID
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [id]); // ✅ Dependency on ID

  if (!userData) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  return (
    <section className="bg-gray-100 min-h-screen py-10">
      <div className="container mx-auto px-4">

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel */}
          <div className="lg:w-1/3 w-full space-y-6">
            {/* Profile Card */}
            <div className="bg-white p-6 rounded shadow text-center">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                alt="avatar"
                className="w-36 h-36 mx-auto rounded-full mb-4"
              />
              <p className="text-gray-700 font-semibold">{userData.name}</p>
              <p className="text-gray-500 mb-4">{userData.designation}</p>
              <p className="text-gray-500 mb-4">Skill Score: {userData.skillsScore}</p>
            </div>

            {/* Social Links */}
            <div className="bg-white p-4 rounded shadow">
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <span className="text-yellow-500">🌐</span>
                  <a href={userData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Portfolio
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-black">🐱</span>
                  <a href={userData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    GitHub
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-blue-700">💼</span>
                  <a href={userData.socialLinks} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Panel */}
          <div className="lg:w-2/3 w-full space-y-6">

            {/* Basic Info + Skills */}
            <div className="bg-white p-6 rounded shadow w-full">
              <div className="space-y-4">
                {/* About Me */}
                <div className="flex">
                  <div className="w-1/3 font-semibold text-gray-700">About Me</div>
                  <div className="w-2/3 text-gray-600">{userData.aboutMe}</div>
                </div>
                <hr />

                {/* Skills */}
                <div className="flex items-start">
                  <div className="w-1/3 font-semibold text-gray-700 mt-1">Skills</div>
                  <div className="w-2/3 flex flex-wrap gap-2">
                    {userData.skills.map(skill => (
                      <span
                        key={skill.id}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
                <hr />

                {/* Project Rating */}
                <div className="flex">
                  <div className="w-1/3 font-semibold text-gray-700">Project Rating</div>
                  <div className="w-2/3 text-gray-600">{userData.skillsScore}</div>
                </div>
                <hr />

                {/* Mentor Status */}
                <div className="flex">
                  <div className="w-1/3 font-semibold text-gray-700">Mentor Status</div>
                  <div className="w-2/3 text-gray-600">{userData.mentorStatus ? 'Yes' : 'No'}</div>
                </div>
              </div>
            </div>

            {/* Project Status */}
            <div className="bg-white p-6 rounded shadow w-full max-h-[400px] overflow-y-auto">
              <h3 className="text-blue-600 mb-4 font-semibold">Ongoing: Project Status</h3>

              {userData.projectProgressDTO.length > 0 ? (
                userData.projectProgressDTO.map((project, idx) => (
                  <div key={idx} className="mb-4">
                    <p className="text-gray-700 text-sm mb-1">{project.title}</p>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-blue-600 h-3 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No ongoing projects.</p>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
