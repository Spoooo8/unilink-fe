import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import TakeQuiz from './routes/TakeQuiz'
import DashBoard from './routes/Dashboard';
import MyProjects from './routes/MyProjects';
import HostProject from './routes/HostProject';
import MainFrame from './components/MainFrame';
import MyProfile from './routes/MyProfile';


const router = createBrowserRouter([
  {
    path: "/login",
    element: <LandingPage />,

  },
  {
    path: "/",
    element: <MainFrame />,
    children: [
      {
        path: '',
        element: <DashBoard />
      },
      {
        path: 'host',
        element: <HostProject />
      },
      {
        path: "/assessment",
        element: <TakeQuiz />,
      },
      {
        path: "/projects",
        element: <MyProjects />,
      },
       {
        path: "/profile",
        element: <MyProfile />,
      }
    ]
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)