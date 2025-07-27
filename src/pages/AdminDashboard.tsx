
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/hooks/useAuth";
import { useAdminPatients } from "@/hooks/useAdminPatients";
import AdminLogin from "@/components/auth/AdminLogin";
import PatientReceipt from "@/components/admin/PatientReceipt";
import UpdateInfo from "@/components/admin/UpdateInfo";
import { User, Phone, Calendar, FileText, DollarSign, Settings, Image } from "lucide-react";

const AdminDashboard = () => {
  const { isAuthenticated, login, logout } = useAuth();
  const { patients } = useAdminPatients();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <Button onClick={logout} variant="outline">
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="patients" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Patient Records
            </TabsTrigger>
            <TabsTrigger value="update-info" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              Update Info
            </TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Patient Consultations</span>
                  <Badge variant="secondary">
                    {patients.length} {patients.length === 1 ? 'Record' : 'Records'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patients.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No patient records found
                  </div>
                ) : (
                  <div className="space-y-4">
                    {patients.map((patient) => (
                      <div
                        key={patient.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <h3 className="font-semibold text-lg">{patient.patientName}</h3>
                              <Badge variant="outline">{patient.age} years</Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{patient.phoneNumber}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>{patient.symptoms}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="h-4 w-4" />
                                <span>{patient.fee}</span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(patient.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedPatient(patient)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="update-info">
            <UpdateInfo />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient Receipt</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <PatientReceipt
              patient={selectedPatient}
              receiptNumber={`GH-${selectedPatient.number.toString().padStart(4, '0')}`}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
