import Nav from '../components/Nav';
import SideBar from '../components/SideBar';
import QuizCard from '../components/QuizCard';
import Card from '../components/Card';
import { Outlet } from 'react-router-dom';

function MainFrame() {
  return (
    <>
      <Nav />
      <div className="flex">
        <SideBar />
        <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)] ">
         <Outlet/>
        </div>
      </div>
    </>
  );
}

export default MainFrame;