import React, { useState } from 'react';
import { 
  Project, 
  Recommendation, 
  User, 
  CapabilityGap 
} from '../../types/index.ts';
import { 
  Search, 
  Filter, 
  CheckCircle2, 
  HelpCircle, 
  Send, 
  FileCheck2, 
  ArrowUpRight, 
  Sparkles,
  MapPin,
  Clock,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface ContributorDiscoveryViewProps {
  project: Project;
  recommendations: Recommendation[];
  gaps: CapabilityGap[];
  selectedGapId?: string;
  onViewWhyMatch: (rec: Recommendation) => void;
  onViewProfile: (userId: string) => void;
  onOpenCollaborate: (contributor: User, targetCaps: string[]) => void;
}

export const ContributorDiscoveryView: React.FC<ContributorDiscoveryViewProps> = ({
  project,
  recommendations,
  gaps,
  selectedGapId,
  onViewWhyMatch,
  onViewProfile,
  onOpenCollaborate
}) => {
  const [filterGap, setFilterGap] = useState<string>(selectedGapId || 'ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecs = recommendations.filter(rec => {
    const matchesGap = filterGap === 'ALL' || rec.capability_gap_id === filterGap;
    const userName = rec.user?.name || '';
    const userRole = rec.user?.role || '';
    const matchesSearch = userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          userRole.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          rec.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGap && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Deterministic Engine
              </span>
              <span className="text-xs text-[#777777]">
                Evidence-Ranked Community Pool
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#252525]">
              Contributor Discovery & Match ({recommendations.length} Verified Candidates)
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl">
              Ranked by missing capability coverage (40%), evidence strength (25%), relevance (15%), recency (10%), and collaboration fit (10%).
            </p>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by contributor name, role, or capability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-[#777777] font-medium mr-1 whitespace-nowrap">Filter Gap:</span>
          <button
            onClick={() => setFilterGap('ALL')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterGap === 'ALL'
                ? 'bg-[#252525] text-white'
                : 'bg-white text-[#666666] border border-[#E5E5E5] hover:bg-[#F3F3F3]'
            }`}
          >
            All Gaps
          </button>
          {gaps.map((g) => (
            <button
              key={g.id}
              onClick={() => setFilterGap(g.id)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterGap === g.id
                  ? 'bg-[#252525] text-white'
                  : 'bg-white text-[#666666] border border-[#E5E5E5] hover:bg-[#F3F3F3]'
              }`}
            >
              {g.capability?.name || g.id}
            </button>
          ))}
        </div>
      </div>

      {/* Contributor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredRecs.map((rec) => {
          const u = rec.user;
          const isPrimary = u?.id === 'user-arjun';

          return (
            <div
              key={rec.id}
              className={`p-6 rounded-2xl bg-white border transition-all flex flex-col justify-between ${
                isPrimary
                  ? 'border-emerald-300 ring-2 ring-emerald-500/10 shadow-sm'
                  : 'border-[#E5E5E5] hover:border-[#D0D0D0]'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={u?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120'}
                      alt={u?.name || 'Contributor'}
                      className="w-13 h-13 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-extrabold text-[#252525]">
                          {u?.name || 'Contributor'}
                        </h4>
                        {isPrimary && (
                          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                            TOP MATCH
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-semibold text-[#555555]">
                        {u?.role}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[11px] text-[#777777]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#999999]" />
                          {u?.location}
                        </span>
                        <span>·</span>
                        <span>{u?.availability}</span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-extrabold text-emerald-700">
                      {rec.match_score}%
                    </div>
                    <span className="text-[10px] text-[#777777] uppercase font-bold block">
                      Gap Match
                    </span>
                  </div>
                </div>

                {/* Demonstrated Capabilities Tags */}
                <div className="mb-4">
                  <span className="text-[11px] font-bold text-[#777777] uppercase tracking-wider block mb-2">
                    Verified Capabilities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {isPrimary ? (
                      <>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          ESP32
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          MQTT
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Sensors
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Embedded C
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          FreeRTOS
                        </span>
                      </>
                    ) : (
                      rec.matched_capabilities.map((cId) => (
                        <span
                          key={cId}
                          className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-[#F5F5F5] text-[#333333] border border-[#E5E5E5]"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          {cId.replace('cap-', '').toUpperCase()}
                        </span>
                      ))
                    )}
                  </div>
                </div>

                {/* Evidence Count Stats */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#F9F9F9] border border-[#EEEEEE] text-xs mb-4">
                  <div>
                    <span className="text-[#777777] block text-[11px]">Total Artifacts</span>
                    <strong className="text-[#252525] font-extrabold text-sm">
                      {isPrimary ? '7 Evidence' : `${rec.supporting_evidence_ids.length + 3} Evidence`}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#777777] block text-[11px]">Trust State</span>
                    <strong className="text-emerald-700 font-extrabold text-sm flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      {isPrimary ? '5 DEMONSTRATED' : 'DEMONSTRATED'}
                    </strong>
                  </div>
                </div>

                {/* Explanation Snippet */}
                <p className="text-xs text-[#555555] leading-relaxed mb-5 italic">
                  "{rec.explanation}"
                </p>
              </div>

              {/* 3 Buttons: View Evidence, Why This Match, Collaborate */}
              <div className="pt-4 border-t border-[#F0F0F0] flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => u && onViewProfile(u.id)}
                    className="px-3 py-1.5 text-xs font-semibold text-[#444444] bg-[#F7F7F7] hover:bg-[#EEEEEE] border border-[#E0E0E0] rounded-lg transition-colors cursor-pointer"
                  >
                    View Evidence
                  </button>

                  <button
                    onClick={() => onViewWhyMatch(rec)}
                    className="px-3 py-1.5 text-xs font-semibold text-sky-800 bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <HelpCircle className="w-3 h-3" />
                    <span>Why This Match?</span>
                  </button>
                </div>

                <button
                  onClick={() => u && onOpenCollaborate(u, rec.matched_capabilities)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#252525] hover:bg-[#111111] rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3 text-emerald-400" />
                  <span>Collaborate</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
