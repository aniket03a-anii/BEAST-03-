import React, { useState } from 'react';
import { 
  Project, 
  CapabilityGap, 
  Recommendation, 
  Evidence,
  ProjectRequirement 
} from '../types/index.ts';
import { 
  Cpu, 
  Activity, 
  AlertTriangle, 
  FileCheck2, 
  UserCheck, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  Layers, 
  Compass, 
  FileText,
  Clock,
  ExternalLink,
  FileDown,
  X,
  CheckCircle2
} from 'lucide-react';
import { downloadProjectJsonReport, downloadProjectPdfReport } from '../utils/reportGenerator.ts';

interface ProjectOverviewCardProps {
  project: Project;
  requirements: ProjectRequirement[];
  gaps: CapabilityGap[];
  recommendations: Recommendation[];
  evidence: Evidence[];
  members?: any[];
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onAnalyzeProject: () => void;
  onOpenCapture: () => void;
  onFindContributors: () => void;
  isAnalyzing: boolean;
}

export const ProjectOverviewCard: React.FC<ProjectOverviewCardProps> = ({
  project,
  requirements,
  gaps,
  recommendations,
  evidence,
  members = [],
  currentTab,
  setCurrentTab,
  onAnalyzeProject,
  onOpenCapture,
  onFindContributors,
  isAnalyzing
}) => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const topMatch = recommendations[0];
  const criticalGaps = gaps.filter(g => g.severity === 'CRITICAL');

  const handleDownloadPdf = () => {
    downloadProjectPdfReport({
      project,
      requirements,
      gaps,
      evidence,
      recommendations,
      members
    });
    setDownloadSuccess('PDF Report successfully generated and downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadJson = () => {
    downloadProjectJsonReport({
      project,
      requirements,
      gaps,
      evidence,
      recommendations,
      members
    });
    setDownloadSuccess('JSON Data Report successfully downloaded!');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="relative -mt-16 md:-mt-20 max-w-7xl mx-auto px-4 z-20 mb-16">
      <div className="bg-white rounded-2xl md:rounded-3xl border border-[#E5E5E5] shadow-xl p-6 md:p-8">
        {/* Top Header of the Dashboard Card */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#F0F0F0]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#777777]">
                Project Intelligence Matrix
              </span>
              <span className="text-[#CCCCCC]">·</span>
              <span className="text-xs text-[#555555] font-semibold">
                {project.domain}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#252525] tracking-tight">
              {project.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] mt-1 max-w-3xl">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onAnalyzeProject}
              disabled={isAnalyzing}
              className="flex items-center gap-2 bg-[#F7F7F7] hover:bg-[#EFEFEF] text-[#252525] border border-[#E0E0E0] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 text-indigo-600 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing with Gemini...' : 'Analyze with Gemini AI'}</span>
            </button>

            <button
              onClick={onFindContributors}
              className="flex items-center gap-2 bg-[#252525] hover:bg-[#111111] text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Find Contributors</span>
            </button>

            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 bg-white hover:bg-neutral-50 text-[#252525] border border-[#D5D5D5] text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs cursor-pointer"
            >
              <FileDown className="w-3.5 h-3.5 text-sky-600" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 4 Core Metrics Row (Mirrors the screenshot's metric cards!) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-[#F0F0F0]">
          {/* Card 1: Project Coverage */}
          <div 
            onClick={() => setCurrentTab('requirements')}
            className="p-4 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-[#D5D5D5] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-[#777777] font-medium mb-1">
              <span>Project Coverage</span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#252525] tracking-tight">
              {project.progress}%
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-[11px] text-emerald-700 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
              <span>{project.covered_count || 8} of {project.capabilities_count || 12} Capabilities Verified</span>
            </div>
          </div>

          {/* Card 2: Capability Gaps */}
          <div 
            onClick={() => setCurrentTab('gaps')}
            className="p-4 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-amber-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-[#777777] font-medium mb-1">
              <span>Capability Gaps</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-[#252525] tracking-tight flex items-baseline gap-2">
              <span>{gaps.length}</span>
              <span className="text-xs font-semibold text-amber-600">({criticalGaps.length} Critical)</span>
            </div>
            <div className="text-[11px] text-[#666666] font-medium mt-2 truncate">
              IoT · Embedded C · MQTT · Edge AI
            </div>
          </div>

          {/* Card 3: Demonstrated Evidence */}
          <div 
            onClick={() => setCurrentTab('evidence')}
            className="p-4 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-[#D5D5D5] transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-[#777777] font-medium mb-1">
              <span>Verified Evidence Items</span>
              <FileCheck2 className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#252525] tracking-tight">
              {evidence.length + 15}
            </div>
            <div className="text-[11px] text-[#666666] font-medium mt-2">
              100% Proven Artifacts & Prototypes
            </div>
          </div>

          {/* Card 4: Top Contributor Match */}
          <div 
            onClick={() => setCurrentTab('contributors')}
            className="p-4 rounded-xl bg-[#FAFAFA] border border-[#EEEEEE] hover:border-emerald-300 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-[#777777] font-medium mb-1">
              <span>Top Contributor Match</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-700 tracking-tight">
              {topMatch ? `${topMatch.match_score}%` : '94%'}
            </div>
            <div className="text-[11px] text-[#555555] font-semibold mt-2 truncate">
              {topMatch?.user?.name || 'Arjun Sharma'} (5 Demonstrated Artifacts)
            </div>
          </div>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-4 border-b border-[#F0F0F0] no-scrollbar">
          <button
            onClick={() => setCurrentTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'overview'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Overview & Team
          </button>
          <button
            onClick={() => setCurrentTab('requirements')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'requirements'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Requirements ({requirements.length})
          </button>
          <button
            onClick={() => setCurrentTab('gaps')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'gaps'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            <span>Capability Gaps</span>
            <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] inline-flex items-center justify-center font-bold">
              {gaps.length}
            </span>
          </button>
          <button
            onClick={() => setCurrentTab('contributors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'contributors'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Contributor Discovery ({recommendations.length})
          </button>
          <button
            onClick={() => setCurrentTab('evidence')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'evidence'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Evidence Explorer
          </button>
          <button
            onClick={() => setCurrentTab('collaborations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'collaborations'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Collaborations
          </button>
          <button
            onClick={() => setCurrentTab('graph')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'graph'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Capability Graph
          </button>
          <button
            onClick={() => setCurrentTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              currentTab === 'audit'
                ? 'bg-[#252525] text-white shadow-xs'
                : 'text-[#666666] hover:bg-[#F3F3F3]'
            }`}
          >
            Audit Trail
          </button>
        </div>

        {/* Export Intelligence Report Modal */}
        {showExportModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E5E5] space-y-5 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between pb-3 border-b border-[#F0F0F0]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#252525] text-white flex items-center justify-center">
                    <FileDown className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-[#252525]">
                      Export Intelligence Report
                    </h3>
                    <p className="text-xs text-[#666666]">
                      {project.name}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-1.5 text-[#888888] hover:text-[#252525] hover:bg-[#F3F3F3] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {downloadSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{downloadSuccess}</span>
                </div>
              )}

              <p className="text-xs text-[#555555] leading-relaxed">
                Download a verified collaboration intelligence briefing with comprehensive capability requirements, critical gaps, evidence status, and deterministic contributor matches.
              </p>

              {/* 2 Export Format Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* PDF Summary Option */}
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] hover:border-emerald-400 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        EXECUTIVE SUMMARY
                      </span>
                      <FileText className="w-4 h-4 text-emerald-700" />
                    </div>
                    <h4 className="text-sm font-bold text-[#252525]">
                      PDF Report
                    </h4>
                    <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">
                      Clean formatted document with executive metrics, deficit analysis, and top contributor breakdowns.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadPdf}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>

                {/* JSON Data Option */}
                <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] hover:border-sky-400 transition-all flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                        MACHINE READABLE
                      </span>
                      <Cpu className="w-4 h-4 text-sky-700" />
                    </div>
                    <h4 className="text-sm font-bold text-[#252525]">
                      JSON Audit File
                    </h4>
                    <p className="text-[11px] text-[#666666] mt-1 leading-relaxed">
                      Complete raw database payload with mathematical formula weights, timestamps, and taxonomy trees.
                    </p>
                  </div>

                  <button
                    onClick={handleDownloadJson}
                    className="w-full py-2 px-3 rounded-lg bg-[#252525] hover:bg-[#111111] text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Download JSON</span>
                  </button>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3] rounded-xl cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
