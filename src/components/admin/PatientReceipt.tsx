
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
        <div className="text-center mb-8 border-b-2 border-garrison-teal pb-6">
          <img 
            src="/lovable-uploads/53ec9fcd-ff23-422f-9d2a-8e2fb54e60e1.png" 
            alt="Garrison Health Logo" 
            className="h-24 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-garrison-teal">GARRISON HEALTH</h1>
          <p className="text-lg text-garrison-coral mt-2">Professional Healthcare Services</p>
          <p className="text-sm text-garrison-teal/70 mt-1 font-semibold">Your health, Our priority</p>
        </div>

        {/* Receipt Header */}
        <div className="mb-8 bg-gradient-to-r from-garrison-teal/10 to-garrison-coral/10 p-6 rounded-lg border border-garrison-teal/20">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-garrison-teal">CONSULTATION RECEIPT</h2>
            <div className="text-right bg-white p-3 rounded-lg border border-garrison-coral/30">
              <p className="text-sm text-garrison-teal">Receipt No.</p>
              <p className="text-lg font-semibold text-garrison-coral">{receiptNumber}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-garrison-teal font-medium">Date:</p>
              <p className="font-semibold text-gray-800">{currentDate}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Time:</p>
              <p className="font-semibold text-gray-800">{currentTime}</p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-garrison-teal mb-4 border-b-2 border-garrison-coral/50 pb-2">
            PATIENT INFORMATION
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-garrison-teal font-medium">Patient Name:</p>
              <p className="font-semibold text-lg text-gray-800">{patient.patientName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">National ID:</p>
              <p className="font-semibold text-gray-800">{patient.nationalId || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Age:</p>
              <p className="font-semibold text-gray-800">{patient.age || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Phone Number:</p>
              <p className="font-semibold text-gray-800">{patient.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Patient ID:</p>
              <p className="font-semibold text-garrison-coral">#{patient.number.toString().padStart(4, '0')}</p>
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-garrison-teal mb-4 border-b-2 border-garrison-coral/50 pb-2">
            CONSULTATION DETAILS
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-garrison-teal font-medium">Consultation Type:</p>
              <p className="font-semibold text-gray-800">{patient.type}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Consultation Mode:</p>
              <p className="font-semibold text-gray-800">{patient.mode}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Status:</p>
              <p className="font-semibold text-gray-800">{patient.status}</p>
            </div>
            <div>
              <p className="text-sm text-garrison-teal font-medium">Fee:</p>
              <p className="font-semibold text-lg text-garrison-coral bg-garrison-coral/10 px-3 py-1 rounded-lg border border-garrison-coral/30">{patient.fee}</p>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-garrison-teal mb-4 border-b-2 border-garrison-coral/50 pb-2">
            MEDICAL INFORMATION
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-garrison-teal font-medium mb-2">Patient's Symptoms:</p>
              <p className="bg-garrison-teal/5 p-3 rounded-lg border border-garrison-teal/20 min-h-[60px] text-gray-800">
                {patient.symptoms || 'No symptoms recorded'}
              </p>
            </div>
            {patient.medicalHistory && (
              <div>
                <p className="text-sm text-garrison-teal font-medium mb-2">Medical History:</p>
                <p className="bg-garrison-coral/5 p-3 rounded-lg border border-garrison-coral/20 min-h-[60px] text-gray-800">
                  {patient.medicalHistory}
                </p>
              </div>
            )}
            <div>
              <p className="text-sm text-garrison-teal font-medium mb-2">Recommendations:</p>
              <p className="bg-gradient-to-r from-garrison-teal/5 to-garrison-coral/5 p-3 rounded-lg border border-garrison-teal/20 min-h-[60px] text-gray-800">
                {patient.diagnosis || 'No recommendations recorded'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-gradient-to-r from-garrison-teal to-garrison-coral">
          <div className="text-center bg-gradient-to-r from-garrison-teal/5 to-garrison-coral/5 p-4 rounded-lg">
            <p className="text-sm text-garrison-teal mb-2 font-medium">
              Thank you for choosing Garrison Health for your healthcare needs
            </p>
            <p className="text-xs text-garrison-teal/70">
              This is a computer-generated receipt and does not require a signature
            </p>
            <div className="mt-4 pt-4 border-t border-garrison-coral/30">
              <p className="text-xs text-garrison-teal/60">
                Generated on {currentDate} at {currentTime} | Receipt #{receiptNumber}
              </p>
              <p className="text-xs text-garrison-teal/60 mt-1">
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
