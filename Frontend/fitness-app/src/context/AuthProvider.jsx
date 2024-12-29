import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  // console.log('userData in context', userData);

  const checkUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        {
          withCredentials: true,
        }
      );

      if (response.data && response.data._id) {
        setIsLoggedIn(true);
        setUserData(response.data);
        localStorage.setItem('isLoggedIn', 'true');
      } else {
        setIsLoggedIn(false);
        setUserData({});
        localStorage.removeItem('isLoggedIn');
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUserData({});
      console.error('Error in checkUser:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('token');
    const isLoggedInPersisted = localStorage.getItem('isLoggedIn');

    if (token || isLoggedInPersisted) {
      checkUser();
    } else {
      setLoading(false);
    }
  }, []);

  const values = {
    isLoggedIn,
    userData,
    setIsLoggedIn,
    setUserData,
    checkUser,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
