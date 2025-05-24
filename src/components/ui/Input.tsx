import React from 'react';

interface InputProps {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  required?: boolean;
  className?: string;
  label?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className = '',
  label,
  error,
}) => {
  return (
    <div className="mb-4 w-full">
      {label && (
        <label className="block text-gray-300 mb-2 font-medium">
          {label}
          {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
        className={`input-field ${error ? 'border-error' : ''} ${className}`}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;