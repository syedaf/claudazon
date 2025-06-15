import React, { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';

// ESLint errors intentionally added for testing

interface BadProps {
  name: string;
  age: number;
  isActive: boolean;
}

const TestLinting: NextPage = () => {
  // Unused variable (ESLint error)
  const unusedVariable = 'This should trigger ESLint warning';

  // State without proper typing
  const [data, setData] = useState(null);

  // Missing dependency in useEffect
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(count);
  }, []); // Missing 'count' in dependencies

  // Unused props parameter
  const handleClick = (event, unusedParam) => {
    console.log('clicked');
  };

  // Missing return type annotation
  const badFunction = () => {
    return 'string';
  };

  // Unreachable code
  const unreachableFunction = () => {
    return true;
    console.log('This line is unreachable'); // ESLint error
  };

  // Using == instead of ===
  const checkEquality = (a, b) => {
    return a == b; // Should be ===
  };

  // Missing key prop in map
  const items = ['item1', 'item2', 'item3'];

  return (
    <div>
      <h1>Linting Test Page</h1>
      <p>This file contains intentional linting errors for testing ESLint</p>

      {/* Missing key prop */}
      {items.map(item => (
        <div>{item}</div>
      ))}

      <button onClick={handleClick}>Click me</button>

      {/* Unused import Link should be flagged */}
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default TestLinting;
