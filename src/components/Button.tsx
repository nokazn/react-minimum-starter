import React from 'react';

type Props = {
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ onClick, children }) => {
  return (
    <button type='button' onClick={onClick}>
      {children}
    </button>
  );
};
