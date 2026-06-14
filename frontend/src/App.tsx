import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import VideoGenerator from './pages/VideoGenerator';
import Projects from './pages/Projects';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { RootState } from './store';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto bg-gray-900 p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/generator" element={<VideoGenerator />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
