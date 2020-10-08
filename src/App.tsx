import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import { Button } from './components/Button';
import './App.scss';

type Props = {};

const App: React.FC<Props> = () => {
  const [count, setCount] = useState(0);
  const onIncrement = () => setCount(count + 1);
  const onDecrement = () => setCount(count - 1);

  return (
    <>
      <p>count: {count}</p>
      <Button onClick={onIncrement}>increment</Button>
      <Button onClick={onDecrement}>decrement</Button>
    </>
  );
};

export default hot(App);
