import { SchemaApi } from "@/types/shared";
import { Subject } from "@/types/subject";
import http from "./httpService";

export default {
  async getSubject(): Promise<SchemaApi<Subject[]>> {
    const res = await http.get("/subject?skipCount=0&maxResultCount=1000");
    return res.data;
  },

  async addSubject(data: object): Promise<any> {
    const res = await http.post("/subject", data);
    return res.data;
  },

  async updateSubject(data: any): Promise<any> {
    const res = await http.put(`/subject/${data.id}`, data);
    return res.data;
  },

  async deleteSubject(id: number) {
    const res = await http.delete(`/subject/${id}`);
    return res.data;
  },
};
