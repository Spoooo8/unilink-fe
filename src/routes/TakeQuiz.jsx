import { useState } from 'react';
import Nav from '../components/Nav'
import SideBar from '../components/SideBar'
import ChildSideBar from '../components/ChildSideBar'

function TakeQuiz() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>

          <ChildSideBar />

    </>
  );
}

export default TakeQuiz;