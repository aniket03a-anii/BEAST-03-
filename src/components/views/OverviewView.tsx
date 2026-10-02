import React from 'react';
import { Project, ProjectMember, CapabilityGap, Evidence } from '../../types/index.ts';
import { 
  Users, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Cpu, 
  ExternalLink,
  Layers,
  Sparkles,
  TrendingUp
} from 'lucide-react';

interface OverviewViewProps {
  project: Project;
  members: (ProjectMember & { user?: any })[];
  gaps: CapabilityGap[];
  evidence: Evidence[];
  onFindContributors: () => void;
  onOpenGaps: () => void;
  onOpenCapture: () => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  project,
  members,
  gaps,
  evidence,
  onFindContributors,
  onOpenGaps,
  onOpenCapture
}) => {
  // Capability coverage percentages matching the prompt spec:
  const capabilityCoverage = [
    { name: 'Computer Vision', percent: 100, status: 'COVERED', note: 'Sophia Chen (Multispectral NDVI Pipeline)' },
    { name: 'Backend Development', percent: 100, status: 'COVERED', note: 'Alex Rivera (High-Throughput Node.js)' },
    { name: 'UI/UX & Frontend', percent: 100, status: 'COVERED', note: 'Liam O\'Connor (Real-Time Sensor Dashboard)' },
    { name: 'IoT Architecture', percent: 20, status: 'CRITICAL_GAP', note: 'Missing gateway failover & CBOR encoding' },
    { name: 'Embedded C / ESP32', percent: 10, status: 'CRITICAL_GAP', note: 'Missing FreeRTOS dual-core firmware' },
    { name: 'MQTT Communication', percent: 0, status: 'CRITICAL_GAP', note: 'Zero verified MQTT experience on team' },
    { name: 'Edge Processing & TinyML', percent: 20, status: 'GAP', note: 'Missing embedded INT8 quantization' }
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner: Core Principle Reminder & Gap Alert */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50/50 border border-amber-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-amber-900">
              4 Critical Capability Gaps Detected
            </h3>
            <p className="text-xs text-amber-800/90 mt-0.5 max-w-2xl leading-relaxed">
              While your team demonstrates full coverage in Computer Vision, Backend, and UI/UX, the project strictly requires verified evidence in <strong className="font-semibold">IoT, ESP32, MQTT, and Embedded C</strong>.
            </p>
          </div>
        </div>

        <button
          onClick={onFindContributors}
          className="shrink-0 flex items-center gap-2 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer"
        >
          <span>Find Matched Contributors</span>
          <ArrowRight className="w-4 h-4 text-emerald-400" />
        </button>
      </div>

      {/* Two Column Layout: Capability Coverage & Current Team */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Capability Coverage Matrix (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#252525]">
                Capability Coverage Breakdown
              </h3>
              <p className="text-xs text-[#666666]">
                Comparing project requirements with verified team demonstrations
              </p>
            </div>
            <button
              onClick={onOpenGaps}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>View Gap Drilldown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3.5">
            {capabilityCoverage.map((cap) => {
              const isCovered = cap.percent >= 80;
              return (
                <div
                  key={cap.name}
                  className="p-4 rounded-xl bg-white border border-[#EEEEEE] shadow-2xs hover:border-[#D5D5D5] transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#252525]">{cap.name}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          isCovered
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                        }`}
                      >
                        {isCovered ? 'VERIFIED COVERED' : 'UNCOVERED GAP'}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#333333]">
                      {cap.percent}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-[#EEEEEE] overflow-hidden mb-2">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCovered
                          ? 'bg-emerald-500'
                          : cap.percent > 0
                          ? 'bg-amber-500'
                          : 'bg-rose-400'
                      }`}
                      style={{ width: `${Math.max(4, cap.percent)}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-[#666666]">
                    {cap.note}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Existing Team Roster (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#252525]">
                Current Project Team
              </h3>
              <p className="text-xs text-[#666666]">
                {members.length} active contributors with verified artifacts
              </p>
            </div>
            <button
              onClick={onOpenCapture}
              className="text-xs font-semibold text-[#252525] hover:underline cursor-pointer"
            >
              + Add Member
            </button>
          </div>

          <div className="space-y-3">
            {members.map((m) => {
              const u = m.user;
              return (
                <div
                  key={m.id}
                  className="p-3.5 rounded-xl bg-white border border-[#EEEEEE] flex items-center justify-between gap-3 shadow-2xs hover:border-[#D5D5D5] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={u?.avatar_url || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'}
                      alt={u?.name || 'Member'}
                      className="w-10 h-10 rounded-full object-cover border border-[#E5E5E5]"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-[#252525]">
                        {u?.name || 'Team Member'}
                      </h4>
                      <p className="text-[11px] text-[#666666]">
                        {m.role}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-semibold uppercase text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Verified
                    </span>
                    <span className="text-[10px] text-[#888888] block mt-0.5">
                      {u?.verified_evidence_count || 12} Evidence
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Principle Box */}
          <div className="p-4 rounded-xl bg-[#F9F9F9] border border-[#EBEBEB]">
            <h4 className="text-xs font-bold text-[#252525] mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Evidence Trust Lifecycle</span>
            </h4>
            <p className="text-[11px] text-[#666666] leading-relaxed mb-3">
              Capabilities require reproducible evidence artifacts (prototypes, repositories, hardware schematics) to reach <span className="font-semibold text-[#252525]">DEMONSTRATED</span> trust state.
            </p>
            <div className="flex items-center justify-between text-[10px] font-mono font-semibold text-[#555555] bg-white p-2 rounded-lg border border-[#E5E5E5]">
              <span>CLAIMED</span>
              <span>→</span>
              <span>DETECTED</span>
              <span>→</span>
              <span>SUPPORTED</span>
              <span>→</span>
              <span className="text-emerald-700 font-bold">DEMONSTRATED</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
