import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setVideos, setLoading } from '../store/slices/videosSlice';
import { videosService } from '../services/videosService';
import toast from 'react-hot-toast';

const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const videos = useSelector((state: RootState) => state.videos.videos);
  const isLoading = useSelector((state: RootState) => state.videos.isLoading);
  const [stats, setStats] = useState({
    totalVideos: 0,
    processingVideos: 0,
    completedVideos: 0,
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      dispatch(setLoading(true));
      const response = await videosService.getVideos();
      const allVideos = response.data.data.videos || [];
      dispatch(setVideos(allVideos));

      setStats({
        totalVideos: allVideos.length,
        processingVideos: allVideos.filter((v: any) => v.status === 'processing').length,
        completedVideos: allVideos.filter((v: any) => v.status === 'completed').length,
      });
    } catch (error) {
      toast.error('Failed to load videos');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Videos</h3>
          <p className="text-3xl font-bold text-white">{stats.totalVideos}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Processing</h3>
          <p className="text-3xl font-bold text-yellow-400">{stats.processingVideos}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-400">{stats.completedVideos}</p>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Videos</h2>
        {isLoading ? (
          <p className="text-gray-400">Loading videos...</p>
        ) : videos.length === 0 ? (
          <p className="text-gray-400">No videos yet. Create your first video!</p>
        ) : (
          <div className="space-y-4">
            {videos.slice(0, 5).map((video) => (
              <div
                key={video.id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-white">{video.title}</h3>
                  <p className="text-sm text-gray-400">
                    {video.inputType === 'audio' ? '🎵 Audio' : '📝 Text'} • {video.style} • {video.aspectRatio}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    video.status === 'completed' ? 'bg-green-900 text-green-200' :
                    video.status === 'processing' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-red-900 text-red-200'
                  }`}>
                    {video.status}
                  </span>
                  {video.status === 'processing' && (
                    <p className="text-xs text-gray-400 mt-1">{video.progress}%</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
