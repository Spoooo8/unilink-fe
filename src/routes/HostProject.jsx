import React, { useState, useEffect } from 'react';
import StepForm from '../components/StepForm';
import axiosInstance from '../utils/axiosInstance';

const HostProject = () => {
  const [skillsList, setSkillsList] = useState([]);

  const [title, setTitle] = useState('');
  const [repoLink, setRepoLink] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [complexityLevel, setComplexityLevel] = useState('');
  const [visibility, setVisibility] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [skillRequired, setSkillRequired] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);

  const complexities = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'];
  const visibilityOptions = ['Public', 'Private'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axiosInstance.get('http://localhost:8080/unilink/users/skill/all');
        if (Array.isArray(res.data)) {
          setSkillsList(res.data);
        } else {
          setSkillsList([]);
          console.error('API did not return an array:', res.data);
        }
      } catch (err) {
        console.error('Error fetching skills:', err);
      }
    };
    fetchSkills();
  }, []);

  const steps = ['Basic Details', 'Dates & Deadlines', 'Team & Complexity'];

  const fieldsPerStep = [
    [
      { name: 'title', label: 'Project Title', type: 'text', placeholder: 'Title', required: true },
      { name: 'repoLink', label: 'Repository Link', type: 'text', placeholder: 'e.g. GitHub Repo', required: true },
      { name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4, required: true },
      { name: 'imageUrl', label: 'Image URL', type: 'text', placeholder: 'Image link', required: true },
      {
        name: 'skillRequired',
        label: 'Skills Required',
        type: 'multiselect',
        options: Array.isArray(skillsList) ? skillsList.map((s) => ({ value: s.id, label: s.name })) : [],
        required: true,
      },
    ],
    [
      { name: 'startDate', label: 'Start Date', type: 'date', required: true },
      { name: 'endDate', label: 'End Date', type: 'date', required: true },
      { name: 'applicationDeadline', label: 'Application Deadline', type: 'date', required: true },
    ],
    [
      {
        name: 'complexityLevel',
        label: 'Complexity Level',
        type: 'select',
        options: complexities.map((c) => ({ value: c, label: c })),
        required: true,
      },
      {
        name: 'visibility',
        label: 'Visibility',
        type: 'select',
        options: visibilityOptions.map((v) => ({ value: v, label: v })),
        required: true,
      },
      {
        name: 'teamSize',
        label: 'Team Size',
        type: 'number',
        placeholder: 'e.g. 3',
        required: true,
      },
    ],
  ];

  const values = {
    title,
    repoLink,
    description,
    startDate,
    endDate,
    applicationDeadline,
    imageUrl,
    complexityLevel,
    visibility,
    teamSize,
    skillRequired,
  };

  const setters = {
    setTitle,
    setRepoLink,
    setDescription,
    setStartDate,
    setEndDate,
    setApplicationDeadline,
    setImageUrl,
    setComplexityLevel,
    setVisibility,
    setTeamSize,
    setSkillRequired,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      repoLink,
      description,
      imageUrl,
      skillIds: skillRequired.map((item) => item.value),
      startDate,
      endDate,
      applicationDeadline,
      complexityLevel: complexityLevel || 'INTERMEDIATE',
      projectVisibility: visibility || 'Public',
      teamSize: Number(teamSize),
    };

    try {
      const response = await axiosInstance.post('http://localhost:8080/unilink/projects/add', payload);

      if (response.status !== 200 && response.status !== 201)
        throw new Error('Failed to submit project');

      setOpenSuccess(true);
    } catch (err) {
      console.error('Error submitting project:', err);
    }
  };

  return (
    <div className="container-fluid py-4">
      <StepForm
        steps={steps}
        fieldsPerStep={fieldsPerStep}
        values={values}
        setters={setters}
        onSubmit={handleSubmit}
        successOpen={openSuccess}
        setSuccessOpen={setOpenSuccess}
        isValidationRequired={true}
      />
    </div>
  );
};

export default HostProject;
