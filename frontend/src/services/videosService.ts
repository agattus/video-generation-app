import api from './api';

export interface GenerateVideoPayload {
  projectId: string;
  title: string;
  inputType: 'audio' | 'text';
  style: string;
  aspectRatio: '16:9' | '9:16' | '1:1';
  audio?: File;
  script?: string;
  options?: Record<string, any>;
}

export const videosService = {
  generateVideo: (payload: GenerateVideoPayload) => {
    const formData = new FormData();
    formData.append('projectId', payload.projectId);
    formData.append('title', payload.title);
    formData.append('inputType', payload.inputType);
    formData.append('style', payload.style);
    formData.append('aspectRatio', payload.aspectRatio);
    if (payload.audio) formData.append('audio', payload.audio);
    if (payload.script) formData.append('script', payload.script);
    if (payload.options) formData.append('options', JSON.stringify(payload.options));

    return api.post('/videos/generate', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getVideos: (projectId?: string) =>
    api.get('/videos', { params: { projectId } }),

  getVideo: (id: string) =>
    api.get(`/videos/${id}`),

  getVideoStatus: (id: string) =>
    api.get(`/videos/${id}/status`),

  updateVideo: (id: string, data: Record<string, any>) =>
    api.put(`/videos/${id}`, data),

  deleteVideo: (id: string) =>
    api.delete(`/videos/${id}`),
};
