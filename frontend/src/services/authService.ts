import api from './api';

export interface RegisterPayload {
  email: string;
  password: string;
  username: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  register: (payload: RegisterPayload) =>
    api.post('/auth/register', payload),

  login: (payload: LoginPayload) =>
    api.post('/auth/login', payload),

  logout: () =>
    api.post('/auth/logout'),
};
