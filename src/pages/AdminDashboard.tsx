
import Layout from "@/components/layout/Layout";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LogOut, Shield, Plus, Download, Trash2, Edit, Search } from "lucide-react";
import AdminLogin from "@/components/auth/AdminLogin";
import PatientReceipt from "@/components/admin/PatientReceipt";
import { useToast } from "@/hooks/use-toast";
import { useAdminPatients, AdminPatient } from "@/hooks/useAdminPatients";
import { useReactToPrint } from 'react-to-print';

const AdminDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string>("");
  const [editingStats, setEditingStats] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<AdminPatient | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredPatients, setFilteredPatients] = useState<AdminPatient[]>([]);
  const { toast } = useToast();
  const { patients, stats, addPatient, updatePatient, deletePatient, updateStats } = useAdminPatients();
  const receiptRef = useRef<HTMLDivElement>(null);

  // Filter patients based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPatients(patients);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = patients.filter(patient => 
        patient.patientName.toLowerCase().includes(query) ||
        patient.number.toString().includes(query) ||
        patient.nationalId.toLowerCase().includes(query)
      );
      setFilteredPatients(filtered);
    }
  }, [patients, searchQuery]);

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem('admin_auth_token');
    const name = localStorage.getItem('admin_name');
    
    if (token && name) {
      try {
        const tokenData = JSON.parse(atob(token));
        const now = Date.now();
        const tokenAge = now - tokenData.timestamp;
        const maxAge = 30 * 60 * 1000; // 30 minutes

        if (tokenAge < maxAge) {
          setAuthToken(token);
          setAdminName(name);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem('admin_auth_token');
          localStorage.removeItem('admin_name');
        }
      } catch (error) {
        localStorage.removeItem('admin_auth_token');
        localStorage.removeItem('admin_name');
      }
    }
  }, []);

  // Auto-logout when user leaves/closes tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('admin_auth_token');
      localStorage.removeItem('admin_name');
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        localStorage.removeItem('admin_auth_token');
        localStorage.removeItem('admin_name');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleLogin = (token: string, name: string) => {
    setAuthToken(token);
    setAdminName(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth_token');
    localStorage.removeItem('admin_name');
    setAuthToken(null);
    setAdminName("");
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const handleAddPatient = () => {
    const newPatient = addPatient();
    setSelectedPatient(newPatient);
  };

  const handleStatEdit = (statKey: string, value: string) => {
    const numValue = parseInt(value, 10) || 0;
    updateStats({ [statKey]: numValue } as any);
    setEditingStats(null);
  };

  const generateReceiptNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 4).toUpperCase();
    return `GH${timestamp}${random}`;
  };

  const handlePrintReceipt = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Receipt-${selectedPatient?.number || 'Unknown'}`,
  });

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-xl text-white/90">Healthcare Management System</p>
              <div className="flex items-center mt-2 text-white/80">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">Logged in as: {adminName}</span>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Editable Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { key: 'totalConsultations', label: 'Total Consultations', value: stats.totalConsultations },
            { key: 'todaysConsultations', label: "Today's Consultations", value: stats.todaysConsultations },
            { key: 'monthlyRevenue', label: 'Monthly Revenue', value: stats.monthlyRevenue },
            { key: 'activePatients', label: 'Active Patients', value: stats.activePatients },
          ].map((stat) => (
            <Card key={stat.key}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    {editingStats === stat.key ? (
                      <Input
                        type="number"
                        defaultValue={stat.value}
                        onBlur={(e) => handleStatEdit(stat.key, e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleStatEdit(stat.key, (e.target as HTMLInputElement).value)}
                        className="text-2xl font-bold mt-1"
                        autoFocus
                      />
                    ) : (
                      <p 
                        className="text-3xl font-bold text-garrison-teal cursor-pointer hover:bg-gray-50 p-1 rounded"
                        onClick={() => setEditingStats(stat.key)}
                      >
                        {stat.value.toLocaleString()}
                        <Edit className="h-4 w-4 inline ml-2 text-gray-400" />
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { key: 'completed', label: 'Completed', value: stats.completed, color: 'text-green-600' },
            { key: 'pending', label: 'Pending', value: stats.pending, color: 'text-yellow-600' },
            { key: 'inProgress', label: 'In Progress', value: stats.inProgress, color: 'text-blue-600' },
            { key: 'awaitingPayment', label: 'Awaiting Payment', value: stats.awaitingPayment, color: 'text-red-600' },
          ].map((stat) => (
            <Card key={stat.key}>
              <CardContent className="p-4 text-center">
                {editingStats === stat.key ? (
                  <Input
                    type="number"
                    defaultValue={stat.value}
                    onBlur={(e) => handleStatEdit(stat.key, e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleStatEdit(stat.key, (e.target as HTMLInputElement).value)}
                    className="text-xl font-bold"
                    autoFocus
                  />
                ) : (
                  <p 
                    className={`text-2xl font-bold ${stat.color} cursor-pointer hover:bg-gray-50 p-1 rounded`}
                    onClick={() => setEditingStats(stat.key)}
                  >
                    {stat.value}
                    <Edit className="h-3 w-3 inline ml-1 text-gray-400" />
                  </p>
                )}
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Patient Search and Consultations Table */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Patient Consultations</CardTitle>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, ID, or receipt number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button onClick={handleAddPatient} className="garrison-btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Patient
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No.</TableHead>
                    <TableHead>Patient Details</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Patient's Symptoms</TableHead>
                    <TableHead>Medical History</TableHead>
                    <TableHead>Recommendations</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPatients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell>{patient.number}</TableCell>
                      <TableCell>
                        <div className="space-y-2">
                          <Input
                            placeholder="National ID"
                            value={patient.nationalId}
                            onChange={(e) => updatePatient(patient.id, { nationalId: e.target.value })}
                          />
                          <Input
                            placeholder="Patient Name"
                            value={patient.patientName}
                            onChange={(e) => updatePatient(patient.id, { patientName: e.target.value })}
                          />
                          <Input
                            placeholder="Age"
                            value={patient.age}
                            onChange={(e) => updatePatient(patient.id, { age: e.target.value })}
                          />
                          <Input
                            placeholder="Phone Number"
                            value={patient.phoneNumber}
                            onChange={(e) => updatePatient(patient.id, { phoneNumber: e.target.value })}
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={patient.type} 
                          onValueChange={(value) => updatePatient(patient.id, { type: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Acute">Acute</SelectItem>
                            <SelectItem value="Chronic">Chronic</SelectItem>
                            <SelectItem value="OBS & GYN">OBS & GYN</SelectItem>
                            <SelectItem value="Paed">Paed</SelectItem>
                            <SelectItem value="Surgical">Surgical</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={patient.fee} 
                          onValueChange={(value) => updatePatient(patient.id, { fee: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5,000 UGX">5,000 UGX</SelectItem>
                            <SelectItem value="10,000 UGX">10,000 UGX</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={patient.mode} 
                          onValueChange={(value) => updatePatient(patient.id, { mode: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Chat">Chat</SelectItem>
                            <SelectItem value="Video Call">Video Call</SelectItem>
                            <SelectItem value="Phone Call">Phone Call</SelectItem>
                            <SelectItem value="In-Person">In-Person</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Select 
                          value={patient.status} 
                          onValueChange={(value) => updatePatient(patient.id, { status: value as any })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Completed">Completed</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="In Progress">In Progress</SelectItem>
                            <SelectItem value="Awaiting Payment">Awaiting Payment</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Patient's symptoms"
                          value={patient.symptoms}
                          onChange={(e) => updatePatient(patient.id, { symptoms: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Medical history (optional)"
                          value={patient.medicalHistory}
                          onChange={(e) => updatePatient(patient.id, { medicalHistory: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          placeholder="Recommendations"
                          value={patient.diagnosis}
                          onChange={(e) => updatePatient(patient.id, { diagnosis: e.target.value })}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            Receipt
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deletePatient(patient.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Receipt Section */}
        {selectedPatient && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Patient Receipt</CardTitle>
                <Button onClick={handlePrintReceipt} className="garrison-btn-primary">
                  <Download className="h-4 w-4 mr-2" />
                  Download Receipt
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <PatientReceipt 
                ref={receiptRef}
                patient={selectedPatient} 
                receiptNumber={generateReceiptNumber()}
              />
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
