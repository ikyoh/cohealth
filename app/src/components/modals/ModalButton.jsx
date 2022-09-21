import React from 'react';

const ModalButton = ({ isActive, children }) => {
  return (
    <button
      className={`float-right mr-3 text-black  p-2 text-2xl border border-gray-600 font-thin
      ${isActive ? "dark:text-white" : "dark:text-gray-600"} 
      }`}
    >
      {children}
    </button>
  )
}

export default ModalButton;
