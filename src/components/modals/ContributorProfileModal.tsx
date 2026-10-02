import React from 'react';
import { User, Evidence } from '../../types/index.ts';
import { 
  X, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  FileCheck2, 
  ExternalLink, 
  Cpu, 
  Send,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ContributorProfileModalProps {
  user: (User & { evidence?: Evidence[] }) | null;
  onClose: () => void;
  onSelectEvidence: (evidenceId: string) => void;
  onOpenCollaborate: (contributor: User) => void;
}

export const ContributorProfileModal: React.FC<ContributorProfileModalProps> = ({
  user,
  onClose,
  onSelectEvidence,
  onOpenCollaborate
}) => {
  if (!user) return null;

  const isArjun = user.id === 'user-arjun';

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#E5E5E5] animate-in fade-in zoom-in-95 duration-150 my-8">
        {/* Header */}
        <div className="flex items-start justify-between pb-5 border-b border-[#F0F0F0] mb-6">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar_url}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Technical Evidence Profile
                </span>
              </div>
              <h3 className="text-2xl font-extrabold text-[#252525] mt-1">
                {user.name}
              </h3>
              <p className="text-xs font-semibold text-[#555555]">
                {user.role} · <span className="font-normal text-[#777777]">{user.location}</span>
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

        {/* Bio / Positioning */}
        <div className="p-4 rounded-xl bg-[#F8F9FA] border border-[#EEEEEE] mb-6 text-xs text-[#444444] leading-relaxed">
          {user.bio}
          <div className="mt-2 text-[11px] text-[#777777] font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Availability: {user.availability}</span>
          </div>
        </div>

        {/* Demonstrated Capabilities Grid */}
        <div className="mb-6">
          <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#333333] mb-3">
            Demonstrated Capabilities (Proof-Backed)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs">
              <span className="text-xs font-bold text-[#252525] block">IoT Architecture</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{isArjun ? '9 Evidence Artifacts' : '5 Artifacts'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs">
              <span className="text-xs font-bold text-[#252525] block">ESP32 & RTOS</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{isArjun ? '6 Demonstrated' : '4 Artifacts'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs">
              <span className="text-xs font-bold text-[#252525] block">MQTT Protocol</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{isArjun ? '5 Verified Gateways' : '3 Artifacts'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs">
              <span className="text-xs font-bold text-[#252525] block">Sensor Calibration</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{isArjun ? '7 Demonstrated' : '4 Artifacts'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs">
              <span className="text-xs font-bold text-[#252525] block">Embedded C</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{isArjun ? '8 Repositories' : '5 Repositories'}</span>
            </div>
            <div className="p-3 rounded-xl bg-white border border-[#E5E5E5] shadow-2xs">
              <span className="text-xs font-bold text-[#252525] block">Edge TinyML</span>
              <span className="text-[11px] text-emerald-700 font-semibold">{isArjun ? '3 Models Deployed' : '2 Models'}</span>
            </div>
          </div>
        </div>

        {/* Evidence Timeline */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#333333]">
              Evidence Timeline
            </h4>
            <span className="text-[11px] text-[#777777] font-semibold">2026 Deployments</span>
          </div>

          <div className="space-y-3">
            {isArjun ? (
              <>
                <div 
                  onClick={() => onSelectEvidence('evi-arjun-1')}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      ESP
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                        Smart Irrigation ESP32 Prototype
                      </h5>
                      <span className="text-[11px] text-[#666666]">
                        July 2026 · Working Field Hardware · 96% Confidence
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    DEMONSTRATED
                  </span>
                </div>

                <div 
                  onClick={() => onSelectEvidence('evi-arjun-2')}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center font-bold text-xs">
                      MQT
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                        MQTT Edge Gateway & Telemetry Bridge
                      </h5>
                      <span className="text-[11px] text-[#666666]">
                        June 2026 · Mosquitto Bridge with TLS · 94% Confidence
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    DEMONSTRATED
                  </span>
                </div>

                <div 
                  onClick={() => onSelectEvidence('evi-arjun-3')}
                  className="p-3.5 rounded-xl bg-white border border-[#E5E5E5] hover:border-emerald-400 cursor-pointer transition-all flex items-center justify-between shadow-2xs group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                      SNS
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-[#252525] group-hover:text-emerald-700 transition-colors">
                        Industrial Soil & Ambient Sensor Node
                      </h5>
                      <span className="text-[11px] text-[#666666]">
                        May 2026 · ADC Calibration & IP67 Packaging · 95% Confidence
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    SUPPORTED
                  </span>
                </div>
              </>
            ) : (
              <div className="p-4 rounded-xl bg-white border border-[#E5E5E5] text-xs text-[#555555]">
                Verified technical artifacts on record in the BEAST-03!™ database.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[#F0F0F0]">
          <span className="text-xs text-[#777777] font-medium">
            Member ID: <span className="font-mono text-[#333333]">{user.id}</span>
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3] rounded-xl cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCollaborate(user);
              }}
              className="flex items-center gap-2 px-5 py-2 text-xs font-semibold text-white bg-[#252525] hover:bg-[#111111] rounded-xl shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>Send Collaboration Request</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
