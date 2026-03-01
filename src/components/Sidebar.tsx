import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Activity, 
  BarChart3, 
  LogOut,
  ShieldCheck,
  Camera
} from 'lucide-react';
import { AppTab } from './Header';

interface SidebarProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onSignOut: () => void;
  userRole: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onSignOut, userRole }) => {
  const [logo, setLogo] = useState<string | null>(localStorage.getItem('hospital_logo'));
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setLogo(base64String);
        localStorage.setItem('hospital_logo', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Admin', 'Doctor', 'Nurse', 'Registrar'] },
    { id: 'admission', label: 'Admission & Discharge', icon: Activity, roles: ['Admin', 'Doctor', 'Nurse', 'Registrar'] },
    { id: 'register', label: 'Referral Registration', icon: UserPlus, roles: ['Admin', 'Doctor', 'Nurse', 'Registrar'] },
    { id: 'followup', label: 'Elective Appointment', icon: Activity, roles: ['Admin', 'Doctor', 'Nurse', 'Registrar'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, roles: ['Admin', 'Doctor', 'Nurse', 'Registrar'] },
    { id: 'users', label: 'User Management', icon: ShieldCheck, roles: ['Admin'] },
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.some(role => role.toLowerCase() === userRole.toLowerCase())
  );

  return (
    <div className="w-64 glass-sidebar text-white flex flex-col h-screen sticky top-0 z-40">
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative group">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onMouseEnter={() => setIsHoveringLogo(true)}
              onMouseLeave={() => setIsHoveringLogo(false)}
              className="bg-white p-2 rounded-2xl overflow-hidden w-20 h-20 flex items-center justify-center mb-4 shadow-2xl shadow-black/40 border border-white/10 relative cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <img 
                src={logo || "https://picsum.photos/seed/health/200/200"} 
                alt="Hospital Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <AnimatePresence>
                {isHoveringLogo && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"
                  >
                    <Camera className="w-6 h-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleLogoUpload}
            />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight text-white tracking-tight">Bati Primary</h1>
            <p className="text-[10px] text-teal-400/80 font-bold mt-1 uppercase tracking-[0.2em]">ANRS Health Bureau</p>
            <div className="mt-2 px-2 py-0.5 bg-teal-500/20 rounded-full border border-teal-500/30">
              <p className="text-[8px] text-teal-400 font-black uppercase tracking-widest">{userRole}</p>
            </div>
          </div>
        </div>

        <nav className="space-y-1">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4, backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id as AppTab)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isActive 
                    ? 'bg-teal-600/20 text-teal-400 border border-teal-500/20 shadow-lg shadow-teal-900/20' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-teal-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div 
                    layoutId="activeTab"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.6)]"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-white/5">
        <motion.button 
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          whileTap={{ scale: 0.98 }}
          onClick={onSignOut}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white transition-all duration-300"
        >
          <LogOut className="w-5 h-5 text-slate-500" />
          <span>Sign Out</span>
        </motion.button>
      </div>
    </div>
  );
};
