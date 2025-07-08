import Modal from '../components/general/Modal';
import EditProfile from '../routes/EditProfile';
import { useNavigate } from 'react-router-dom';

const EditProfileModal = () => {
  const navigate = useNavigate();
  const closeModal = () => navigate('/profile'); // ✅ Go back to profile

  return (
   <Modal navigateTo="/profile" width="60%">
  <EditProfile />
</Modal>
  );
};

export default EditProfileModal;
