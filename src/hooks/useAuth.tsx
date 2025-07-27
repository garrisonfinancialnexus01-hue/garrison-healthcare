
import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    email: null
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('doctor_auth_token');
      const email = localStorage.getItem('doctor_email');

      if (token && email) {
        try {
          const tokenData = JSON.parse(atob(token));
          const now = Date.now();
          const tokenAge = now - tokenData.timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours

          if (tokenAge < maxAge && tokenData.email === "garrisonhealth147@gmail.com") {
            setAuthState({
              isAuthenticated: true,
              token,
              email
            });
          } else {
            // Token expired or invalid
            localStorage.removeItem('doctor_auth_token');
            localStorage.removeItem('doctor_email');
            setAuthState({
              isAuthenticated: false,
              token: null,
              email: null
            });
          }
        } catch (error) {
          // Invalid token format
          localStorage.removeItem('doctor_auth_token');
          localStorage.removeItem('doctor_email');
          setAuthState({
            isAuthenticated: false,
            token: null,
            email: null
          });
        }
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, email: string) => {
    localStorage.setItem('doctor_auth_token', token);
    localStorage.setItem('doctor_email', email);
    setAuthState({
      isAuthenticated: true,
      token,
      email
    });
  };

  const logout = () => {
    localStorage.removeItem('doctor_auth_token');
    localStorage.removeItem('doctor_email');
    setAuthState({
      isAuthenticated: false,
      token: null,
      email: null
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};
