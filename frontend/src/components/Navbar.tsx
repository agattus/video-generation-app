import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiLogOut, FiUser } from 'react-icons/fi';
import { logout } from '../store/slices/authSlice';
import { RootState } from '../store';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar: FC<NavbarProps> = ({ onMenuClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-700 rounded-lg text-gray-300"
        >
          <FiMenu size={24} />
        </button>

        <h2 className="text-xl font-semibold text-white flex-1 ml-4 md:ml-0">
          AI Video Generator
        </h2>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-gray-300">
            <FiUser size={20} />
            <span className="text-sm hidden sm:inline">{user?.username}</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-300 transition-colors"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
