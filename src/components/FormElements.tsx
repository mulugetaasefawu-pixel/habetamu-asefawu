import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ label, className = '', error, ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <input
      className={`glass-input block w-full px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all ${
        error ? 'border-red-500 ring-2 ring-red-500/10' : ''
      }`}
      {...props}
    />
    {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1">{error}</span>}
  </div>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  className?: string;
  error?: string;
}

export const Select: React.FC<SelectProps> = ({ label, options, className = '', error, ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <select
      className={`glass-input block w-full px-4 py-2.5 text-sm text-slate-900 outline-none appearance-none cursor-pointer transition-all ${
        error ? 'border-red-500 ring-2 ring-red-500/10' : ''
      }`}
      {...props}
    >
      <option value="">Select Option</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
    {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1">{error}</span>}
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  className?: string;
  error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, className = '', error, ...props }) => (
  <div className={`flex flex-col space-y-1.5 ${className}`}>
    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">{label}</label>
    <textarea
      className={`glass-input block w-full px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all ${
        error ? 'border-red-500 ring-2 ring-red-500/10' : ''
      }`}
      rows={3}
      {...props}
    />
    {error && <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1">{error}</span>}
  </div>
);

interface RadioGroupProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, options, value, onChange, className = '' }) => (
  <div className={`flex flex-col ${className}`}>
    <label className="text-sm font-semibold text-gray-700 mb-2">{label}</label>
    <div className="space-y-2">
      {options.map((opt) => (
        <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500"
          />
          <span className="text-sm text-gray-900">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

interface CheckboxGroupProps {
  label: string;
  options: { value: string; label: string }[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
  className?: string;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, options, selectedValues, onChange, className = '' }) => {
  const handleChange = (value: string, checked: boolean) => {
    if (checked) {
      onChange([...selectedValues, value]);
    } else {
      onChange(selectedValues.filter((v) => v !== value));
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <label className="text-sm font-semibold text-gray-700 mb-2">{label}</label>
      <div className="grid grid-cols-2 gap-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              value={opt.value}
              checked={selectedValues.includes(opt.value)}
              onChange={(e) => handleChange(opt.value, e.target.checked)}
              className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500"
            />
            <span className="text-sm text-gray-900">{opt.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};
