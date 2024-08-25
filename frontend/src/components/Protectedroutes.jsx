import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({children,isAdmin}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://mern-buyme-ecommercre-store.onrender.com/currentuser', { withCredentials: true });
        setIsAuthenticated(true);
        if (response.data.user.role !== 'ADMIN') {
          setIsAuthorized(false);
        } else {
          setIsAuthorized(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAdmin]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  if (!isAuthorized) {
    navigate('/403'); // Forbidden page
    return null;
  }

  return children;
};

export default ProtectedRoute;
