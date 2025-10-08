import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminUser } from '@/types/admin';

interface AdminContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  logout: () => void;
  handleAuthentication: (detail: AdminUser, token: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('temple_admin_token');
  };
  const handleAuthentication = (details: AdminUser, token: string) => {
    setUser(details);
    localStorage.setItem('temple_admin_token', token);
    setIsAuthenticated(true);
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const token = localStorage.getItem('temple_admin_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{ isAuthenticated, user, logout, handleAuthentication }}>
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
