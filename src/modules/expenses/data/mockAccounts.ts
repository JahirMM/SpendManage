import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";

export const MOCK_ACCOUNTS: AccountInterface[] = [
  {
    id: "acc-1",
    user_id: "mock-user",
    title: "BBVA Débito",
    description: "Cuenta principal de débito",
    type: "normal",
    closing_date: null,
    payment_date: 1,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "acc-2",
    user_id: "mock-user",
    title: "Santander Crédito",
    description: "Tarjeta de crédito Santander",
    type: "card",
    closing_date: 20,
    payment_date: 5,
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: "acc-3",
    user_id: "mock-user",
    title: "Liverpool Crédito",
    description: "Tarjeta Liverpool",
    type: "card",
    closing_date: 15,
    payment_date: 1,
    created_at: "2024-01-01T00:00:00Z",
  },
];
