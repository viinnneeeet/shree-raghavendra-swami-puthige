import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminUser } from '@/types/admin';

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Dummy authentication - in real app, this would make API call
    if (email === 'admin@temple.com' && password === 'temple123') {
      const adminUser: AdminUser = {
        id: '1',
        email: 'admin@temple.com',
        role: 'admin'
      };
      setUser(adminUser);
      setIsAuthenticated(true);
      localStorage.setItem('temple_admin_token', 'dummy_token');
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('temple_admin_token');
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const token = localStorage.getItem('temple_admin_token');
    if (token) {
      setUser({
        id: '1',
        email: 'admin@temple.com',
        role: 'admin'
      });
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}