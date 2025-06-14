import React, { useState, useEffect } from 'react';
import StepForm from '../components/StepForm'; 

const HostProject = () => {
  const [skillsList, setSkillsList] = useState([]);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [complexityLevel, setComplexityLevel] = useState('');
  const [visibility, setVisibility] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [projectType, setProjectType] = useState('');
  const [skillRequired, setSkillRequired] = useState([]);
  const [domain, setDomain] = useState([]);
  const [openSuccess, setOpenSuccess] = useState(false);

  const domains = ['Web Development', 'Data Science', 'AI', 'Mobile Development'];
  const complexities = ['Beginner', 'Intermediate', 'Advanced'];
  const visibilityOptions = ['Public', 'Private'];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/v1/skill/all');
        const data = await res.json();
        setSkillsList(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSkills();
  }, []);

  const steps = ['Basic Details', 'Dates & Deadlines', 'Team & Complexity'];

  const fieldsPerStep = [
    [
      { name: 'title', label: 'Project Title', type: 'text', placeholder: 'Title' },
      { name: 'description', label: 'Description', type: 'text', multiline: true, rows: 4 },
      { name: 'imageUrl', label: 'Image URL', type: 'text', placeholder: 'Image link' },
      { name: 'projectType', label: 'Project Type', type: 'text', placeholder: 'e.g. Competition' },
      {
        name: 'skillRequired',
        label: 'Skills Required',
        type: 'multiselect',
        options: skillsList.map((s) => ({ value: s.id, label: s.name })),
      },
      {
        name: 'domain',
        label: 'Domain',
        type: 'multiselect',
        options: domains.map((d) => ({ value: d, label: d })),
      },
    ],
    [
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'applicationDeadline', label: 'Application Deadline', type: 'date' },
    ],
    [
      {
        name: 'complexityLevel',
        label: 'Complexity Level',
        type: 'select',
        options: complexities.map((c) => ({ value: c, label: c })),
      },
      {
        name: 'visibility',
        label: 'Visibility',
        type: 'select',
        options: visibilityOptions.map((v) => ({ value: v, label: v })),
      },
      {
        name: 'teamSize',
        label: 'Team Size',
        type: 'number',
        placeholder: 'e.g. 3',
      },
    ],
  ];

  const values = {
    title, description, startDate, endDate, applicationDeadline,
    imageUrl, complexityLevel, visibility, teamSize, projectType,
    skillRequired, domain,
  };

  const setters = {
    setTitle, setDescription, setStartDate, setEndDate, setApplicationDeadline,
    setImageUrl, setComplexityLevel, setVisibility, setTeamSize, setProjectType,
    setSkillRequired, setDomain,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      hostId: 1,
      title,
      description,
      startDate,
      endDate,
      imageUrl,
      complexityLevel: complexityLevel || 'Medium',
      visibility: visibility || 'Public',
      applicationDeadline,
      teamSize: Number(teamSize),
      progress: 0.0,
      rating: 0.0,
      projectType,
      statusId: 1,
      skillIds: skillRequired.map((id) => Number(id)),
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/projects/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to submit project');

      setOpenSuccess(true);
    } catch (err) {
      console.error(err);
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
      />
    </div>
  );
};

export default HostProject;
