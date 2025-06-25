import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Accordion from '../Accordion';

const mockProps = {
  title: 'Test Accordion',
  expanded: true,
  onClick: jest.fn(),
};

describe('Accordion Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render children content when expanded', () => {
    const { getByText } = render(
      <Accordion {...mockProps}>
        <div>Accordion content</div>
      </Accordion>
    );

    expect(getByText('Accordion content')).toBeInTheDocument();
  });

  it('should not render children content when not expanded', () => {
    const { queryByText } = render(
      <Accordion {...mockProps} expanded={false}>
        <div>Accordion content</div>
      </Accordion>
    );

    expect(queryByText('Accordion content')).not.toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    const { container } = render(
      <Accordion {...mockProps}>
        <div>Content</div>
      </Accordion>
    );

    const accordion = container.firstChild as HTMLElement;
    expect(accordion).toHaveClass('mb-6');
  });

  it('should render with different titles', () => {
    const { getByText } = render(
      <Accordion {...mockProps} title="Different Title">
        <div>Content</div>
      </Accordion>
    );

    expect(getByText('Different Title')).toBeInTheDocument();
  });

  it('should call onClick when button is clicked', () => {
    const mockOnClick = jest.fn();
    const { getByRole } = render(
      <Accordion {...mockProps} onClick={mockOnClick}>
        <div>Content</div>
      </Accordion>
    );

    fireEvent.click(getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it('should render with complex children', () => {
    const { getByText, getAllByRole } = render(
      <Accordion {...mockProps} title="Test">
        <div>
          <h3>Complex Content</h3>
          <p>Some paragraph text</p>
          <button>Click me</button>
        </div>
      </Accordion>
    );

    expect(getByText('Complex Content')).toBeInTheDocument();
    expect(getByText('Some paragraph text')).toBeInTheDocument();
    expect(getAllByRole('button')).toHaveLength(2); // Accordion button + content button
  });

  it('should render with icon when provided', () => {
    const { getByAltText } = render(
      <Accordion {...mockProps} icon="/test-icon.svg">
        <div>Content</div>
      </Accordion>
    );

    expect(getByAltText('icon')).toBeInTheDocument();
  });

  it('should not render icon when not provided', () => {
    const { queryByAltText } = render(
      <Accordion {...mockProps}>
        <div>Content</div>
      </Accordion>
    );

    expect(queryByAltText('icon')).not.toBeInTheDocument();
  });
}); 