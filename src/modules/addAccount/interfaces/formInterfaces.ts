export interface FormErrors {
  title?: string;
  description?: string;
  type?: string;
  closingDate?: string;
  paymentDate?: string;
  general?: string;
}

export interface AccountFormData {
  title: string;
  description: string;
  type: "card" | "normal" | "";
  closingDate: number | "";
  paymentDate: number | "";
}

export const initialFormData: AccountFormData = {
  title: "",
  description: "",
  type: "",
  closingDate: "",
  paymentDate: "",
};
