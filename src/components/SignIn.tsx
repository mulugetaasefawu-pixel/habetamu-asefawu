import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Lock, User as UserIcon, ShieldCheck, Camera } from 'lucide-react';
import { User } from '../types';

interface SignInProps {
  onSignIn: (username: string, role: string) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check users in localStorage
    const savedUsers = localStorage.getItem('users');
    const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());

    if (user) {
      if (user.password && user.password !== password) {
        setError('Invalid password');
        return;
      }
      onSignIn(user.username, user.role);
    } else if (users.length === 0) {
      // Emergency fallback if no users exist
      onSignIn(username, 'Admin');
    } else {
      setError('Invalid username');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md w-full glass-card overflow-hidden relative z-10"
      >
        <div className="p-10">
          <div className="flex flex-col items-center mb-10">
            <div className="relative group">
              <motion.div 
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                onMouseEnter={() => setIsHoveringLogo(true)}
                onMouseLeave={() => setIsHoveringLogo(false)}
                onClick={() => fileInputRef.current?.click()}
                className="bg-white p-3 rounded-2xl mb-6 shadow-2xl w-24 h-24 flex items-center justify-center overflow-hidden border border-white/20 relative cursor-pointer"
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
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500 text-sm font-medium mt-2">Bati Primary Hospital Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Username</label>
              <div className="relative group">
                <UserIcon className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="glass-input block w-full pl-12 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input block w-full pl-12 pr-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-lg border border-red-100"
              >
                {error}
              </motion.p>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-teal-600 text-white py-3.5 rounded-xl text-sm font-bold hover:bg-teal-700 transition-all shadow-lg shadow-teal-600/20 active:scale-95"
            >
              Sign In to Portal
            </motion.button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center">
            <div className="flex items-center space-x-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] font-bold">Secure Access Only</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
