import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const avatars = ["👨🏾", "👩🏽", "👳🏽", "👨🏻", "👩🏻", "👨🏽"];

const PendingMembers = ({ members, setPendingMembers, projectId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState({});

  const handleAccept = async (id, collaborateId) => {
    setLoading((prev) => ({ ...prev, [id]: true }));

    try {
      // ✅ Correct API endpoint (baseURL already contains /unilink)
      await axiosInstance.post(`/projects/${projectId}/accept/${collaborateId}`);

      // Mark member as accepted
      setPendingMembers((prev) =>
        prev.map((m) => (m.id === id ? { ...m, invited: true } : m))
      );
    } catch (error) {
      console.error("Error accepting member:", error);
    } finally {
      setLoading((prev) => ({ ...prev, [id]: false }));
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 shadow rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold px-6 py-4 border-b border-gray-200 bg-gray-50">Pending Members</h2>
      <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-200 font-semibold text-gray-700">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Skill Score</div>
        <div className="col-span-3">Action</div>
        <div className="col-span-3">Profile</div>
      </div>

      {members
        .filter((member) => !member.invited)
        .map((member, index) => (
          <div
            key={member.id}
            className="grid grid-cols-12 items-center px-6 py-4 border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
          >
            <div className="col-span-3 flex items-center gap-2">
              <span className="text-2xl">{avatars[index % avatars.length]}</span>
              <span className="font-medium">{member.name}</span>
            </div>
            <div className="col-span-3">{member.skillScore}</div>
            <div className="col-span-3">
              <button
                onClick={() => handleAccept(member.id, member.collaborateId)}
                className={`px-4 py-2 rounded text-white text-sm font-semibold bg-blue-600 hover:bg-blue-700 ${loading[member.id] ? "opacity-70 cursor-wait" : ""}`}
              >
                {loading[member.id] ? "Processing..." : "Accept"}
              </button>
            </div>
            <div className="col-span-3">
              <button
                onClick={() => navigate(`/profile/${member.collaborateId}`)}
                className="px-4 py-2 rounded text-white text-sm font-semibold bg-gray-700 hover:bg-gray-800"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PendingMembers;
