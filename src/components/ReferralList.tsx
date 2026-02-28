import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { ReferralRecord } from '../types';

interface ReferralListProps {
  records: ReferralRecord[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const ReferralList: React.FC<ReferralListProps> = ({ records, onEdit, onDelete }) => {
  const getReferralType = (record: ReferralRecord) => {
    if (record.referralInType) return `In: ${record.referralInType}`;
    if (record.referralOutType) return `Out: ${record.referralOutType}`;
    if (record.coldCaseType) return `Cold: ${record.coldCaseType}`;
    return '—';
  };

  return (
    <div className="p-2 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">S.N.</th>
                <th scope="col" className="px-3 py-2 font-semibold">MRN</th>
                <th scope="col" className="px-3 py-2 font-semibold">Date</th>
                <th scope="col" className="px-3 py-2 font-semibold">Patient Name</th>
                <th scope="col" className="px-3 py-2 font-semibold">Age</th>
                <th scope="col" className="px-3 py-2 font-semibold">Sex</th>
                <th scope="col" className="px-3 py-2 font-semibold">Address</th>
                <th scope="col" className="px-3 py-2 font-semibold">Referral Type</th>
                <th scope="col" className="px-3 py-2 font-semibold">Diagnosis</th>
                <th scope="col" className="px-3 py-2 font-semibold">Referred To</th>
                <th scope="col" className="px-3 py-2 font-semibold">Feedback</th>
                <th scope="col" className="px-3 py-2 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record) => (
                <tr key={record.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-3 py-2 font-medium text-gray-900">{record.sn}</td>
                  <td className="px-3 py-2">{record.mrn || '—'}</td>
                  <td className="px-3 py-2">{record.arrivalDate || '—'}</td>
                  <td className="px-3 py-2 font-medium text-gray-900">{record.patientName || '—'}</td>
                  <td className="px-3 py-2">{record.age || '—'}</td>
                  <td className="px-3 py-2">{record.sex || '—'}</td>
                  <td className="px-3 py-2">
                    {record.woreda || record.kebele ? `${record.woreda || ''} ${record.kebele || ''}` : '—'}
                  </td>
                  <td className="px-3 py-2">{getReferralType(record)}</td>
                  <td className="px-3 py-2">{record.diagnosis || '—'}</td>
                  <td className="px-3 py-2">{record.referredTo || '—'}</td>
                  <td className="px-3 py-2">
                    {record.feedbackReceived ? (
                      <span className="text-green-600 font-medium">Yes</span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => onEdit(record.id)}
                        className="p-1 text-teal-600 hover:bg-teal-50 rounded transition-colors"
                        title="Edit Record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(record.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={12} className="px-3 py-4 text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
