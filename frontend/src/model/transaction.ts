export interface Transaction {
  id: number;
  user_id: number;
  description: string;
  status: string;
  source: string;
  amount: number;
  type: string;
}
