import { MonthlyExpenses } from "@/src/modules/expenses/interfaces/expensesInterfaces";

export const MOCK_EXPENSES: MonthlyExpenses[] = [
  {
    month: 7,
    year: 2026,
    days: [
      {
        day: 1,
        items: [
          { id: "e-1", title: "Súper mercado", card: "BBVA Débito", accountId: "acc-1", amount: 850.5 },
          { id: "e-2", title: "Gasolina", card: "Santander Crédito", accountId: "acc-2", amount: 650.0 },
        ],
      },
      {
        day: 2,
        items: [
          { id: "e-3", title: "Restaurante", card: "BBVA Débito", accountId: "acc-1", amount: 320.0 },
          // Gasto automático desde celular — sin cuenta asignada
          { id: "e-3b", title: "OXXO Spin", card: null, accountId: null, amount: 150.0 },
        ],
      },
      { day: 3, items: [] },
      {
        day: 4,
        items: [
          { id: "e-4", title: "Netflix", card: "Santander Crédito", accountId: "acc-2", amount: 219.0 },
          { id: "e-5", title: "Spotify", card: "Santander Crédito", accountId: "acc-2", amount: 99.0 },
          { id: "e-6", title: "Farmacia", card: "BBVA Débito", accountId: "acc-1", amount: 145.0 },
        ],
      },
      {
        day: 5,
        items: [
          { id: "e-7", title: "Uber", card: "BBVA Débito", accountId: "acc-1", amount: 87.0 },
          // Otro gasto automático sin cuenta
          { id: "e-7b", title: "Pago NFC tienda", card: null, accountId: null, amount: 230.0 },
        ],
      },
      { day: 6, items: [] },
      {
        day: 7,
        items: [
          { id: "e-8", title: "Ropa", card: "Liverpool Crédito", accountId: "acc-3", amount: 1200.0 },
        ],
      },
      {
        day: 8,
        items: [
          { id: "e-9", title: "Súper mercado", card: "BBVA Débito", accountId: "acc-1", amount: 720.0 },
          { id: "e-10", title: "Luz", card: "BBVA Débito", accountId: "acc-1", amount: 480.0 },
        ],
      },
      { day: 9, items: [] },
      {
        day: 10,
        items: [
          { id: "e-11", title: "Dentista", card: "Santander Crédito", accountId: "acc-2", amount: 950.0 },
        ],
      },
      {
        day: 11,
        items: [
          { id: "e-12", title: "Café", card: "BBVA Débito", accountId: "acc-1", amount: 65.0 },
          { id: "e-13", title: "Libros", card: "BBVA Débito", accountId: "acc-1", amount: 380.0 },
        ],
      },
      { day: 12, items: [] },
      {
        day: 13,
        items: [
          { id: "e-14", title: "Cine", card: "Liverpool Crédito", accountId: "acc-3", amount: 240.0 },
          { id: "e-15", title: "Palomitas", card: "BBVA Débito", accountId: "acc-1", amount: 95.0 },
        ],
      },
      {
        day: 14,
        items: [
          { id: "e-16", title: "Gasolina", card: "Santander Crédito", accountId: "acc-2", amount: 700.0 },
        ],
      },
      { day: 15, items: [] },
      {
        day: 16,
        items: [
          { id: "e-17", title: "Súper mercado", card: "BBVA Débito", accountId: "acc-1", amount: 910.0 },
          { id: "e-18", title: "Agua", card: "BBVA Débito", accountId: "acc-1", amount: 80.0 },
          { id: "e-19", title: "Internet", card: "Santander Crédito", accountId: "acc-2", amount: 599.0 },
        ],
      },
      {
        day: 17,
        items: [
          { id: "e-20", title: "Restaurante", card: "Liverpool Crédito", accountId: "acc-3", amount: 540.0 },
        ],
      },
      { day: 18, items: [] },
      {
        day: 19,
        items: [
          { id: "e-21", title: "Gym", card: "Santander Crédito", accountId: "acc-2", amount: 450.0 },
        ],
      },
      {
        day: 20,
        items: [
          { id: "e-22", title: "Farmacia", card: "BBVA Débito", accountId: "acc-1", amount: 210.0 },
          { id: "e-23", title: "Uber Eats", card: "BBVA Débito", accountId: "acc-1", amount: 185.0 },
        ],
      },
      { day: 21, items: [] },
      {
        day: 22,
        items: [
          { id: "e-24", title: "Ropa", card: "Liverpool Crédito", accountId: "acc-3", amount: 880.0 },
          { id: "e-25", title: "Café", card: "BBVA Débito", accountId: "acc-1", amount: 72.0 },
        ],
      },
      {
        day: 23,
        items: [
          { id: "e-26", title: "Gasolina", card: "Santander Crédito", accountId: "acc-2", amount: 620.0 },
        ],
      },
      { day: 24, items: [] },
      {
        day: 25,
        items: [
          { id: "e-27", title: "Súper mercado", card: "BBVA Débito", accountId: "acc-1", amount: 1050.0 },
          { id: "e-28", title: "Limpieza", card: "BBVA Débito", accountId: "acc-1", amount: 290.0 },
        ],
      },
      {
        day: 26,
        items: [
          { id: "e-29", title: "Teléfono", card: "Santander Crédito", accountId: "acc-2", amount: 350.0 },
        ],
      },
      { day: 27, items: [] },
      {
        day: 28,
        items: [
          { id: "e-30", title: "Restaurante", card: "Liverpool Crédito", accountId: "acc-3", amount: 460.0 },
          { id: "e-31", title: "Uber", card: "BBVA Débito", accountId: "acc-1", amount: 95.0 },
        ],
      },
      {
        day: 29,
        items: [
          { id: "e-32", title: "Cine", card: "Liverpool Crédito", accountId: "acc-3", amount: 240.0 },
        ],
      },
      { day: 30, items: [] },
      {
        day: 31,
        items: [
          { id: "e-33", title: "Súper mercado", card: "BBVA Débito", accountId: "acc-1", amount: 790.0 },
          { id: "e-34", title: "Gasolina", card: "Santander Crédito", accountId: "acc-2", amount: 680.0 },
          { id: "e-35", title: "Netflix", card: "Santander Crédito", accountId: "acc-2", amount: 219.0 },
        ],
      },
    ],
  },
  {
    month: 8,
    year: 2026,
    days: [
      {
        day: 1,
        items: [
          { id: "e-36", title: "Súper mercado", card: "BBVA Débito", accountId: "acc-1", amount: 920.0 },
        ],
      },
      {
        day: 2,
        items: [
          { id: "e-37", title: "Gasolina", card: "Santander Crédito", accountId: "acc-2", amount: 710.0 },
          { id: "e-38", title: "Café", card: "BBVA Débito", accountId: "acc-1", amount: 68.0 },
        ],
      },
      { day: 3, items: [] },
      {
        day: 4,
        items: [
          { id: "e-39", title: "Restaurante", card: "Liverpool Crédito", accountId: "acc-3", amount: 490.0 },
        ],
      },
      {
        day: 5,
        items: [
          { id: "e-40", title: "Farmacia", card: "BBVA Débito", accountId: "acc-1", amount: 165.0 },
          { id: "e-41", title: "Uber", card: "BBVA Débito", accountId: "acc-1", amount: 92.0 },
        ],
      },
      { day: 6, items: [] },
      {
        day: 7,
        items: [
          { id: "e-42", title: "Gym", card: "Santander Crédito", accountId: "acc-2", amount: 450.0 },
          { id: "e-43", title: "Ropa", card: "Liverpool Crédito", accountId: "acc-3", amount: 1350.0 },
        ],
      },
    ],
  },
];

export const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
