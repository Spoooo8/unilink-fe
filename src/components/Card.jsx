import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';

function Card() {
  const [cardData, setCardData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axiosInstance.get('/projects/layout/cards');
        if (Array.isArray(response.data)) {
          const updatedData = response.data.map((card) => ({
            ...card,
            skillRequired: card.skillRequired || 'C++, Java',
          }));
          setCardData(updatedData);
        } else {
          console.error('API did not return an array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/project/${id}/desc`);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 pb-10">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="border border-gray-300 rounded shadow-sm text-center p-4 transform transition duration-300 ease-in-out hover:scale-105 hover:z-10 cursor-pointer"
            onClick={() => handleCardClick(card.id)}
          >
            <div className="bg-gray-300 h-40 flex items-center justify-center rounded">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5h18M9 3v2m6-2v2M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3
              className="mt-4 font-semibold text-sm"
              dangerouslySetInnerHTML={{ __html: card.title }}
            ></h3>
            <p className="text-xs text-gray-600 mt-2">
              Skills: {card.skillRequired}
            </p>
            <p className="text-xs text-gray-600 mt-1">
              Application Deadline: {card.applicationDeadline}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}

export default Card;
