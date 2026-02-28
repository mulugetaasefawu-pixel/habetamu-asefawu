import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ReferralRecord, AppointmentRecord } from '../types';
import { ClipboardList, Calendar, TrendingUp, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface DashboardProps {
  referralRecords: ReferralRecord[];
  appointmentRecords: AppointmentRecord[];
}

export const Dashboard: React.FC<DashboardProps> = ({ referralRecords, appointmentRecords }) => {
  const filteredReferrals = referralRecords.filter(r => r.patientName);
  const filteredAppointments = appointmentRecords.filter(r => r.patientName);

  // Process data for charts
  const referralData = [
    { name: 'Referral In', value: filteredReferrals.filter(r => r.referralInType).length },
    { name: 'Referral Out', value: filteredReferrals.filter(r => r.referralOutType).length },
    { name: 'Cold Case', value: filteredReferrals.filter(r => r.coldCaseType).length },
  ];

  const outcomeData = [
    { name: 'Improved', value: filteredAppointments.filter(r => r.outcome === 'Improved').length },
    { name: 'Same', value: filteredAppointments.filter(r => r.outcome === 'Same').length },
    { name: 'Deteriorated', value: filteredAppointments.filter(r => r.outcome === 'Deteriorated').length },
    { name: 'Died', value: filteredAppointments.filter(r => r.outcome === 'Died').length },
  ];

  const COLORS = ['#0d9488', '#0891b2', '#4f46e5', '#ef4444'];

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Dashboard Overview</h2>
        <p className="text-slate-500 text-sm font-medium">Real-time hospital performance and patient metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex items-center space-x-5"
        >
          <div className="bg-teal-500/10 p-4 rounded-2xl text-teal-600 shadow-inner">
            <ClipboardList className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Total Referrals</p>
            <p className="text-3xl font-bold text-slate-900">{filteredReferrals.length}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex items-center space-x-5"
        >
          <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-600 shadow-inner">
            <Calendar className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Appointments</p>
            <p className="text-3xl font-bold text-slate-900">{filteredAppointments.length}</p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex items-center space-x-5"
        >
          <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-600 shadow-inner">
            <TrendingUp className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Feedback Rate</p>
            <p className="text-3xl font-bold text-slate-900">
              {filteredReferrals.length > 0 
                ? Math.round((filteredReferrals.filter(r => r.feedbackReceived).length / filteredReferrals.length) * 100) 
                : 0}%
            </p>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card p-6 flex items-center space-x-5"
        >
          <div className="bg-purple-500/10 p-4 rounded-2xl text-purple-600 shadow-inner">
            <Users className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Active Users</p>
            <p className="text-3xl font-bold text-slate-900">12</p>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Referral Distribution</h3>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-teal-500"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Volume</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referralData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Bar dataKey="value" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Appointment Outcomes</h3>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Status</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={outcomeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {outcomeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(226, 232, 240, 0.5)',
                    borderRadius: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
