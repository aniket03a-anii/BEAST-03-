import React, { useState } from 'react';
import { Project, CapabilityGap } from '../../types/index.ts';
import { 
  AlertTriangle, 
  UserCheck, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Cpu, 
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface CapabilityGapsViewProps {
  project: Project;
  gaps: CapabilityGap[];
  onFindContributorsForGap: (gapId: string) => void;
  onOpenCapture: () => void;
}

export const CapabilityGapsView: React.FC<CapabilityGapsViewProps> = ({
  project,
  gaps,
  onFindContributorsForGap,
  onOpenCapture
}) => {
  const [expandedGapId, setExpandedGapId] = useState<string>(gaps[0]?.id || 'gap-iot');

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-white border border-[#E5E5E5] shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                Gap Engine Active
              </span>
              <span className="text-xs text-[#777777]">
                Project-First Intelligence
              </span>
            </div>
            <h3 className="text-xl font-extrabold text-[#252525]">
              Detected Capability Gaps ({gaps.length})
            </h3>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-2xl">
              Calculated by matching project architecture requirements against demonstrated evidence verified within the existing team.
            </p>
          </div>

          <button
            onClick={() => onFindContributorsForGap('all')}
            className="flex items-center gap-2 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-all cursor-pointer self-start md:self-auto"
          >
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>Search All Community Evidence</span>
          </button>
        </div>
      </div>

      {/* Main Gaps Breakdown Cards */}
      <div className="space-y-4">
        {gaps.map((gap) => {
          const cap = gap.capability;
          const isExpanded = expandedGapId === gap.id;

          return (
            <div
              key={gap.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                gap.severity === 'CRITICAL'
                  ? 'border-amber-200 bg-white shadow-xs'
                  : 'border-[#E5E5E5] bg-white'
              }`}
            >
              {/* Header Row */}
              <div 
                onClick={() => setExpandedGapId(isExpanded ? '' : gap.id)}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-neutral-50/60 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    gap.severity === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                        gap.severity === 'CRITICAL'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {gap.severity}
                      </span>
                      <h4 className="text-base font-extrabold text-[#252525]">
                        {cap?.name || 'Capability'}
                      </h4>
                      <span className="text-xs text-[#888888] font-medium hidden sm:inline">
                        · {cap?.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      {/* Current team meter */}
                      <div className="text-xs text-[#666666]">
                        <span className="font-semibold text-[#333333]">Current Team: </span>
                        <span className="font-mono text-neutral-400">██░░░░░░░░</span>
                      </div>
                      {/* Required meter */}
                      <div className="text-xs text-[#666666]">
                        <span className="font-semibold text-[#333333]">Required: </span>
                        <span className="font-mono text-emerald-600">██████████</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Score & Button */}
                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-rose-600">
                      {gap.gap_score}%
                    </span>
                    <span className="text-[10px] text-[#777777] block font-semibold uppercase">
                      Severity Gap
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onFindContributorsForGap(gap.id);
                    }}
                    className="flex items-center gap-1.5 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <span>Find Contributors</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                  </button>

                  <div className="text-[#888888] pl-1">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded "WHY IS THIS A GAP?" Deep-Dive Panel */}
              {isExpanded && (
                <div className="border-t border-[#F0F0F0] bg-[#FAFAFA] p-5 md:p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-emerald-600" />
                    <h5 className="text-xs font-extrabold uppercase tracking-wider text-[#333333]">
                      Why is this a gap?
                    </h5>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Project Requires */}
                    <div className="p-4 rounded-xl bg-white border border-[#E5E5E5]">
                      <span className="text-[11px] font-bold uppercase text-[#555555] block mb-2">
                        Project Requires
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#333333]">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>ESP32-S3 Microcontroller Firmware</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>Capacitive & SDI-12 Sensor Integration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>QoS 1 MQTT Telemetry Publishing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                          <span>Edge Anomaly Processing</span>
                        </li>
                      </ul>
                    </div>

                    {/* Current Team Demonstrates */}
                    <div className="p-4 rounded-xl bg-white border border-[#E5E5E5]">
                      <span className="text-[11px] font-bold uppercase text-[#555555] block mb-2">
                        Current Team Demonstrates
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#333333]">
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>High-Throughput Node.js Backend</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Aerial Computer Vision & NDVI</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>Real-Time React Telemetry UI/UX</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>TimescaleDB Hypertables</span>
                        </li>
                      </ul>
                    </div>

                    {/* Strictly Missing */}
                    <div className="p-4 rounded-xl bg-rose-50/40 border border-rose-200">
                      <span className="text-[11px] font-bold uppercase text-rose-800 block mb-2">
                        Missing Technical Evidence
                      </span>
                      <ul className="space-y-1.5 text-xs text-rose-900">
                        <li className="flex items-center gap-2">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>No ESP32 FreeRTOS field code</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>No hardware ADC sensor calibration</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>No MQTT broker bridge architecture</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                          <span>No micro-edge INT8 filter runtime</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <p className="text-xs text-[#666666]">
                      {gap.team_coverage_summary}
                    </p>
                    <button
                      onClick={() => onFindContributorsForGap(gap.id)}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Search 24 Verified Candidates →</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
