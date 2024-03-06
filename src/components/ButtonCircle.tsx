import React from "react";

const ButtonCircle = () => {
  return (
    <div className="fixed bottom-4 right-4">
      <button className="btn btn-circle bg-primary hover:bg-primary text-white h-12 w-12 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  );
};

export default ButtonCircle;
