import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button, TEST_ID } from './Button';

const renderButton = (onClick: () => void = () => {}) =>
  render(<Button onClick={onClick}>children</Button>);

describe('Button', () => {
  it('render Button component', () => {
    const { queryByTestId } = renderButton();
    const button = queryByTestId(TEST_ID);
    expect(button).toBeVisible();
  });

  it('execute onClick callback', () => {
    const callback = jest.fn();
    const { getByTestId } = renderButton(callback);
    const button = getByTestId(TEST_ID);
    fireEvent.click(button);
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
