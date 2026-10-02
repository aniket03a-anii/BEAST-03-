import React from 'react';
import { Home, FolderKanban, Camera, Compass, User as UserIcon } from 'lucide-react';

interface MobileBottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenCapture: () => void;
  onOpenProfile: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentTab,
  setCurrentTab,
  onOpenCapture,
  onOpenProfile
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E5E5E5] px-2 py-2 flex items-center justify-around shadow-lg">
      {/* Home / Overview */}
      <button
        onClick={() => setCurrentTab('overview')}
        className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold cursor-pointer ${
          currentTab === 'overview' ? 'text-[#252525]' : 'text-[#888888]'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      {/* Projects */}
      <button
        onClick={() => setCurrentTab('requirements')}
        className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold cursor-pointer ${
          currentTab === 'requirements' || currentTab === 'gaps' ? 'text-[#252525]' : 'text-[#888888]'
        }`}
      >
        <FolderKanban className="w-5 h-5" />
        <span>Projects</span>
      </button>

      {/* Capture (Prominent Button) */}
      <button
        onClick={onOpenCapture}
        className="-mt-5 w-12 h-12 rounded-full bg-[#252525] text-white flex items-center justify-center shadow-lg border-2 border-white hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <Camera className="w-6 h-6 text-emerald-400" />
      </button>

      {/* Discover / Match */}
      <button
        onClick={() => setCurrentTab('contributors')}
        className={`flex flex-col items-center gap-1 p-1 text-[10px] font-bold cursor-pointer ${
          currentTab === 'contributors' ? 'text-[#252525]' : 'text-[#888888]'
        }`}
      >
        <Compass className="w-5 h-5" />
        <span>Discover</span>
      </button>

      {/* Profile */}
      <button
        onClick={onOpenProfile}
        className="flex flex-col items-center gap-1 p-1 text-[10px] font-bold text-[#888888] hover:text-[#252525] cursor-pointer"
      >
        <UserIcon className="w-5 h-5" />
        <span>Profile</span>
      </button>
    </div>
  );
};
