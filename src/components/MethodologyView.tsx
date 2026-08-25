import React from 'react';
import {
  Compass,
  CheckSquare,
  Sparkles,
  UserCheck,
  ShieldCheck,
  Target,
  ArrowRight,
  TrendingUp,
  Brain,
  Code,
  Users,
  Award,
} from 'lucide-react';

interface MethodologyViewProps {
  onStartAssessment: () => void;
  onLaunchMilestones: () => void;
}

export const MethodologyView: React.FC<MethodologyViewProps> = ({
  onStartAssessment,
  onLaunchMilestones,
}) => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                Scientific Framework
              </span>
              <span className="text-xs text-slate-400 font-mono">Methodology & Research</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              The MIG Adaptive Growth Framework
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              Engineered to replace informal, unstructured mentoring with data-backed self-awareness assessments, concrete deliverable verification, and rapid mentor feedback loops.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <button
              onClick={onStartAssessment}
              className="px-4 py-2.5 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-xs transition-colors cursor-pointer"
            >
              Take Baseline Test
            </button>
          </div>
        </div>
      </div>

      {/* 3 Core Philosophical Pillars */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            The Three Principles of Engineering Mentorship
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xs bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-mono font-bold text-xs">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900">Situational Self-Awareness</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              True leadership starts with recognizing your decision defaults under stress. Rather than static multiple choice questions, MIG presents nuanced trade-offs between architectural purity, velocity, and team cohesion.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xs bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-mono font-bold text-xs">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900">Verifiable Artifacts & Evidence</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Growth requires objective demonstration. Every milestone must be backed by tangible artifacts—an RFC, a cross-functional facilitation doc, an architecture PR, or a structured reflection log.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs space-y-3">
            <div className="w-8 h-8 rounded-xs bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-mono font-bold text-xs">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900">High-Velocity Mentor Feedback</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mentors receive AI-synthesized contextual briefs for every mentee deliverable, enabling deep 1-on-1 coaching rather than generic status updates.
            </p>
          </div>
        </div>
      </div>

      {/* Deep-Dive Calibration Matrix */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-xs border border-indigo-100">
            Algorithmic Calibration
          </span>
          <h2 className="text-lg font-bold text-slate-900 mt-2">
            How Gemini 3.7 Evaluates Developmental Trajectory
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            The multi-dimensional scoring rubric maps cognitive responses to technical leadership benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">1. Values & Motivator Extraction</span>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">L1-L3 Dimension</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluates alignment across 6 core spectrums: Technical Rigor, Velocity, Mentorship, Strategic Execution, Autonomy, and Empathy.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">2. Blindspot Diagnostic Matrix</span>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">Risk Assessment</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Identifies behavioral failure modes such as "Over-engineering RFCs", "Siloed Execution", or "Consensus Paralysis" before they impact promotions.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">3. Milestone Roadmap Sequencing</span>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">Dynamic Timeframes</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sequences goals from 2 to 12 weeks with calibrated difficulty curves, ensuring incremental wins lead directly to major career milestones.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900">4. Mentor Review Calibration Rubric</span>
              <span className="text-[10px] font-mono text-indigo-600 font-bold">1-5 Star Standard</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Provides mentors with structured critique guidelines, ensuring praise is specific and coaching inquiries prompt critical self-reflection.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 rounded-lg p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
        <div>
          <h3 className="text-lg font-bold">Ready to benchmark your baseline?</h3>
          <p className="text-xs text-slate-400 mt-1">
            Complete the 8-minute Identity and Self-Awareness Assessment now.
          </p>
        </div>
        <button
          onClick={onStartAssessment}
          className="px-5 py-2.5 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shrink-0 transition-colors cursor-pointer"
        >
          Start Assessment
        </button>
      </div>
    </div>
  );
};
