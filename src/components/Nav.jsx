import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Modal from '../components/general/Modal';
import Login from '../routes/Login';
import Register from '../routes/Register';
import logo from '../../public/image/logo.png'
import Button from './Button';
function Nav() {
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenPresent, setTokenPresent] = useState(false);

  const closeModal = () => navigate('/');
  const showLogin = location.pathname === '/login';
  const showRegister = location.pathname === '/signup';

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  };

  const handleViewProfile = () => {
  navigate('/profile');
  setShowDropdown(false); // Optional: close the dropdown after navigation
};


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch user info when token is present
  useEffect(() => {
    const token = sessionStorage.getItem('access_token');
      const userId = sessionStorage.getItem('userId');
    console.log('📦 Token:', token);
    console.log('📦 userId:', userId);
  

    if (token) {
      setTokenPresent(true);
      axiosInstance.get('/users/info') 
        .then((response) => {
          console.log('✅ User Info Response:', response.data);
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('❌ Failed to fetch user info:', error);
          setLoading(false);
        });
    } else {
      setTokenPresent(false);
      setLoading(false);
    }
  }, []);

  const userInitial = user?.name?.[0]?.toUpperCase() || 'U';
    const name = user?.name || 'User';
  const userName = user?.userName || 'User';
  const userEmail = user?.email || 'unknown@example.com';

   sessionStorage.setItem('userName', userName);
     console.log('📦 userName:', sessionStorage.getItem("userName"));

  return (
    <>
      <nav className="flex justify-between items-center px-6 py-2 text-gray-700 bg-gray-50 shadow">
        <div className="text-xl font-bold">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
        </div>

        {tokenPresent ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="h-10 w-10 rounded-full bg-gray-800 text-white flex items-center justify-center text-base font-bold cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {loading ? '...' : userInitial}
            </div>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg text-black z-50">
                <div className="px-4 py-3 border-b border-gray-200">
                  <p className="text-sm font-semibold">{userName}</p>
                  <p className="text-sm text-gray-600">{userEmail}</p>
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleViewProfile}>
                  View Profile
                </div>
                <div className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                  Log out
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button
              px="px-4"
              py="py-1"
              className="border border-gray-500 text-gray-800 hover:bg-gray-100"
              onClick={() => navigate('/login')}
            >
              LogIn
            </Button>
            <Button
              px="px-5"
              py="py-2"
              className="bg-[#6c2b3d] text-white hover:bg-[#581d2f]"
              onClick={() => navigate('/signup')}
            >
              SignUp
            </Button>
          </div>
        )}
      </nav>

      {/* 🔥 Modal logic for login/register */}
      {showLogin && (
      <Modal navigateTo="/" width="30%">
          <Login onClose={closeModal} />
        </Modal>
      )}
      {showRegister && (
       <Modal navigateTo="/" width="30%">
          <Register onClose={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default Nav;