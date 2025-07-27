
import { forwardRef } from 'react';
import { AdminPatient } from '@/hooks/useAdminPatients';
import { format } from 'date-fns';

interface PatientReceiptProps {
  patient: AdminPatient;
  receiptNumber: string;
}

const PatientReceipt = forwardRef<HTMLDivElement, PatientReceiptProps>(
  ({ patient, receiptNumber }, ref) => {
    const currentDate = format(new Date(), 'dd/MM/yyyy');
    const currentTime = format(new Date(), 'HH:mm:ss');

    return (
      <div 
        ref={ref}
        className="bg-white p-8 max-w-2xl mx-auto shadow-lg"
        style={{ width: '210mm', minHeight: '297mm' }} // A4 size
      >
        {/* Header */}
        <div className="text-center mb-8 pb-6" style={{ borderBottom: '2px solid #058789' }}>
          <img 
            src="/lovable-uploads/15493dd0-712c-488a-abae-d3afb022d31f.png" 
            alt="Garrison Healthcare Logo" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold" style={{ color: '#058789' }}>GARRISON HEALTHCARE</h1>
          <div className="mt-3 space-y-1">
            <p className="text-sm font-medium" style={{ color: '#058789' }}>
              Tel: +256745101519 or +256761281222
            </p>
            <p className="text-sm font-semibold" style={{ color: '#E03F3E' }}>Your health, Our priority</p>
          </div>
        </div>

        {/* Receipt Header */}
        <div className="mb-8 p-6 rounded-lg" style={{ 
          background: 'linear-gradient(to right, rgba(5, 135, 137, 0.1), rgba(224, 63, 62, 0.1))', 
          border: '1px solid rgba(5, 135, 137, 0.2)' 
        }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: '#058789' }}>CONSULTATION RECEIPT</h2>
            <div className="text-right bg-white p-3 rounded-lg" style={{ border: '1px solid rgba(224, 63, 62, 0.3)' }}>
              <p className="text-sm" style={{ color: '#058789' }}>Receipt No.</p>
              <p className="text-lg font-semibold" style={{ color: '#E03F3E' }}>{receiptNumber}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Date:</p>
              <p className="font-semibold text-gray-800">{currentDate}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Time:</p>
              <p className="font-semibold text-gray-800">{currentTime}</p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 pb-2" style={{ 
            color: '#058789', 
            borderBottom: '2px solid rgba(224, 63, 62, 0.5)' 
          }}>
            PATIENT INFORMATION
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Patient Name:</p>
              <p className="font-semibold text-lg text-gray-800">{patient.patientName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>National ID:</p>
              <p className="font-semibold text-gray-800">{patient.nationalId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Age:</p>
              <p className="font-semibold text-gray-800">{patient.age || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Phone Number:</p>
              <p className="font-semibold text-gray-800">{patient.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Patient ID:</p>
              <p className="font-semibold" style={{ color: '#E03F3E' }}>#{patient.number.toString().padStart(4, '0')}</p>
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 pb-2" style={{ 
            color: '#058789', 
            borderBottom: '2px solid rgba(224, 63, 62, 0.5)' 
          }}>
            CONSULTATION DETAILS
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Consultation Type:</p>
              <p className="font-semibold text-gray-800">{patient.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Consultation Mode:</p>
              <p className="font-semibold text-gray-800">{patient.mode}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Status:</p>
              <p className="font-semibold text-gray-800">{patient.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: '#058789' }}>Fee:</p>
              <p className="font-semibold text-lg px-3 py-1 rounded-lg" style={{ 
                color: '#E03F3E', 
                backgroundColor: 'rgba(224, 63, 62, 0.1)', 
                border: '1px solid rgba(224, 63, 62, 0.3)' 
              }}>{patient.fee}</p>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 pb-2" style={{ 
            color: '#058789', 
            borderBottom: '2px solid rgba(224, 63, 62, 0.5)' 
          }}>
            MEDICAL INFORMATION
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#058789' }}>Patient's Symptoms:</p>
              <p className="p-3 rounded-lg min-h-[60px] text-gray-800" style={{ 
                backgroundColor: 'rgba(5, 135, 137, 0.05)', 
                border: '1px solid rgba(5, 135, 137, 0.2)' 
              }}>
                {patient.symptoms || 'No symptoms recorded'}
              </p>
            </div>
            {patient.medicalHistory && (
              <div>
                <p className="text-sm font-medium mb-2" style={{ color: '#058789' }}>Medical History:</p>
                <p className="p-3 rounded-lg min-h-[60px] text-gray-800" style={{ 
                  backgroundColor: 'rgba(224, 63, 62, 0.05)', 
                  border: '1px solid rgba(224, 63, 62, 0.2)' 
                }}>
                  {patient.medicalHistory}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: '#058789' }}>Recommendations:</p>
              <p className="p-3 rounded-lg min-h-[60px] text-gray-800" style={{ 
                background: 'linear-gradient(to right, rgba(5, 135, 137, 0.05), rgba(224, 63, 62, 0.05))', 
                border: '1px solid rgba(5, 135, 137, 0.2)' 
              }}>
                {patient.diagnosis || 'No recommendations recorded'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6" style={{ borderTop: '2px solid #058789' }}>
          <div className="text-center p-4 rounded-lg" style={{ 
            background: 'linear-gradient(to right, rgba(5, 135, 137, 0.05), rgba(224, 63, 62, 0.05))' 
          }}>
            <p className="text-sm mb-2 font-medium" style={{ color: '#058789' }}>
              Thank you for choosing Garrison Healthcare for your healthcare needs
            </p>
            <p className="text-xs" style={{ color: 'rgba(5, 135, 137, 0.7)' }}>
              This is a computer-generated receipt and does not require a signature
            </p>
            <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(224, 63, 62, 0.3)' }}>
              <p className="text-xs" style={{ color: 'rgba(5, 135, 137, 0.6)' }}>
                Generated on {currentDate} at {currentTime} | Receipt #{receiptNumber}
              </p>
              <p className="text-xs mt-1" style={{ color: 'rgba(5, 135, 137, 0.6)' }}>
                Patient: {patient.patientName} | ID: #{patient.number.toString().padStart(4, '0')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PatientReceipt.displayName = 'PatientReceipt';

export default PatientReceipt;
