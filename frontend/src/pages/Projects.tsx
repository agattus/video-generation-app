import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setProjects, setLoading, addProject } from '../store/slices/projectsSlice';
import { projectsService } from '../services/projectsService';
import toast from 'react-hot-toast';

const Projects: FC = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects.projects);
  const isLoading = useSelector((state: RootState) => state.projects.isLoading);
  const [showNewProject, setShowNewProject] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');
  const [projectDesc, setProjectDesc] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      dispatch(setLoading(true));
      const response = await projectsService.getProjects();
      dispatch(setProjects(response.data.data.projects || []));
    } catch (error) {
      toast.error('Failed to load projects');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectTitle.trim()) {
      toast.error('Please enter a project title');
      return;
    }

    try {
      const response = await projectsService.createProject({
        title: projectTitle,
        description: projectDesc,
      });
      dispatch(addProject(response.data.data));
      toast.success('Project created successfully!');
      setShowNewProject(false);
      setProjectTitle('');
      setProjectDesc('');
    } catch (error) {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Projects</h1>
        <button
          onClick={() => setShowNewProject(!showNewProject)}
          className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          {showNewProject ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {/* New Project Form */}
      {showNewProject && (
        <div className="bg-gray-800 rounded-lg p-6 mb-8 border border-gray-700">
          <form onSubmit={handleCreateProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project Title
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="My Awesome Project"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={projectDesc}
                onChange={(e) => setProjectDesc(e.target.value)}
                placeholder="Describe your project..."
                rows={3}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Create Project
            </button>
          </form>
        </div>
      )}

      {/* Projects Grid */}
      {isLoading ? (
        <p className="text-gray-400">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No projects yet. Create your first one!</p>
          <button
            onClick={() => setShowNewProject(true)}
            className="bg-primary hover:bg-primary/80 text-white px-6 py-2 rounded-lg font-medium"
          >
            Create Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-primary transition-colors cursor-pointer"
            >
              <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-4">{
                project.description || 'No description'
              }</p>
              <div className="text-xs text-gray-500">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;
