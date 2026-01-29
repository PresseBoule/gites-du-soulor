import { createContext, useContext, useState, ReactNode } from 'react';
import { SiteContent, defaultContent } from '../types/content';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminContextType {
  isAdminMode: boolean;
  isAuthenticated: boolean;
  content: SiteContent | null;
  setIsAdminMode: (value: boolean) => void;
  setIsAuthenticated: (value: boolean) => void;
  setContent: (content: SiteContent) => void;
  updateContent: (path: string, value: any) => Promise<void>;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
  saveChanges: () => Promise<void>;
  hasUnsavedChanges: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(defaultContent);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const login = async (password: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/admin/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('admin_password', password);
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Erreur de connexion:', err);
      return false;
    }
  };

  const logout = () => {
    sessionStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setIsAdminMode(false);
    setHasUnsavedChanges(false);
  };

  const updateContent = async (path: string, value: any) => {
    if (!content) return;

    // Mettre à jour le contenu localement
    const pathParts = path.split('.');
    const newContent = { ...content };
    let current: any = newContent;

    for (let i = 0; i < pathParts.length - 1; i++) {
      if (Array.isArray(current[pathParts[i]])) {
        current[pathParts[i]] = [...current[pathParts[i]]];
      } else {
        current[pathParts[i]] = { ...current[pathParts[i]] };
      }
      current = current[pathParts[i]];
    }

    current[pathParts[pathParts.length - 1]] = value;
    setContent(newContent);
    setHasUnsavedChanges(true);
  };

  const saveChanges = async () => {
    if (!content) return;

    try {
      const password = sessionStorage.getItem('admin_password');
      if (!password) {
        throw new Error('Non authentifié');
      }

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-66cb1054/admin/content`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            password,
            content,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setHasUnsavedChanges(false);
      } else {
        throw new Error(data.message || 'Erreur lors de la sauvegarde');
      }
    } catch (err) {
      console.error('Erreur de sauvegarde:', err);
      throw err;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdminMode,
        isAuthenticated,
        content,
        setIsAdminMode,
        setIsAuthenticated,
        setContent,
        updateContent,
        login,
        logout,
        saveChanges,
        hasUnsavedChanges,
      }}
    >
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
