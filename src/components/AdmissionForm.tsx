import React from 'react';
import { AdmissionRecord } from '../types';
import { Input, Select, TextArea } from './FormElements';
import { Users, Activity, FileText } from 'lucide-react';

interface AdmissionFormProps {
  record: AdmissionRecord;
  onChange: (field: keyof AdmissionRecord, value: any) => void;
}

export const AdmissionForm: React.FC<AdmissionFormProps> = ({ record, onChange }) => {
  const isDateInvalid = record.dateOfAdmission && record.dateOfDischarge && new Date(record.dateOfDischarge) < new Date(record.dateOfAdmission);

  return (
    <div className="p-8 space-y-8 min-h-screen">
      
      {isDateInvalid && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-2xl flex items-center space-x-3 animate-pulse">
          <Activity className="w-5 h-5" />
          <span className="text-sm font-bold uppercase tracking-wider">Warning: Date of Discharge is prior to Date of Admission</span>
        </div>
      )}

      {/* Patient Information */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-teal-500/10 p-2.5 rounded-xl text-teal-600">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Patient Information</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-2">
            <Input 
              label="S.N." 
              value={record.sn} 
              readOnly 
              className="bg-slate-100/50 font-mono font-bold text-slate-500"
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
          <div className="col-span-6">
            <Input 
              label="Patient Name" 
              placeholder="Full name" 
              value={record.patientName}
              onChange={(e) => onChange('patientName', e.target.value)}
            />
          </div>
          <div className="col-span-3">
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
        </div>
      </div>

      {/* Admission Details */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-600">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Admission Details</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Input 
              label="Date of Admission" 
              type="date" 
              value={record.dateOfAdmission}
              onChange={(e) => onChange('dateOfAdmission', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Time of Admission" 
              type="time" 
              value={record.timeOfAdmission}
              onChange={(e) => onChange('timeOfAdmission', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Select 
              label="Ward/Room" 
              options={[
                { value: 'Gyn', label: 'Gyn' },
                { value: 'NICU', label: 'NICU' },
                { value: 'OBS', label: 'OBS' },
                { value: 'TRUMA', label: 'TRUMA' },
                { value: 'MEDICAL', label: 'MEDICAL' },
                { value: 'SURGICAL', label: 'SURGICAL' }
              ]}
              value={record.wardRoom}
              onChange={(e) => onChange('wardRoom', e.target.value)}
            />
          </div>
          
          <div className="col-span-6">
            <TextArea 
              label="Admitting Diagnosis" 
              placeholder="Diagnosis at admission" 
              value={record.admittingDiagnosis}
              onChange={(e) => onChange('admittingDiagnosis', e.target.value)}
            />
          </div>
          <div className="col-span-6">
            <Input 
              label="Admitting Staff/Doctor" 
              placeholder="Name" 
              value={record.admittingStaff}
              onChange={(e) => onChange('admittingStaff', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Discharge Details */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-teal-500/10 p-2.5 rounded-xl text-teal-600">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Discharge Details</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold ml-auto">Rule: Discharge ≥ Admission</p>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Input 
              label="Date of Discharge" 
              type="date" 
              value={record.dateOfDischarge}
              onChange={(e) => onChange('dateOfDischarge', e.target.value)}
              error={isDateInvalid ? "Must be after admission" : undefined}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Time of Discharge" 
              type="time" 
              value={record.timeOfDischarge}
              onChange={(e) => onChange('timeOfDischarge', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Select 
              label="Outcome" 
              options={[
                { value: 'Improved', label: 'Improved' },
                { value: 'Died', label: 'Died' },
                { value: 'Referred', label: 'Referred' },
                { value: 'LAMA', label: 'LAMA' },
                { value: 'Stable', label: 'Stable' }
              ]}
              value={record.outcome}
              onChange={(e) => onChange('outcome', e.target.value)}
            />
          </div>
          
          <div className="col-span-6">
            <TextArea 
              label="Discharge Diagnosis" 
              placeholder="Final diagnosis" 
              value={record.dischargeDiagnosis}
              onChange={(e) => onChange('dischargeDiagnosis', e.target.value)}
            />
          </div>
          <div className="col-span-6">
            <TextArea 
              label="Remark" 
              placeholder="Additional notes" 
              value={record.remark}
              onChange={(e) => onChange('remark', e.target.value)}
            />
          </div>
        </div>
      </div>

    </div>
  );
};
