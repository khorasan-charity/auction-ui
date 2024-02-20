export type PaymentItem = {
  name: string;
  amount: number;
  lastModificationTime: string | null;
  lastModifierId: number | null;
  creationTime: string;
  creatorId: number | null;
  id: number;
};
