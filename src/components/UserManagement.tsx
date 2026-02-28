import React, { useState } from 'react';
import { User } from '../types';
import { Plus, Trash2, UserPlus, Shield } from 'lucide-react';
import { Input, Select } from './FormElements';

export const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
  });

  const [newUser, setNewUser] = useState<Partial<User>>({
    username: '',
    password: '',
    fullName: '',
    role: 'Registrar'
  });

  const handleAddUser = () => {
    if (!newUser.username || !newUser.fullName || !newUser.password) {
      alert('Please fill in all fields');
      return;
    }

    const user: User = {
      id: String(Date.now()),
      username: newUser.username!,
      password: newUser.password!,
      fullName: newUser.fullName!,
      role: newUser.role as any || 'Registrar',
      createdAt: new Date().toISOString()
    };

    const updatedUsers = [...users, user];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setNewUser({ username: '', password: '', fullName: '', role: 'Registrar' });
  };

  const handleDeleteUser = (id: string) => {
    if (id === '1') {
      alert('Cannot delete the system administrator');
      return;
    }
    const updatedUsers = users.filter(u => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleUpdateRole = (id: string, newRole: User['role']) => {
    const updatedUsers = users.map(u => u.id === id ? { ...u, role: newRole } : u);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const rolePermissions = {
    Admin: ['Patient Registration', 'Appointment Scheduling', 'Dashboard View', 'reports view', 'User Management view'],
    Doctor: ['Patient Registration', 'Appointment Scheduling', 'Dashboard View', 'reports view', 'Admission & Discharge Registration', 'Elective Appointment'],
    Nurse: ['Patient Registration', 'Appointment Scheduling', 'Dashboard View', 'report view', 'Admission & Discharge Registration', 'Elective Appointment'],
    Registrar: ['Patient Registration', 'Appointment Scheduling', 'Dashboard View', 'report view', 'Admission & Discharge Registration', 'Elective Appointment']
  };

  return (
    <div className="p-8 space-y-8 min-h-screen">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">User Management</h2>
        <p className="text-slate-500 text-sm font-medium">Manage system access and user roles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create User Form */}
        <div className="lg:col-span-1 glass-card p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-teal-500/10 p-2.5 rounded-xl text-teal-600">
              <UserPlus className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Create Account</h3>
          </div>
          <div className="space-y-6">
            <Input 
              label="Username" 
              placeholder="Enter username"
              value={newUser.username}
              onChange={(e) => setNewUser({...newUser, username: e.target.value})}
            />
            <Input 
              label="Password" 
              type="password"
              placeholder="Enter password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
            />
            <Input 
              label="Full Name" 
              placeholder="Enter full name"
              value={newUser.fullName}
              onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
            />
            <Select 
              label="Role"
              options={[
                { value: 'Admin', label: 'Admin' },
                { value: 'Doctor', label: 'Doctor' },
                { value: 'Nurse', label: 'Nurse' },
                { value: 'Registrar', label: 'Registrar' }
              ]}
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value as any})}
            />
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Role Permissions</p>
              <div className="flex flex-wrap gap-2">
                {rolePermissions[newUser.role as keyof typeof rolePermissions || 'Registrar'].map((perm, i) => (
                  <span key={i} className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-600">
                    {perm}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={handleAddUser}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-teal-600 text-white rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>
        </div>

        {/* User List */}
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-indigo-500/10 p-2.5 rounded-xl text-indigo-600">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">User Accounts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-[10px] text-slate-500 uppercase font-bold tracking-widest border-b border-slate-100">
                <tr>
                  <th className="px-4 py-4">Username</th>
                  <th className="px-4 py-4">Full Name</th>
                  <th className="px-4 py-4">Role</th>
                  <th className="px-4 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr key={user.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4 font-bold text-slate-900">{user.username}</td>
                    <td className="px-4 py-4 text-slate-600 font-medium">{user.fullName}</td>
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.id, e.target.value as any)}
                        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider outline-none cursor-pointer transition-all ${
                          user.role === 'Admin' ? 'bg-purple-100 text-purple-700' :
                          user.role === 'Doctor' ? 'bg-blue-100 text-blue-700' :
                          user.role === 'Nurse' ? 'bg-teal-100 text-teal-700' :
                          'bg-slate-100 text-slate-700'
                        }`}
                        disabled={user.id === '1'}
                      >
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Nurse">Nurse</option>
                        <option value="Registrar">Registrar</option>
                      </select>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                        disabled={user.id === '1'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
