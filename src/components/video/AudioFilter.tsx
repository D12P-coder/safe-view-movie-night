
import React from 'react';
import { MicOff } from 'lucide-react';

interface AudioFilterProps {
  isActive: boolean;
}

const AudioFilter: React.FC<AudioFilterProps> = ({ isActive }) => {
  if (!isActive) return null;
  
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-white/80 px-4 py-2 rounded-full shadow-lg">
        <p className="text-safe-blue-800 font-medium flex items-center gap-2">
          <MicOff className="h-5 w-5 text-safe-blue-600" /> 
          Audio filtered
        </p>
      </div>
    </div>
  );
};

export default AudioFilter;
