import React, { useState } from 'react';
import { Evidence, EvidenceType, TrustState } from '../../types/index.ts';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  ShieldCheck, 
  Plus, 
  FileText, 
  Cpu, 
  Calendar,
  X,
  Code
} from 'lucide-react';

interface EvidenceExplorerViewProps {
  evidence: Evidence[];
  onOpenCapture: () => void;
  onSelectEvidence: (evidence: Evidence) => void;
}

export const EvidenceExplorerView: React.FC<EvidenceExplorerViewProps> = ({
  evidence,
  onOpenCapture,
  onSelectEvidence
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterTrust, setFilterTrust] = useState<string>('ALL');
  const [selectedDetail, setSelectedDetail] = useState<Evidence | null>(null);

  const filtered = evidence.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          e.capabilities?.some(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === 'ALL' || e.type === filterType;
    const matchesTrust = filterTrust === 'ALL' || e.verification_state === filterTrust;
    return matchesSearch && matchesType && matchesTrust;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                Evidence Repository
              </span>
              <span className="text-xs text-[#777777]">
                Verified Demonstration Artifacts
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#252525]">
              Evidence Explorer ({evidence.length} Artifacts)
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl">
              Inspect raw prototypes, hardware schemas, GitHub repositories, and telemetry traces backing each contributor's verified capability signals.
            </p>
          </div>

          <button
            onClick={onOpenCapture}
            className="flex items-center gap-2 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>+ Add Evidence Artifact</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search evidence by title, keyword, or capability..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Trust Filter */}
          <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#E5E5E5] text-xs">
            <span className="text-[#777777] font-semibold px-2 text-[11px]">Trust:</span>
            {['ALL', 'DEMONSTRATED', 'SUPPORTED', 'VERIFIED'].map((t) => (
              <button
                key={t}
                onClick={() => setFilterTrust(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  filterTrust === t
                    ? 'bg-[#252525] text-white'
                    : 'text-[#666666] hover:bg-[#F3F3F3]'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs font-semibold bg-white border border-[#E5E5E5] rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Artifact Types</option>
            <option value="PROTOTYPE">Prototypes</option>
            <option value="DEMO">Live Demos</option>
            <option value="GITHUB">GitHub Repositories</option>
            <option value="DOCUMENT">Whitepapers & Specs</option>
            <option value="PROJECT">Projects</option>
          </select>
        </div>
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedDetail(item)}
            className="bg-white rounded-2xl border border-[#E5E5E5] hover:border-[#CCCCCC] transition-all overflow-hidden shadow-2xs hover:shadow-sm cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Media Preview / Thumbnail */}
              <div className="relative aspect-video w-full bg-[#1A1A1A] overflow-hidden">
                <img
                  src={item.thumbnail_url || item.file_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500'}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-black/80 text-white backdrop-blur-xs">
                    {item.type}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-600/90 text-white backdrop-blur-xs">
                    {item.verification_state}
                  </span>
                </div>

                <div className="absolute bottom-2.5 right-2.5">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-white/90 text-black backdrop-blur-xs shadow-xs">
                    {Math.round(item.confidence * 100)}% Conf.
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 space-y-2.5">
                <h4 className="text-sm font-extrabold text-[#252525] group-hover:text-emerald-700 transition-colors line-clamp-1">
                  {item.title}
                </h4>

                <p className="text-xs text-[#555555] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                {/* Capabilities pills */}
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.capabilities?.slice(0, 3).map((c) => (
                    <span
                      key={c.name}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#F5F5F5] text-[#444444] border border-[#E5E5E5]"
                    >
                      {c.name}
                    </span>
                  ))}
                  {(item.capabilities?.length || 0) > 3 && (
                    <span className="text-[10px] font-semibold text-[#888888] px-1 py-0.5">
                      +{(item.capabilities?.length || 0) - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#FAFAFA] border-t border-[#F0F0F0] flex items-center justify-between text-xs text-[#777777]">
              <div className="flex items-center gap-2 truncate">
                <img
                  src={item.user?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
                  alt={item.user?.name}
                  className="w-5 h-5 rounded-full object-cover border border-[#E5E5E5]"
                />
                <span className="text-[11px] font-semibold text-[#333333] truncate">
                  {item.user?.name || 'Verified Engineer'}
                </span>
              </div>

              <span className="text-[10px] text-[#999999] shrink-0 font-medium">
                {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Evidence Detail Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E5E5] animate-in fade-in zoom-in-95 duration-150 my-6">
            <div className="flex items-start justify-between pb-4 border-b border-[#F0F0F0] mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                    {selectedDetail.verification_state}
                  </span>
                  <span className="text-xs text-[#777777] font-semibold">
                    {selectedDetail.type}
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-[#252525]">
                  {selectedDetail.title}
                </h3>
              </div>

              <button
                onClick={() => setSelectedDetail(null)}
                className="p-1.5 text-[#888888] hover:text-[#252525] hover:bg-[#F3F3F3] rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Preview */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black mb-4">
              <img
                src={selectedDetail.file_url || selectedDetail.thumbnail_url || 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600'}
                alt={selectedDetail.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <strong className="text-xs font-bold text-[#252525] block mb-1">
                  Technical Architecture & Description
                </strong>
                <p className="text-[#555555] leading-relaxed">
                  {selectedDetail.description}
                </p>
              </div>

              {/* Supported Capabilities */}
              <div>
                <strong className="text-xs font-bold text-[#252525] block mb-2">
                  Demonstrated Capabilities Verified ({selectedDetail.capabilities?.length || 0})
                </strong>
                <div className="grid grid-cols-2 gap-2">
                  {selectedDetail.capabilities?.map((c) => (
                    <div
                      key={c.name}
                      className="p-2.5 rounded-lg bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-between"
                    >
                      <span className="font-bold text-[#333333]">{c.name}</span>
                      <span className="font-mono text-emerald-700 font-bold">
                        {Math.round(c.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Source Link */}
              {selectedDetail.source_url && (
                <div className="pt-2">
                  <a
                    href={selectedDetail.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 hover:text-sky-800 underline"
                  >
                    <span>Inspect Raw Source Repository / Hardware Spec</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="pt-5 border-t border-[#F0F0F0] mt-6 flex items-center justify-end">
              <button
                onClick={() => setSelectedDetail(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#252525] hover:bg-[#111111] rounded-xl cursor-pointer shadow-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
