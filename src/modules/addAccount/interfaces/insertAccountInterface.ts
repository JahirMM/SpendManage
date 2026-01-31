export interface InsertAccountInterface {
  title: string;
  description: string | null;
  type: "card" | "normal" | "";
  closing_date: number | null;
  payment_date: number;
  user_id: string;
}
