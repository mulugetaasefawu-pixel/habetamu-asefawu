export interface User {
  id: string;
  username: string;
  password?: string;
  fullName: string;
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Registrar';
  createdAt: string;
}

export interface ReferralRecord {
  id: string;
  sn: number;
  mrn: string;
  arrivalDate: string;
  arrivalTime: string;
  patientName: string;
  age: string;
  sex: string;
  woreda: string;
  kebele: string;
  
  // Emergency Referral
  referralInType: string;
  referralOutType: string;
  referralType: string;
  
  // Cold Case Referral
  coldCaseType: string;
  
  // Referred From
  referredFrom: string; // Dropdown
  
  // Referral Details
  referralDate: string;
  referralTime: string;
  reasonForReferral: string;
  diagnosis: string;
  referredTo: string;
  transportation: string;
  accompaniedBy: string;
  
  // Referred By
  referredByName: string;
  referredByQualification: string;
  feedbackReceived: boolean;
}

export const initialRecord: ReferralRecord = {
  id: '1',
  sn: 1,
  mrn: '',
  arrivalDate: '',
  arrivalTime: '',
  patientName: '',
  age: '',
  sex: '',
  woreda: '',
  kebele: '',
  referralInType: '',
  referralOutType: '',
  referralType: '',
  coldCaseType: '',
  referredFrom: '',
  referralDate: '',
  referralTime: '',
  reasonForReferral: '',
  diagnosis: '',
  referredTo: '',
  transportation: '',
  accompaniedBy: '',
  referredByName: '',
  referredByQualification: '',
  feedbackReceived: false,
};

export interface AppointmentRecord {
  id: string;
  sn: number;
  dateOfVisit: string;
  mrn: string;
  patientName: string;
  age: string;
  sex: string;
  
  // Address & Contact
  region: string;
  zone: string;
  woreda: string;
  kebele: string;
  phoneNo: string;
  
  // Medical Details
  diagnosis: string;
  dayOfAppointment: string;
  roomWard: string;
  appointmentGivenBy: string;
  isProcedureDone: string;
  cancellationReason: string;
  
  // Admission & Outcome
  dateOfAdmission: string;
  dateOfSurgery: string;
  dateOfDischarge: string;
  outcome: string;
  remark: string;
}

export interface AdmissionRecord {
  id: string;
  sn: number;
  mrn: string;
  patientName: string;
  age: string;
  sex: string;
  woreda: string;
  kebele: string;
  
  // Admission Details
  dateOfAdmission: string;
  timeOfAdmission: string;
  wardRoom: string;
  admittingDiagnosis: string;
  admittingStaff: string;
  
  // Discharge Details
  dateOfDischarge: string;
  timeOfDischarge: string;
  dischargeDiagnosis: string;
  outcome: string;
  remark: string;
}

export const initialAppointmentRecord: AppointmentRecord = {
  id: '1',
  sn: 1,
  dateOfVisit: '',
  mrn: '',
  patientName: '',
  age: '',
  sex: '',
  region: '',
  zone: '',
  woreda: '',
  kebele: '',
  phoneNo: '',
  diagnosis: '',
  dayOfAppointment: '',
  roomWard: '',
  appointmentGivenBy: '',
  isProcedureDone: '',
  cancellationReason: '',
  dateOfAdmission: '',
  dateOfSurgery: '',
  dateOfDischarge: '',
  outcome: '',
  remark: '',
};

export const initialAdmissionRecord: AdmissionRecord = {
  id: '1',
  sn: 1,
  mrn: '',
  patientName: '',
  age: '',
  sex: '',
  woreda: '',
  kebele: '',
  dateOfAdmission: '',
  timeOfAdmission: '',
  wardRoom: '',
  admittingDiagnosis: '',
  admittingStaff: '',
  dateOfDischarge: '',
  timeOfDischarge: '',
  dischargeDiagnosis: '',
  outcome: '',
  remark: '',
};
