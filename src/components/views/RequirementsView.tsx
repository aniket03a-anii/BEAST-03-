import React, { useState } from 'react';
import { Project, ProjectRequirement, Capability } from '../../types/index.ts';
import { 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  Filter, 
  Search, 
  Layers,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';

interface RequirementsViewProps {
  project: Project;
  requirements: ProjectRequirement[];
  capabilities: Capability[];
  onAddRequirement: (capabilityId: string, importance: string, requiredLevel: string, description: string) => Promise<void>;
  onAnalyzeWithGemini: () => Promise<void>;
  onOpenGaps: () => void;
  isAnalyzing: boolean;
}

export const RequirementsView: React.FC<RequirementsViewProps> = ({
  project,
  requirements,
  capabilities,
  onAddRequirement,
  onAnalyzeWithGemini,
  onOpenGaps,
  isAnalyzing
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCapId, setSelectedCapId] = useState(capabilities[0]?.id || '');
  const [importance, setImportance] = useState('HIGH');
  const [requiredLevel, setRequiredLevel] = useState('ADVANCED');
  const [description, setDescription] = useState('');
  const [filterImportance, setFilterImportance] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCapId) return;
    await onAddRequirement(selectedCapId, importance, requiredLevel, description);
    setShowAddModal(false);
    setDescription('');
  };

  const filteredReqs = requirements.filter(r => {
    const matchesFilter = filterImportance === 'ALL' || r.importance === filterImportance;
    const capName = r.capability?.name || '';
    const matchesSearch = capName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#EEEEEE]">
        <div>
          <h3 className="text-lg font-bold text-[#252525]">
            Required Capabilities ({requirements.length})
          </h3>
          <p className="text-xs text-[#666666]">
            Strict technical capabilities needed to execute this project architecture
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onAnalyzeWithGemini}
            disabled={isAnalyzing}
            className="flex items-center gap-2 bg-[#F7F7F7] hover:bg-[#EFEFEF] text-[#252525] border border-[#E0E0E0] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <Sparkles className={`w-3.5 h-3.5 text-indigo-600 ${isAnalyzing ? 'animate-spin' : ''}`} />
            <span>{isAnalyzing ? 'Extracting with Gemini...' : 'Analyze Project with Gemini'}</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 text-emerald-400" />
            <span>Add Requirement</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 text-[#888888] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search requirements..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-[#777777] font-medium mr-1">Importance:</span>
          {['ALL', 'HIGH', 'MEDIUM', 'LOW'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterImportance(lvl)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filterImportance === lvl
                  ? 'bg-[#252525] text-white'
                  : 'bg-white text-[#666666] border border-[#E5E5E5] hover:bg-[#F3F3F3]'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Requirements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredReqs.map((req) => {
          const cap = req.capability;
          return (
            <div
              key={req.id}
              className={`p-4 rounded-xl bg-white border transition-all ${
                req.is_covered
                  ? 'border-[#E5E5E5] hover:border-[#CCCCCC]'
                  : 'border-amber-200/90 bg-amber-50/20 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#252525]">
                      {cap?.name || 'Capability'}
                    </h4>
                    <span className="text-[10px] font-semibold text-[#777777] bg-[#F5F5F5] px-1.5 py-0.5 rounded">
                      {cap?.category || 'Embedded'}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#888888] font-medium block mt-0.5">
                    Target Level: {req.required_level}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      req.importance === 'HIGH'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : req.importance === 'MEDIUM'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {req.importance} PRIORITY
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#555555] leading-relaxed mb-3">
                {req.description || cap?.description}
              </p>

              <div className="pt-2.5 border-t border-[#F0F0F0] flex items-center justify-between text-xs">
                {req.is_covered ? (
                  <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Covered by Team</span>
                  </span>
                ) : (
                  <button
                    onClick={onOpenGaps}
                    className="flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-semibold cursor-pointer"
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Uncovered Gap · View Match →</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Requirement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E5E5] animate-in fade-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-[#252525] mb-1">
              Add Project Requirement
            </h3>
            <p className="text-xs text-[#666666] mb-5">
              Specify a technical capability required for this project
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Capability
                </label>
                <select
                  value={selectedCapId}
                  onChange={(e) => setSelectedCapId(e.target.value)}
                  className="w-full text-xs p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                >
                  {capabilities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#333333] block mb-1">
                    Importance
                  </label>
                  <select
                    value={importance}
                    onChange={(e) => setImportance(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                  >
                    <option value="HIGH">HIGH</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="LOW">LOW</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#333333] block mb-1">
                    Required Level
                  </label>
                  <select
                    value={requiredLevel}
                    onChange={(e) => setRequiredLevel(e.target.value)}
                    className="w-full text-xs p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                  >
                    <option value="EXPERT">EXPERT</option>
                    <option value="ADVANCED">ADVANCED</option>
                    <option value="INTERMEDIATE">INTERMEDIATE</option>
                    <option value="BASIC">BASIC</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#333333] block mb-1">
                  Technical Architecture Context
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explain why this capability is needed in the architecture..."
                  className="w-full text-xs p-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3] rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#252525] hover:bg-[#111111] rounded-xl cursor-pointer shadow-xs"
                >
                  Save Requirement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
