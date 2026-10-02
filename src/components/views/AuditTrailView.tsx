import React, { useState } from 'react';
import { AuditLog } from '../../types/index.ts';
import { 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Search, 
  FileCheck2, 
  Send,
  Cpu
} from 'lucide-react';

interface AuditTrailViewProps {
  logs: AuditLog[];
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs }) => {
  const [filterAction, setFilterAction] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = logs.filter(l => {
    const matchesAction = filterAction === 'ALL' || l.action.includes(filterAction);
    const matchesSearch = l.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.action.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesAction && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Immutable Ledger
              </span>
              <span className="text-xs text-[#777777]">
                Every AI & System Action Verified
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#252525]">
              Project Audit Trail ({logs.length} Recorded Events)
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl">
              Complete provenance tracking for capability extractions, gap calculations, contributor recommendations, and collaboration requests.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <span className="text-xs text-[#777777] font-medium mr-1 whitespace-nowrap">Filter:</span>
          {['ALL', 'EVIDENCE', 'GAP', 'RECOMMENDATION', 'COLLABORATION', 'PROJECT'].map((f) => (
            <button
              key={f}
              onClick={() => setFilterAction(f)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                filterAction === f
                  ? 'bg-[#252525] text-white'
                  : 'bg-white text-[#666666] border border-[#E5E5E5] hover:bg-[#F3F3F3]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="bg-white rounded-2xl border border-[#E5E5E5] p-6 shadow-2xs divide-y divide-[#F0F0F0]">
        {filtered.map((log) => {
          const isAI = log.entity_type === 'AI_SYSTEM' || log.action.includes('GEMINI');
          const isCollab = log.entity_type === 'COLLABORATION';
          const isEvidence = log.entity_type === 'EVIDENCE';
          const isGap = log.entity_type === 'GAP';

          return (
            <div key={log.id} className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
              {/* Icon Badge */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                isAI
                  ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  : isCollab
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : isGap
                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                  : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
              }`}>
                {isAI ? (
                  <Sparkles className="w-4 h-4" />
                ) : isCollab ? (
                  <Send className="w-4 h-4" />
                ) : isGap ? (
                  <Activity className="w-4 h-4" />
                ) : (
                  <FileCheck2 className="w-4 h-4" />
                )}
              </div>

              {/* Event Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#F5F5F5] text-[#333333] border border-[#E0E0E0]">
                      {log.action.replace(/_/g, ' ')}
                    </span>
                    <span className="text-xs font-bold text-[#252525]">
                      {log.user?.name || 'System Operator'}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-[#888888]">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                  </span>
                </div>

                <p className="text-xs text-[#555555] leading-relaxed">
                  {log.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
