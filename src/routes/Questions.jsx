import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Questions = () => {
  const { id: assessmentId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { assessment } = location.state || {};

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  const [savedAnswers, setSavedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get(`/users/assessment/${assessmentId}/questions`);
        setQuestions(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [assessmentId]);

  // ✅ Timer conversion function
  const convertTimeToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // ✅ Set timer when assessment is available
  useEffect(() => {
    if (assessment && assessment.timer) {
      const totalSeconds = convertTimeToSeconds(assessment.timer);
      setTimeLeft(totalSeconds);
    }
  }, [assessment]);

  // ✅ Timer countdown logic
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    if (seconds === null || seconds === undefined) return 'Loading...';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (event) => {
    setAnswers({
      ...answers,
      [currentQuestion]: event.target.value,
    });
  };

  const handleSave = () => {
    setSavedAnswers({
      ...savedAnswers,
      [currentQuestion]: answers[currentQuestion],
    });
  };

  const handleSubmit = async () => {
    const formattedAnswers = Object.entries(savedAnswers).map(([qIndex, selectedText]) => {
      const question = questions[parseInt(qIndex, 10) - 1];
      const chosenOption = ['option1', 'option2', 'option3', 'option4'].findIndex(
        (key) => question[key] === selectedText
      ) + 1;

      return {
        questionId: question.id,
        chosenOption,
      };
    });

    const submissionPayload = {
      quizId: assessmentId,
      answer: formattedAnswers,
    };

    try {
      const response = await axiosInstance.post('/users/assessment/submit', submissionPayload);
      const result = response.data; // API Response

      console.log('Submission success:', result);

      // Navigate to QuizResult page with result in state
      navigate('/quizresult', { state: result });
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  const getQuestionStatus = (questionNumber) => {
    if (savedAnswers[questionNumber]) return 'bg-green-500';
    if (answers[questionNumber]) return 'bg-blue-500';
    return 'bg-red-500';
  };

  const currentQuestionData = questions[currentQuestion - 1];

  return (
    <div className="container mx-auto px-20 py-16">
      <h5 className="mb-8 text-xl font-medium text-center">{assessment?.name || 'Quiz'}</h5>

      {timeLeft === null || loading ? (
        <div className="flex items-center justify-center h-screen">
          <p className="text-lg font-medium">Loading quiz...</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8 justify-center">
          {/* Left Side - Questions */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
                <h6 className="text-lg font-semibold">Question {currentQuestion}</h6>
              </div>

              <div>
                {currentQuestionData ? (
                  <>
                    <p className="mb-6 text-gray-600 text-lg leading-relaxed">
                      {currentQuestionData.questionTitle}
                    </p>

                    <div className="flex flex-col gap-4">
                      {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 cursor-pointer relative transition hover:shadow-lg"
                        >
                          <input
                            type="radio"
                            className="form-check-input absolute left-3 top-1/2 transform -translate-y-1/2"
                            name={`question${currentQuestion}`}
                            id={`option${index}`}
                            value={currentQuestionData[option]}
                            checked={answers[currentQuestion] === currentQuestionData[option]}
                            onChange={handleAnswer}
                          />
                          <label
                            htmlFor={`option${index}`}
                            className="pl-8 cursor-pointer block"
                          >
                            {currentQuestionData[option]}
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p>Loading questions...</p>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4 justify-center">
              <button
                className="flex-1 py-2 font-medium border rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentQuestion(Math.max(1, currentQuestion - 1))}
                disabled={currentQuestion === 1}
              >
                PREV
              </button>
              <button
                className="flex-1 py-2 font-medium bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleSave}
                disabled={!answers[currentQuestion]}
              >
                SAVE
              </button>
              <button
                className="flex-1 py-2 font-medium border rounded hover:bg-gray-100 disabled:opacity-50"
                onClick={() => setCurrentQuestion(Math.min(questions.length, currentQuestion + 1))}
                disabled={currentQuestion === questions.length}
              >
                NEXT
              </button>
            </div>
          </div>

          {/* Right Side - Timer and Question Status */}
          <div className="w-full lg:w-1/4 flex flex-col gap-4">
            {/* Timer */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4 flex justify-center items-center gap-2">
              <i className="bi bi-clock text-blue-600"></i>
              <span className="text-lg font-medium">{formatTime(timeLeft)}</span>
            </div>

            {/* Question Number Navigation */}
            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
              <div className="grid grid-cols-5 gap-3">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentQuestion(index + 1)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white cursor-pointer ${getQuestionStatus(index + 1)} ${currentQuestion === index + 1 ? 'border-4 border-blue-600' : ''
                      }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Quiz */}
            <button
              className="py-2 font-medium bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleSubmit}
            >
              SUBMIT QUIZ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;
