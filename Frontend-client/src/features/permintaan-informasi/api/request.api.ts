import { api } from '../../../lib/http';

export const publicServiceApi = {
  // Contoh: Mengirim form dari landing page
  submitInformationRequest: async (formData: any) => {
    // Request ini akan meluncur TANPA cookie dan TANPA pengecekan token
    const response = await api.post('/information-requests/createInformationRequest', formData);
    return response.data;
  },
};