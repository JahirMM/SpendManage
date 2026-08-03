// ── Shapes returned by the API ──────────────────────────────────────────────

export interface ExpenseApiItem {
  id: string;
  commerce: string;      // nombre del comercio
  count: number;         // monto
  name: string;          // descripción del gasto
  account_id: string | null;
  created_at: string;    // ISO timestamp, e.g. "2025-07-30T12:00:00.000Z"
}

export interface MonthlyTotalApiResponse {
  user_email: string;
  month: number;
  year: number;
  total: number;
  expenses_count: number;
}

// ── Generic API envelope ─────────────────────────────────────────────────────

export interface ApiResponse<T> {
  status: 0 | 1;
  mensaje_error: string | null;
  data: T | null;
}

// ── Request payloads ─────────────────────────────────────────────────────────

export interface GetExpensesByDateRequest {
  user_id: string;
  month: number;  // 1-12
  year: number;
}

export interface GetMonthlyTotalRequest {
  user_id: string;
  month: number;
  year: number;
}

export interface CreateExpenseRequest {
  user_id: string;
  commerce: string;
  count: number;
  name: string;
  day: string;          // formato DD-MM-YYYY
  account_id?: string | null;
}

export interface AssignAccountRequest {
  user_id: string;
  expense_id: string;
  account_id: string;
}

export interface RemoveAccountRequest {
  user_id: string;
  expense_id: string;
}
