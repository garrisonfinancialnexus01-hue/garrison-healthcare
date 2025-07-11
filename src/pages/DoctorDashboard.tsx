import Layout from "@/components/layout/Layout";
import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, MessageSquare, Phone, Video, User, Calendar, DollarSign, LogOut, Activity, Clock, TrendingUp, Users, Shield } from "lucide-react";
import DoctorLogin from "@/components/auth/DoctorLogin";
import { useToast } from "@/hooks/use-toast";

// Mock data for demonstration - in real app this would come from API
const mockConsultations = [
  {
    id: "1",
    patientName: "John Doe",
    age: 35,
    condition: "Common Cold",
    type: "acute",
    system: "Respiratory System",
    fee: 5000,
    paid: true,
    whatsappSent: true,
    status: "completed",
    consultationMode: "chat",
    submittedAt: new Date("2024-01-15T10:30:00Z"),
    contact: "+256701234567",
    duration: "30 mins",
    rating: 5
  },
  {
    id: "2",
    patientName: "Jane Smith",
    age: 28,
    condition: "Hypertension",
    type: "chronic",
    system: "Cardiovascular System",
    fee: 10000,
    paid: true,
    whatsappSent: false,
    status: "pending",
    consultationMode: "video",
    submittedAt: new Date("2024-01-15T14:20:00Z"),
    contact: "+256702345678",
    duration: "45 mins",
    rating: null
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    age: 42,
    condition: "Acute Gastritis",
    type: "acute",
    system: "Gastrointestinal System",
    fee: 5000,
    paid: false,
    whatsappSent: false,
    status: "awaiting_payment",
    consultationMode: "phone",
    submittedAt: new Date("2024-01-15T16:45:00Z"),
    contact: "+256703456789",
    duration: null,
    rating: null
  },
  {
    id: "4",
    patientName: "Mary Nakato",
    age: 31,
    condition: "Diabetes Type 2",
    type: "chronic",
    system: "Endocrine System",
    fee: 10000,
    paid: true,
    whatsappSent: true,
    status: "in_progress",
    consultationMode: "in-person",
    submittedAt: new Date("2024-01-16T09:15:00Z"),
    contact: "+256704567890",
    duration: "60 mins",
    rating: null
  }
];

const DoctorDashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [consultations, setConsultations] = useState(mockConsultations);
  const [filters, setFilters] = useState({
    type: "all",
    system: "all",
    status: "all",
    search: "",
    dateRange: "all"
  });
  const { toast } = useToast();

  // Check for existing session on component mount
  useEffect(() => {
    const token = localStorage.getItem('doctor_auth_token');
    const email = localStorage.getItem('doctor_email');
    
    if (token && email) {
      try {
        const tokenData = JSON.parse(atob(token));
        const now = Date.now();
        const tokenAge = now - tokenData.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        
        if (tokenAge < maxAge && tokenData.email === "garrisonhealth147@gmail.com") {
          setAuthToken(token);
          setUserEmail(email);
          setIsLoggedIn(true);
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
  }, []);

  const handleLogin = (token: string) => {
    setAuthToken(token);
    setUserEmail(localStorage.getItem('doctor_email') || "");
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('doctor_auth_token');
    localStorage.removeItem('doctor_email');
    setAuthToken(null);
    setUserEmail("");
    setIsLoggedIn(false);
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const filteredConsultations = useMemo(() => {
    return consultations.filter((consultation) => {
      const matchesType = filters.type === "all" || consultation.type === filters.type;
      const matchesSystem = filters.system === "all" || consultation.system === filters.system;
      const matchesStatus = filters.status === "all" || consultation.status === filters.status;
      const matchesSearch = 
        filters.search === "" ||
        consultation.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
        consultation.condition.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesType && matchesSystem && matchesStatus && matchesSearch;
    });
  }, [consultations, filters]);

  const stats = useMemo(() => {
    const today = new Date();
    const thisWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    return {
      total: consultations.length,
      acute: consultations.filter(c => c.type === "acute").length,
      chronic: consultations.filter(c => c.type === "chronic").length,
      completed: consultations.filter(c => c.status === "completed").length,
      pending: consultations.filter(c => c.status === "pending").length,
      inProgress: consultations.filter(c => c.status === "in_progress").length,
      awaitingPayment: consultations.filter(c => c.status === "awaiting_payment").length,
      totalRevenue: consultations.filter(c => c.paid).reduce((sum, c) => sum + c.fee, 0),
      todayConsultations: consultations.filter(c => 
        new Date(c.submittedAt).toDateString() === today.toDateString()
      ).length,
      weeklyConsultations: consultations.filter(c => 
        new Date(c.submittedAt) >= thisWeek
      ).length,
      monthlyRevenue: consultations.filter(c => 
        c.paid && new Date(c.submittedAt) >= thisMonth
      ).reduce((sum, c) => sum + c.fee, 0),
      averageRating: consultations.filter(c => c.rating).reduce((sum, c, _, arr) => 
        sum + (c.rating || 0) / arr.length, 0
      ) || 0
    };
  }, [consultations]);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default", label: "Completed", className: "bg-green-100 text-green-800" },
      pending: { variant: "secondary", label: "Pending", className: "bg-yellow-100 text-yellow-800" },
      awaiting_payment: { variant: "destructive", label: "Awaiting Payment", className: "bg-red-100 text-red-800" },
      in_progress: { variant: "default", label: "In Progress", className: "bg-blue-100 text-blue-800" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getConsultationModeIcon = (mode: string) => {
    switch (mode) {
      case "video": return <Video className="h-4 w-4" />;
      case "phone": return <Phone className="h-4 w-4" />;
      case "chat": return <MessageSquare className="h-4 w-4" />;
      case "in-person": return <User className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  if (!isLoggedIn) {
    return <DoctorLogin onLogin={handleLogin} />;
  }

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Doctor Dashboard</h1>
              <p className="text-xl text-white/90">Advanced Health Management System</p>
              <div className="flex items-center mt-2 text-white/80">
                <Shield className="h-4 w-4 mr-2" />
                <span className="text-sm">Logged in as: {userEmail}</span>
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
        {/* Session Info Card */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Session Active</p>
                  <p className="text-xs text-blue-600">Authorized Access - {userEmail}</p>
                </div>
              </div>
              <div className="text-xs text-blue-500">
                Session expires in 24 hours
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                  <p className="text-3xl font-bold text-garrison-teal">{stats.total}</p>
                  <p className="text-xs text-gray-500 mt-1">All time</p>
                </div>
                <Calendar className="h-8 w-8 text-garrison-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Today's Consultations</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.todayConsultations}</p>
                  <p className="text-xs text-gray-500 mt-1">+{stats.weeklyConsultations} this week</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-3xl font-bold text-green-600">{stats.monthlyRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">UGX</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Patients</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.inProgress}</p>
                  <p className="text-xs text-gray-500 mt-1">In progress</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{stats.awaitingPayment}</p>
              <p className="text-sm text-gray-600">Awaiting Payment</p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Advanced Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search patients or conditions..."
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Condition Type</label>
                <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="acute">Acute</SelectItem>
                    <SelectItem value="chronic">Chronic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="awaiting_payment">Awaiting Payment</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">System</label>
                <Select value={filters.system} onValueChange={(value) => setFilters({...filters, system: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Systems</SelectItem>
                    <SelectItem value="Respiratory System">Respiratory</SelectItem>
                    <SelectItem value="Cardiovascular System">Cardiovascular</SelectItem>
                    <SelectItem value="Gastrointestinal System">Gastrointestinal</SelectItem>
                    <SelectItem value="Endocrine System">Endocrine</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button className="garrison-btn-primary w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Consultations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Patient Consultations ({filteredConsultations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient Details</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Mode</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredConsultations.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{consultation.patientName}</p>
                          <p className="text-sm text-gray-500">Age: {consultation.age}</p>
                          <p className="text-sm text-gray-500">{consultation.contact}</p>
                          <p className="text-xs text-gray-400">
                            {consultation.submittedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{consultation.condition}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={consultation.type === "acute" ? "destructive" : "secondary"}>
                          {consultation.type.toUpperCase()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{consultation.system}</p>
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{consultation.fee.toLocaleString()} UGX</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={consultation.paid ? "default" : "destructive"}>
                          {consultation.paid ? "Paid" : "Unpaid"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getConsultationModeIcon(consultation.consultationMode)}
                          <span className="text-sm capitalize">{consultation.consultationMode}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-gray-400" />
                          <span className="text-sm">{consultation.duration || "TBD"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(consultation.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" title="View Details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            title="Contact via WhatsApp"
                            onClick={() => window.open(`https://wa.me/${consultation.contact.replace('+', '')}`, '_blank')}
                          >
                            <img src="/lovable-uploads/00e52556-ed3d-4b6a-baa5-494f09fd2008.png" alt="WhatsApp" className="h-4 w-4" />
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
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
