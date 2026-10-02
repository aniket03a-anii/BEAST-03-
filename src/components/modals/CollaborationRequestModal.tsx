import React, { useState } from 'react';
import { User, Project } from '../../types/index.ts';
import { 
  X, 
  Send, 
  CheckCircle2, 
  Cpu, 
  Sparkles, 
  ShieldCheck,
  Layers,
  ArrowRight
} from 'lucide-react';

interface CollaborationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
  contributor: User | null;
  targetCapabilities: string[];
  onSubmit: (message: string, targetCaps: string[]) => Promise<void>;
}

export const CollaborationRequestModal: React.FC<CollaborationRequestModalProps> = ({
  isOpen,
  onClose,
  project,
  contributor,
  targetCapabilities,
  onSubmit
}) => {
  const [message, setMessage] = useState(
    `We're building the IoT and embedded telemetry layer for our ${project.name} and your demonstrated ESP32, MQTT, and sensor experience directly matches our current capability gap. Would love to collaborate with you on this!`
  );
  const [selectedCaps, setSelectedCaps] = useState<string[]>(
    targetCapabilities.length > 0 ? targetCapabilities : ['cap-esp32', 'cap-mqtt', 'cap-sensors']
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen || !contributor) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(message, selectedCaps);
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  const toggleCap = (capId: string) => {
    setSelectedCaps(prev => 
      prev.includes(capId) ? prev.filter(c => c !== capId) : [...prev, capId]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-[#E5E5E5] animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F0F0] mb-5">
          <div className="flex items-center gap-3">
            <img
              src={contributor.avatar_url}
              alt={contributor.name}
              className="w-10 h-10 rounded-full object-cover border border-[#E0E0E0]"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Collaboration Proposal
              </span>
              <h3 className="text-base font-extrabold text-[#252525] mt-0.5">
                Invite {contributor.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#888888] hover:text-[#252525] hover:bg-[#F3F3F3] rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-[#252525]">
              Collaboration Request Sent!
            </h4>
            <p className="text-xs text-[#666666] max-w-sm mx-auto">
              Recorded in the collaboration database and logged to the project audit trail.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Context */}
            <div className="p-3 rounded-xl bg-[#F8F9FA] border border-[#EEEEEE] text-xs">
              <span className="text-[10px] font-bold uppercase text-[#777777] block mb-0.5">
                Project
              </span>
              <strong className="text-[#252525] font-bold">{project.name}</strong>
              <span className="text-[#666666] block text-[11px] mt-0.5">
                Targeting open capability gaps: IoT, ESP32, MQTT
              </span>
            </div>

            {/* Target Capabilities Selection */}
            <div>
              <label className="text-xs font-bold text-[#333333] block mb-1.5">
                Target Needed Capabilities
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'cap-esp32', name: 'ESP32 Firmware' },
                  { id: 'cap-mqtt', name: 'MQTT Communication' },
                  { id: 'cap-sensors', name: 'Sensor Integration' },
                  { id: 'cap-embedded-c', name: 'Embedded C' }
                ].map((cap) => {
                  const isChecked = selectedCaps.includes(cap.id);
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => toggleCap(cap.id)}
                      className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                        isChecked
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-white border-[#E0E0E0] text-[#666666] hover:bg-[#F5F5F5]'
                      }`}
                    >
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isChecked ? 'text-emerald-600' : 'text-neutral-300'}`} />
                      <span>{cap.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Message Body */}
            <div>
              <label className="text-xs font-bold text-[#333333] block mb-1">
                Collaboration Message
              </label>
              <textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full text-xs p-3 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#252525] leading-relaxed"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#F0F0F0]">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#666666] hover:bg-[#F3F3F3] rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#252525] hover:bg-[#111111] rounded-xl shadow-xs transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isSubmitting ? 'Sending Request...' : 'Send Collaboration Request'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
