import React from 'react'

const Button = ({ children, className, ...props }) => {
    return (
      <button
        className={`blue text-white px-4 py-2 rounded ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export { Button };  