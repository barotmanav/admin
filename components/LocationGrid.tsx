
import React from 'react';
import { Location } from '../types';

interface LocationGridProps {
  locations: Location[];
  userRole: 'primary' | 'secondary' | null;
  onLocationClick: (loc: Location) => void;
  onEditLocation: (loc: Location) => void;
  onChangePassword: (loc: Location) => void;
  onAddNew: () => void;
}

const LocationGrid: React.FC<LocationGridProps> = ({ 
  locations, 
  userRole,
  onLocationClick, 
  onEditLocation, 
  onChangePassword,
  onAddNew
}) => {
  const isPrimary = userRole === 'primary';

  return (
    <div className="w-full p-4 animate-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-xl font-semibold mb-8 text-center text-gray-300">
        {isPrimary ? 'Manage Production Locations' : 'Production Locations'}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {locations.map((loc) => (
          <div
            key={loc.id}
            className="glass-card glass h-32 relative flex flex-col items-center justify-center rounded-2xl border border-white/10 hover:border-blue-500/50 shadow-lg group cursor-pointer transition-all"
            onClick={() => onLocationClick(loc)}
          >
            {/* Quick Actions Overlay - Only for Primary Admin */}
            {isPrimary && (
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditLocation(loc);
                  }}
                  className="w-7 h-7 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 rounded-lg flex items-center justify-center border border-blue-500/30 transition-colors"
                  title="Edit Details"
                >
                  <i className="fas fa-pencil-alt text-[10px]"></i>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onChangePassword(loc);
                  }}
                  className="w-7 h-7 bg-amber-500/20 hover:bg-amber-500/40 text-amber-300 rounded-lg flex items-center justify-center border border-amber-500/30 transition-colors"
                  title="Change Password"
                >
                  <i className="fas fa-key text-[10px]"></i>
                </button>
              </div>
            )}

            <span className="text-2xl font-black text-blue-100 group-hover:text-blue-400 transition-colors">
              {loc.code}
            </span>
            <span className="text-[10px] text-gray-500 mt-2 uppercase tracking-widest text-center px-2">
              {loc.name}
            </span>
          </div>
        ))}
        
        <button 
          onClick={onAddNew}
          className="glass-card glass h-32 flex flex-col items-center justify-center rounded-2xl border-dashed border-2 border-white/20 hover:border-green-500/50 group"
        >
          <i className="fas fa-plus text-gray-500 group-hover:text-green-400 text-2xl mb-2"></i>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest">Add New</span>
        </button>
      </div>
    </div>
  );
};

export default LocationGrid;
