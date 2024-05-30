import { SchemaApi } from "@/types/shared";
import { Subject } from "@/types/subject";
import http from "./httpService";

export default {
  async getSettings(): Promise<{[key:string]:any}> {
    const res = await http.get("/settings/settings");
    return res.data;
  },
};
