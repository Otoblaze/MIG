import React from 'react';

interface MigLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const MigLogo: React.FC<MigLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div
        className={`${sizeMap[size]} rounded-md overflow-hidden bg-[#2D0A75] flex items-center justify-center shrink-0 shadow-xs border border-[#3E149E]/40 relative group`}
      >
        {/* Crisp vector logo replicating user's exact MIG brand mark */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full p-1"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Violet background */}
          <rect width="100" height="100" rx="8" fill="#2D0A75" />

          {/* Stylized M with fluid loop */}
          <path
            d="M 16 68 C 16 54, 20 38, 25 38 C 30 38, 33 54, 38 60 C 42 48, 47 38, 52 38 C 55 38, 56 46, 56 55 C 48 56, 38 58, 28 62 C 22 65, 17 68, 16 68 Z"
            fill="#FFFFFF"
          />
          {/* Main brush M-i-G fluid sweep */}
          <path
            d="M 18 64 C 20 48, 24 40, 28 40 C 33 40, 37 52, 41 58 C 45 48, 50 40, 54 40 C 57 40, 58 48, 58 55 C 50 56, 42 58, 35 61 C 28 64, 21 66, 18 64 Z"
            fill="#FFFFFF"
          />

          {/* Letter 'i' stem and dot */}
          <rect x="47" y="38" width="6" height="16" rx="2" fill="#FFFFFF" />
          <path
            d="M 45 38 L 55 38 M 45 54 L 55 54"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Stylized G */}
          <path
            d="M 68 39 C 61 39, 56 45, 56 54 C 56 63, 62 68, 72 68 C 78 68, 83 65, 85 60 C 85 55, 80 54, 73 54 L 64 54 C 64 50, 67 44, 73 44 C 77 44, 81 46, 84 48 L 86 42 C 82 40, 76 39, 68 39 Z"
            fill="#FFFFFF"
          />

          {/* Connecting fluid flourish */}
          <path
            d="M 28 64 C 42 56, 62 48, 85 57 C 82 59, 75 60, 68 60 C 52 60, 38 66, 28 64 Z"
            fill="#FFFFFF"
          />

          {/* Bright Vibrant Magenta Dot */}
          <circle cx="88" cy="62" r="5" fill="#E817AE" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center">
            <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
              MIG
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#E817AE] ml-0.5 mt-1" />
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 font-mono">
            Mentorship
          </span>
        </div>
      )}
    </div>
  );
};
