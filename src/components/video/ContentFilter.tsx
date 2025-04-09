
import React from 'react';
import { Shield } from 'lucide-react';

interface ContentFilterProps {
  isActive: boolean;
}

const ContentFilter: React.FC<ContentFilterProps> = ({ isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className="absolute inset-0 blur-overlay z-10 flex items-center justify-center backdrop-blur-xl">
      <div className="bg-white/80 px-4 py-2 rounded-full shadow-lg">
        <p className="text-safe-blue-800 font-medium flex items-center gap-2">
          <Shield className="h-5 w-5 text-safe-blue-600" /> 
          Content filtered for family viewing
        </p>
      </div>
    </div>
  );
};

export default ContentFilter;
