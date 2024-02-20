export type Subject = {
  id: number;
  creationTime: string;
  creatorId: string | null;
  lastModificationTime: string;
  lastModifierId: string | null;
  title: string;
  targetAmount: number;
  color: string;
  order: number;

  progress?: number;
  collectedAmount?: number;
};
