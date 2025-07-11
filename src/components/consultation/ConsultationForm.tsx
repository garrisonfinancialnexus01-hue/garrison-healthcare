
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, Phone, Video, MessageSquare, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  age: z.string().min(1, "Age is required"),
  gender: z.string().min(1, "Gender is required"),
  contact: z.string().min(10, "Valid contact information is required"),
  nationalId: z.string().optional(),
  symptoms: z.string().min(10, "Please describe your symptoms in detail"),
  onsetDate: z.date({
    required_error: "Please select when symptoms started",
  }),
  duration: z.string().min(1, "Duration is required"),
  medicalHistory: z.string(),
  pastConditions: z.string().optional(),
  consultationMode: z.string().min(1, "Please select a consultation mode"),
});

interface ConsultationFormProps {
  conditionType: "acute" | "chronic";
  system: string;
  disease: string;
  fee: number;
  onBack: () => void;
}

const ConsultationForm = ({ conditionType, system, disease, fee, onBack }: ConsultationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: "",
      gender: "",
      contact: "",
      nationalId: "",
      symptoms: "",
      duration: "",
      medicalHistory: "no",
      pastConditions: "",
      consultationMode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Prepare consultation data
      const consultationData = {
        ...values,
        conditionType,
        system,
        disease,
        fee,
        onsetDate: format(values.onsetDate, "PPP"),
        submittedAt: new Date().toISOString(),
      };

      // Here you would typically send this data to your backend/email service
      console.log("Consultation Data:", consultationData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Consultation Request Submitted",
        description: "We've received your consultation request. Please proceed to WhatsApp for immediate consultation.",
      });

      // Redirect to WhatsApp after form submission
      const whatsappMessage = `Hello, I've submitted a consultation request for ${disease} (${conditionType} condition). My payment reference and details have been sent via email. I'm ready for consultation.`;
      const whatsappUrl = `https://wa.me/256745101519?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error submitting your consultation request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <Button variant="outline" onClick={onBack}>← Back to Selection</Button>
        </div>
        <CardTitle className="text-2xl text-center">Consultation Form</CardTitle>
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            <strong>Condition:</strong> {disease} ({conditionType}) • <strong>System:</strong> {system}
          </p>
          <p className="text-lg font-semibold text-garrison-teal">
            Consultation Fee: {fee.toLocaleString()} UGX
          </p>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Patient Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Patient Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                  id="fullName"
                  {...form.register("fullName")}
                  placeholder="Enter your full name"
                />
                {form.formState.errors.fullName && (
                  <p className="text-sm text-red-600">{form.formState.errors.fullName.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="age">Age *</Label>
                <Input
                  id="age"
                  type="number"
                  {...form.register("age")}
                  placeholder="Enter your age"
                />
                {form.formState.errors.age && (
                  <p className="text-sm text-red-600">{form.formState.errors.age.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <Select onValueChange={(value) => form.setValue("gender", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.gender && (
                  <p className="text-sm text-red-600">{form.formState.errors.gender.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="contact">Contact Information *</Label>
                <Input
                  id="contact"
                  {...form.register("contact")}
                  placeholder="Phone number or email"
                />
                {form.formState.errors.contact && (
                  <p className="text-sm text-red-600">{form.formState.errors.contact.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="nationalId">National ID (optional)</Label>
              <Input
                id="nationalId"
                {...form.register("nationalId")}
                placeholder="Enter your National ID"
              />
            </div>
          </div>

          {/* Symptoms Description */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Symptoms Description</h3>
            
            <div>
              <Label htmlFor="symptoms">Describe your symptoms in detail *</Label>
              <Textarea
                id="symptoms"
                {...form.register("symptoms")}
                placeholder="Please describe your symptoms, their severity, and any triggers you've noticed..."
                rows={4}
              />
              {form.formState.errors.symptoms && (
                <p className="text-sm text-red-600">{form.formState.errors.symptoms.message}</p>
              )}
            </div>
          </div>

          {/* Onset & Duration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Onset & Duration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>When did symptoms start? *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !form.watch("onsetDate") && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("onsetDate") ? format(form.watch("onsetDate"), "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={form.watch("onsetDate")}
                      onSelect={(date) => form.setValue("onsetDate", date!)}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.onsetDate && (
                  <p className="text-sm text-red-600">{form.formState.errors.onsetDate.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Input
                  id="duration"
                  {...form.register("duration")}
                  placeholder="e.g., 3 days, 2 weeks"
                />
                {form.formState.errors.duration && (
                  <p className="text-sm text-red-600">{form.formState.errors.duration.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Medical History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Medical History</h3>
            
            <div>
              <Label>Do you have any known medical conditions?</Label>
              <RadioGroup
                value={form.watch("medicalHistory")}
                onValueChange={(value) => form.setValue("medicalHistory", value)}
                className="flex space-x-6 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="history-yes" />
                  <Label htmlFor="history-yes">Yes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="history-no" />
                  <Label htmlFor="history-no">No</Label>
                </div>
              </RadioGroup>
            </div>

            {form.watch("medicalHistory") === "yes" && (
              <div>
                <Label htmlFor="pastConditions">List your past/current medical conditions</Label>
                <Textarea
                  id="pastConditions"
                  {...form.register("pastConditions")}
                  placeholder="Please list any past or current medical conditions, medications you're taking, allergies, etc."
                  rows={3}
                />
              </div>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Upload Previous Reports (if any)</h3>
            
            <div>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-garrison-teal transition-colors">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    Click to upload medical reports, test results, or images
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Supported formats: PDF, JPG, PNG (Max 10MB)
                  </p>
                </div>
              </Label>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
              />
              {files && files.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-green-600">
                    {files.length} file(s) selected
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Consultation Mode */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Preferred Mode of Consultation</h3>
            
            <RadioGroup
              value={form.watch("consultationMode")}
              onValueChange={(value) => form.setValue("consultationMode", value)}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="in-person" id="in-person" />
                <Label htmlFor="in-person" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  In-Person
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Video Call
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="phone" id="phone" />
                <Label htmlFor="phone" className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  Phone Call
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <RadioGroupItem value="chat" id="chat" />
                <Label htmlFor="chat" className="flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat/Message
                </Label>
              </div>
            </RadioGroup>
            {form.formState.errors.consultationMode && (
              <p className="text-sm text-red-600">{form.formState.errors.consultationMode.message}</p>
            )}
          </div>

          {/* Payment Summary */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold mb-4">Consultation Fee Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Condition Type:</span>
                <span className="font-semibold capitalize">{conditionType}</span>
              </div>
              <div className="flex justify-between">
                <span>System:</span>
                <span className="font-semibold">{system}</span>
              </div>
              <div className="flex justify-between">
                <span>Disease/Condition:</span>
                <span className="font-semibold">{disease}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-garrison-teal border-t pt-2">
                <span>Total Fee:</span>
                <span>{fee.toLocaleString()} UGX</span>
              </div>
            </div>
            
            <div className="bg-white rounded-lg p-4 border border-garrison-teal/20">
              <h4 className="font-semibold mb-2 text-garrison-teal">Payment Instructions</h4>
              <p className="text-sm mb-2">📱 Pay via Mobile Money to: <strong>Mr. Kasule</strong></p>
              <p className="text-lg font-bold text-center bg-garrison-teal text-white py-2 rounded mb-2">
                +256761281222
              </p>
              <p className="text-xs text-gray-500 text-center">
                ✅ After payment, submit this form to proceed with WhatsApp consultation
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center pt-6">
            <Button 
              type="submit" 
              className="garrison-btn-primary w-full md:w-auto px-8 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>Processing...</>
              ) : (
                <>
                  Submit Consultation Request & Connect to WhatsApp
                </>
              )}
            </Button>
            
            <p className="text-sm text-gray-600 mt-4">
              After submitting, you'll be redirected to WhatsApp to begin your consultation with Immaculate Nakamya
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ConsultationForm;
