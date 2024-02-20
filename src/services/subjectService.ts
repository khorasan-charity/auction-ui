import { SchemaApi } from "@/types/shared";
import { Subject } from "@/types/subject";
import http from "./httpService";

export const getSubject = (): Promise<SchemaApi<Subject[]>> => {
  return http.get("/subject").then((res) => res.data);
};
