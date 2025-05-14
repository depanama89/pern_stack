export interface StoreState {
  theme: string;
  user: User | null;
  setTheme: (value: string) => void;
  setCredentails: (user: User) => void;
  signOut: () => void;
}

interface User {
  id: number;
  firstname: string;
  email: string;
}
