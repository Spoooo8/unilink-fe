import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from '../components/general/Modal';

const QuizResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const resultData = location.state;

  if (!resultData) {
    navigate('/layout', { replace: true });
    return null;
  }

  const score = resultData.score ?? 0;
  const isPassed = resultData.result ?? false; // boolean from backend
  const passFailText = isPassed ? 'Pass' : 'Fail';

  return (
    <Modal navigateTo="/layout">
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-[500px] h-[320px] bg-white rounded-lg shadow-lg text-center p-6 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quiz Ended</h2>
          <p className="text-gray-700 text-lg mb-3">
            Your Score: <span className="font-semibold text-blue-600">{score}</span>
          </p>
          <p className="text-gray-700 text-lg">
            Result:{' '}
            <span className={`font-semibold ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
              {passFailText}
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default QuizResult;
