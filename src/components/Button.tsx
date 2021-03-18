import React from 'react';

type Props = {
  onClick: () => void;
};

export const TEST_ID = 'test';

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button type='button' onClick={onClick} data-testid={TEST_ID}>
      {children}
    </button>
  );
};
