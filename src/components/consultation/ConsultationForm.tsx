
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Phone, Stethoscope, User, FileText, Clock } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast";
import { useConsultations } from "@/hooks/useConsultations";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface ConsultationFormProps {
  selectedDisease: { name: string; system: string };
  conditionType: "acute" | "chronic" | "obstetrics" | "paediatrics" | "surgical";
  onBack: () => void;
  onSuccess: () => void;
}

interface ConsultationFormData {
  fullName: string;
  age: string;
  gender: 'male' | 'female' | 'other';
  contact: string;
  nationalId?: string;
  symptomsDescription: string;
  onsetDate?: string;
  medicalHistory?: string;
  consultationMode: 'chat' | 'video' | 'phone' | 'in-person';
  attachments: string[];
}

const ConsultationForm = ({ selectedDisease, conditionType, onBack, onSuccess }: ConsultationFormProps) => {
  const [formData, setFormData] = useState<ConsultationFormData>({
    fullName: '',
    age: '',
    gender: 'male',
    contact: '',
    nationalId: '',
    symptomsDescription: '',
    onsetDate: '',
    medicalHistory: '',
    consultationMode: 'chat',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCalledForPayment, setHasCalledForPayment] = useState(false);
  const { toast } = useToast();
  const { addConsultation } = useConsultations();

  const getConsultationFee = (type: string) => {
    switch (type) {
      case "chronic":
        return 10000;
      case "acute":
      case "obstetrics":
      case "paediatrics":
      case "surgical":
        return 5000;
      default:
        return 5000;
    }
  };

  const consultationFee = getConsultationFee(conditionType);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ ...prev, onsetDate: format(date, 'yyyy-MM-dd') }));
    } else {
      setFormData(prev => ({ ...prev, onsetDate: '' }));
    }
  };

  const handleCallForPayment = () => {
    setHasCalledForPayment(true);
    const phoneNumber = "+256761281222";
    window.location.href = `tel:${phoneNumber}`;
  };

  const sendEmailNotification = async (consultationData: any) => {
    try {
      console.log("Starting email notification process...");
      console.log("Consultation data to send:", consultationData);
      
      const emailPayload = {
        type: 'consultation',
        patientName: consultationData.patientName,
        age: consultationData.age,
        gender: consultationData.gender,
        contact: consultationData.contact,
        nationalId: consultationData.nationalId || '',
        condition: consultationData.condition,
        conditionType: consultationData.type,
        system: consultationData.system,
        fee: consultationData.fee,
        paid: consultationData.paid,
        consultationMode: consultationData.consultationMode,
        symptomsDescription: consultationData.symptomsDescription,
        medicalHistory: consultationData.medicalHistory || '',
        onsetDate: consultationData.onsetDate ? format(new Date(consultationData.onsetDate), 'PPP') : ''
      };

      console.log("Email payload prepared:", emailPayload);
      
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: emailPayload,
        headers: {
          'Content-Type': 'application/json',
        }
      });

      console.log("Supabase function response:", { data, error });

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || 'Failed to send email notification');
      }

      if (data?.error) {
        console.error("Email service error:", data.error);
        throw new Error(data.error);
      }
      
      console.log('Email notification sent successfully:', data);
      
      toast({
        title: "✅ Email Sent Successfully",
        description: "Your consultation request has been emailed to our medical team. They will contact you soon.",
        duration: 5000,
      });
      
    } catch (error) {
      console.error('Email notification failed:', error);
      
      // Show specific error message to user
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      toast({
        title: "❌ Email Delivery Failed",
        description: `Failed to send email notification: ${errorMessage}. Please contact us directly at garrisonhealth147@gmail.com or call +256745101519`,
        variant: "destructive",
        duration: 8000,
      });
      
      throw error; // Re-throw to handle in main submission flow
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.age || !formData.contact || !formData.symptomsDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Age, Contact, and Symptoms).",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Starting consultation submission process...");
      
      // Create consultation data
      const consultationData = {
        patientName: formData.fullName,
        age: parseInt(formData.age),
        gender: formData.gender,
        contact: formData.contact,
        nationalId: formData.nationalId,
        condition: selectedDisease.name,
        type: conditionType,
        system: selectedDisease.system,
        fee: consultationFee,
        paid: hasCalledForPayment,
        consultationMode: formData.consultationMode,
        symptomsDescription: formData.symptomsDescription,
        onsetDate: formData.onsetDate ? new Date(formData.onsetDate) : undefined,
        medicalHistory: formData.medicalHistory,
        attachments: formData.attachments
      };

      console.log("Consultation data prepared:", consultationData);

      // Add consultation to the local system first
      addConsultation(consultationData);
      console.log("Consultation added to local system");

      // Send email notification
      await sendEmailNotification(consultationData);
      
      // Show success message and redirect
      toast({
        title: "🎉 Consultation Submitted Successfully",
        description: "Your consultation has been submitted and our medical team has been notified. Thank you!",
        duration: 5000,
      });

      // Redirect to success page after a short delay
      setTimeout(() => {
        onSuccess();
      }, 2000);

    } catch (error) {
      console.error('Error during consultation submission:', error);
      
      // Don't show additional error toast here since sendEmailNotification already shows one
      // The consultation is still saved locally even if email fails
      
    } finally {
      setIsSubmitting(false);
    }
  };

  const getConditionTypeLabel = (type: string) => {
    switch (type) {
      case "acute":
        return "Acute Condition";
      case "chronic":
        return "Chronic Condition";
      case "obstetrics":
        return "Obstetrics & Gynaecology";
      case "paediatrics":
        return "Paediatrics";
      case "surgical":
        return "Surgical";
      default:
        return type;
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center bg-gradient-to-r from-garrison-teal to-garrison-teal-dark text-white rounded-t-lg">
        <div className="flex items-center justify-center mb-4">
          <Stethoscope className="h-8 w-8 mr-3" />
          <CardTitle className="text-2xl">Health Consultation Form</CardTitle>
        </div>
        <p className="text-white/90">
          Please fill out this form to schedule your consultation with our healthcare practitioner
        </p>
      </CardHeader>
      
      <CardContent className="p-8">
        {/* Consultation Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Consultation Summary
          </h3>
          <div className="text-sm text-blue-800 space-y-1">
            <p><strong>Type:</strong> {getConditionTypeLabel(conditionType)}</p>
            <p><strong>System:</strong> {selectedDisease.system}</p>
            <p><strong>Condition:</strong> {selectedDisease.name}</p>
            <p><strong>Fee:</strong> {consultationFee.toLocaleString()} UGX</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-garrison-teal" />
              Patient Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                  Age *
                </Label>
                <Input
                  type="number"
                  name="age"
                  id="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div>
                <Label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-2">
                  Gender *
                </Label>
                <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as 'male' | 'female' | 'other' }))}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">
                  Contact Number *
                </Label>
                <Input
                  type="tel"
                  name="contact"
                  id="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="+256 XXX XXX XXX"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="nationalId" className="block text-sm font-medium text-gray-700 mb-2">
                  National ID (Optional)
                </Label>
                <Input
                  type="text"
                  name="nationalId"
                  id="nationalId"
                  value={formData.nationalId}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Enter your National ID"
                />
              </div>
            </div>
          </div>

          {/* Medical Information Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Stethoscope className="h-5 w-5 mr-2 text-garrison-teal" />
              Medical Information
            </h3>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="symptomsDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe Your Symptoms *
                </Label>
                <Textarea
                  id="symptomsDescription"
                  name="symptomsDescription"
                  rows={4}
                  value={formData.symptomsDescription}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Please describe your symptoms in detail..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="onsetDate" className="block text-sm font-medium text-gray-700 mb-2">
                  When did the symptoms start? (Optional)
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.onsetDate && "text-muted-foreground"
                      )}
                    >
                      {formData.onsetDate ? (
                        format(new Date(formData.onsetDate), "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.onsetDate ? new Date(formData.onsetDate) : undefined}
                      onSelect={handleDateChange}
                      disabled={(date) =>
                        date > new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant Medical History (Optional)
                </Label>
                <Textarea
                  id="medicalHistory"
                  name="medicalHistory"
                  rows={3}
                  value={formData.medicalHistory}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="Any previous medical conditions, medications, allergies, etc."
                />
              </div>
            </div>
          </div>

          {/* Consultation Preferences Section */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-garrison-teal" />
              Consultation Preferences
            </h3>
            
            <div>
              <Label htmlFor="consultationMode" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Consultation Mode *
              </Label>
              <Select value={formData.consultationMode} onValueChange={(value) => setFormData(prev => ({ ...prev, consultationMode: value as 'chat' | 'video' | 'phone' | 'in-person' }))}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select consultation mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chat">Chat</SelectItem>
                  <SelectItem value="video">Video Call</SelectItem>
                  <SelectItem value="phone">Phone Call</SelectItem>
                  <SelectItem value="in-person">In-Person</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6">
            <h4 className="font-semibold mb-3 text-garrison-teal flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              Payment Instructions
            </h4>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                📱 Pay via Mobile Money to: <strong>Mr. Kasule</strong>
              </p>
              <p className="text-sm text-gray-700">
                Consultation Fee: <strong className="text-garrison-red">{consultationFee.toLocaleString()} UGX</strong>
              </p>
              <Button
                type="button"
                onClick={handleCallForPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call +256761281222 for Payment
              </Button>
              {hasCalledForPayment && (
                <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                  <p className="text-green-700 text-sm text-center font-medium">✓ Payment call initiated - Status: Paid</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" onClick={onBack} className="px-8">
              Back to Selection
            </Button>
            <Button 
              type="submit" 
              className="garrison-btn-primary px-8" 
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Submitting...
                </>
              ) : (
                'Submit Consultation'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsultationForm;
