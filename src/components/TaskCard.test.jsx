import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TaskCard } from './TaskCard.jsx';
import React from 'react';

describe('TaskCard Component', () => {
  const mockTask = {
    id: 1,
    title: 'Implement Local Database',
    priority: 'High',
    status: 'in-progress',
    deadline: Date.now() + 86400000,
  };

  it('renders the task title correctly', () => {
    render(<TaskCard task={mockTask} onClick={() => {}} />);
    expect(screen.getByText('Implement Local Database')).toBeTruthy();
  });

  it('shows Overdue badge when deadline has passed', () => {
    const overdueTask = {
      ...mockTask,
      deadline: Date.now() - 3600000,
    };
    render(<TaskCard task={overdueTask} onClick={() => {}} />);
    expect(screen.getByText('Overdue')).toBeTruthy();
    expect(screen.getByText('OVR')).toBeTruthy();
  });
});
