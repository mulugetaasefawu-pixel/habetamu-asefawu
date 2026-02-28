import React from 'react';
import { ClipboardList, Calendar, Search, Bell, FileText, Plus, Trash2, LayoutDashboard, BarChart3, Users, Activity, Database } from 'lucide-react';

export type AppTab = 'dashboard' | 'admission' | 'register' | 'followup' | 'reports' | 'users';

interface HeaderProps {
  referralCount: number;
  appointmentCount: number;
  title: string;
  viewMode: 'entry' | 'list';
  setViewMode: (mode: 'entry' | 'list') => void;
  showViewToggle: boolean;
  username: string;
  userRole: string;
  showCounts?: boolean;
  referralLabel?: string;
  appointmentLabel?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  referralCount, 
  appointmentCount,
  title,
  viewMode,
  setViewMode,
  showViewToggle,
  username,
  userRole,
  showCounts = true,
  referralLabel = 'Referrals',
  appointmentLabel = 'Appts'
}) => {
  const initials = username ? username.substring(0, 2).toUpperCase() : 'AD';
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-30">
      <div className="flex items-center space-x-6">
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <div className="h-8 w-px bg-slate-200"></div>
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-11 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 w-72 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center space-x-8">
        {showViewToggle && (
          <div className="flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button 
              onClick={() => setViewMode('entry')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                viewMode === 'entry'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Entry</span>
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center space-x-2 px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                viewMode === 'list'
                  ? 'bg-white text-teal-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>List</span>
            </button>
          </div>
        )}

        {showCounts && (
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 bg-teal-500/10 text-teal-700 px-4 py-1.5 rounded-xl border border-teal-500/10">
              <ClipboardList className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{referralCount} {referralLabel}</span>
            </div>
            <div className="flex items-center space-x-2 bg-blue-500/10 text-blue-700 px-4 py-1.5 rounded-xl border border-blue-500/10">
              <Calendar className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">{appointmentCount} {appointmentLabel}</span>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-4 border-l border-slate-200 pl-8">
          <button className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex flex-col items-end mr-4">
            <p className="text-sm font-bold text-slate-900">{username}</p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{userRole}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-teal-600/20">
            {initials}
          </div>
        </div>
      </div>
    </div>
  );
};

interface RecordControlsProps {
  currentRecordIndex: number;
  totalRecords: number;
  records: { id: string; patientName: string }[];
  onSelectRecord: (index: number) => void;
  onAddNew: () => void;
  onDelete: () => void;
  onSave: () => void;
}

export const RecordControls: React.FC<RecordControlsProps> = ({ 
  currentRecordIndex, 
  totalRecords, 
  records,
  onSelectRecord,
  onAddNew, 
  onDelete,
  onSave
}) => {
  return (
    <div className="flex justify-between items-center px-8 py-5 bg-slate-50/50 border-b border-slate-200">
      <div className="flex items-center space-x-4">
        <span className="text-sm font-bold text-slate-500 uppercase tracking-wider">Navigation</span>
        <div className="flex items-center space-x-2">
          <select 
            value={currentRecordIndex}
            onChange={(e) => onSelectRecord(Number(e.target.value))}
            className="bg-white border border-slate-200 text-slate-900 text-sm font-semibold rounded-xl focus:ring-4 focus:ring-teal-500/10 focus:border-teal-500 block p-2.5 min-w-[240px] shadow-sm transition-all"
          >
            {records.map((rec, index) => {
              // Only show records with patient name OR the currently selected record
              if (!rec.patientName && index !== currentRecordIndex) return null;
              return (
                <option key={rec.id} value={index}>
                  Record #{index + 1} — {rec.patientName || 'Untitled'}
                </option>
              );
            })}
          </select>
          <span className="text-sm font-bold text-slate-400">of {totalRecords}</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={onSave}
          className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
        >
          <FileText className="w-4 h-4" />
          <span>Save Record</span>
        </button>
        <button
          onClick={onAddNew}
          className="flex items-center space-x-2 px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>New Record</span>
        </button>
        <button
          onClick={onDelete}
          className="flex items-center space-x-2 px-6 py-2.5 bg-white text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-50 transition-all active:scale-95"
        >
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};
