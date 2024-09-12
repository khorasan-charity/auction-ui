import { PaymentItem } from "@/types/payment";
import { SchemaApi } from "@/types/shared";
import http from "./httpService";

export const getPayments = (): Promise<SchemaApi<PaymentItem[]>> => {
  return http.get("/payment?Sorting=CreationTime%20DESC").then((res) => res.data);
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

export const getTotalContributionCount = (): Promise<number> => {
  return http.get("/payment/contribution-count").then((res) => res.data);
};
