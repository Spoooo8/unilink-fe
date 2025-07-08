import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import Modal from '../components/general/Modal';

const Chat = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // projectId from the URL

  const [teamMembers, setTeamMembers] = useState([]);
  const [chatRooms, setChatRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPersonId, setSelectedPersonId] = useState('');
  const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetchTeamMembers();
    fetchChatRooms();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:8083/chat/rooms/1/people`);
      console.log('✅ Fetched team members:', response.data);
      setTeamMembers(response.data);
    } catch (error) {
      console.error('❌ Error fetching team members:', error);
    }
  };

  const fetchChatRooms = async () => {
    try {
      const response = await axiosInstance.get(`http://localhost:8083/chat/rooms/project/1`);
      console.log('✅ Fetched chat rooms:', response.data);
      setChatRooms(response.data);
    } catch (error) {
      console.error('❌ Error fetching chat rooms:', error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInvite = async () => {
    try {
      const invitedUser = teamMembers.find((member) => member.userId.toString() === selectedPersonId);
      if (!invitedUser) return;

      const payload = {
        type:"individual",
        projectId: 1,
        userIds: [invitedUser.userId, sessionStorage.getItem("userId")],
      };

      await axiosInstance.post('http://localhost:8083/chat/rooms', payload);
      console.log('🚀 Room created for:');

      await fetchChatRooms();

      setSelectedPersonId('');
      closeModal();
    } catch (error) {
      console.error('❌ Error creating room:', error);
    }
  };

  const handleCreateGroup = async () => {
    try {
      const userIds = selectedGroupMembers.map((id) => parseInt(id, 10));

      const payload = {
        type:"group",
        roomName: groupName,
        projectId: 1,
        userIds: userIds,
      };

      await axiosInstance.post('http://localhost:8083/chat/rooms', payload);
      console.log('🚀 Group room created:', groupName);

      await fetchChatRooms();

      setGroupName('');
      setSelectedGroupMembers([]);
      closeModal();
    } catch (error) {
      console.error('❌ Error creating group room:', error);
    }
  };

  const handleGroupMemberSelect = (e) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedGroupMembers((prev) => {
      const newSelections = selected.filter((id) => !prev.includes(id));
      return [...prev, ...newSelections];
    });
  };

  const handleRemoveMember = (memberId) => {
    setSelectedGroupMembers((prev) => prev.filter((id) => id !== memberId));
  };

  // ✅ Handle navigation to Chat Page
  const goToChatPage = (roomId) => {
    navigate(`/project/1/chat/${roomId}`); // Replace '1' with {id} if you use dynamic projectId from URL
  };

  return (
    <div className="w-full bg-white shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Chat</h2>
        <button
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm"
        >
          Invite / Create Group
        </button>
      </div>

      {/* Chat Rooms */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Chat Rooms</h3>
        <ul className="divide-y divide-gray-200">
          {chatRooms.map((room) => (
            <li
              key={room.id}
              className="flex items-center justify-between p-2 hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <p className="font-medium">{room.roomName}</p>
              </div>

              <button
                onClick={() => goToChatPage(room.id)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm"
              >
                Chat
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <Modal navigateTo="#" width="60%">
          <div className="flex flex-col gap-4 p-4 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-2">Invite or Create Group</h3>

            {/* Invite Person */}
            <div className="flex flex-col gap-2">
              <label className="font-medium">Invite Person</label>
              <select
                value={selectedPersonId}
                onChange={(e) => setSelectedPersonId(e.target.value)}
                className="border px-3 py-2 rounded"
              >
                <option value="">Select a team member</option>
                {teamMembers.map((member) => (
                  <option key={member.userId} value={member.userId}>
                    {member.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleInvite}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-full text-sm w-fit"
              >
                Invite
              </button>
            </div>

            {/* Create Group */}
            <div className="flex flex-col gap-2 mt-4">
              <label className="font-medium">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="border px-3 py-2 rounded"
              />

              {selectedGroupMembers.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedGroupMembers.map((memberId) => {
                    const member = teamMembers.find((m) => m.userId.toString() === memberId);
                    return (
                      <span
                        key={memberId}
                        className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {member?.name}
                        <button
                          onClick={() => handleRemoveMember(memberId)}
                          className="ml-1 text-red-500 hover:text-red-700"
                        >
                          ❌
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              <label className="font-medium mt-4">Select Group Members</label>
              <select
                multiple
                onChange={handleGroupMemberSelect}
                className="border px-3 py-2 rounded h-32"
              >
                {teamMembers.map((member) => (
                  <option
                    key={member.userId}
                    value={member.userId}
                    disabled={selectedGroupMembers.includes(member.userId.toString())}
                  >
                    {member.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleCreateGroup}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 rounded-full text-sm w-fit mt-2"
              >
                Create Group
              </button>
            </div>

            <button
              onClick={closeModal}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-1 rounded-full text-sm mt-4 w-fit"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Chat;
