import React, { createContext, ueState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Validación importante:  Verifica si userData es válido
    if (!userData) {
      console.error("Invalid user data provided to login.");
      return; // O lanza un error, dependiendo de la necesidad.
    }
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider; // Exporta el componente AuthProvider para usarlo en otros archivos