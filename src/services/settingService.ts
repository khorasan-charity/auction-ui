import http from "./httpService";

export async function getSettings(): Promise<{ [key: string]: any }> {
  const res = await http.get("/settings/settings");
  return res.data;
}

export async function setSetting(
  key: string,
  value: string
): Promise<{ [key: string]: any }> {
  const res = await http.post(`/settings/set?key=${key}&value=${value}`);
  return res.data;
}
