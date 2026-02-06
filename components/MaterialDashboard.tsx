
import React, { useState } from 'react';
import { MATERIAL_TABS } from '../constants';

interface MaterialDashboardProps {
  locationCode: string;
  onBack: () => void;
}

const MaterialDashboard: React.FC<MaterialDashboardProps> = ({ locationCode, onBack }) => {
  const [activeTab, setActiveTab] = useState(MATERIAL_TABS[0]);

  return (
    <div className="w-full max-w-5xl animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass flex items-center justify-center text-blue-400 hover:text-white hover:bg-blue-500/50 transition-all"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-bold text-blue-100">
          Dashboard: <span className="text-blue-500">{locationCode}</span>
        </h2>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-black/20 p-2 rounded-2xl border border-white/5">
        {MATERIAL_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all text-sm whitespace-nowrap flex-1 text-center ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="glass rounded-3xl p-8 min-h-[400px] border border-white/10 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400 text-3xl">
          <i className={`fas ${getTabIcon(activeTab)}`}></i>
        </div>
        <h3 className="text-2xl font-semibold text-blue-100 mb-2">{activeTab}</h3>
        <p className="text-gray-400 max-w-md">
          This section contains data related to {activeTab} for {locationCode}.
          In a production environment, this would display tables, charts, or detailed material lists.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-blue-500/20 rounded-lg text-blue-300">
                    <i className="fas fa-boxes-stacked"></i>
                </div>
                <div className="text-left">
                    <p className="text-xs text-gray-500">Total Units</p>
                    <p className="text-xl font-bold">1,250</p>
                </div>
            </div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4">
                <div className="p-3 bg-green-500/20 rounded-lg text-green-300">
                    <i className="fas fa-chart-line"></i>
                </div>
                <div className="text-left">
                    <p className="text-xs text-gray-500">Efficiency</p>
                    <p className="text-xl font-bold">94.2%</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

function getTabIcon(tab: string) {
    if (tab.includes('Plan')) return 'fa-calendar-check';
    if (tab.includes('Order')) return 'fa-file-invoice-dollar';
    if (tab.includes('Dispatched')) return 'fa-truck-fast';
    if (tab.includes('Exported')) return 'fa-ship';
    return 'fa-folder-open';
}

export default MaterialDashboard;
