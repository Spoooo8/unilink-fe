// src/pages/MyProfile.jsx

import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import axiosInstance from '../utils/axiosInstance';

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/users/profile'); // ✅ Uses custom axios instance
        const data = response.data;

        const formattedData = {
          name: data.name,
          aboutMe: data.aboutMe,
          skills: data.skills.map(skill => skill.name),
          designation: data.designation,
          portfolioUrl: data.portfolioUrl,
          githubUrl: data.githubUrl,
          socialLink: data.socialLinks,
          skillScore: data.skillsScore,
          isMentor: data.mentorStatus,
          projectCount: data.projectCount,
        };

        setUserData(formattedData);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditProfile = () => {
  navigate('/profile/edit', { state: { userData } });
  };

  if (!userData) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <>
      <div className="bg-white overflow-hidden">
        {/* Banner */}
        <div className="bg-[#6c2b3d] h-52 relative flex items-end px-8 py-6">
          {/* Avatar */}
          <div className="absolute -bottom-12 left-8 flex flex-col items-center">
            <img
              className="w-36 h-36 rounded-full border-4 border-white object-cover"
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
              alt="Profile"
            />
            <Button
              px="px-4"
              py="py-1"
              className="border border-gray-500 text-gray-800 hover:bg-[#f5e8ea]"
              onClick={handleEditProfile}
            >
              Edit Profile
            </Button>
          </div>
          <div className="ml-44 mt-20">
            <h2 className="text-white text-xl font-semibold">{userData.name}</h2>
            <p className="text-gray-300 text-sm">{userData.designation}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gray-100 p-4 flex justify-end text-center gap-8">
          <div>
            <p className="text-lg font-semibold">{userData.projectCount}</p>
            <p className="text-sm text-gray-500">Projects</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{userData.skillScore}</p>
            <p className="text-sm text-gray-500">Skill Score</p>
          </div>
          <div>
            <p className="text-lg font-semibold">{userData.isMentor ? "Yes" : "No"}</p>
            <p className="text-sm text-gray-500">Mentor</p>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6">
          {/* About Section */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-semibold">About</h3>
          </div>
          <div className="bg-gray-100 p-4 rounded mb-6">
            <p className="italic text-gray-700">{userData.aboutMe}</p>
          </div>

          {/* Skills Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="bg-gray-100 p-4 rounded space-y-1">
              {userData.skills.map((skill, index) => (
                <p key={index} className="italic text-gray-700">• {skill}</p>
              ))}
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Links</h3>
            <div className="bg-gray-100 p-4 rounded space-y-1">
              <p><strong>Portfolio:</strong> <a href={userData.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{userData.portfolioUrl}</a></p>
              <p><strong>GitHub:</strong> <a href={userData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{userData.githubUrl}</a></p>
              <p><strong>Social:</strong> <a href={userData.socialLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">{userData.socialLink}</a></p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default MyProfile;
