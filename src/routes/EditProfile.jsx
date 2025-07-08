import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import InputForm from '../components/general/InputForm';

function EditProfile() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userData } = location.state || {};

  const [skillsList, setSkillsList] = useState([]);

  // Form state with pre-filled data
  const [aboutMe, setAboutMe] = useState(userData?.aboutMe || '');
  const [portfolioUrl, setPortfolioUrl] = useState(userData?.portfolioUrl || '');
  const [designation, setDesignation] = useState(userData?.designation || '');
  const [socialLink, setSocialLink] = useState(userData?.socialLink || '');
  const [githubUrl, setGithubUrl] = useState(userData?.githubUrl || '');
  const [skillIds, setSkillIds] = useState([]);
  const [isMentor, setIsMentor] = useState(userData?.isMentor || false);

  // Fetch skills and pre-fill skill IDs
  useEffect(() => {
    axiosInstance.get('/users/skill/all')
      .then(response => {
        const fetchedSkills = response.data.map(skill => ({
          value: skill.id,
          label: skill.name
        }));
        setSkillsList(fetchedSkills);

        if (userData && userData.skills && userData.skills.length > 0) {
          const selectedSkillIds = fetchedSkills
            .filter(skill => userData.skills.includes(skill.label))
            .map(skill => skill.value);
          setSkillIds(selectedSkillIds);
        }
      })
      .catch(error => {
        console.error('❌ Failed to fetch skills:', error);
      });
  }, [userData]);

  const fields = [
    { name: 'aboutMe', label: 'About Me', type: 'textarea', placeholder: 'Tell something about yourself' },
    { name: 'portfolioUrl', label: 'Portfolio URL', type: 'url', placeholder: 'https://yourportfolio.com' },
    { name: 'designation', label: 'Designation', type: 'text', placeholder: 'e.g., Senior Developer' },
    { name: 'socialLink', label: 'Social Link', type: 'url', placeholder: 'https://linkedin.com/in/...' },
    { name: 'githubUrl', label: 'GitHub URL', type: 'url', placeholder: 'https://github.com/...' },
    { name: 'skillIds', label: 'Skills', type: 'multi-select', options: skillsList },
    { name: 'isMentor', label: 'Are you a mentor?', type: 'checkbox' }
  ];

  const values = { aboutMe, portfolioUrl, designation, socialLink, githubUrl, skillIds, isMentor };
  const setters = { setAboutMe, setPortfolioUrl, setDesignation, setSocialLink, setGithubUrl, setSkillIds, setIsMentor };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      aboutMe,
      portfolioUrl,
      designation,
      skillIds,
      socialLink,
      githubUrl,
      isMentor
    };

    axiosInstance.put('/users/edit', payload)
      .then(response => {
        console.log('✅ Profile Updated:', response.data);
        alert('Profile updated successfully!');
        navigate('/profile'); // ✅ Redirect after success
      })
      .catch(error => {
        console.error('❌ Failed to update profile:', error);
        alert('Failed to update profile.');
      });
  };

  return (
    <div className="w-[900px] max-w-full p-6 bg-white shadow rounded overflow-y-auto max-h-[120vh] flex flex-col items-center">
      <InputForm
        fields={fields}
        values={values}
        setters={setters}
        onSubmit={handleSubmit}
        title="Edit Profile"
      />
    </div>
  );
}

export default EditProfile;
