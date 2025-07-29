
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import AdminHeader from '@/components/admin/AdminHeader';
import DiseaseImagesManager from '@/components/admin/DiseaseImagesManager';

const AdminDashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <DiseaseImagesManager />
      </div>
    </div>
  );
};

export default AdminDashboard;
