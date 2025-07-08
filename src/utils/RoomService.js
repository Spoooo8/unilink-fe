// src/services/RoomService.js

import httpClient from "../utils/axiosInstance"; // ✅ Correct import for default export

// ✅ Create a new chat room
export const createRoomApi = async (roomDetail) => {
  const response = await httpClient.post(`/rooms`, roomDetail, {
    headers: {
      "Content-Type": "application/json", // ✅ Use correct content type
    },
  });
  return response.data;
};


// ✅ Get messages of a room (paginated)
// ✅ Get messages of a room (paginated)
export const getMessages = async (roomId, size = 50, page = 0) => {
  const response = await httpClient.get(
    `http://localhost:8083/chat/rooms/${roomId}/messages`
    // `/chat/rooms//messages?size=${size}&page=${page}`
  );
  return response.data;
};

