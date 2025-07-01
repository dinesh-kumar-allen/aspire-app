"use client";
import {
    defaultSpendLimitFormFields
} from "@/constants/formConfigs";
import {
    FormField,
    SpendLimitFormData
} from "@/interfaces/cards";
import React, { useCallback, useEffect, useState } from "react";
import FormFieldComponent from "./FormField";

interface SpendLimitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: SpendLimitFormData) => void;
  customFields?: FormField[];
  cardNumber: string;
  "data-testid"?: string;
}

const SpendLimitModal: React.FC<SpendLimitModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cardNumber,
  customFields = defaultSpendLimitFormFields,
  "data-testid": dataTestId,
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    spendLimit: "",
    cardNumber: cardNumber,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = useCallback(
    (formData: Record<string, string>): boolean => {
      const newErrors: Record<string, string> = {};

      customFields.forEach((field) => {
        const value = formData[field.name] || "";

        if (field.required && !value.trim()) {
          newErrors[field.name] = `${field.label} is required`;
          return;
        }

        if (field.validation) {
          const { minLength, maxLength, custom } = field.validation;

          if (minLength && value.length < minLength) {
            newErrors[
              field.name
            ] = `${field.label} must be at least ${minLength} characters`;
          }

          if (maxLength && value.length > maxLength) {
            newErrors[
              field.name
            ] = `${field.label} must be at most ${maxLength} characters`;
          }

          if (custom) {
            const customError = custom(value);
            if (customError) {
              newErrors[field.name] = customError;
            }
          }
        }
      });

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [customFields]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      // to avoid page reload
      e.preventDefault();
      if (validateForm(formData)) {
        const submitData = {
          spendLimit: parseFloat(formData.spendLimit),
          cardNumber: formData.cardNumber,
        };

        onSubmit(submitData);
        onClose();
      }
    },
    [formData, validateForm, onSubmit, onClose]
  );

  const handleInputChange = useCallback(
    (fieldName: string, value: string) => {
      setFormData((prev) => ({ ...prev, [fieldName]: value }));
      if (errors[fieldName]) {
        setErrors((prev) => ({ ...prev, [fieldName]: "" }));
      }
    },
    [errors]
  );

  useEffect(() => {
    if (isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      data-testid={dataTestId}
    >
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Add New Card</h2>
          <button
            onClick={onClose}
            className="text-gray-400  transition-colors cursor-pointer"
            data-testid="close-modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Custom form fields only */}
          {customFields.map((field) => (
            <FormFieldComponent
              key={field.name}
              field={field}
              value={formData[field.name] || ""}
              error={errors[field.name]}
              onChange={(value) => handleInputChange(field.name, value)}
            />
          ))}

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-highlight-blue text-white rounded-lg transition-colors cursor-pointer"
              data-testid="submit-card"
            >
              Set Spend Limit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpendLimitModal;
