import { FC, ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFilm, FiFolders, FiMenu } from 'react-icons/fi';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const navItems = [
    { icon: FiHome, label: 'Dashboard', path: '/' },
    { icon: FiFilm, label: 'Video Generator', path: '/generator' },
    { icon: FiFolders, label: 'Projects', path: '/projects' },
  ];

  return (
    <aside
      className={`${
        isOpen ? 'w-64' : 'w-20'
      } bg-gray-800 border-r border-gray-700 transition-all duration-300 hidden md:flex flex-col`}
    >
      <div className="p-6 border-b border-gray-700">
        <h1 className={`font-bold text-xl text-primary ${!isOpen && 'text-center'}`}>
          {isOpen ? '🎬 VideoAI' : '🎬'}
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon size={20} />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-700 text-xs text-gray-400">
        {isOpen && (
          <>
            <p className="font-semibold mb-2">💡 Tip</p>
            <p>Start by creating a new project and upload your audio or text.</p>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
