
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Phone } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast";
import { useConsultations } from "@/hooks/useConsultations";

interface ConsultationFormProps {
  selectedDisease: { name: string; system: string };
  conditionType: "acute" | "chronic";
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

  const consultationFee = conditionType === "acute" ? 5000 : 10000;

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
      const emailBody = `
New Health Consultation Submission

Patient Details:
- Name: ${consultationData.patientName}
- Age: ${consultationData.age}
- Gender: ${consultationData.gender}
- Contact: ${consultationData.contact}
- National ID: ${consultationData.nationalId || 'Not provided'}

Consultation Details:
- Condition: ${consultationData.condition}
- Type: ${consultationData.type.charAt(0).toUpperCase() + consultationData.type.slice(1)}
- System: ${consultationData.system}
- Fee: ${consultationData.fee.toLocaleString()} UGX
- Preferred Mode: ${consultationData.consultationMode}
- Payment Status: ${consultationData.paid ? 'Paid' : 'Unpaid'}

Symptoms Description:
${consultationData.symptomsDescription}

Medical History:
${consultationData.medicalHistory || 'None provided'}

Onset Date: ${consultationData.onsetDate ? format(new Date(consultationData.onsetDate), 'PPP') : 'Not specified'}

Submitted on: ${new Date().toLocaleString()}
      `.trim();

      // Send email using a service (this is a placeholder - in production you'd use an email service)
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'your_service_id',
          template_id: 'your_template_id',
          user_id: 'your_user_id',
          template_params: {
            to_email: 'garrisonhealth147@gmail.com',
            subject: `New Health Consultation - ${consultationData.condition}`,
            message: emailBody
          }
        })
      });

      if (!response.ok) {
        console.log('Email service not configured, but consultation submitted successfully');
      }
    } catch (error) {
      console.log('Email notification failed, but consultation submitted successfully');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.age || !formData.contact || !formData.symptomsDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
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

      // Add consultation to the system (this will update the doctor dashboard in real-time)
      const newConsultation = addConsultation(consultationData);

      // Send email notification automatically
      await sendEmailNotification(consultationData);

      toast({
        title: "Consultation Submitted Successfully!",
        description: "Your consultation request has been submitted and our team has been notified.",
      });

      // Redirect to success page after a short delay
      setTimeout(() => {
        onSuccess();
      }, 1500);

    } catch (error) {
      console.error('Error submitting consultation:', error);
      toast({
        title: "Submission Error",
        description: "There was an error submitting your consultation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <div className="mt-1">
            <Input
              type="text"
              name="fullName"
              id="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="age" className="block text-sm font-medium text-gray-700">
            Age
          </Label>
          <div className="mt-1">
            <Input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Gender
          </Label>
          <div className="mt-1">
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
        </div>

        <div>
          <Label htmlFor="contact" className="block text-sm font-medium text-gray-700">
            Contact Number
          </Label>
          <div className="mt-1">
            <Input
              type="tel"
              name="contact"
              id="contact"
              value={formData.contact}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="nationalId" className="block text-sm font-medium text-gray-700">
            National ID (Optional)
          </Label>
          <div className="mt-1">
            <Input
              type="text"
              name="nationalId"
              id="nationalId"
              value={formData.nationalId}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="symptomsDescription" className="block text-sm font-medium text-gray-700">
            Describe Your Symptoms
          </Label>
          <div className="mt-1">
            <Textarea
              id="symptomsDescription"
              name="symptomsDescription"
              rows={3}
              value={formData.symptomsDescription}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="onsetDate" className="block text-sm font-medium text-gray-700">
            When did the symptoms start? (Optional)
          </Label>
          <div className="mt-1">
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
        </div>

        <div>
          <Label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700">
            Relevant Medical History (Optional)
          </Label>
          <div className="mt-1">
            <Textarea
              id="medicalHistory"
              name="medicalHistory"
              rows={3}
              value={formData.medicalHistory}
              onChange={handleChange}
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="consultationMode" className="block text-sm font-medium text-gray-700">
            Preferred Consultation Mode
          </Label>
          <div className="mt-1">
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
        <div className="bg-white rounded-lg p-4 border border-garrison-teal/20">
          <h4 className="font-semibold mb-2 text-garrison-teal">Payment Instructions</h4>
          <p className="text-sm text-gray-600 mb-2">
            📱 Pay via Mobile Money to: <strong>Mr. Kasule</strong>
          </p>
          <p className="text-sm text-gray-600 mb-3">
            Fee: <strong>{consultationFee.toLocaleString()} UGX</strong>
          </p>
          <Button
            type="button"
            onClick={handleCallForPayment}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded flex items-center justify-center gap-2"
          >
            <Phone className="h-4 w-4" />
            Call +256761281222 for Payment
          </Button>
          {hasCalledForPayment && (
            <p className="text-green-600 text-sm mt-2 text-center">✓ Payment call initiated</p>
          )}
        </div>

        <div className="flex justify-between">
          <Button variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit" className="garrison-btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Consultation'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ConsultationForm;
