export interface AccountFormData {
  title: string;
  description: string | null;
  type: "card" | "normal" | "";
  closingDate: number | null;
  paymentDate: number;
}
