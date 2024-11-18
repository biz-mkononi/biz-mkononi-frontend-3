// src/components/TextInput.tsx
import React from 'react';
import { useController, Control } from 'react-hook-form';

interface TextInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
}

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  control,
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control });

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-3">
        {label}
      </label>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 bg-transparent text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default TextInput;
