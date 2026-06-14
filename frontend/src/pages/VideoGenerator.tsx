import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { videosService } from '../services/videosService';
import { projectsService } from '../services/projectsService';
import { assetsService } from '../services/assetsService';
import toast from 'react-hot-toast';

const VideoGenerator: FC = () => {
  const [projectTitle, setProjectTitle] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [inputType, setInputType] = useState<'audio' | 'text'>('audio');
  const [selectedStyle, setSelectedStyle] = useState('cinematic');
  const [selectedRatio, setSelectedRatio] = useState('16:9');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [script, setScript] = useState('');
  const [styles, setStyles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  // Load styles on mount
  const loadStyles = async () => {
    try {
      const response = await assetsService.getStyles();
      setStyles(response.data.data.styles);
    } catch (error) {
      console.error('Failed to load styles', error);
    }
  };

  const handleCreateProject = async () => {
    if (!projectTitle.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    try {
      setIsLoading(true);
      const response = await projectsService.createProject({
        title: projectTitle,
        description: 'Video generation project',
      });
      setProjectId(response.data.data.id);
      toast.success('Project created successfully!');
    } catch (error) {
      toast.error('Failed to create project');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!projectId) {
      toast.error('Please create a project first');
      return;
    }

    if (!videoTitle.trim()) {
      toast.error('Please enter a video title');
      return;
    }

    if (inputType === 'audio' && !audioFile) {
      toast.error('Please upload an audio file');
      return;
    }

    if (inputType === 'text' && !script.trim()) {
      toast.error('Please enter a script');
      return;
    }

    try {
      setIsLoading(true);
      const response = await videosService.generateVideo({
        projectId,
        title: videoTitle,
        inputType,
        style: selectedStyle,
        aspectRatio: selectedRatio as '16:9' | '9:16' | '1:1',
        audio: audioFile || undefined,
        script: script || undefined,
      });
      toast.success('Video generation started!');
      // Reset form
      setVideoTitle('');
      setAudioFile(null);
      setScript('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to generate video');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-white">Create Video</h1>

      <div className="space-y-8">
        {/* Project Creation */}
        {!projectId && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Create New Project</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Project title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
              <button
                onClick={handleCreateProject}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/80 disabled:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                {isLoading ? 'Creating...' : 'Create Project'}
              </button>
            </div>
          </div>
        )}

        {/* Video Generation */}
        {projectId && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Configure Video</h2>

            <div className="space-y-6">
              {/* Video Title */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Video Title
                </label>
                <input
                  type="text"
                  placeholder="Enter video title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                />
              </div>

              {/* Input Type Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Input Type
                </label>
                <div className="flex gap-4">
                  {(['audio', 'text'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setInputType(type)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        inputType === type
                          ? 'bg-primary text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {type === 'audio' ? '🎵 Audio' : '📝 Text'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Upload */}
              {inputType === 'audio' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Audio
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setAudioFile(e.target.files?.[0] || null)}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-gray-300 focus:outline-none focus:border-primary"
                  />
                  {audioFile && <p className="text-sm text-green-400 mt-2">✓ {audioFile.name}</p>}
                </div>
              )}

              {/* Script Input */}
              {inputType === 'text' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Enter Script
                  </label>
                  <textarea
                    placeholder="Enter your script here..."
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    rows={5}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
                  />
                </div>
              )}

              {/* Style Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Visual Style
                </label>
                <select
                  value={selectedStyle}
                  onChange={(e) => setSelectedStyle(e.target.value)}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary"
                >
                  <option value="cinematic">Cinematic</option>
                  <option value="disney_pixar">Disney/Pixar</option>
                  <option value="photorealistic">Photorealistic</option>
                  <option value="anime">Anime</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="retro">Retro/Vintage</option>
                  <option value="abstract">Abstract</option>
                </select>
              </div>

              {/* Aspect Ratio */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Aspect Ratio
                </label>
                <div className="flex gap-4">
                  {(['16:9', '9:16', '1:1'] as const).map((ratio) => (
                    <button
                      key={ratio}
                      onClick={() => setSelectedRatio(ratio)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedRatio === ratio
                          ? 'bg-primary text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {ratio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerateVideo}
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/80 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {isLoading ? '⏳ Generating...' : '🚀 Generate Video'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGenerator;
