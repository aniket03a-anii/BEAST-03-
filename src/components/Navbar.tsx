import React from 'react';
import { 
  Cpu, 
  Plus, 
  RotateCcw, 
  Search, 
  Compass, 
  Activity, 
  FileCheck, 
  Users, 
  Layers, 
  Share2,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { User, Project } from '../types/index.ts';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: User;
  projects: Project[];
  activeProject: Project | null;
  setActiveProject: (p: Project) => void;
  onOpenCapture: () => void;
  onResetData: () => void;
  onOpenLogin: () => void;
  onSwitchUser: (userId: string) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  projects,
  activeProject,
  setActiveProject,
  onOpenCapture,
  onResetData,
  onOpenLogin,
  onSwitchUser,
  onLogout
}) => {
  const [showAccountMenu, setShowAccountMenu] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand & Project Selector */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setCurrentTab('overview')} 
            className="flex items-center gap-2.5 text-left group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-[#252525] text-white flex items-center justify-center font-bold shadow-sm group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-[#252525]">BEAST-03!™</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  LIVE
                </span>
              </div>
              <p className="text-[11px] text-[#555555] font-medium hidden sm:block">
                Evidence-Driven Collaboration Intelligence
              </p>
            </div>
          </button>

          {/* Project Switcher Pill */}
          {activeProject && (
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-[#E5E5E5]">
              <span className="text-xs text-[#777777] font-medium">Project:</span>
              <select
                aria-label="Active Project"
                value={activeProject.id}
                onChange={(e) => {
                  const found = projects.find(p => p.id === e.target.value);
                  if (found) setActiveProject(found);
                }}
                className="text-xs font-semibold text-[#252525] bg-[#F7F7F7] hover:bg-[#EFEFEF] border border-[#E5E5E5] rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#252525] cursor-pointer max-w-[200px] truncate"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Primary Desktop Nav Links */}
        <nav className="hidden xl:flex items-center gap-1">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setCurrentTab('requirements')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'requirements'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Requirements
          </button>
          <button
            onClick={() => setCurrentTab('gaps')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer relative ${
              currentTab === 'gaps'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Capability Gaps
            {activeProject && (activeProject.gaps_count || 4) > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-amber-500 text-white">
                {activeProject.gaps_count || 4}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentTab('contributors')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'contributors'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Discovery & Match
          </button>
          <button
            onClick={() => setCurrentTab('evidence')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'evidence'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Evidence Explorer
          </button>
          <button
            onClick={() => setCurrentTab('collaborations')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'collaborations'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Collaborations
          </button>
          <button
            onClick={() => setCurrentTab('graph')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'graph'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Capability Graph
          </button>
          <button
            onClick={() => setCurrentTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              currentTab === 'audit'
                ? 'bg-[#252525] text-white'
                : 'text-[#555555] hover:text-[#252525] hover:bg-neutral-100'
            }`}
          >
            Audit Trail
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Add Evidence Primary Button */}
          <button
            onClick={onOpenCapture}
            className="flex items-center gap-2 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all hover:shadow cursor-pointer"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Add Evidence</span>
            <span className="sm:hidden">Evidence</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={onResetData}
            title="Reset database to initial demo state"
            className="p-2 text-[#666666] hover:text-[#252525] hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Active User Avatar & Account Menu */}
          <div className="relative pl-2 border-l border-[#E5E5E5]" ref={menuRef}>
            <button
              onClick={() => setShowAccountMenu(prev => !prev)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-neutral-100 transition-colors cursor-pointer text-left"
            >
              <img
                src={currentUser.avatar_url}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-[#E5E5E5]"
              />
              <div className="hidden lg:block text-left leading-tight">
                <span className="text-xs font-bold text-[#252525] block truncate max-w-[110px]">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-[#777777] block truncate max-w-[110px]">
                  {currentUser.is_demo_user ? 'Demo Workspace' : 'Authenticated'}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {showAccountMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#E5E5E5] p-3 z-50 animate-in fade-in zoom-in-95 duration-100 space-y-3">
                <div className="p-2.5 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE]">
                  <span className="text-[10px] font-extrabold uppercase text-emerald-700 block">
                    Signed in as
                  </span>
                  <strong className="text-xs font-bold text-[#252525] block truncate">
                    {currentUser.name}
                  </strong>
                  <span className="text-[11px] text-[#666666] block truncate">
                    {currentUser.email}
                  </span>
                  <span className="text-[10px] text-[#888888] block mt-0.5 font-semibold">
                    {currentUser.role}
                  </span>
                </div>

                {/* Switch Persona */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] block mb-1 px-1">
                    Switch Demo Persona
                  </span>
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        onSwitchUser('user-demo');
                        setShowAccountMenu(false);
                      }}
                      className={`w-full text-left p-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        currentUser.id === 'user-demo' ? 'bg-neutral-100 text-[#252525]' : 'hover:bg-[#F5F5F5] text-[#555555]'
                      }`}
                    >
                      <span>Anii Demo (Project Lead)</span>
                      {currentUser.id === 'user-demo' && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        onSwitchUser('user-arjun');
                        setShowAccountMenu(false);
                      }}
                      className={`w-full text-left p-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        currentUser.id === 'user-arjun' ? 'bg-neutral-100 text-[#252525]' : 'hover:bg-[#F5F5F5] text-[#555555]'
                      }`}
                    >
                      <span>Arjun Sharma (Top Match 94%)</span>
                      {currentUser.id === 'user-arjun' && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
                    </button>
                    <button
                      onClick={() => {
                        onSwitchUser('user-elena');
                        setShowAccountMenu(false);
                      }}
                      className={`w-full text-left p-1.5 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        currentUser.id === 'user-elena' ? 'bg-neutral-100 text-[#252525]' : 'hover:bg-[#F5F5F5] text-[#555555]'
                      }`}
                    >
                      <span>Elena Rostova (Edge CV)</span>
                      {currentUser.id === 'user-elena' && <span className="text-[10px] text-emerald-600 font-bold">✓</span>}
                    </button>
                  </div>
                </div>

                <div className="border-t border-[#F0F0F0] pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setShowAccountMenu(false);
                      onOpenLogin();
                    }}
                    className="w-full text-left p-1.5 rounded-lg text-xs font-semibold text-[#252525] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
                  >
                    Switch Account / SSO Portal →
                  </button>
                  <button
                    onClick={() => {
                      setShowAccountMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left p-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
