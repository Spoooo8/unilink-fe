import React, { useState, useEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import AcceptedMembers from "../components/AcceptedMembers";
import PendingMembers from "../components/PendingMembers";


const TeamList = () => {
  const { id: projectId } = useParams();
  const { isHost } = useOutletContext(); // Get isHost from parent Outlet
  const [acceptedMembers, setAcceptedMembers] = useState([]);
  const [pendingMembers, setPendingMembers] = useState([]);

  useEffect(() => {
    const fetchAcceptedMembers = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${projectId}/members`);
        setAcceptedMembers(response.data);
      } catch (error) {
        console.error("Error fetching accepted members:", error);
      }
    };

    const fetchPendingMembers = async () => {
      try {
        const response = await axiosInstance.get(`/projects/${projectId}/collaborators`);
        setPendingMembers(response.data);
      } catch (error) {
        console.error("Error fetching pending members:", error);
      }
    };

    fetchAcceptedMembers();

    if (isHost) {
      fetchPendingMembers();
    }
  }, [projectId, isHost]);

  return (
    <div className="bg-white min-h-screen p-6 mt-[60px]">
      <AcceptedMembers members={acceptedMembers} />

      {isHost && (
        <PendingMembers
          members={pendingMembers}
          setPendingMembers={setPendingMembers}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default TeamList;
