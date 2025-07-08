import React from "react";
import { useNavigate } from "react-router-dom";

const avatars = ["👨🏾", "👩🏽", "👳🏽", "👨🏻", "👩🏻", "👨🏽"];

const AcceptedMembers = ({ members }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 shadow rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold px-6 py-4 border-b border-gray-200 bg-gray-50">Accepted Members</h2>
      <div className="grid grid-cols-12 px-6 py-3 border-b border-gray-200 font-semibold text-gray-700">
        <div className="col-span-3">Name</div>
        <div className="col-span-3">Skill Score</div>
        <div className="col-span-3">Action</div>
        <div className="col-span-3">Profile</div>
      </div>

      {members.map((member, index) => (
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
              disabled
              className="px-4 py-2 rounded text-white text-sm font-semibold bg-green-600"
            >
              Accepted
            </button>
          </div>
          <div className="col-span-3">
            <button
              onClick={() => navigate(`/profile/${member.id}`)}
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

export default AcceptedMembers;
