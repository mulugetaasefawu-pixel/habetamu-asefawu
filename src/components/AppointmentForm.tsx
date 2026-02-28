import React from 'react';
import { AppointmentRecord } from '../types';
import { Input, Select, TextArea } from './FormElements';
import { Users, Calendar, Activity, ClipboardList, MapPin, Phone } from 'lucide-react';

interface AppointmentFormProps {
  record: AppointmentRecord;
  onChange: (field: keyof AppointmentRecord, value: any) => void;
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({ record, onChange }) => {
  return (
    <div className="p-8 space-y-8 min-h-screen">
      
      {/* Patient Information */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-teal-500/10 p-2.5 rounded-xl text-teal-600">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Patient Information</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-1">
            <Input 
              label="S.No" 
              value={record.sn} 
              readOnly 
              className="bg-slate-100/50 font-mono font-bold text-slate-500"
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Date of Visit" 
              type="date"
              value={record.dateOfVisit}
              onChange={(e) => onChange('dateOfVisit', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="MRN" 
              placeholder="6-digit MRN" 
              value={record.mrn}
              maxLength={6}
              onChange={(e) => onChange('mrn', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Patient Name" 
              placeholder="Full name" 
              value={record.patientName}
              onChange={(e) => onChange('patientName', e.target.value)}
            />
          </div>
          
          <div className="col-span-2">
            <Input 
              label="Age" 
              placeholder="Age" 
              value={record.age}
              onChange={(e) => onChange('age', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Select 
              label="Sex" 
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]}
              value={record.sex}
              onChange={(e) => onChange('sex', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Address & Contact */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Address & Contact</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Input 
              label="Region" 
              placeholder="Region" 
              value={record.region}
              onChange={(e) => onChange('region', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Zone" 
              placeholder="Zone" 
              value={record.zone}
              onChange={(e) => onChange('zone', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Woreda" 
              placeholder="Woreda" 
              value={record.woreda}
              onChange={(e) => onChange('woreda', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Kebele" 
              placeholder="Kebele" 
              value={record.kebele}
              onChange={(e) => onChange('kebele', e.target.value)}
            />
          </div>
          <div className="col-span-6">
            <div className="relative">
              <Phone className="w-4 h-4 absolute left-4 top-[38px] text-slate-400" />
              <Input 
                label="Phone No." 
                placeholder="Phone number" 
                value={record.phoneNo}
                className="pl-8"
                onChange={(e) => onChange('phoneNo', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Medical Details */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-teal-500/10 p-2.5 rounded-xl text-teal-600">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Medical Details</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <TextArea 
              label="Diagnosis" 
              placeholder="Diagnosis" 
              value={record.diagnosis}
              onChange={(e) => onChange('diagnosis', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Day of Appointment" 
              type="date"
              value={record.dayOfAppointment}
              onChange={(e) => onChange('dayOfAppointment', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Room/Ward of Appointment" 
              placeholder="Room/Ward" 
              value={record.roomWard}
              onChange={(e) => onChange('roomWard', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Appointment Given By" 
              placeholder="Name" 
              value={record.appointmentGivenBy}
              onChange={(e) => onChange('appointmentGivenBy', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Select 
              label="Elective Procedures is Done" 
              options={[
                { value: 'Yes', label: 'Yes' },
                { value: 'No', label: 'No' }
              ]}
              value={record.isProcedureDone}
              onChange={(e) => onChange('isProcedureDone', e.target.value)}
            />
          </div>
          {record.isProcedureDone === 'No' && (
            <div className="col-span-4">
              <Select 
                label="Cancellation" 
                options={[
                  { value: 'lack_of_blood', label: 'Lack of blood' },
                  { value: 'lack_of_electricity', label: 'Lack of electricity' },
                  { value: 'instrumental_failure', label: 'Instrumental failure' }
                ]}
                value={record.cancellationReason}
                onChange={(e) => onChange('cancellationReason', e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* Admission & Outcome */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-600">
            <Calendar className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admission & Outcome</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Input 
              label="Date of Admission" 
              type="date"
              value={record.dateOfAdmission}
              onChange={(e) => onChange('dateOfAdmission', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Date of Surgery" 
              type="date"
              value={record.dateOfSurgery}
              onChange={(e) => onChange('dateOfSurgery', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Date of Discharge" 
              type="date"
              value={record.dateOfDischarge}
              onChange={(e) => onChange('dateOfDischarge', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Select 
              label="Outcome" 
              options={[
                { value: 'Improved', label: 'Improved' },
                { value: 'Same', label: 'Same' },
                { value: 'Deteriorated', label: 'Deteriorated' },
                { value: 'Died', label: 'Died' }
              ]}
              value={record.outcome}
              onChange={(e) => onChange('outcome', e.target.value)}
            />
          </div>
          <div className="col-span-12">
            <TextArea 
              label="Remark" 
              placeholder="Remark" 
              value={record.remark}
              onChange={(e) => onChange('remark', e.target.value)}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
