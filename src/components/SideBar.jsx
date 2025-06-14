import { useState } from 'react';
import { Link } from 'react-router-dom';
import icon from '../../public/image/icon.png';

function SideBar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    { icon: '📄', text: 'Dashboard', path: '/layout' },
    { icon: '🎓', text: 'Assessment', path: '/assessment' },
    { icon: '🗂️', text: 'My Projects', path: '/projects' },
    { icon: '📝', text: 'Host Project', path: '/host' },
    { icon: '👥', text: 'My Profile', path: '/profile' },
  ];

  return (
    <div className="flex h-screen bg-white font-sans">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? 'w-50' : 'w-16'
        } bg-gray-50 border-r border-gray-200 p-4 flex flex-col transition-all duration-300 overflow-y-auto`}
      >
        <div className="flex items-center justify-between mb-6">
          <button onClick={toggleSidebar}>
            <img src={icon} className="w-6 h-6" alt="Menu" />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2 text-sm text-gray-700">
            {sidebarItems.map((item, i) => (
              <li
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`flex items-center gap-2 p-2 rounded cursor-pointer transition ${
                  activeIndex === i
                    ? 'bg-[#ececee] text-black font-medium'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Link to={item.path} className="flex items-center gap-2 w-full">
                  <span>{item.icon}</span>
                  {isSidebarOpen && <span>{item.text}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default SideBar;
