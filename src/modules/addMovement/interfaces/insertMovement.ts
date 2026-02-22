export interface InsertMovementInterface {
  account_id: string;
  title: string;
  description: string;
  principal_amount: number;
  total_amount: number;
  transaction_date: string;
  installment_count: number;
  is_active: boolean;
}
