import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import LandingPage from './routes/LandingPage';

function App() {
  const navigate = useNavigate();
  const token = sessionStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      // ✅ Redirect to the main dashboard if logged in
      navigate('/layout');
    }
  }, [token, navigate]);

  return (
    <>
      {!token && <LandingPage />} {/* ✅ Show LandingPage if not logged in */}
      <Outlet /> {/* ✅ This will render child routes like login, signup */}
    </>
  );
}

export default App;
