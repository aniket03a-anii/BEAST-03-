import React, { useState } from 'react';
import { Collaboration, CollaborationStatus } from '../../types/index.ts';
import { 
  Users, 
  Send, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageSquare, 
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface CollaborationViewProps {
  collaborations: Collaboration[];
  onUpdateStatus: (id: string, status: CollaborationStatus) => Promise<void>;
  onViewProfile: (userId: string) => void;
  onOpenProject: (projectId: string) => void;
}

export const CollaborationView: React.FC<CollaborationViewProps> = ({
  collaborations,
  onUpdateStatus,
  onViewProfile,
  onOpenProject
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filtered = collaborations.filter(c => {
    if (filterStatus === 'ALL') return true;
    return c.status === filterStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Active Engagements
              </span>
              <span className="text-xs text-[#777777]">
                Proven Capability Collaborations
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#252525]">
              Collaboration Hub ({collaborations.length} Records)
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl">
              Manage incoming/outgoing requests, active capability handoffs, and project integration milestones.
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {['ALL', 'REQUESTED', 'ACCEPTED', 'ACTIVE', 'COMPLETED', 'DECLINED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-[#252525] text-white shadow-xs'
                : 'bg-white text-[#666666] border border-[#E5E5E5] hover:bg-[#F3F3F3]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Collaborations List */}
      <div className="space-y-4">
        {filtered.map((collab) => {
          const u = collab.contributor;
          const req = collab.requester;
          const p = collab.project;

          return (
            <div
              key={collab.id}
              className="p-5 rounded-2xl bg-white border border-[#E5E5E5] shadow-2xs hover:border-[#D0D0D0] transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#F0F0F0]">
                <div className="flex items-center gap-3">
                  <img
                    src={u?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                    alt={u?.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#E5E5E5]"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#252525]">
                      {u?.name} <span className="text-xs font-normal text-[#777777]">({u?.role})</span>
                    </h4>
                    <span className="text-xs text-[#555555]">
                      Project: <strong className="text-[#252525]">{p?.name || 'Smart Agricultural Monitoring'}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                      collab.status === 'REQUESTED'
                        ? 'bg-amber-50 text-amber-800 border border-amber-300'
                        : collab.status === 'ACCEPTED' || collab.status === 'ACTIVE'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                        : collab.status === 'COMPLETED'
                        ? 'bg-sky-50 text-sky-800 border border-sky-300'
                        : 'bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    {collab.status}
                  </span>
                  <span className="text-[11px] text-[#888888] font-mono">
                    {new Date(collab.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] text-xs text-[#444444] leading-relaxed">
                "{collab.message}"
              </div>

              {/* Target capabilities */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] text-[#777777] font-semibold">Target Gaps:</span>
                  {collab.target_capabilities?.map((c) => (
                    <span
                      key={c}
                      className="px-2 py-0.5 rounded bg-white border border-[#E0E0E0] text-[10px] font-semibold text-[#333333]"
                    >
                      {c.replace('cap-', '').toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {collab.status === 'REQUESTED' && (
                    <>
                      <button
                        onClick={() => onUpdateStatus(collab.id, 'ACCEPTED')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => onUpdateStatus(collab.id, 'DECLINED')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#E0E0E0] text-[#666666] hover:bg-neutral-100 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Decline
                      </button>
                    </>
                  )}

                  {collab.status === 'ACCEPTED' && (
                    <button
                      onClick={() => onUpdateStatus(collab.id, 'ACTIVE')}
                      className="px-3 py-1.5 rounded-lg bg-[#252525] text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      Mark Active
                    </button>
                  )}

                  {collab.status === 'ACTIVE' && (
                    <button
                      onClick={() => onUpdateStatus(collab.id, 'COMPLETED')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                    >
                      Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() => u && onViewProfile(u.id)}
                    className="px-3 py-1.5 rounded-lg bg-[#F5F5F5] hover:bg-[#EBEBEB] text-[#333333] font-semibold text-xs transition-colors cursor-pointer"
                  >
                    View Evidence
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
