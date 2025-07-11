import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast";

interface ConsultationFormProps {
  selectedDisease: { name: string; system: string };
  conditionType: "acute" | "chronic";
  onBack: () => void;
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

const ConsultationForm = ({ selectedDisease, conditionType, onBack }: ConsultationFormProps) => {
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
  const { toast } = useToast();

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
        fee: conditionType === 'acute' ? 5000 : 10000,
        consultationMode: formData.consultationMode,
        symptomsDescription: formData.symptomsDescription,
        onsetDate: formData.onsetDate ? new Date(formData.onsetDate) : undefined,
        medicalHistory: formData.medicalHistory,
        attachments: formData.attachments
      };

      // Store consultation data in localStorage for the doctor dashboard
      const existingConsultations = JSON.parse(localStorage.getItem('doctor_consultations') || '[]');
      const newConsultation = {
        id: Date.now().toString(),
        ...consultationData,
        submittedAt: new Date(),
        status: 'pending',
        paid: false,
        whatsappSent: false
      };
      
      existingConsultations.push(newConsultation);
      localStorage.setItem('doctor_consultations', JSON.stringify(existingConsultations));

      // Send email with consultation details
      const emailBody = `
New Health Consultation Submission

Patient Details:
- Name: ${formData.fullName}
- Age: ${formData.age}
- Gender: ${formData.gender}
- Contact: ${formData.contact}
- National ID: ${formData.nationalId || 'Not provided'}

Consultation Details:
- Condition: ${selectedDisease.name}
- Type: ${conditionType.charAt(0).toUpperCase() + conditionType.slice(1)}
- System: ${selectedDisease.system}
- Fee: ${conditionType === 'acute' ? '5,000' : '10,000'} UGX
- Preferred Mode: ${formData.consultationMode}

Symptoms Description:
${formData.symptomsDescription}

Medical History:
${formData.medicalHistory || 'None provided'}

Onset Date: ${formData.onsetDate || 'Not specified'}

Submitted on: ${new Date().toLocaleString()}
      `.trim();

      // Create mailto link
      const subject = encodeURIComponent(`New Health Consultation - ${selectedDisease.name}`);
      const body = encodeURIComponent(emailBody);
      const mailtoLink = `mailto:garrisonhealth147@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.open(mailtoLink);

      toast({
        title: "Consultation Submitted Successfully!",
        description: "Your consultation request has been submitted. You will be contacted soon.",
      });

      // Reset form
      setFormData({
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

      // Go back to disease selection after a delay
      setTimeout(() => {
        onBack();
      }, 3000);

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

      <div className="flex justify-between">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" className="garrison-btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Consultation'}
        </Button>
      </div>
    </form>
  );
};

export default ConsultationForm;
