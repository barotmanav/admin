
import React from 'react';
import { LOCATIONS } from '../constants';

interface LocationGridProps {
  onLocationClick: (code: string) => void;
}

const LocationGrid: React.FC<LocationGridProps> = ({ onLocationClick }) => {
  return (
    <div className="w-full p-4 animate-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-semibold mb-8 text-center text-gray-300">Select Location for Details</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {LOCATIONS.map((loc) => (
          <button
            key={loc.id}
            onClick={() => onLocationClick(loc.code)}
            className="glass-card glass h-32 flex flex-col items-center justify-center rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-lg group"
          >
            <span className="text-2xl font-black text-blue-100 group-hover:text-blue-400 transition-colors">
              {loc.code}
            </span>
            <span className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest text-center px-2">
              {loc.name}
            </span>
          </button>
        ))}
        {/* Placeholder for Add/Remove functionality requested */}
        <button className="glass-card glass h-32 flex flex-col items-center justify-center rounded-2xl border-dashed border-2 border-white/20 hover:border-green-500/50 group">
          <i className="fas fa-plus text-gray-500 group-hover:text-green-400 text-2xl mb-2"></i>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Add Location</span>
        </button>
      </div>
    </div>
  );
};

export default LocationGrid;
