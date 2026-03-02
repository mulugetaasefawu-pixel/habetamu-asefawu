import React, { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Mail, ShieldCheck, Camera, UserPlus } from 'lucide-react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { supabase } from '../supabaseClient';

gsap.registerPlugin(Draggable);

interface SignUpProps {
  onSignUpSuccess: (username: string, role: string) => void;
  onToggleSignIn: () => void;
}

export const SignUp: React.FC<SignUpProps> = ({ onSignUpSuccess, onToggleSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [logo, setLogo] = useState<string | null>(localStorage.getItem('hospital_logo'));
  const [isOn, setIsOn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const cordBeadRef = useRef<SVGCircleElement>(null);
  const cordLineRef = useRef<SVGLineElement>(null);
  const hitAreaRef = useRef<SVGCircleElement>(null);
  const lampRef = useRef<HTMLDivElement>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
    } else if (data.user) {
      if (data.session) {
        // Auto-login if session exists (email confirmation disabled)
        onSignUpSuccess(data.user.email || 'User', 'Admin');
      } else {
        // Session is null, email confirmation is likely enabled
        setSuccessMessage('Check your email and confirm your account before logging in.');
      }
    }
  };

  const toggleLamp = () => {
    setIsOn(prev => !prev);
    const clickSound = new Audio("https://assets.codepen.io/605876/click.mp3");
    clickSound.play().catch(() => {});
  };

  useLayoutEffect(() => {
    if (!hitAreaRef.current || !cordBeadRef.current || !cordLineRef.current) return;

    const draggable = Draggable.create(hitAreaRef.current, {
      type: "y",
      bounds: { minY: 0, maxY: 60 },
      onDrag: function() {
        gsap.set(cordBeadRef.current, { y: this.y });
        gsap.set(cordLineRef.current, { attr: { y2: 180 + this.y } });
      },
      onRelease: function() {
        if (this.y > 30) {
          toggleLamp();
        }
        
        gsap.to([cordBeadRef.current, hitAreaRef.current], { y: 0, duration: 0.5, ease: "back.out(2.5)" });
        gsap.to(cordLineRef.current, { attr: { y2: 180 }, duration: 0.5, ease: "back.out(2.5)" });
      }
    });

    return () => {
      if (draggable[0]) draggable[0].kill();
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-500 flex items-center justify-center p-4 relative overflow-hidden ${isOn ? 'bg-[#1c1f24]' : 'bg-[#121417]'}`}>
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{ 
          background: 'radial-gradient(circle at 50% 40%, rgba(255, 214, 110, 0.3), transparent 70%)',
          opacity: isOn ? 1 : 0
        }}
      />

      <div className="container max-w-5xl w-full flex flex-wrap items-center justify-center gap-12 z-10">
        <div className="lamp-wrapper relative w-[280px] h-[400px] flex justify-center" ref={lampRef}>
          <svg className="lamp-svg w-full h-full overflow-visible" viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
            <ellipse 
              className={`transition-opacity duration-500 blur-[15px] fill-[#ffdb8a] ${isOn ? 'opacity-60' : 'opacity-0'}`} 
              cx="100" cy="110" rx="60" ry="30" 
            />
            <rect fill="#d1ccc2" x="92" y="100" width="16" height="160" rx="8" />
            <rect fill="#d1ccc2" x="60" y="250" width="80" height="12" rx="6" />
            <g className="pull-cord">
              <line ref={cordLineRef} stroke="#555" strokeWidth="2" x1="130" y1="110" x2="130" y2="180" />
              <circle ref={cordBeadRef} fill="#d4a373" cx="130" cy="190" r="6" />
              <circle ref={hitAreaRef} cx="130" cy="190" r="25" fill="transparent" className="cursor-pointer" />
            </g>
            <path 
              className={`transition-all duration-500 ${isOn ? 'fill-white drop-shadow-[0_0_30px_rgba(255,255,200,0.4)]' : 'fill-[#f5f0e6]'}`}
              d="M30 110 C 30 50, 170 50, 170 110 C 170 125, 30 125, 30 110 Z" 
            />
            <foreignObject x="70" y="65" width="60" height="60">
              <div 
                className="w-full h-full flex items-center justify-center cursor-pointer group"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                  <img 
                    src={logo || "https://picsum.photos/seed/health/200/200"} 
                    alt="Hospital Logo" 
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </foreignObject>
          </svg>
          <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
        </div>

        <div className={`login-form bg-white/5 backdrop-blur-[20px] p-10 rounded-[30px] w-[340px] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${isOn ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-[30px] pointer-events-none'}`}>
          <h2 className="text-white text-center text-2xl font-medium mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="block text-[#999] text-sm mb-2 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-transparent rounded-[15px] text-white outline-none focus:border-[#d4a373] focus:bg-white/[0.12] transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="block text-[#999] text-sm mb-2 ml-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-white/10 border border-transparent rounded-[15px] text-white outline-none focus:border-[#d4a373] focus:bg-white/[0.12] transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-red-500 text-xs font-bold text-center bg-red-50/10 py-2 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.p>
            )}

            {successMessage && (
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-teal-400 text-xs font-bold text-center bg-teal-50/10 py-3 px-4 rounded-lg border border-teal-500/20"
              >
                {successMessage}
              </motion.p>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#aa771c] rounded-[15px] font-semibold text-[#121417] hover:scale-[1.02] transition-all active:scale-95"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center">
            <button 
              onClick={onToggleSignIn}
              className="text-[#d4a373] text-sm hover:underline"
            >
              Already have an account? Sign In
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#d4a373]" />
              <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Secure Registration</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
