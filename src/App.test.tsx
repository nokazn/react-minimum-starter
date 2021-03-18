import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
  it('render App component', () => {
    render(<App />);
    const p = screen.queryByText(/count:/);
    expect(p).toBeVisible();
  });

  it('increment', () => {
    render(<App />);
    const button = () => screen.getByText(/increment/);
    const count = () => screen.getByText(/count/);
    expect(button()).toBeVisible();
    expect(count()).toBeVisible();
    fireEvent.click(button());
    expect(count()).toHaveTextContent(/count:\s1/);
  });

  it('decrement', () => {
    render(<App />);
    const button = () => screen.getByText(/decrement/);
    const count = () => screen.getByText(/count/);
    expect(button()).toBeVisible();
    expect(count()).toBeVisible();
    fireEvent.click(button());
    expect(count()).toHaveTextContent(/count:\s-1/);
  });
});
