export type History = {
  id: number;
  ip: string;
  time: string;
  actions: string;
  userInfo: string;
};

export type AddHistory = Omit<History, 'id' | 'time'>;
