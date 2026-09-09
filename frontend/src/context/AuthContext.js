import React, { useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const sendOTP = async (mobile) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/auth/farmer/send-otp`, { mobile });
      return response.data.success;
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send OTP');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (mobile, otp) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/auth/farmer/verify-otp`, { mobile, otp });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const registerFarmer = async (farmData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/auth/farmer/register`, farmData);
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.farmer);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.farmer));
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const farmerLogin = async (mobile) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/auth/farmer/login`, { mobile });
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.farmer);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.farmer));
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(`${API_URL}/auth/admin/login`, { username, password });
      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.admin);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.admin));
        return response.data;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        sendOTP,
        verifyOTP,
        registerFarmer,
        farmerLogin,
        adminLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
