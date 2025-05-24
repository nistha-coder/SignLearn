import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, AuthContextType, UserPreferences } from '../types';

const defaultPreferences: UserPreferences = {
  reason: 'fun',
  goalTime: 5,
  selectedCategory: 'alphabets',
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: () => false,
  signup: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Initialize preferences if not set
    if (!localStorage.getItem('preferences')) {
      localStorage.setItem('preferences', JSON.stringify(defaultPreferences));
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    // Get stored users
    const storedUser = localStorage.getItem('user');
    
    if (!storedUser) return false;
    
    const user: User = JSON.parse(storedUser);
    
    if (user.email === email && user.password === password) {
      setUser(user);
      setIsAuthenticated(true);
      return true;
    }
    
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    const newUser: User = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    // Don't remove user data from localStorage, just log out the session
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};