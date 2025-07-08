import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { MdAttachFile, MdSend } from "react-icons/md";
import { getMessages } from "../utils/RoomService";

const ChatPage = () => {
  const { roomId } = useParams(); // ✅ roomId from URL
  const [currentUser] = useState(sessionStorage.getItem("userName"));
  const [currentUserId] = useState(sessionStorage.getItem('userId')); // Get userId from sessionStorage
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const chatBoxRef = useRef(null);
  const stompClient = useRef(null);

  console.log('💥 ChatPage component loaded for room:', roomId);

  // Auto-scroll to bottom when new message arrives
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // Fetch old messages when component mounts
  useEffect(() => {
    console.log(`🔥 ChatPage mounted, trying to fetch old messages for roomId: ${roomId}`);

    async function fetchOldMessages() {
      try {
        console.log('📡 Calling getMessages API...');
        const oldMessages = await getMessages(roomId);
        console.log('✅ Fetched old messages:', oldMessages);

        setMessages(oldMessages || []);
      } catch (error) {
        console.error('❌ Error fetching old messages:', error);
      }
    }

    fetchOldMessages();
  }, [roomId]);

  // WebSocket connection setup
  useEffect(() => {
    const socket = new SockJS("http://localhost:8083/chat");

    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ Connected to WebSocket');
        toast.success("Connected to chat");

        stompClient.current.subscribe(`/topic/room/${roomId}`, (message) => {
          console.log('📥 New WebSocket message received:', message.body);
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      },
      onStompError: (frame) => {
        console.error("❌ STOMP error:", frame);
        toast.error("WebSocket connection error");
      },
    });

    console.log('🚀 Activating WebSocket client...');
    stompClient.current.activate();

    return () => {
      console.log('❌ Deactivating WebSocket client...');
      stompClient.current.deactivate();
    };
  }, [roomId]);

  // Send message via WebSocket with token
// Send message via WebSocket with token
const sendMessage = () => {
  if (input.trim() && stompClient.current && stompClient.current.connected) {
    const token = sessionStorage.getItem('access_token');

    console.log('📤 Sending message via WebSocket:', input);

    stompClient.current.publish({
      destination: `/app/sendMessage/${roomId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: currentUserId,          // Send userId
        senderName: currentUser,        // Send userName
        content: input,                 // Send message content
      }),
    });

    setInput("");
  } else {
    toast.error("Not connected to chat or message is empty");
  }
};


  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Chat Messages */}
      <main
        ref={chatBoxRef}
        className="py-20 px-10 w-full bg-white mx-auto flex-1 overflow-auto flex flex-col gap-4"
      >
        {messages.map((message, index) => {
          const isCurrentUser = String(message.senderId) === String(currentUserId);

          return (
            <div
              key={index}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`p-4 max-w-lg w-fit rounded-lg shadow flex items-start gap-4 ${isCurrentUser ? 'bg-green-100' : 'bg-gray-100'}`}
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://avatar.iran.liara.run/public/43"
                  alt=""
                />
                <div className="flex flex-col">
                  <p className="text-sm font-bold mb-1">{message.senderName}</p>
                  <p className="text-gray-800 mb-1">{message.content}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(message.timeStamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Input Box */}
      <div className="fixed bottom-4 w-[900px] h-16">
        <div className="h-full pr-10 gap-4 flex items-center justify-between rounded-full w-2/3 mx-auto bg-white border shadow px-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            type="text"
            placeholder="Type your message here..."
            className="w-full border-none px-5 py-3 rounded-full h-full focus:outline-none text-gray-800"
          />

          <div className="flex gap-1">
            <button className="bg-purple-500 hover:bg-purple-600 h-10 w-10 flex justify-center items-center rounded-full text-white">
              <MdAttachFile size={20} />
            </button>
            <button
              onClick={sendMessage}
              className="bg-green-500 hover:bg-green-600 h-10 w-10 flex justify-center items-center rounded-full text-white"
            >
              <MdSend size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
