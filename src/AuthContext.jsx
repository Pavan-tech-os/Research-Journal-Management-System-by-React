import { createContext, useContext, useState } from 'react';
import * as store from './store';

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(store.getSession);
  const signIn = (email, password, role) => {
    const r = store.login(email, password, role);
    if (r.user) setUser(r.user);
    return r;
  };
  const signUp = (data) => {
    const r = store.register(data);
    if (r.error) return r;
    return signIn(data.email, data.password, data.role);
  };
  const signOut = () => { store.logout(); setUser(null); };
  return <Ctx.Provider value={{ user, signIn, signUp, signOut }}>{children}</Ctx.Provider>;
}
