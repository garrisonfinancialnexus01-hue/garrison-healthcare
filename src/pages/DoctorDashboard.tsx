
import Layout from "@/components/layout/Layout";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, Eye, MessageSquare, Phone, Video, User, Calendar, DollarSign } from "lucide-react";

// Mock data for demonstration
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
    submittedAt: "2024-01-15T10:30:00Z",
    contact: "+256701234567"
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
    submittedAt: "2024-01-15T14:20:00Z",
    contact: "+256702345678"
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
    submittedAt: "2024-01-15T16:45:00Z",
    contact: "+256703456789"
  }
];

const DoctorDashboard = () => {
  const [consultations, setConsultations] = useState(mockConsultations);
  const [filters, setFilters] = useState({
    type: "all",
    system: "all",
    status: "all",
    search: ""
  });

  const filteredConsultations = consultations.filter((consultation) => {
    const matchesType = filters.type === "all" || consultation.type === filters.type;
    const matchesSystem = filters.system === "all" || consultation.system === filters.system;
    const matchesStatus = filters.status === "all" || consultation.status === filters.status;
    const matchesSearch = 
      filters.search === "" ||
      consultation.patientName.toLowerCase().includes(filters.search.toLowerCase()) ||
      consultation.condition.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesType && matchesSystem && matchesStatus && matchesSearch;
  });

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

  const stats = {
    total: consultations.length,
    acute: consultations.filter(c => c.type === "acute").length,
    chronic: consultations.filter(c => c.type === "chronic").length,
    completed: consultations.filter(c => c.status === "completed").length,
    pending: consultations.filter(c => c.status === "pending").length,
    totalRevenue: consultations.filter(c => c.paid).reduce((sum, c) => sum + c.fee, 0)
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Doctor Dashboard</h1>
          <p className="text-xl text-white/90">Manage consultations and patient interactions</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Consultations</p>
                  <p className="text-3xl font-bold text-garrison-teal">{stats.total}</p>
                </div>
                <Calendar className="h-8 w-8 text-garrison-teal" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Acute Cases</p>
                  <p className="text-3xl font-bold text-orange-600">{stats.acute}</p>
                </div>
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 font-bold text-sm">A</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chronic Cases</p>
                  <p className="text-3xl font-bold text-purple-600">{stats.chronic}</p>
                </div>
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-purple-600 font-bold text-sm">C</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-green-600">{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">UGX</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters & Search
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

              <div className="flex items-end">
                <Button className="garrison-btn-primary w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Consultations Table */}
        <Card>
          <CardHeader>
            <CardTitle>Consultation Requests ({filteredConsultations.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>System</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Mode</TableHead>
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
                        {getStatusBadge(consultation.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
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
