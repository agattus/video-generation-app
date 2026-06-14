import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import videosReducer from './slices/videosSlice';
import projectsReducer from './slices/projectsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videosReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
