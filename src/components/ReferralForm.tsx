import React from 'react';
import { ReferralRecord } from '../types';
import { Input, Select, TextArea } from './FormElements';
import { Users, Activity, ClipboardList, ShieldCheck } from 'lucide-react';

interface ReferralFormProps {
  record: ReferralRecord;
  onChange: (field: keyof ReferralRecord, value: any) => void;
}

export const ReferralForm: React.FC<ReferralFormProps> = ({ record, onChange }) => {
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
          <div className="col-span-3">
            <Input 
              label="Arrival Date" 
              type="date" 
              value={record.arrivalDate}
              onChange={(e) => onChange('arrivalDate', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Arrival Time" 
              type="time" 
              value={record.arrivalTime}
              onChange={(e) => onChange('arrivalTime', e.target.value)}
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
          
          <div className="col-span-6">
            <Input 
              label="Woreda" 
              placeholder="Woreda" 
              value={record.woreda}
              onChange={(e) => onChange('woreda', e.target.value)}
            />
          </div>
          <div className="col-span-6">
            <Input 
              label="Kebele" 
              placeholder="Kebele" 
              value={record.kebele}
              onChange={(e) => onChange('kebele', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Emergency Referral */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-red-500/10 p-2.5 rounded-xl text-red-600">
            <Activity className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Emergency Referral</h2>
        </div>
        <div className="grid grid-cols-3 gap-6">
          <Select 
            label="Referral In" 
            options={[
              { value: 'with_comm', label: 'With communication' },
              { value: 'without_comm', label: 'Without communication' },
              { value: 'self', label: 'Self referral' }
            ]}
            value={record.referralInType}
            onChange={(e) => onChange('referralInType', e.target.value)}
          />
          <Select 
            label="Referral Out" 
            options={[
              { value: 'with_comm', label: 'With communication' },
              { value: 'without_comm', label: 'Without communication' },
              { value: 'ambulance', label: 'ER with Ambulance' }
            ]}
            value={record.referralOutType}
            onChange={(e) => onChange('referralOutType', e.target.value)}
          />
          <Select 
            label="Type of Referral" 
            options={[
              { value: 'Emergency', label: 'Emergency' },
              { value: 'Non-Emergency', label: 'Non-Emergency' }
            ]}
            value={record.referralType}
            onChange={(e) => onChange('referralType', e.target.value)}
          />
        </div>
      </div>

      {/* Cold Case & Referred From */}
      <div className="grid grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <Select 
            label="Cold Case Referral" 
            options={[
              { value: 'out', label: 'Referral Out' },
              { value: 'in', label: 'Referral In' }
            ]}
            value={record.coldCaseType}
            onChange={(e) => onChange('coldCaseType', e.target.value)}
          />
        </div>
        <div className="glass-card p-8">
          <Select 
            label="Referred From"
            options={[
              { value: 'gyn_obs', label: 'Gyn/Obs' },
              { value: 'surgical', label: 'Surgical' },
              { value: 'medical', label: 'Medical' },
              { value: 'ophthalmology', label: 'Ophthalmology' },
              { value: 'pediatrics', label: 'Pediatrics' },
              { value: 'orthopedics', label: 'Orthopedics' },
              { value: 'psychiatry', label: 'Psychiatry' },
              { value: 'dental', label: 'Dental' }
            ]}
            value={record.referredFrom}
            onChange={(e) => onChange('referredFrom', e.target.value)}
          />
        </div>
      </div>

      {/* Referral Details */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-blue-500/10 p-2.5 rounded-xl text-blue-600">
            <ClipboardList className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Referral Details</h2>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <Input 
              label="Referral Date" 
              type="date" 
              value={record.referralDate}
              onChange={(e) => onChange('referralDate', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Referral Time" 
              type="time" 
              value={record.referralTime}
              onChange={(e) => onChange('referralTime', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Select 
              label="Reason for Referral" 
              options={[
                { value: 'lack_of_blood', label: 'Lack of blood' },
                { value: 'sinner_evolution', label: 'Sinner evolution' },
                { value: 'social_reason', label: 'Social Reason' }
              ]}
              value={record.reasonForReferral}
              onChange={(e) => onChange('reasonForReferral', e.target.value)}
            />
          </div>

          <div className="col-span-6">
            <TextArea 
              label="Diagnosis at Referral" 
              placeholder="Diagnosis" 
              value={record.diagnosis}
              onChange={(e) => onChange('diagnosis', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Select 
              label="Referred To" 
              options={[
                { value: 'DCSH', label: 'DCSH' },
                { value: 'KGH', label: 'KGH' },
                { value: 'BGH', label: 'BGH' }
              ]}
              value={record.referredTo}
              onChange={(e) => onChange('referredTo', e.target.value)}
            />
          </div>
          <div className="col-span-3">
            <Input 
              label="Means of Transportation" 
              placeholder="Ambulance, etc." 
              value={record.transportation}
              onChange={(e) => onChange('transportation', e.target.value)}
            />
          </div>

          <div className="col-span-4">
            <Input 
              label="Accompanied By" 
              placeholder="Name" 
              value={record.accompaniedBy}
              onChange={(e) => onChange('accompaniedBy', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Referred By */}
      <div className="glass-card p-8">
        <div className="flex items-center space-x-3 mb-8">
          <div className="bg-teal-500/10 p-2.5 rounded-xl text-teal-600">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Referred By</h2>
        </div>
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-4">
            <Input 
              label="Name" 
              placeholder="Name" 
              value={record.referredByName}
              onChange={(e) => onChange('referredByName', e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <Input 
              label="Qualification" 
              placeholder="Qualification" 
              value={record.referredByQualification}
              onChange={(e) => onChange('referredByQualification', e.target.value)}
            />
          </div>
          <div className="col-span-4 pb-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  checked={record.feedbackReceived}
                  onChange={(e) => onChange('feedbackReceived', e.target.checked)}
                  className="w-5 h-5 text-teal-600 bg-slate-100 border-slate-300 rounded-lg focus:ring-4 focus:ring-teal-500/10 transition-all cursor-pointer"
                />
              </div>
              <span className="text-sm font-bold text-slate-700 group-hover:text-teal-600 transition-colors">Feedback Received/Provided</span>
            </label>
          </div>
        </div>
      </div>

    </div>
  );
};
