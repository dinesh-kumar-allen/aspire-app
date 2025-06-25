import React from 'react';
import { FormField as FormFieldType } from '@/interfaces/cards';

interface FormFieldProps {
  field: FormFieldType;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  field,
  value,
  error,
  onChange,
  disabled = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  const getInputClassName = () => {
    const baseClasses = "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500";
    return `${baseClasses} ${error ? "border-red-500" : "border-gray-300"} ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}`;
  };

  const fieldId = `field-${field.name}`;

  const renderInput = () => {
    switch (field.type) {
      case 'select':
        return (
          <select
            id={fieldId}
            value={value}
            onChange={handleChange}
            className={getInputClassName()}
            disabled={disabled}
          >
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'number':
        return (
          <input
            id={fieldId}
            type="number"
            value={value}
            onChange={handleChange}
            className={getInputClassName()}
            placeholder={field.placeholder}
            step="0.01"
            min="0"
            disabled={disabled}
          />
        );

      default:
        return (
          <input
            id={fieldId}
            type={field.type}
            value={value}
            onChange={handleChange}
            className={getInputClassName()}
            placeholder={field.placeholder}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-2">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {renderInput()}
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormField; 