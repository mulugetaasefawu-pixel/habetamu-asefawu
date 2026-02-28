import React, { useState } from 'react';
import { ReferralRecord, AppointmentRecord, AdmissionRecord } from '../types';
import { FileText, Filter, Calculator, Download, Calendar, ChevronRight, Activity, Users, ClipboardList } from 'lucide-react';
import { Input, Select } from './FormElements';
import { motion } from 'motion/react';

interface ReportsProps {
  referralRecords: ReferralRecord[];
  appointmentRecords: AppointmentRecord[];
  admissionRecords: AdmissionRecord[];
}

export const Reports: React.FC<ReportsProps> = ({ referralRecords, appointmentRecords, admissionRecords }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [appliedStartDate, setAppliedStartDate] = useState('');
  const [appliedEndDate, setAppliedEndDate] = useState('');
  const [selectedIndicator, setSelectedIndicator] = useState('');
  const [totalBeds, setTotalBeds] = useState('100'); // Default value for bed occupancy calculation

  const parseDate = (dateStr: string) => {
    if (!dateStr) return null;
    // Handle standard YYYY-MM-DD from input type="date"
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
  };

  const filterByDate = (records: any[], dateField: string) => {
    if (!appliedStartDate && !appliedEndDate) return records;
    
    const start = parseDate(appliedStartDate);
    const end = parseDate(appliedEndDate);
    
    if (end) end.setHours(23, 59, 59, 999);

    return records.filter(record => {
      const recordDateStr = record[dateField];
      if (!recordDateStr) return false;
      const recordDate = new Date(recordDateStr);
      
      if (isNaN(recordDate.getTime())) return false;

      if (start && recordDate < start) return false;
      if (end && recordDate > end) return false;
      return true;
    });
  };

  const handleShowReport = () => {
    setAppliedStartDate(startDate);
    setAppliedEndDate(endDate);
  };

  const handleClear = () => {
    setStartDate('');
    setEndDate('');
    setAppliedStartDate('');
    setAppliedEndDate('');
    setSelectedIndicator('');
  };

  const filteredReferrals = filterByDate(referralRecords.filter(r => r.patientName), 'arrivalDate');
  const filteredAppointments = filterByDate(appointmentRecords.filter(r => r.patientName), 'dateOfVisit');
  const filteredAdmissions = filterByDate(admissionRecords.filter(r => r.patientName), 'dateOfAdmission');
  const filteredDischarges = filterByDate(admissionRecords.filter(r => r.patientName), 'dateOfDischarge');

  const calculateIndicatorValue = () => {
    if (!selectedIndicator) return null;

    const start = parseDate(appliedStartDate);
    const end = parseDate(appliedEndDate);
    const daysInPeriod = (start && end) ? Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1) : 30;

    switch (selectedIndicator) {
      case 'bed_occupancy': {
        let totalDays = 0;
        admissionRecords.filter(r => r.patientName).forEach(rec => {
          if (!rec.dateOfAdmission) return;
          const admDate = new Date(rec.dateOfAdmission);
          const disDate = rec.dateOfDischarge ? new Date(rec.dateOfDischarge) : (end || new Date());
          
          const effectiveStart = start && admDate < start ? start : admDate;
          const effectiveEnd = end && disDate > end ? end : disDate;
          
          if (effectiveStart <= effectiveEnd) {
            totalDays += Math.round((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          }
        });
        const beds = parseInt(totalBeds) || 1;
        return ((totalDays / (beds * daysInPeriod)) * 100).toFixed(1) + '%';
      }
      case 'avg_los': {
        let totalDays = 0;
        const discharges = admissionRecords.filter(r => r.patientName && r.dateOfDischarge);
        discharges.forEach(rec => {
          const startD = new Date(rec.dateOfAdmission);
          const endD = new Date(rec.dateOfDischarge);
          totalDays += Math.round((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24));
        });
        return discharges.length > 0 ? (totalDays / discharges.length).toFixed(1) + ' Days' : '0 Days';
      }
      case 'total_referral_out': {
        const out = filteredReferrals.filter(r => r.referralOutType);
        const emergency = out.filter(r => r.referralType === 'Emergency').length;
        const nonEmergency = out.filter(r => r.referralType === 'Non-Emergency').length;
        const withComm = out.filter(r => r.referralOutType === 'with_comm').length;
        const withoutComm = out.filter(r => r.referralOutType === 'without_comm').length;
        
        return (
          <div className="space-y-4">
            <div className="text-4xl font-bold">{out.length}</div>
            <div className="grid grid-cols-2 gap-6 text-left border-t border-teal-100 pt-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-teal-600 font-bold tracking-wider">By Priority</p>
                <div className="flex justify-between text-sm text-teal-900">
                  <span>Emergency:</span>
                  <span className="font-bold">{emergency}</span>
                </div>
                <div className="flex justify-between text-sm text-teal-900">
                  <span>Non-Emergency:</span>
                  <span className="font-bold">{nonEmergency}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] uppercase text-teal-600 font-bold tracking-wider">By Communication</p>
                <div className="flex justify-between text-sm text-teal-900">
                  <span>With:</span>
                  <span className="font-bold">{withComm}</span>
                </div>
                <div className="flex justify-between text-sm text-teal-900">
                  <span>Without:</span>
                  <span className="font-bold">{withoutComm}</span>
                </div>
              </div>
            </div>
          </div>
        );
      }
      case 'elective_scheduled':
        return appointmentRecords.filter(r => r.patientName).length;
      case 'elective_admitted':
        return appointmentRecords.filter(r => r.patientName && r.dateOfAdmission).length;
      case 'cancelled_lack_blood':
        return appointmentRecords.filter(r => r.patientName && r.isProcedureDone === 'No' && r.cancellationReason === 'lack_of_blood').length;
      case 'inpatient_admissions':
        return filteredAdmissions.length;
      case 'inpatient_discharges':
        return filteredDischarges.length;
      case 'total_beds':
        return totalBeds;
      case 'los_period': {
        let totalDays = 0;
        admissionRecords.filter(r => r.patientName).forEach(rec => {
          if (!rec.dateOfAdmission) return;
          const admDate = new Date(rec.dateOfAdmission);
          const disDate = rec.dateOfDischarge ? new Date(rec.dateOfDischarge) : (end || new Date());
          const effectiveStart = start && admDate < start ? start : admDate;
          const effectiveEnd = end && disDate > end ? end : disDate;
          if (effectiveStart <= effectiveEnd) {
            totalDays += Math.round((effectiveEnd.getTime() - effectiveStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          }
        });
        return totalDays + ' Days';
      }
      case 'los_discharge': {
        let totalDays = 0;
        filteredDischarges.forEach(rec => {
          const startD = new Date(rec.dateOfAdmission);
          const endD = new Date(rec.dateOfDischarge);
          totalDays += Math.round((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24));
        });
        return totalDays + ' Days';
      }
      default:
        return '—';
    }
  };

  const indicatorValue = calculateIndicatorValue();

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">System Reports</h2>
        <p className="text-slate-500 text-sm font-medium">Generate and analyze hospital performance indicators.</p>
      </div>

      <div className="glass-card p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-500/10 p-3 rounded-xl text-teal-600">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Report Configuration</h3>
          </div>
          
          <div className="flex flex-wrap items-end gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
            <div className="w-44">
              <Input 
                label="Start Date" 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="w-44">
              <Input 
                label="End Date" 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <button 
              onClick={handleShowReport}
              className="px-8 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all mb-1 shadow-lg shadow-teal-600/20 active:scale-95"
            >
              Show Report
            </button>
            <button 
              onClick={handleClear}
              className="px-5 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-1"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <Select 
              label="Select Indicator"
              options={[
                { value: 'bed_occupancy', label: '1. Bed occupancy rate' },
                { value: 'avg_los', label: '2. Average length of stay' },
                { value: 'total_referral_out', label: '3. Total referral out' },
                { value: 'elective_scheduled', label: '4. Total number of elective procedures schedule' },
                { value: 'elective_admitted', label: '5. Number of patients who were admitted for elective (non-emergency) surgery' },
                { value: 'cancelled_lack_blood', label: '6. Total number of major elective surgical procedures canceled or referred out due to lack of blood' },
                { value: 'inpatient_admissions', label: '7. Number of inpatient admissions' },
                { value: 'inpatient_discharges', label: '8. Number of inpatient discharges' },
                { value: 'total_beds', label: '9. Total number of beds' },
                { value: 'los_period', label: '10. Length of stay (in days) in the reporting period' },
                { value: 'los_discharge', label: '11. Length of stay (in days) during discharge' }
              ]}
              value={selectedIndicator}
              onChange={(e) => setSelectedIndicator(e.target.value)}
            />
            {selectedIndicator === 'bed_occupancy' || selectedIndicator === 'total_beds' ? (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <Input 
                  label="Total Number of Beds" 
                  type="number" 
                  value={totalBeds}
                  onChange={(e) => setTotalBeds(e.target.value)}
                />
              </motion.div>
            ) : null}
          </div>

          <div className="bg-teal-500/5 p-8 rounded-2xl border border-teal-500/10 flex flex-col items-center justify-center text-center shadow-inner">
            <Calculator className="w-10 h-10 text-teal-600 mb-4" />
            <h3 className="text-xs font-bold text-teal-700 uppercase tracking-[0.2em] mb-3">Indicator Result</h3>
            <div className="text-4xl font-bold text-slate-900">
              {indicatorValue !== null ? indicatorValue : '—'}
            </div>
            {selectedIndicator && (
              <p className="text-xs text-teal-600/70 mt-4 font-medium italic">
                Analysis for {appliedStartDate && appliedEndDate ? `${appliedStartDate} to ${appliedEndDate}` : 'all time'}
              </p>
            )}
          </div>
        </div>

        {!selectedIndicator && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-300">
            <Filter className="w-16 h-16 mb-6 opacity-20" />
            <p className="text-xl font-bold text-slate-400">Select an indicator to begin analysis</p>
            <p className="text-sm font-medium mt-2">Use the configuration panel above to filter by date.</p>
          </div>
        )}
      </div>
    </div>
  );
};
