import api from '../../../lib/http';
import type { User, UserFormData } from '../types/users.types';

export const usersApi = {
  getAllUsers: async (): Promise<User[]> => {
    const response = await api.get('/users/getAllUsers');
    return response.data;
  },

  createUser: async (data: UserFormData): Promise<User> => {
    const response = await api.post('/users/createUser', data);
    return response.data;
  },

  updateUser: async (id: number, data: Partial<UserFormData>): Promise<User> => {
    const response = await api.put(`/users/updateUser/${id}`, data);
    return response.data;
  },

  deleteUser: async (id: number): Promise<{ message: string }> => {
    // Sesuai dokumentasi Anda, delete menggunakan method POST
    const response = await api.post(`/users/deleteUser/${id}`); 
    return response.data;
  }
};