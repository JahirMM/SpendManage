export interface AccountInterface {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  type: string;
  closing_date: number | null;
  payment_date: number;
  created_at: string;
}
