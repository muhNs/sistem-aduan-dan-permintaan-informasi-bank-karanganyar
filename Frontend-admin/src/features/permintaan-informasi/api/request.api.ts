import { api } from "../../../lib/http"; // Sesuaikan path dengan lokasi http.ts Anda
import type {
  GetAllInfoResponse,
  GetDetailInfoResponse,
  InfoRequestStatus,
} from "../types/information.types.js";

export const informationApi = {
  // 1. Get All Information Requests
  getAllRequests: async (params: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const response = await api.get<GetAllInfoResponse>(
      "/information-requests/getAllInformationRequests",
      {
        params,
      },
    );
    return response.data;
  },

  // 2. Get Detail
  getRequestDetail: async (id: number | string) => {
    const response = await api.get<GetDetailInfoResponse>(
      `/information-requests/getInformationRequestDetail/${id}`,
    );
    // Langsung return objek 'data' agar lebih mudah dipakai di frontend
    return response.data.data;
  },

  // 3. Update Status
  updateStatus: async (id: number | string, status: InfoRequestStatus) => {
    const response = await api.put(
      `/information-requests/updateInformationRequestStatus/${id}`,
      {
        status,
      },
    );
    return response.data;
  },

  // 4. Send Response
  // Saya menggunakan union type (FormData | object) berjaga-jaga jika
  // nantinya Anda ingin menambahkan fitur upload lampiran seperti pada modul Aduan.
  sendResponse: async (
    id: number | string,
    payload: { responseMessage: string } | FormData,
  ) => {
    const response = await api.post(
      `/information-requests/responseInformationRequest/${id}`,
      payload,
    );
    return response.data;
  },
};
