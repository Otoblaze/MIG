import React from 'react';
import { MenteeProfile, Milestone, AssessmentEvaluationResult, AssessmentDefinition } from '../types';
import {
  Compass,
  Award,
  CheckSquare,
  Sparkles,
  Flame,
  TrendingUp,
  MessageSquare,
  ArrowRight,
  Clock,
  CheckCircle2,
  Calendar,
  Plus,
  Play,
  ShieldCheck,
} from 'lucide-react';

interface MenteeDashboardProps {
  mentee: MenteeProfile;
  milestones: Milestone[];
  evaluation?: AssessmentEvaluationResult;
  assessments: AssessmentDefinition[];
  onStartAssessment: (assessmentId: string) => void;
  onViewAssessmentResult: () => void;
  onNavigateToMilestones: () => void;
  onNavigateToGrowth: () => void;
}

export const MenteeDashboard: React.FC<MenteeDashboardProps> = ({
  mentee,
  milestones = [],
  evaluation,
  assessments = [],
  onStartAssessment,
  onViewAssessmentResult,
  onNavigateToMilestones,
  onNavigateToGrowth,
}) => {
  const menteeMilestones = (milestones || []).filter((m) => m.menteeId === mentee.id);
  const completedMilestones = menteeMilestones.filter((m) => m.status === 'completed');
  const inProgressMilestones = menteeMilestones.filter((m) => m.status === 'in_progress' || m.status === 'under_review');
  const progressPercent =
    menteeMilestones.length > 0 ? Math.round((completedMilestones.length / menteeMilestones.length) * 100) : 0;

  const identityAssessment = (assessments || []).find((a) => a.category === 'identity_self_awareness') || (assessments || [])[0];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Welcome Hero Banner - Geometric Balance */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <img
              src={mentee.avatarUrl}
              alt={mentee.name}
              className="w-16 h-16 rounded-md object-cover border border-slate-200 shrink-0"
            />
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Welcome back, {mentee.name}
                </h1>
                {evaluation && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                    {evaluation.archetype}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                {mentee.role} at {mentee.company} • Mentored by <span className="font-semibold text-slate-900">{mentee.mentorName}</span>
              </p>
              <p className="text-xs text-slate-500 max-w-2xl pt-1">
                Strategic Goal: <span className="text-slate-800 font-medium">"{mentee.targetCareerGoal}"</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {!mentee.baselineCompleted ? (
              <button
                id="btn-start-baseline-assessment"
                onClick={() => onStartAssessment(identityAssessment.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                Take Baseline Test
              </button>
            ) : (
              <button
                id="btn-view-baseline-report"
                onClick={onViewAssessmentResult}
                className="flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                Assessment Report
              </button>
            )}

            <button
              onClick={onNavigateToMilestones}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Milestone Checklist
            </button>
          </div>
        </div>
      </div>

      {/* Geometric Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Baseline Self-Awareness */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Baseline Self-Awareness</span>
            {mentee.baselineCompleted ? (
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-slate-900">{evaluation?.overallScore || mentee.latestScore || 88}</span>
                <span className="text-xs text-slate-400 font-mono">/ 100</span>
              </div>
            ) : (
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Assessment</span>
            )}
          </div>
        </div>

        {/* Milestone Completion */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Sprint Milestones</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-slate-900">{completedMilestones.length}</span>
              <span className="text-xs text-slate-500 font-medium">of {menteeMilestones.length} ({progressPercent}%)</span>
            </div>
          </div>
        </div>

        {/* Growth Archetype */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Adaptive Archetype</span>
            <span className="text-xs font-bold text-slate-900 truncate block">
              {evaluation?.archetype || 'Uncalibrated'}
            </span>
          </div>
        </div>

        {/* Mentor Reviews */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="w-10 h-10 rounded-sm bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 border border-purple-100">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Mentor Feedback</span>
            <span className="text-xl font-bold text-slate-900">
              {menteeMilestones.filter((m) => m.feedback).length} Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Milestones & Assessment Highlights */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Milestones Card */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Active Milestone Checklist</h2>
                <p className="text-xs text-slate-400">Sequential developmental deliverables</p>
              </div>
              <button
                onClick={onNavigateToMilestones}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
              >
                View Full Tracker <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-2.5">
              {(menteeMilestones || []).slice(0, 4).map((m, idx) => (
                <div
                  key={m.id}
                  className="p-3.5 rounded-md border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-6 h-6 bg-indigo-100 text-indigo-700 font-bold rounded-xs flex items-center justify-center text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="space-y-0.5 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-xs ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'under_review'
                              ? 'bg-indigo-100 text-indigo-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {m.status.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500 uppercase">{m.category}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 truncate">{m.title}</h3>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-slate-400 font-medium shrink-0">
                    Week {m.targetWeeks}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Assessment & Values Overview */}
          {evaluation && (
            <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Evaluated Core Values & Drivers</h3>
                </div>
                <button
                  onClick={onViewAssessmentResult}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 uppercase tracking-wider cursor-pointer"
                >
                  Full Report <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {(evaluation.coreValues || []).slice(0, 4).map((cv, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-800">{cv.value}</span>
                      <span className="font-mono font-bold text-indigo-600">{cv.score}%</span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{cv.analysis}</p>
                  </div>
                ))}
              </div>

              <div className="p-3.5 bg-indigo-50/60 rounded-md border border-indigo-100 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-700 block tracking-wider">
                    AI Growth Strategy Recommendation
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
                    {evaluation.growthPillars?.[0]?.strategy || 'Focus on rapid low-fidelity feedback loops and boundary-setting.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Mentor Coaching & Catalog */}
        <div className="space-y-6">
          {/* Geometric Deep Indigo Mentor Notes Card */}
          <div className="bg-indigo-950 text-white rounded-lg p-6 relative overflow-hidden shadow-xs border border-indigo-900">
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-500 rounded-full opacity-20 pointer-events-none" />
            
            <div className="flex items-center gap-3 pb-3 border-b border-indigo-800/80 relative z-10">
              <div className="w-8 h-8 rounded-sm bg-indigo-600 flex items-center justify-center text-white">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">Mentor 1-on-1 Hub</h3>
                <p className="text-[11px] text-indigo-200">With {mentee.mentorName}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3 relative z-10">
              <div className="p-3 bg-indigo-900/60 rounded-md border border-indigo-800 text-xs text-indigo-100 space-y-1">
                <span className="text-[9px] uppercase font-bold text-indigo-300 tracking-wider block">Upcoming Discussion Agenda</span>
                <p className="leading-relaxed text-[11px]">
                  {evaluation?.mentorTalkingPoints?.[0] || 'Review baseline self-awareness assessment findings and calibrate Q3 milestone checklist.'}
                </p>
              </div>

              {menteeMilestones.find((m) => m.feedback?.praisePoints && m.feedback.praisePoints.length > 0) && (
                <div className="p-3 bg-indigo-900/40 rounded-md border border-indigo-700/60 text-xs space-y-1">
                  <span className="text-[9px] uppercase font-bold text-emerald-400 tracking-wider block">Latest Mentor Praise</span>
                  <p className="text-indigo-100 text-[11px] italic leading-relaxed">
                    "{menteeMilestones.find((m) => m.feedback?.praisePoints && m.feedback.praisePoints.length > 0)?.feedback?.praisePoints?.[0]}"
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Assessment Catalog */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Assessments Catalog</h3>
              <span className="text-[10px] font-mono text-slate-400">Adaptive Matrix</span>
            </div>

            <div className="space-y-2.5">
              {(assessments || []).map((a) => {
                const isBaseline = a.category === 'identity_self_awareness';
                const isCompleted = isBaseline && mentee.baselineCompleted;

                return (
                  <div
                    key={a.id}
                    className="p-3 rounded-md border border-slate-200 bg-slate-50/50 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{a.title}</h4>
                        <p className="text-[10px] text-slate-400 leading-tight">{a.tagline}</p>
                      </div>

                      {isCompleted ? (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 shrink-0 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Done
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 shrink-0">
                          {a.estimatedMinutes}m
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-end pt-1">
                      <button
                        onClick={() => {
                          if (isCompleted) {
                            onViewAssessmentResult();
                          } else {
                            onStartAssessment(a.id);
                          }
                        }}
                        className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                      >
                        {isCompleted ? 'View Results' : 'Start Assessment'} <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
