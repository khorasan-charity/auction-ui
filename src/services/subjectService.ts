import { SchemaApi } from "@/types/shared";
import { Subject } from "@/types/subject";
import http from "./httpService";

export async function getSubject(): Promise<SchemaApi<Subject[]>> {
  const res = await http.get("/subject");
  return res.data;
};
