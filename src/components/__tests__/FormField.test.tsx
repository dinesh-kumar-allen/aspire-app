import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FormField from '../FormField';
import { FormField as FormFieldType } from '../../interfaces/cards';

const mockTextField: FormFieldType = {
  name: 'cardHolder',
  label: 'Card Holder Name',
  type: 'text',
  placeholder: 'Enter card holder name',
  required: true,
};

const mockSelectField: FormFieldType = {
  name: 'cardType',
  label: 'Card Type',
  type: 'select',
  required: true,
  options: [
    { value: 'debit', label: 'Debit Card' },
    { value: 'credit', label: 'Credit Card' },
  ],
};

const mockNumberField: FormFieldType = {
  name: 'balance',
  label: 'Initial Balance',
  type: 'number',
  placeholder: 'Enter initial balance',
  required: false,
};

describe('FormField Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render text input field correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <FormField
        field={mockTextField}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(getByLabelText(/Card Holder Name/)).toBeInTheDocument();
    expect(getByPlaceholderText('Enter card holder name')).toBeInTheDocument();
  });

  it('should render select field correctly', () => {
    const { getByLabelText, getByRole } = render(
      <FormField
        field={mockSelectField}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(getByLabelText(/Card Type/)).toBeInTheDocument();
    expect(getByRole('combobox')).toBeInTheDocument();
  });

  it('should render number input field correctly', () => {
    const { getByLabelText, getByPlaceholderText } = render(
      <FormField
        field={mockNumberField}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(getByLabelText('Initial Balance')).toBeInTheDocument();
    expect(getByPlaceholderText('Enter initial balance')).toBeInTheDocument();
  });

  it('should call onChange when input value changes', () => {
    const { getByLabelText } = render(
      <FormField
        field={mockTextField}
        value=""
        onChange={mockOnChange}
      />
    );

    const input = getByLabelText(/Card Holder Name/);
    fireEvent.change(input, { target: { value: 'John Doe' } });

    expect(mockOnChange).toHaveBeenCalledWith('John Doe');
  });

  it('should call onChange when select value changes', () => {
    const { getByLabelText } = render(
      <FormField
        field={mockSelectField}
        value=""
        onChange={mockOnChange}
      />
    );

    const select = getByLabelText(/Card Type/);
    fireEvent.change(select, { target: { value: 'credit' } });

    expect(mockOnChange).toHaveBeenCalledWith('credit');
  });

  it('should display error message when error prop is provided', () => {
    const { getByText } = render(
      <FormField
        field={mockTextField}
        value=""
        error="This field is required"
        onChange={mockOnChange}
      />
    );

    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('should apply error styling when error is present', () => {
    const { container } = render(
      <FormField
        field={mockTextField}
        value=""
        error="This field is required"
        onChange={mockOnChange}
      />
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('border-red-500');
  });

  it('should apply disabled styling when disabled prop is true', () => {
    const { container } = render(
      <FormField
        field={mockTextField}
        value=""
        onChange={mockOnChange}
        disabled={true}
      />
    );

    const input = container.querySelector('input');
    expect(input).toHaveClass('bg-gray-100', 'cursor-not-allowed');
    expect(input).toBeDisabled();
  });

  it('should show required asterisk for required fields', () => {
    const { container } = render(
      <FormField
        field={mockTextField}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(container.querySelector('span.text-red-500')).toBeInTheDocument();
  });

  it('should not show required asterisk for non-required fields', () => {
    const { container } = render(
      <FormField
        field={mockNumberField}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(container.querySelector('span.text-red-500')).not.toBeInTheDocument();
  });

  it('should display current value in input', () => {
    const { getByLabelText } = render(
      <FormField
        field={mockTextField}
        value="John Doe"
        onChange={mockOnChange}
      />
    );

    expect(getByLabelText(/Card Holder Name/)).toHaveValue('John Doe');
  });

  it('should render all select options', () => {
    const { getByText } = render(
      <FormField
        field={mockSelectField}
        value=""
        onChange={mockOnChange}
      />
    );

    expect(getByText('Debit Card')).toBeInTheDocument();
    expect(getByText('Credit Card')).toBeInTheDocument();
  });
}); 