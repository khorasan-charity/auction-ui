import { PaymentItem } from "@/types/payment";
import { SchemaApi } from "@/types/shared";
import http from "./httpService";

export const getPayments = (): Promise<SchemaApi<PaymentItem[]>> => {
  return http.get("/payment").then((res) => res.data);
};

export const addPayments = (data: object): Promise<any> => {
  return http.post("/payment", data).then((res) => res.data);
};

export const deletePayment = (data: number) => {
  return http.delete(`/payment/${data}`).then((res) => res.data);
};

export const getTotalPayment = (): Promise<number> => {
  return http.get("/payment/total").then((res) => res.data);
};
