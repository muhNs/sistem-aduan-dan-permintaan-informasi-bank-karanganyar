import { api } from "../../../lib/http.js";
import type { GetAduanResponse } from "../types/aduan.types.js";
import type { GetAduanParams } from "../types/aduan.types.js";
import type { AduanStatusAPI } from "../types/aduan.types.js";
import type { AduanDetailData } from "../types/aduan.types.js";

export const aduanApi = {
  getAllComplaints: async (
    params: GetAduanParams,
  ): Promise<GetAduanResponse> => {
    // Axios akan otomatis merakit object params menjadi query string
    // Contoh: /aduan/getAllComplaints?page=1&limit=10&status=resolved
    const response = await api.get<GetAduanResponse>(
      "/aduan/getAllComplaints",
      {
        params: {
          page: params.page,
          limit: params.limit,
          ...(params.status &&
            params.status !== "Semua" && { status: params.status }),
          ...(params.search && { search: params.search }),
        },
      },
    );

    return response.data;
  },

  getComplaintDetail: async (id: number | string): Promise<AduanDetailData> => {
    const response = await api.get(`/aduan/getComplaintDetail/${id}`);
    // Mengembalikan langsung objek di dalam "data"
    return response.data.data; 
  },

  updateStatus: async (
    id: number,
    status: AduanStatusAPI,
  ): Promise<{ status: string; message: string }> => {
    const response = await api.put<{ status: string; message: string }>(
      `/aduan/updateComplaintStatus/${id}`,
      {
        status,
      },
    );
    return response.data;
  },

  resolveComplaint: async (id: number | string, formData: FormData) => {
    // Axios akan otomatis mengenali FormData dan mengatur Content-Type menjadi multipart/form-data beserta boundary-nya
    const response = await api.post(`/aduan/resolveComplaint/${id}`, formData);
    return response.data;
  },

  getResolutionById: async (complaintId: number) => {
    const response = await api.get(`/aduan/resolveComplaintById/${complaintId}`);
    return response.data.data; // Mengembalikan null atau object resolution
  }
};
