import React from 'react';
import { AdmissionRecord } from '../types';
import { Edit2, Trash2 } from 'lucide-react';

interface AdmissionListProps {
  records: AdmissionRecord[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const AdmissionList: React.FC<AdmissionListProps> = ({ records, onEdit, onDelete }) => {
  const calculateLOS = (admission: string, discharge: string) => {
    if (!admission || !discharge) return '—';
    const start = new Date(admission);
    const end = new Date(discharge);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return '—';
    
    // Reset hours to compare dates only
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    return diffDays < 0 ? 'Invalid' : `${diffDays} Days`;
  };

  return (
    <div className="p-4 min-h-screen">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-gray-500">
            <thead className="text-[10px] text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">S.N.</th>
                <th scope="col" className="px-3 py-2 font-semibold">MRN</th>
                <th scope="col" className="px-3 py-2 font-semibold">Patient Name</th>
                <th scope="col" className="px-3 py-2 font-semibold">Admission Date</th>
                <th scope="col" className="px-3 py-2 font-semibold">Ward</th>
                <th scope="col" className="px-3 py-2 font-semibold">Discharge Date</th>
                <th scope="col" className="px-3 py-2 font-semibold">LOS (Days)</th>
                <th scope="col" className="px-3 py-2 font-semibold">Outcome</th>
                <th scope="col" className="px-3 py-2 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-3 py-2 font-medium text-gray-900">{record.sn}</td>
                  <td className="px-3 py-2">{record.mrn}</td>
                  <td className="px-3 py-2 font-medium text-gray-900">{record.patientName}</td>
                  <td className="px-3 py-2">{record.dateOfAdmission || '—'}</td>
                  <td className="px-3 py-2">{record.wardRoom || '—'}</td>
                  <td className="px-3 py-2">{record.dateOfDischarge || '—'}</td>
                  <td className="px-3 py-2 font-medium text-indigo-600">
                    {calculateLOS(record.dateOfAdmission, record.dateOfDischarge)}
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      record.outcome === 'Improved' ? 'bg-green-100 text-green-700' :
                      record.outcome === 'Died' ? 'bg-red-100 text-red-700' :
                      record.outcome === 'Referred' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {record.outcome || 'Pending'}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex justify-end space-x-1">
                      <button 
                        onClick={() => onEdit(record.id)}
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => onDelete(record.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {records.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-3 py-8 text-center text-gray-400 italic">
                    No admission records found.
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
