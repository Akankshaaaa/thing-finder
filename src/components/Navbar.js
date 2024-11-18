import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/outline';

const StaticLogo = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  };

  return (
    <div className={`${sizes[size]}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#A8D8EA" />
        <path
          d="M65,65 L85,85"
          stroke="#FFCAD4"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="45" cy="45" r="25" fill="#E4C1F9" />
        <circle cx="45" cy="45" r="20" fill="#B4F8C8" />
        <circle cx="38" cy="40" r="4" fill="#555" />
        <circle cx="52" cy="40" r="4" fill="#555" />
        <path
          d="M38,50 Q45,55 52,50"
          stroke="#555"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="25" cy="25" r="2" fill="#FBE5C8" />
        <circle cx="65" cy="30" r="2" fill="#FBE5C8" />
        <circle cx="30" cy="65" r="2" fill="#FBE5C8" />
      </svg>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <StaticLogo size="sm" />
            <span className="font-quicksand text-2xl font-bold text-pastel-blue">
              Thing Finder
            </span>
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="font-poppins px-4 py-2 rounded-full bg-pastel-lavender hover:bg-opacity-80 transition-colors flex items-center"
            >
              <HomeIcon className="h-5 w-5 mr-2" />
              Home
            </Link>
            <Link
              to="/add"
              className="font-poppins px-4 py-2 rounded-full bg-pastel-mint hover:bg-opacity-80 transition-colors"
            >
              Add Item
            </Link>
            <Link
              to="/gallery"
              className="font-poppins px-4 py-2 rounded-full bg-pastel-pink hover:bg-opacity-80 transition-colors"
            >
              My Items
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 