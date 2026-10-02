import React, { useState } from 'react';
import { Capability } from '../../types/index.ts';
import { 
  Network, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Filter
} from 'lucide-react';

interface CapabilityGraphViewProps {
  capabilities: Capability[];
  onSelectEvidence: (evidenceId: string) => void;
}

export const CapabilityGraphView: React.FC<CapabilityGraphViewProps> = ({
  capabilities,
  onSelectEvidence
}) => {
  const [selectedCap, setSelectedCap] = useState<Capability | null>(
    capabilities.find(c => c.id === 'cap-iot') || capabilities[0] || null
  );

  // Group capabilities by category
  const categories = ['Embedded', 'Networking', 'Sensors & Hardware', 'AI', 'Backend & Cloud', 'UI/UX', 'Security'];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Interactive Graph
              </span>
              <span className="text-xs text-[#777777]">
                Multi-Tier Evidence Hierarchy
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#252525]">
              System Capability Graph ({capabilities.length} Nodes)
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl">
              Hierarchical capability relationships tracing high-level project domains down to concrete microcontroller firmware, radio protocols, and calibrated sensors.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Canvas / SVG (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-2xs space-y-6">
          <div className="flex items-center justify-between text-xs text-[#777777] font-semibold pb-3 border-b border-[#F0F0F0]">
            <span>Hierarchical Topology View</span>
            <span className="text-[11px] font-mono">Select a node to inspect verified evidence & contributors</span>
          </div>

          {/* Graphical Hierarchy Map */}
          <div className="space-y-8">
            {categories.slice(0, 4).map((cat) => {
              const catCaps = capabilities.filter(c => c.category === cat);
              return (
                <div key={cat} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#444444]">
                      {cat}
                    </h4>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {catCaps.map((cap) => {
                      const isSelected = selectedCap?.id === cap.id;
                      return (
                        <button
                          key={cap.id}
                          onClick={() => setSelectedCap(cap)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#252525] text-white border-[#252525] shadow-xs'
                              : 'bg-[#FAFAFA] hover:bg-[#F3F3F3] border-[#E5E5E5] text-[#333333]'
                          }`}
                        >
                          <span className="text-xs font-bold block truncate">
                            {cap.name}
                          </span>
                          <span className={`text-[10px] block mt-1 ${isSelected ? 'text-neutral-300' : 'text-[#777777]'}`}>
                            {cap.level === 1 ? 'Root Category' : 'Specialized Node'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Inspector Panel (4 Cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-2xs space-y-5">
          {selectedCap ? (
            <>
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {selectedCap.category}
                </span>
                <h4 className="text-lg font-extrabold text-[#252525] mt-1.5">
                  {selectedCap.name}
                </h4>
                <p className="text-xs text-[#666666] mt-1 leading-relaxed">
                  {selectedCap.description}
                </p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-[#F9F9F9] border border-[#EEEEEE]">
                  <span className="text-[11px] text-[#777777] block">Verified Evidence</span>
                  <strong className="text-[#252525] font-extrabold text-sm">7 Artifacts</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F9F9F9] border border-[#EEEEEE]">
                  <span className="text-[11px] text-[#777777] block">Avg. Confidence</span>
                  <strong className="text-emerald-700 font-extrabold text-sm">96% Conf.</strong>
                </div>
              </div>

              {/* Associated Contributors */}
              <div>
                <span className="text-[11px] font-bold uppercase text-[#777777] block mb-2">
                  Key Demonstrated Contributors
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-between">
                    <span className="font-bold text-[#252525]">Arjun Sharma</span>
                    <span className="text-emerald-700 font-semibold text-[11px]">5 Demonstrated</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#FAFAFA] border border-[#EEEEEE] flex items-center justify-between">
                    <span className="font-bold text-[#252525]">Devraj Sen</span>
                    <span className="text-emerald-700 font-semibold text-[11px]">3 Demonstrated</span>
                  </div>
                </div>
              </div>

              {/* Sample Artifacts */}
              <div>
                <span className="text-[11px] font-bold uppercase text-[#777777] block mb-2">
                  Sample Proven Artifacts
                </span>
                <div className="space-y-2 text-xs">
                  <div 
                    onClick={() => onSelectEvidence('evi-arjun-1')}
                    className="p-2.5 rounded-lg bg-white border border-[#E5E5E5] hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-[#333333] group-hover:text-emerald-700 truncate max-w-[200px]">
                      Smart Irrigation Prototype
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                  </div>
                  <div 
                    onClick={() => onSelectEvidence('evi-arjun-2')}
                    className="p-2.5 rounded-lg bg-white border border-[#E5E5E5] hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <span className="font-semibold text-[#333333] group-hover:text-emerald-700 truncate max-w-[200px]">
                      MQTT Edge Gateway
                    </span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#888888]" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center text-xs text-[#888888]">
              Select any capability node on the left to inspect detailed proof and contributor links.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
