
import { useState, useEffect } from 'react';

export interface Consultation {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  contact: string;
  nationalId?: string;
  condition: string;
  type: "acute" | "chronic";
  system: string;
  fee: number;
  paid: boolean;
  whatsappSent: boolean;
  status: "completed" | "pending" | "awaiting_payment" | "in_progress";
  consultationMode: "chat" | "video" | "phone" | "in-person";
  submittedAt: Date;
  duration?: string;
  rating?: number;
  symptomsDescription?: string;
  onsetDate?: Date;
  medicalHistory?: string;
  attachments?: string[];
}

export const useConsultations = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);

  // Load consultations from localStorage on hook initialization
  useEffect(() => {
    const savedConsultations = localStorage.getItem('doctor_consultations');
    if (savedConsultations) {
      try {
        const parsed = JSON.parse(savedConsultations);
        setConsultations(parsed.map((c: any) => ({
          ...c,
          submittedAt: new Date(c.submittedAt),
          onsetDate: c.onsetDate ? new Date(c.onsetDate) : undefined
        })));
      } catch (error) {
        console.error('Error loading consultations:', error);
      }
    }
  }, []);

  // Save consultations to localStorage whenever they change
  useEffect(() => {
    if (consultations.length > 0) {
      localStorage.setItem('doctor_consultations', JSON.stringify(consultations));
    }
  }, [consultations]);

  const addConsultation = (newConsultation: Omit<Consultation, 'id' | 'submittedAt' | 'status' | 'paid' | 'whatsappSent'>) => {
    const consultation: Consultation = {
      ...newConsultation,
      id: Date.now().toString(),
      submittedAt: new Date(),
      status: 'pending',
      paid: false,
      whatsappSent: false
    };
    
    setConsultations(prev => [...prev, consultation]);
    
    // Show success message
    console.log('New consultation submitted:', consultation);
    
    return consultation;
  };

  const updateConsultation = (id: string, updates: Partial<Consultation>) => {
    setConsultations(prev => 
      prev.map(consultation => 
        consultation.id === id 
          ? { ...consultation, ...updates }
          : consultation
      )
    );
  };

  const deleteConsultation = (id: string) => {
    setConsultations(prev => prev.filter(consultation => consultation.id !== id));
  };

  return {
    consultations,
    addConsultation,
    updateConsultation,
    deleteConsultation
  };
};
