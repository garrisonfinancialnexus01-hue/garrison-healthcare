
import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  name: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    email: null,
    name: null
  });

  useEffect(() => {
    const checkAuth = () => {
      // Check for admin auth first
      const adminToken = localStorage.getItem('admin_auth_token');
      const adminName = localStorage.getItem('admin_name');

      if (adminToken && adminName) {
        try {
          const tokenData = JSON.parse(atob(adminToken));
          const now = Date.now();
          const tokenAge = now - tokenData.timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours

          if (tokenAge < maxAge) {
            setAuthState({
              isAuthenticated: true,
              token: adminToken,
              email: null,
              name: adminName
            });
            return;
          } else {
            // Token expired
            localStorage.removeItem('admin_auth_token');
            localStorage.removeItem('admin_name');
          }
        } catch (error) {
          // Invalid token format
          localStorage.removeItem('admin_auth_token');
          localStorage.removeItem('admin_name');
        }
      }

      // Check for doctor auth
      const doctorToken = localStorage.getItem('doctor_auth_token');
      const doctorEmail = localStorage.getItem('doctor_email');

      if (doctorToken && doctorEmail) {
        try {
          const tokenData = JSON.parse(atob(doctorToken));
          const now = Date.now();
          const tokenAge = now - tokenData.timestamp;
          const maxAge = 24 * 60 * 60 * 1000; // 24 hours

          if (tokenAge < maxAge && tokenData.email === "garrisonhealth147@gmail.com") {
            setAuthState({
              isAuthenticated: true,
              token: doctorToken,
              email: doctorEmail,
              name: null
            });
            return;
          } else {
            // Token expired or invalid
            localStorage.removeItem('doctor_auth_token');
            localStorage.removeItem('doctor_email');
          }
        } catch (error) {
          // Invalid token format
          localStorage.removeItem('doctor_auth_token');
          localStorage.removeItem('doctor_email');
        }
      }

      // No valid auth found
      setAuthState({
        isAuthenticated: false,
        token: null,
        email: null,
        name: null
      });
    };

    checkAuth();

    // Clean up tokens when the page is about to unload
    const handleBeforeUnload = () => {
      localStorage.removeItem('admin_auth_token');
      localStorage.removeItem('admin_name');
      localStorage.removeItem('doctor_auth_token');
      localStorage.removeItem('doctor_email');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const login = (token: string, emailOrName: string) => {
    // Check if this is admin login (name) or doctor login (email)
    if (emailOrName.includes('@')) {
      // Doctor login
      localStorage.setItem('doctor_auth_token', token);
      localStorage.setItem('doctor_email', emailOrName);
      setAuthState({
        isAuthenticated: true,
        token,
        email: emailOrName,
        name: null
      });
    } else {
      // Admin login
      localStorage.setItem('admin_auth_token', token);
      localStorage.setItem('admin_name', emailOrName);
      setAuthState({
        isAuthenticated: true,
        token,
        email: null,
        name: emailOrName
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('admin_name');
    localStorage.removeItem('doctor_auth_token');
    localStorage.removeItem('doctor_email');
    setAuthState({
      isAuthenticated: false,
      token: null,
      email: null,
      name: null
    });
  };

  return {
    ...authState,
    login,
    logout
  };
};
