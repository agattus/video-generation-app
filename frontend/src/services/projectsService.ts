import api from './api';

export interface CreateProjectPayload {
  title: string;
  description?: string;
  settings?: Record<string, any>;
}

export const projectsService = {
  createProject: (payload: CreateProjectPayload) =>
    api.post('/projects', payload),

  getProjects: () =>
    api.get('/projects'),

  getProject: (id: string) =>
    api.get(`/projects/${id}`),

  updateProject: (id: string, data: Record<string, any>) =>
    api.put(`/projects/${id}`, data),

  deleteProject: (id: string) =>
    api.delete(`/projects/${id}`),
};
