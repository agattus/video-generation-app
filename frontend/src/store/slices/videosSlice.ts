import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Video {
  id: string;
  projectId: string;
  title: string;
  inputType: 'audio' | 'text';
  style: string;
  aspectRatio: string;
  status: 'processing' | 'completed' | 'failed';
  progress: number;
  outputUrl?: string;
  createdAt: string;
}

interface VideosState {
  videos: Video[];
  currentVideo: Video | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: VideosState = {
  videos: [],
  currentVideo: null,
  isLoading: false,
  error: null,
};

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setVideos: (state, action: PayloadAction<Video[]>) => {
      state.videos = action.payload;
    },
    addVideo: (state, action: PayloadAction<Video>) => {
      state.videos.unshift(action.payload);
    },
    setCurrentVideo: (state, action: PayloadAction<Video>) => {
      state.currentVideo = action.payload;
    },
    updateVideoProgress: (state, action: PayloadAction<{ id: string; progress: number }>) => {
      const video = state.videos.find((v) => v.id === action.payload.id);
      if (video) {
        video.progress = action.payload.progress;
      }
    },
  },
});

export const {
  setLoading,
  setError,
  setVideos,
  addVideo,
  setCurrentVideo,
  updateVideoProgress,
} = videosSlice.actions;
export default videosSlice.reducer;
