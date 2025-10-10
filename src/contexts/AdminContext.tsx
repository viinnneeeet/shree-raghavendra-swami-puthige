import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminUser } from '@/types/admin';
import { secureStorage } from '@/utils/secureStorage';
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
    secureStorage.remove('temple_admin_token');
    secureStorage.remove('temple_admin_session');
  };
  const handleAuthentication = (details: AdminUser, token: string) => {
    setUser(details);
    secureStorage.set('temple_admin_token', token);
    secureStorage.set('temple_admin_session', { user: details, token });
    setIsAuthenticated(true);
  };

  // Check for existing session on mount
  React.useEffect(() => {
    const session = secureStorage.get('temple_admin_session');
    if (session?.token) {
      setIsAuthenticated(true);
      setUser(session.user);
      if (window.location.pathname === '/admin/login') {
        window.location.href = '/admin/dashboard';
      }
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
