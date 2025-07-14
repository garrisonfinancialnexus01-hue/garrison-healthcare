
import { useState, useEffect } from 'react';

export interface AdminPatient {
  id: string;
  number: number;
  patientName: string;
  nationalId: string;
  age: string;
  phoneNumber: string;
  type: "Acute" | "Chronic" | "OBS & GYN" | "Paed" | "Surgical";
  fee: "5,000 UGX" | "10,000 UGX";
  mode: "Chat" | "Video Call" | "Phone Call" | "In-Person";
  status: "Completed" | "Pending" | "In Progress" | "Awaiting Payment";
  symptoms: string;
  medicalHistory: string;
  diagnosis: string;
  createdAt: Date;
}

export interface AdminStats {
  totalConsultations: number;
  todaysConsultations: number;
  monthlyRevenue: number;
  activePatients: number;
  completed: number;
  pending: number;
  inProgress: number;
  awaitingPayment: number;
}

export const useAdminPatients = () => {
  const [patients, setPatients] = useState<AdminPatient[]>([]);
  const [stats, setStats] = useState<AdminStats>({
    totalConsultations: 0,
    todaysConsultations: 0,
    monthlyRevenue: 0,
    activePatients: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
    awaitingPayment: 0
  });
  const [nextPatientNumber, setNextPatientNumber] = useState(1);

  // Load data from localStorage on initialization
  useEffect(() => {
    const savedPatients = localStorage.getItem('admin_patients');
    const savedStats = localStorage.getItem('admin_stats');
    const savedNextNumber = localStorage.getItem('admin_next_patient_number');

    if (savedPatients) {
      try {
        const parsed = JSON.parse(savedPatients);
        setPatients(parsed.map((p: any) => ({
          ...p,
          createdAt: new Date(p.createdAt)
        })));
      } catch (error) {
        console.error('Error loading patients:', error);
      }
    }

    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (error) {
        console.error('Error loading stats:', error);
      }
    }

    if (savedNextNumber) {
      setNextPatientNumber(parseInt(savedNextNumber, 10));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('admin_patients', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('admin_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('admin_next_patient_number', nextPatientNumber.toString());
  }, [nextPatientNumber]);

  const addPatient = () => {
    const newPatient: AdminPatient = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      number: nextPatientNumber,
      patientName: '',
      nationalId: '',
      age: '',
      phoneNumber: '',
      type: 'Acute',
      fee: '5,000 UGX',
      mode: 'Chat',
      status: 'Pending',
      symptoms: '',
      medicalHistory: '',
      diagnosis: '',
      createdAt: new Date()
    };

    setPatients(prev => [...prev, newPatient]);
    setNextPatientNumber(prev => prev + 1);
    return newPatient;
  };

  const updatePatient = (id: string, updates: Partial<AdminPatient>) => {
    setPatients(prev => 
      prev.map(patient => 
        patient.id === id 
          ? { ...patient, ...updates }
          : patient
      )
    );
  };

  const deletePatient = (id: string) => {
    setPatients(prev => prev.filter(patient => patient.id !== id));
  };

  const updateStats = (newStats: Partial<AdminStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  };

  return {
    patients,
    stats,
    addPatient,
    updatePatient,
    deletePatient,
    updateStats
  };
};
