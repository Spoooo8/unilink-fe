import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Footer from '../components/Footer';
import LayoutHero from '../components/LayoutHero';

function Layout() {
    const navigate = useNavigate();
      console.log('Layout rendered'); 

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        console.log('📦 Token:', token);
        if (!token) {
            navigate(''); // Redirect if not logged in
        }
    }, [navigate]);

    return (
        <>
            <LayoutHero />
            <div className="mt-4">
                <Card />
            </div>
        </>
    );
}

export default Layout;
