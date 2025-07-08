import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import MyProjects from './routes/MyProjects';
import HostProject from './routes/HostProject';
import MainFrame from './components/MainFrame';
import MyProfile from './routes/MyProfile';
import ProtectedRoute from './components/ProtectedRoute';
import TakeAssessment from './routes/TakeAssessment';
import Layout from './routes/Layout';
import Login from './routes/Login';
import RootLayout from './components/general/RootLayout';
import App from './App';
import axios from 'axios';
import Register from './routes/Register';
import CallBack from './utils/CallBack';
import EditProfile from './routes/EditProfile';
import EditProfileModal from './components/EditProfileModal';
import Questions from './routes/Questions';
import QuizResult from './routes/QuizResult';
import ProjectDesc from './routes/ProjectDesc';
import HostedProjectDesc from './routes/HostedProjectDesc';
import Task from './routes/Task'
import Code from './routes/Code'
import Chat from './routes/Chat'
import ProjectDescParent from './components/projects/ProjectDescParent'
import TeamList from './routes/Team';
import UserProfile from './routes/UserProfile';
import ChatPage from './routes/ChatPage';

axios.defaults.withCredentials = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <App />, // App should render <Outlet />
        children: [
          { path: 'signup', element: <Register /> },
          { path: 'login', element: <Login /> },
          { path: 'callback', element: <CallBack /> }
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainFrame />,
            children: [
              { path: 'layout', element: <Layout /> },
              { path: 'host', element: <HostProject /> },
              { path: 'assessment', element: <TakeAssessment /> },
              { path: 'questions/:id', element: <Questions /> },
              { path: 'quizresult', element: <QuizResult />, },
              { path: 'projects', element: <MyProjects /> },
              {
                path: 'profile', element: <MyProfile />,

              },
              { path: 'profile/edit', element: <EditProfileModal /> },
              { path: 'project/:id', element: <HostedProjectDesc /> },
              {
                element: <ProjectDescParent />,
                children: [
                  { path: 'project/:id/desc', element: <HostedProjectDesc /> },
                  { path: 'project/:id/team', element: <TeamList /> },
                  { path: 'project/:id/code', element: <Code /> },
                  { path: 'project/:id/task', element: <Task /> },
                  { path: 'project/:id/chat', element: <Chat /> },
                    { path: 'project/:id/chat/:roomId', element: <ChatPage /> },
                   { path: 'profile/:id', element: <UserProfile /> },
                ]
              },


            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
