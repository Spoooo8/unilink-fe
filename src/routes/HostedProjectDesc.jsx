import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const HostedProjectDesc = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isSidebarFixed, setIsSidebarFixed] = useState(false);

  const [isHost, setIsHost] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const userId = parseInt(localStorage.getItem('userId'));

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${id}`);
        setProject(response.data);

        // Now fetch the host details to get isHost and isMember
        const hostResponse = await axiosInstance.get(`/projects/${id}/host`);
        const hostData = hostResponse.data;

        // Set isHost
        setIsHost(hostData.userId === hostData.hostId);

        // Set isMember
        setIsMember(hostData.teamMemberId != null);

      } catch (error) {
        console.error('Error fetching project or host details:', error);
      }
    };

    fetchProject();
  }, [id]);

  const closePopup = () => {
    setPopupOpen(false);
    setInputValue('');
  };

  const handleJoinProject = async () => {
    try {
      await axiosInstance.post(`/projects/${id}/join`, {
        message: inputValue
      });
      console.log('Successfully joined the project');
      closePopup();
      navigate('/layout'); // Redirect to your preferred page after joining
    } catch (error) {
      console.error('Error joining project:', error);
    }
  };

  if (!project) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className={`min-h-screen bg-white p-6 transition-all duration-300 ${isSidebarFixed ? 'ml-[220px] w-[calc(100%-220px)]' : 'w-full'}`}>
      <div className="max-w-7xl mx-auto mt-8 min-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl font-bold">{project.title}</h1>
          {/* Show Join button only if user is not a member and not host */}
          {(!isMember && !isHost) && (
            <button
              onClick={() => setPopupOpen(true)}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 text-sm"
            >
              Join Project
            </button>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Section */}
          <div className="flex-[2] border border-gray-200 p-8 rounded shadow">
            <div className="flex items-center mb-6">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600 mr-2">Hosted By</span>
              <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded">{project.hostName || 'Host'}</span>
            </div>

            <p className="text-base text-gray-700 mb-6">{project.description}</p>

            {/* Complexity and Team Size */}
            <div className="mb-6">
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Complexity Level</p>
                <p className="text-base capitalize">{project.complexityLevel}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Team Size</p>
                <p className="text-base">{project.teamSize} members</p>
              </div>
            </div>

            {/* Skills List */}
            {project.skills && project.skills.length > 0 && (
              <div>
                <h3 className="text-base font-semibold mb-3">Skills Required:</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
                  {project.skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex-1 border border-gray-200 p-8 rounded shadow h-fit">
            <h3 className="text-lg font-semibold mb-6">Project Information</h3>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Start Date</p>
              <p className="text-base">{project.startDate}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">End Date</p>
              <p className="text-base">{project.endDate}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-1">Application Deadline</p>
              <p className="text-base">{project.applicationDeadline}</p>
            </div>

            {project.duration && (
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-1">Project Duration</p>
                <p className="text-base">{project.duration} months</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Popup Dialog */}
      {popupOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-white/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md border border-gray-300">
            <h3 className="text-lg font-semibold mb-4">Enter Message</h3>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
              placeholder="Enter details"
              rows={4}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleJoinProject}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                disabled={!inputValue.trim()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostedProjectDesc;
