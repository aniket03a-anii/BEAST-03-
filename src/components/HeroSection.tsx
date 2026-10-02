import React from 'react';
import { ArrowRight, Camera, Sparkles, CheckCircle2, ShieldCheck, Database, Layers } from 'lucide-react';
import { Project } from '../types/index.ts';

interface HeroSectionProps {
  onExploreDemo: () => void;
  onOpenCapture: () => void;
  activeProject: Project | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDemo,
  onOpenCapture,
  activeProject
}) => {
  return (
    <div className="relative pt-12 pb-24 md:pt-16 md:pb-32 sky-hero-backdrop overflow-hidden">
      {/* Cloud overlay effects simulating the clear sunny sky atmosphere */}
      <div className="absolute inset-0 sky-cloud-overlay opacity-90 pointer-events-none" />

      {/* Decorative subtle sun-glow and atmospheric depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-white/40 via-sky-100/20 to-transparent blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 text-center z-10">
        {/* Kicker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-sm border border-sky-100 shadow-xs mb-6 animate-subtle-float">
          <Sparkles className="w-3.5 h-3.5 text-sky-600" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#2d4052]">
            Evidence-Driven Collaboration Intelligence
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1c2833] leading-[1.12] mb-5">
          Know what is demonstrated.<br />
          <span className="text-[#15222e]">Know who can contribute.</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#374957] font-medium leading-relaxed mb-8">
          Don’t match people by what they claim. Match project needs with verified evidence of what people have actually built, deployed, and demonstrated.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
          <button
            onClick={onExploreDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-[#1b2631] hover:bg-[#0f171e] text-white text-sm font-semibold px-7 py-3 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
          >
            <span>Explore Demo Project</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>

          <button
            onClick={onOpenCapture}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white/90 hover:bg-white text-[#1b2631] hover:text-black border border-white/80 text-sm font-semibold px-7 py-3 rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer backdrop-blur-sm"
          >
            <Camera className="w-4 h-4 text-[#4a5f70]" />
            <span>Capture Evidence</span>
          </button>
        </div>

        {/* Quiet Subtitle Banner */}
        <p className="text-xs sm:text-sm text-[#475b6c] font-semibold tracking-wide">
          Your projects. Your gaps. Proven capabilities.
        </p>

        {/* High-level Trust Signals */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#3a4d5e] font-semibold">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Project-First Architecture</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-sky-700" />
            <span>5-Level Evidence Trust Model</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Database className="w-4 h-4 text-indigo-700" />
            <span>Deterministic Explainable Matching</span>
          </div>
        </div>
      </div>
    </div>
  );
};
