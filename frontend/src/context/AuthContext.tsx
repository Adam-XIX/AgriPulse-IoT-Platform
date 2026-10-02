import { createContext, useContext, useState, type ReactNode } from 'react';

interface User { email: string; name: string; }
interface AuthCtx { user: User | null; login: (email: string, name?: string) => void; logout: () => void; }

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Swap for a REST call (POST /auth/login) when the backend exists.
  const login = (email: string, name?: string) => setUser({ email, name: name || email.split('@')[0] });
  return <Ctx.Provider value={{ user, login, logout: () => setUser(null) }}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useAuth must be used within AuthProvider');
  return c;
};