import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

function ChildSideBar() {
  const [assessments, setAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isInstructionsRead, setIsInstructionsRead] = useState(false);
  const navigate = useNavigate();

  // Fetch assessments
  useEffect(() => {
    axiosInstance.get('http://localhost:8080/unilink/users/assessment')
      .then(response => {
        setAssessments(response.data);
        if (response.data.length > 0) {
          setSelectedAssessment(response.data[0]); // Show first quiz by default
        }
      })
      .catch(error => {
        console.error('Error fetching assessments:', error);
      });
  }, []);

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment); // Show clicked quiz on right side
    setIsInstructionsRead(false); // Reset instructions checkbox when new quiz is selected
  };

  const handleStartClick = () => {
    if (selectedAssessment) {
     navigate(`/questions/${selectedAssessment.id}`, { state: { assessment: selectedAssessment } });
    }
  };

  return (
    <div className="flex-1 flex bg-white">
      {/* Exam Question Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto h-full">
        <h2 className="text-sm font-semibold mb-3 text-gray-800">
          Exam Questions
        </h2>
        <ul className="space-y-2 text-sm">
          {assessments.map((assessment) => (
            <li
              key={assessment.id}
              className="border border-gray-200 p-2 rounded cursor-pointer hover:bg-gray-100 transition"
              onClick={() => handleAssessmentClick(assessment)}
            >
              {assessment.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 bg-white p-6 overflow-y-auto h-full flex items-center justify-center">
        {selectedAssessment ? (
          <div className="text-center max-w-xl">
            <h1 className="text-xl font-bold mb-4">{selectedAssessment.name}</h1>
            <p className="text-gray-700 mb-2"><strong>Timer:</strong> {selectedAssessment.timer}</p>

            {/* Instructions */}
            <div className="text-left mb-4">
              <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-1 text-sm">
                <li>Do not cheat or use unfair means during the assessment.</li>
                <li>You must complete and submit the quiz to be evaluated.</li>
                <li>If you exit the quiz without submitting, your attempt will not be counted.</li>
                <li>Ensure a stable internet connection throughout the assessment.</li>
                <li>You must click "Submit" at the end for your answers to be recorded.</li>
              </ul>
            </div>

            {/* Mark as Read */}
            <div className="flex items-center justify-center mb-4">
              <input
                type="checkbox"
                id="markAsRead"
                checked={isInstructionsRead}
                onChange={() => setIsInstructionsRead(!isInstructionsRead)}
                className="mr-2"
              />
              <label htmlFor="markAsRead" className="text-gray-700 text-sm">
                I have read and understood the instructions.
              </label>
            </div>

            <button
              onClick={handleStartClick}
              className={`${
                isInstructionsRead ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-300 cursor-not-allowed'
              } text-white font-semibold py-2 px-4 rounded`}
              disabled={!isInstructionsRead}
            >
              Start
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Loading quiz info...</p>
        )}
      </div>
    </div>
  );
}

export default ChildSideBar;
