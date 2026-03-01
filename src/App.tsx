import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header, RecordControls, AppTab } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Activity } from 'lucide-react';
import { ReferralForm } from './components/ReferralForm';
import { ReferralList } from './components/ReferralList';
import { AppointmentForm } from './components/AppointmentForm';
import { AppointmentList } from './components/AppointmentList';
import { AdmissionForm } from './components/AdmissionForm';
import { AdmissionList } from './components/AdmissionList';
import { Dashboard } from './components/Dashboard';
import { Reports } from './components/Reports';
import { UserManagement } from './components/UserManagement';
import { SignIn } from './components/SignIn';
import { ReferralRecord, initialRecord, AppointmentRecord, initialAppointmentRecord, AdmissionRecord, initialAdmissionRecord } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<string>(() => {
    return localStorage.getItem('currentUser') || '';
  });
  const [userRole, setUserRole] = useState<string>(() => {
    const role = localStorage.getItem('userRole') || 'Admin';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  });
  const [activeTab, setActiveTab] = useState<AppTab>('dashboard');
  const [viewMode, setViewMode] = useState<'entry' | 'list'>('entry');
  
  // Referral State
  const [referralRecords, setReferralRecords] = useState<ReferralRecord[]>(() => {
    const saved = localStorage.getItem('referralRecords');
    return saved ? JSON.parse(saved) : [initialRecord];
  });
  const [currentReferralIndex, setCurrentReferralIndex] = useState(0);
  
  // Appointment State
  const [appointmentRecords, setAppointmentRecords] = useState<AppointmentRecord[]>(() => {
    const saved = localStorage.getItem('appointmentRecords');
    return saved ? JSON.parse(saved) : [initialAppointmentRecord];
  });
  const [currentAppointmentIndex, setCurrentAppointmentIndex] = useState(0);

  // Admission State
  const [admissionRecords, setAdmissionRecords] = useState<AdmissionRecord[]>(() => {
    const saved = localStorage.getItem('admissionRecords');
    return saved ? JSON.parse(saved) : [initialAdmissionRecord];
  });
  const [currentAdmissionIndex, setCurrentAdmissionIndex] = useState(0);

  // Persistence
  useEffect(() => {
    localStorage.setItem('referralRecords', JSON.stringify(referralRecords));
  }, [referralRecords]);

  useEffect(() => {
    localStorage.setItem('appointmentRecords', JSON.stringify(appointmentRecords));
  }, [appointmentRecords]);

  useEffect(() => {
    localStorage.setItem('admissionRecords', JSON.stringify(admissionRecords));
  }, [admissionRecords]);

  const handleSignIn = (username: string, role: string) => {
    setIsAuthenticated(true);
    setUserRole(role);
    setCurrentUser(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', username);
    localStorage.setItem('userRole', role);
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole('Registrar');
    setCurrentUser('');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userRole');
  };

  if (!isAuthenticated) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  const currentReferralRecord = referralRecords[currentReferralIndex];
  const currentAppointmentRecord = appointmentRecords[currentAppointmentIndex];
  const currentAdmissionRecord = admissionRecords[currentAdmissionIndex];

  const handleReferralChange = (field: keyof ReferralRecord, value: any) => {
    if (field === 'mrn') {
      // Only allow digits and max 6 characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
      
      // Check uniqueness if it's a full 6-digit MRN
      if (digitsOnly.length === 6) {
        const isDuplicate = referralRecords.some((rec, idx) => 
          idx !== currentReferralIndex && rec.mrn === digitsOnly
        );
        if (isDuplicate) {
          showToast('MRN already exists!', 'error');
          return;
        }
      }
      value = digitsOnly;
    }

    const updatedRecords = [...referralRecords];
    updatedRecords[currentReferralIndex] = {
      ...updatedRecords[currentReferralIndex],
      [field]: value,
    };
    setReferralRecords(updatedRecords);
  };

  const handleAppointmentChange = (field: keyof AppointmentRecord, value: any) => {
    if (field === 'mrn') {
      // Only allow digits and max 6 characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
      
      // Check uniqueness if it's a full 6-digit MRN
      if (digitsOnly.length === 6) {
        const isDuplicate = appointmentRecords.some((rec, idx) => 
          idx !== currentAppointmentIndex && rec.mrn === digitsOnly
        );
        if (isDuplicate) {
          showToast('MRN already exists!', 'error');
          return;
        }
      }
      value = digitsOnly;
    }

    const updatedRecords = [...appointmentRecords];
    updatedRecords[currentAppointmentIndex] = {
      ...updatedRecords[currentAppointmentIndex],
      [field]: value,
    };
    setAppointmentRecords(updatedRecords);
  };

  const handleAdmissionChange = (field: keyof AdmissionRecord, value: any) => {
    if (field === 'mrn') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6);
      if (digitsOnly.length === 6) {
        const isDuplicate = admissionRecords.some((rec, idx) => 
          idx !== currentAdmissionIndex && rec.mrn === digitsOnly
        );
        if (isDuplicate) {
          showToast('MRN already exists!', 'error');
          return;
        }
      }
      value = digitsOnly;
    }

    const updatedRecords = [...admissionRecords];
    updatedRecords[currentAdmissionIndex] = {
      ...updatedRecords[currentAdmissionIndex],
      [field]: value,
    };
    setAdmissionRecords(updatedRecords);
  };

  const handleAddNewReferral = () => {
    setReferralRecords(prev => {
      const newRecord = {
        ...initialRecord,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sn: prev.length + 1,
      };
      setTimeout(() => setCurrentReferralIndex(prev.length), 0);
      return [...prev, newRecord];
    });
  };

  const handleAddNewAppointment = () => {
    setAppointmentRecords(prev => {
      const newRecord = {
        ...initialAppointmentRecord,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sn: prev.length + 1,
      };
      setTimeout(() => setCurrentAppointmentIndex(prev.length), 0);
      return [...prev, newRecord];
    });
  };

  const handleAddNewAdmission = () => {
    setAdmissionRecords(prev => {
      const newRecord = {
        ...initialAdmissionRecord,
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        sn: prev.length + 1,
      };
      setTimeout(() => setCurrentAdmissionIndex(prev.length), 0);
      return [...prev, newRecord];
    });
  };

  const handleDeleteReferral = (idToDelete?: string) => {
    if (!window.confirm('Are you sure you want to delete this referral record?')) return;
    
    setReferralRecords(prev => {
      const targetIndex = idToDelete 
        ? prev.findIndex(r => r.id === idToDelete) 
        : currentReferralIndex;

      if (targetIndex === -1) return prev;

      const newRecords = prev.filter((_, index) => index !== targetIndex);
      
      if (newRecords.length === 0) {
        setCurrentReferralIndex(0);
        return [{ ...initialRecord, id: `${Date.now()}-${Math.random()}`, sn: 1 }];
      }

      const reindexedRecords = newRecords.map((rec, idx) => ({ ...rec, sn: idx + 1 }));
      
      if (currentReferralIndex >= reindexedRecords.length) {
        setCurrentReferralIndex(reindexedRecords.length - 1);
      } else if (idToDelete && targetIndex < currentReferralIndex) {
        setCurrentReferralIndex(currentReferralIndex - 1);
      }
      
      return reindexedRecords;
    });
    showToast('Record Deleted Successfully');
  };

  const handleDeleteAppointment = (idToDelete?: string) => {
    if (!window.confirm('Are you sure you want to delete this appointment record?')) return;
    
    setAppointmentRecords(prev => {
      const targetIndex = idToDelete 
        ? prev.findIndex(r => r.id === idToDelete) 
        : currentAppointmentIndex;

      if (targetIndex === -1) return prev;

      const newRecords = prev.filter((_, index) => index !== targetIndex);
      
      if (newRecords.length === 0) {
        setCurrentAppointmentIndex(0);
        return [{ ...initialAppointmentRecord, id: `${Date.now()}-${Math.random()}`, sn: 1 }];
      }

      const reindexedRecords = newRecords.map((rec, idx) => ({ ...rec, sn: idx + 1 }));
      
      if (currentAppointmentIndex >= reindexedRecords.length) {
        setCurrentAppointmentIndex(reindexedRecords.length - 1);
      } else if (idToDelete && targetIndex < currentAppointmentIndex) {
        setCurrentAppointmentIndex(currentAppointmentIndex - 1);
      }
      
      return reindexedRecords;
    });
    showToast('Record Deleted Successfully');
  };

  const handleDeleteAdmission = (idToDelete?: string) => {
    if (!window.confirm('Are you sure you want to delete this admission record?')) return;
    
    setAdmissionRecords(prev => {
      const targetIndex = idToDelete 
        ? prev.findIndex(r => r.id === idToDelete) 
        : currentAdmissionIndex;

      if (targetIndex === -1) return prev;

      const newRecords = prev.filter((_, index) => index !== targetIndex);
      
      if (newRecords.length === 0) {
        setCurrentAdmissionIndex(0);
        return [{ ...initialAdmissionRecord, id: `${Date.now()}-${Math.random()}`, sn: 1 }];
      }

      const reindexedRecords = newRecords.map((rec, idx) => ({ ...rec, sn: idx + 1 }));
      
      if (currentAdmissionIndex >= reindexedRecords.length) {
        setCurrentAdmissionIndex(reindexedRecords.length - 1);
      } else if (idToDelete && targetIndex < currentAdmissionIndex) {
        setCurrentAdmissionIndex(currentAdmissionIndex - 1);
      }
      
      return reindexedRecords;
    });
    showToast('Record Deleted Successfully');
  };

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 ${type === 'success' ? 'bg-green-600' : 'bg-red-600'} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 3000);
  };

  const handleSave = () => {
    let currentRecord;
    
    if (activeTab === 'register') {
      currentRecord = currentReferralRecord;
    } else if (activeTab === 'admission') {
      currentRecord = currentAdmissionRecord;
    } else {
      currentRecord = currentAppointmentRecord;
    }
    
    if (!currentRecord.mrn || currentRecord.mrn.length !== 6) {
      showToast('MRN must be exactly 6 digits', 'error');
      return;
    }

    if (!currentRecord.patientName || currentRecord.patientName.trim() === '') {
      showToast('Patient Name is required', 'error');
      return;
    }

    // Date validation for Admission & Discharge
    if (activeTab === 'admission') {
      const admissionRec = currentRecord as any;
      if (admissionRec.dateOfAdmission && admissionRec.dateOfDischarge) {
        const admission = new Date(admissionRec.dateOfAdmission);
        const discharge = new Date(admissionRec.dateOfDischarge);
        if (discharge < admission) {
          showToast('Date of Discharge cannot be prior to Date of Admission', 'error');
          return;
        }
      }
    }

    if (activeTab === 'register') {
      handleAddNewReferral();
    } else if (activeTab === 'followup') {
      handleAddNewAppointment();
    } else if (activeTab === 'admission') {
      handleAddNewAdmission();
    }
    showToast('Record Saved Successfully');
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'admission': return 'Admission & Discharge';
      case 'register': return 'Referral Registration';
      case 'followup': return 'Elective Appointment';
      case 'reports': return 'System Reports';
      case 'users': return 'User Management';
      default: return 'Hospital System';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard referralRecords={referralRecords} appointmentRecords={appointmentRecords} />;
      case 'admission':
        return viewMode === 'entry' ? (
          <>
            <RecordControls 
              currentRecordIndex={currentAdmissionIndex} 
              totalRecords={admissionRecords.filter(r => r.patientName).length}
              records={admissionRecords}
              onSelectRecord={setCurrentAdmissionIndex}
              onAddNew={handleAddNewAdmission}
              onDelete={() => handleDeleteAdmission()}
              onSave={handleSave}
            />
            {currentAdmissionRecord && <AdmissionForm record={currentAdmissionRecord} onChange={handleAdmissionChange} />}
          </>
        ) : (
          <AdmissionList 
            records={admissionRecords.filter(r => r.mrn || r.patientName)} 
            onEdit={(id) => {
              const index = admissionRecords.findIndex(r => r.id === id);
              setCurrentAdmissionIndex(index);
              setViewMode('entry');
            }}
            onDelete={(id) => {
              handleDeleteAdmission(id);
            }}
          />
        );
      case 'reports':
        return <Reports referralRecords={referralRecords} appointmentRecords={appointmentRecords} admissionRecords={admissionRecords} />;
      case 'users':
        return <UserManagement />;
      case 'register':
        return viewMode === 'entry' ? (
          <>
            <RecordControls 
              currentRecordIndex={currentReferralIndex} 
              totalRecords={referralRecords.filter(r => r.patientName).length}
              records={referralRecords}
              onSelectRecord={setCurrentReferralIndex}
              onAddNew={handleAddNewReferral}
              onDelete={() => handleDeleteReferral()}
              onSave={handleSave}
            />
            {currentReferralRecord && <ReferralForm record={currentReferralRecord} onChange={handleReferralChange} />}
          </>
        ) : (
          <ReferralList 
            records={referralRecords.filter(r => r.mrn || r.patientName)} 
            onEdit={(id) => {
              const index = referralRecords.findIndex(r => r.id === id);
              setCurrentReferralIndex(index);
              setViewMode('entry');
            }}
            onDelete={(id) => {
              handleDeleteReferral(id);
            }}
          />
        );
      case 'followup':
        return viewMode === 'entry' ? (
          <>
            <RecordControls 
              currentRecordIndex={currentAppointmentIndex} 
              totalRecords={appointmentRecords.filter(r => r.patientName).length}
              records={appointmentRecords}
              onSelectRecord={setCurrentAppointmentIndex}
              onAddNew={handleAddNewAppointment}
              onDelete={() => handleDeleteAppointment()}
              onSave={handleSave}
            />
            {currentAppointmentRecord && <AppointmentForm record={currentAppointmentRecord} onChange={handleAppointmentChange} />}
          </>
        ) : (
          <AppointmentList 
            records={appointmentRecords.filter(r => r.mrn || r.patientName)} 
            onEdit={(id) => {
              const index = appointmentRecords.findIndex(r => r.id === id);
              setCurrentAppointmentIndex(index);
              setViewMode('entry');
            }}
            onDelete={(id) => {
              handleDeleteAppointment(id);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50/50 font-sans selection:bg-teal-500/30 selection:text-teal-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onSignOut={handleSignOut} userRole={userRole} />
      
      <div className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          referralCount={referralRecords.filter(r => r.patientName).length} 
          appointmentCount={appointmentRecords.filter(r => r.patientName).length} 
          title={getTitle()}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showViewToggle={activeTab === 'register' || activeTab === 'followup' || activeTab === 'admission'}
          username={currentUser}
          userRole={userRole}
          showCounts={true}
          referralLabel={activeTab === 'admission' ? 'Admission' : 'Referrals'}
          appointmentLabel={activeTab === 'admission' ? 'Discharge' : 'Appts'}
        />
        <main className="flex-1 overflow-y-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + viewMode}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
