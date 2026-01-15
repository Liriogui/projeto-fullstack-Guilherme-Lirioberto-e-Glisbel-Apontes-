import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Tentar decodificar o token para obter informações do usuário
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: payload.id,
          role: payload.role,
          nome: payload.nome,
          email: payload.email
        });
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => !!user;
  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      isAuthenticated,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
