import React from 'react';
import { Recommendation, Evidence } from '../../types/index.ts';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink, 
  Calculator, 
  Layers, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface WhyThisMatchModalProps {
  recommendation: Recommendation | null;
  onClose: () => void;
  onOpenEvidence: (evidenceId: string) => void;
  onOpenCollaborate: () => void;
}

export const WhyThisMatchModal: React.FC<WhyThisMatchModalProps> = ({
  recommendation,
  onClose,
  onOpenEvidence,
  onOpenCollaborate
}) => {
  if (!recommendation) return null;

  const u = recommendation.user;
  const isArjun = u?.id === 'user-arjun';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E5E5] animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] mb-6">
          <div className="flex items-center gap-3">
            <img
              src={u?.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'}
              alt={u?.name}
              className="w-12 h-12 rounded-full object-cover border border-[#E0E0E0]"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Transparent Matching Breakdown
              </span>
              <h3 className="text-xl font-extrabold text-[#252525] mt-0.5">
                Why {u?.name || 'this contributor'} matched?
              </h3>
              <p className="text-xs text-[#666666]">
                Target Project Gap: <strong className="text-[#252525]">IoT & Embedded Firmware</strong>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-[#252525] hover:bg-[#F3F3F3] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Big Score & Formula Header */}
        <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#EEEEEE] mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-[#444444] uppercase tracking-wider flex items-center gap-1.5">
              <Calculator className="w-3.5 h-3.5 text-indigo-600" />
              <span>Deterministic Scoring Formula</span>
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-emerald-700">
                {recommendation.match_score}%
              </span>
              <span className="text-xs font-semibold text-[#666666]">Ranked Match</span>
            </div>
          </div>

          {/* Formula Weights Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
            <div className="p-2 rounded-lg bg-white border border-[#E5E5E5]">
              <span className="text-[10px] text-[#777777] block font-semibold">Gap Coverage</span>
              <span className="text-xs font-bold text-[#252525]">{recommendation.gap_coverage}%</span>
              <span className="text-[9px] text-emerald-600 block font-mono">w: 40%</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#E5E5E5]">
              <span className="text-[10px] text-[#777777] block font-semibold">Evidence Strength</span>
              <span className="text-xs font-bold text-[#252525]">{recommendation.evidence_strength}%</span>
              <span className="text-[9px] text-emerald-600 block font-mono">w: 25%</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#E5E5E5]">
              <span className="text-[10px] text-[#777777] block font-semibold">Relevance</span>
              <span className="text-xs font-bold text-[#252525]">{recommendation.evidence_relevance}%</span>
              <span className="text-[9px] text-emerald-600 block font-mono">w: 15%</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#E5E5E5]">
              <span className="text-[10px] text-[#777777] block font-semibold">Recency</span>
              <span className="text-xs font-bold text-[#252525]">{recommendation.recency_score}%</span>
              <span className="text-[9px] text-emerald-600 block font-mono">w: 10%</span>
            </div>
            <div className="p-2 rounded-lg bg-white border border-[#E5E5E5]">
              <span className="text-[10px] text-[#777777] block font-semibold">Collab Fit</span>
              <span className="text-xs font-bold text-[#252525]">{recommendation.collaboration_fit}%</span>
              <span className="text-[9px] text-emerald-600 block font-mono">w: 10%</span>
            </div>
          </div>
        </div>

        {/* Evidence Coverage Visual Bars */}
        <div className="mb-6 space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#333333]">
            Specific Gap Evidence Coverage
          </h4>
          
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>ESP32 Development (Solar Node & FreeRTOS)</span>
                <span className="font-mono text-emerald-700">100% (Demonstrated)</span>
              </div>
              <div className="h-2 rounded-full bg-[#EEEEEE] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[100%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>MQTT Implementation (Broker Bridge & QoS 1)</span>
                <span className="font-mono text-emerald-700">95% (Demonstrated)</span>
              </div>
              <div className="h-2 rounded-full bg-[#EEEEEE] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[95%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Sensor Integration (Capacitive & SDI-12 Probes)</span>
                <span className="font-mono text-emerald-700">98% (Demonstrated)</span>
              </div>
              <div className="h-2 rounded-full bg-[#EEEEEE] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[98%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span>Embedded C (Deterministic FreeRTOS Tasks)</span>
                <span className="font-mono text-emerald-700">92% (Demonstrated)</span>
              </div>
              <div className="h-2 rounded-full bg-[#EEEEEE] overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[92%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Evidence List */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#333333] mb-3">
            Traceable Supporting Evidence ({isArjun ? 5 : 2} Artifacts)
          </h4>

          <div className="space-y-2.5">
            {isArjun ? (
              <>
                <div 
                  onClick={() => onOpenEvidence('evi-arjun-1')}
                  className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-emerald-400 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-[#888888]">1</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                        Smart Irrigation ESP32 Prototype
                      </h5>
                      <p className="text-[11px] text-[#666666]">
                        Dual-core ESP32-S3, capacitive soil moisture, SDI-12 protocol, 18µA idle sleep
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      DEMONSTRATED · 96%
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => onOpenEvidence('evi-arjun-2')}
                  className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-emerald-400 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-[#888888]">2</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                        MQTT Edge Gateway & Telemetry Bridge
                      </h5>
                      <p className="text-[11px] text-[#666666]">
                        Bridges 24 local nodes into industrial Mosquitto MQTT broker with TLS mTLS
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      DEMONSTRATED · 94%
                    </span>
                  </div>
                </div>

                <div 
                  onClick={() => onOpenEvidence('evi-arjun-3')}
                  className="p-3 rounded-xl bg-white border border-[#E5E5E5] hover:border-emerald-400 flex items-center justify-between gap-3 cursor-pointer transition-all shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold font-mono text-[#888888]">3</span>
                    <div>
                      <h5 className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                        Industrial Soil & Ambient Sensor Node
                      </h5>
                      <p className="text-[11px] text-[#666666]">
                        Multi-depth FDR soil moisture probe with polynomial ADC calibration lookup
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      DEMONSTRATED · 95%
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#555555]">
                {recommendation.explanation}
              </div>
            )}
          </div>
        </div>

        {/* AI & System Explanation */}
        <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200 mb-6 text-xs text-emerald-950 leading-relaxed">
          <strong className="font-bold block mb-1">BEAST-03!™ Provenance Guarantee:</strong>
          {recommendation.explanation}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0F0F0]">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3] rounded-xl cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onOpenCollaborate();
            }}
            className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#252525] hover:bg-[#111111] rounded-xl shadow-xs cursor-pointer"
          >
            <span>Proceed to Collaboration Request</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
