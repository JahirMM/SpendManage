export interface MovementInterface {
  id: string;
  account_id: string;
  title: string;
  description: string | null;
  principal_amount: number;
  total_amount: number;
  transaction_date: string;
  installment_count: number;
  is_active: boolean;
}
