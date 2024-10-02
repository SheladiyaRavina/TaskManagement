import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

// Predefined admin user
const ADMIN_USER = {
  id: 'admin123',
  name: 'Admin User',
  email: 'admin@gmail.com',
  password: 'admin123', 
  role: 'admin'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.some(u => u.email === ADMIN_USER.email)) {
      users.push(ADMIN_USER);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, []);

  const loginUser = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      toast.success(`Welcome, ${foundUser.role === 'admin' ? 'Admin' : 'User'}!`);
      return foundUser;
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Logged out successfully');
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};