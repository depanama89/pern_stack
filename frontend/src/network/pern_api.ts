
import type { User } from "../model/user";

type PayementMethod = "cach" | "carte";
export interface pernInput {
  email: string;
  firstname: string;
  lastname: string;
  contact: string;
  accounts: PayementMethod[];
  password: string;
  provider: string;
  country: string;
  currency: string;
}

export interface DashboardData  {
  status: string;
  availableBalance: number;
  totalIncome: number;
  totalExpense: number;
  chartData: any[]; // Tu peux affiner ce type selon la structure exacte
  lastTransactions: any[]; // À remplacer si tu as un modèle `TransactionModel`
  lastAccount: any[]; // À remplacer si tu as un modèle `AccountModel`
}
export interface SignUpCredentials {
  email: string;
  firstname: string;
  lastname: string;
  contact: string;
  accounts: PayementMethod[];
  password: string;
  provider: string;
  country: string;
  currency: string;
}

export interface LoginCredentiels {
  firstname: string;
  email: string;
  password: string;
}
async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;

    throw Error(errorMessage);
  }
}

// il retourne un tableau d'utilsateur

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData("/api-v1/auth/sign-up", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

export async function signIn(credentials: LoginCredentiels): Promise<LoginResponse> {
  const response = await fetchData("/api-v1/auth/log-in", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
}

// dans ce il retourne un objet
export async function fetchStat():Promise<DashboardData>{
  const token = localStorage.getItem('token');

  const response= await fetchData("/api-v1/transactions/dashboard",{
    method:"GET",
    headers:{
      "Authorization":`Bearer ${token}`,
      'Contentent-Type':'application/json'
    },
    credentials:'include'
  })
  return response.json()
}