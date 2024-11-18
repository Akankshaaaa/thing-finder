import React from 'react';

const Logo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizes[size]} relative animate-float`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Main circle */}
        <circle cx="50" cy="50" r="45" fill="#A8D8EA" />
        
        {/* Magnifying glass handle */}
        <path
          d="M65,65 L85,85"
          stroke="#FFCAD4"
          strokeWidth="8"
          strokeLinecap="round"
        />
        
        {/* Magnifying glass circle */}
        <circle cx="45" cy="45" r="25" fill="#E4C1F9" />
        <circle cx="45" cy="45" r="20" fill="#B4F8C8" />
        
        {/* Cute face */}
        <circle cx="38" cy="40" r="4" fill="#555" /> {/* Left eye */}
        <circle cx="52" cy="40" r="4" fill="#555" /> {/* Right eye */}
        <path
          d="M38,50 Q45,55 52,50"
          stroke="#555"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        /> {/* Smile */}
        
        {/* Sparkles */}
        <circle cx="25" cy="25" r="2" fill="#FBE5C8" />
        <circle cx="65" cy="30" r="2" fill="#FBE5C8" />
        <circle cx="30" cy="65" r="2" fill="#FBE5C8" />
      </svg>
    </div>
  );
};

export default Logo; 