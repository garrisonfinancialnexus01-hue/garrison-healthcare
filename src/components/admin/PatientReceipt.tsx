
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
            src="/garrison-health-logo.png" 
            alt="Garrison Health Logo" 
            className="h-20 mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-garrison-teal">GARRISON HEALTH</h1>
          <p className="text-lg text-gray-600 mt-2">Professional Healthcare Services</p>
          <p className="text-sm text-gray-500 mt-1">Excellence in Medical Care</p>
        </div>

        {/* Receipt Header */}
        <div className="mb-8 bg-garrison-teal/5 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-garrison-teal">CONSULTATION RECEIPT</h2>
            <div className="text-right">
              <p className="text-sm text-gray-600">Receipt No.</p>
              <p className="text-lg font-semibold text-garrison-teal">{receiptNumber}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Date:</p>
              <p className="font-semibold">{currentDate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Time:</p>
              <p className="font-semibold">{currentTime} (Uganda Time)</p>
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-garrison-teal mb-4 border-b border-garrison-teal/30 pb-2">
            PATIENT INFORMATION
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Patient Name:</p>
              <p className="font-semibold text-lg">{patient.patientName || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Age:</p>
              <p className="font-semibold">{patient.age || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone Number:</p>
              <p className="font-semibold">{patient.phoneNumber || 'N/A'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Patient ID:</p>
              <p className="font-semibold">#{patient.number.toString().padStart(4, '0')}</p>
            </div>
          </div>
        </div>

        {/* Consultation Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-garrison-teal mb-4 border-b border-garrison-teal/30 pb-2">
            CONSULTATION DETAILS
          </h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Consultation Type:</p>
              <p className="font-semibold">{patient.type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Consultation Mode:</p>
              <p className="font-semibold">{patient.mode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Status:</p>
              <p className="font-semibold">{patient.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Fee:</p>
              <p className="font-semibold text-lg text-garrison-teal">{patient.fee}</p>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-garrison-teal mb-4 border-b border-garrison-teal/30 pb-2">
            MEDICAL INFORMATION
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Patient's Symptoms:</p>
              <p className="bg-gray-50 p-3 rounded border min-h-[60px]">
                {patient.symptoms || 'No symptoms recorded'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Possible Diagnosis:</p>
              <p className="bg-gray-50 p-3 rounded border min-h-[60px]">
                {patient.diagnosis || 'No diagnosis recorded'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t-2 border-garrison-teal">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">
              Thank you for choosing Garrison Health for your healthcare needs
            </p>
            <p className="text-xs text-gray-500">
              This is a computer-generated receipt and does not require a signature
            </p>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-400">
                Generated on {currentDate} at {currentTime} | Receipt #{receiptNumber}
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
