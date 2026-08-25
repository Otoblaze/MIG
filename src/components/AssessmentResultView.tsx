import React from 'react';
import { AssessmentEvaluationResult, Milestone } from '../types';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from 'recharts';
import {
  Sparkles,
  Award,
  ShieldAlert,
  Flame,
  CheckCircle,
  Plus,
  MessageSquare,
  ArrowRight,
  TrendingUp,
  BookmarkCheck,
  Calendar,
  Share2,
} from 'lucide-react';

interface AssessmentResultViewProps {
  result: AssessmentEvaluationResult;
  onAddMilestonesToTracker: (milestones: Omit<Milestone, 'id' | 'menteeId'>[]) => void;
  onViewMilestoneTracker: () => void;
  onRetake?: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  result,
  onAddMilestonesToTracker,
  onViewMilestoneTracker,
  onRetake,
}) => {
  const [addedMilestones, setAddedMilestones] = React.useState(false);

  // Data for Core Values Radar Chart
  const radarData = (result?.coreValues || []).map((cv) => ({
    subject: cv.value,
    score: cv.score,
    fullMark: 100,
  }));

  // Data for Motivators Bar Chart
  const motivatorsData = (result?.professionalMotivators || []).map((pm) => ({
    name: pm.motivator,
    score: pm.score,
    impact: pm.impact,
  }));

  const handleAddAllMilestones = () => {
    const milestonesToAdd: Omit<Milestone, 'id' | 'menteeId'>[] = (result?.recommendedMilestones || []).map((rm) => ({
      title: rm.title,
      category: rm.category,
      description: rm.description,
      targetWeeks: rm.targetWeeks,
      evidenceRequired: rm.evidenceRequired,
      status: 'not_started',
      isAiGenerated: true,
    }));

    onAddMilestonesToTracker(milestonesToAdd);
    setAddedMilestones(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-indigo-600 bg-indigo-50 border-indigo-200';
    return 'text-amber-600 bg-amber-50 border-amber-200';
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Archetype & Score Hero Banner - Geometric Balance */}
      <div className="bg-slate-900 rounded-lg p-6 sm:p-8 text-white shadow-xs relative overflow-hidden border border-slate-800">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-xs text-[10px] font-bold uppercase tracking-widest bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-300" />
                Adaptive Assessment Synthesis
              </span>
              <span className="text-[11px] font-mono text-slate-400">
                {new Date(result.completedAt).toLocaleDateString()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {result.archetype}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">
              {result.assessmentTitle} Calibration Matrix
            </p>
          </div>

          {/* Overall Baseline Score Badge */}
          <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-md text-center min-w-[140px] shrink-0">
            <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-1">
              Baseline Score
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-mono">
              {result.overallScore}
              <span className="text-base text-slate-400 font-normal"> /100</span>
            </div>
            <div className="text-[10px] text-emerald-400 mt-1 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" /> High Alignment
            </div>
          </div>
        </div>
      </div>

      {/* Executive Psychological & Professional Summary */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-100">
          <Award className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Executive Baseline Summary</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          {result.executiveSummary}
        </p>
      </div>

      {/* Core Values & Motivators Dual Column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Core Values Radar & Analysis */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Core Values Spectrum</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Adaptive Rigor</span>
            </div>

            {/* Radar Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} stroke="#cbd5e1" />
                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#4f46e5"
                    fill="#6366f1"
                    fillOpacity={0.35}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Value List */}
            <div className="space-y-2.5 mt-4">
              {(result?.coreValues || []).map((cv, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">{cv.value}</span>
                    <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-xs border border-indigo-100">
                      {cv.score}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{cv.analysis}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Professional Motivators & Impact */}
        <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Professional Motivators</h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Energy Drivers</span>
            </div>

            {/* Motivators Bar Chart */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={motivatorsData} layout="vertical" margin={{ top: 10, right: 20, left: 40, bottom: 5 }}>
                  <XAxis type="number" domain={[0, 100]} hide />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#334155', fontSize: 10, fontWeight: 600 }} width={120} />
                  <Tooltip
                    contentStyle={{ borderRadius: '4px', fontSize: '11px', border: '1px solid #cbd5e1' }}
                    formatter={(value: any) => [`${value}% Intensity`, 'Motivator']}
                  />
                  <Bar dataKey="score" radius={[0, 2, 2, 0]} barSize={16}>
                    {motivatorsData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#4f46e5' : '#0ea5e9'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Motivators Analysis */}
            <div className="space-y-2.5 mt-4">
              {(result?.professionalMotivators || []).map((pm, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-md border border-slate-200">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-bold text-slate-900">{pm.motivator}</span>
                    <span className="font-mono font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-xs border border-sky-100">
                      {pm.score}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{pm.impact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blind Spots & Frictions */}
      <div className="bg-amber-50/50 rounded-lg border border-amber-200/70 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-amber-200/60">
          <ShieldAlert className="w-4 h-4 text-amber-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-amber-950">
            Identified Growth Blind Spots & Frictions
          </h3>
        </div>
        <p className="text-xs text-amber-900/80 mb-4">
          Recognizing these patterns early empowers you and your mentor to design deliberate safeguards.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(result?.blindSpots || []).map((spot, idx) => (
            <div key={idx} className="bg-white p-4 rounded-md border border-amber-200 text-xs text-slate-700 leading-relaxed shadow-2xs">
              <span className="font-bold text-amber-600 uppercase text-[10px] tracking-wider block mb-1">Observation #{idx + 1}</span>
              {spot}
            </div>
          ))}
        </div>
      </div>

      {/* AI-Generated Tailored Growth Pillars */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Personalized Growth Pillars</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted strategies & weekly micro-habits calibrated to your core values.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(result?.growthPillars || []).map((pillar, idx) => (
            <div key={idx} className="p-5 rounded-md bg-slate-50 border border-slate-200 flex flex-col justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 mb-1">
                  Pillar {idx + 1} • {pillar.focusArea}
                </div>
                <h3 className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{pillar.strategy}</p>
              </div>

              <div className="bg-indigo-50/70 p-3 rounded-xs border border-indigo-100">
                <span className="text-[9px] uppercase font-bold text-indigo-700 block mb-1 tracking-wider">
                  Weekly Micro-Habit
                </span>
                <p className="text-xs text-slate-800 font-medium leading-normal">{pillar.weeklyHabit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Milestones & Checklist Integration */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BookmarkCheck className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Adaptive Milestone Checklist</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Sequential deliverables generated by Gemini AI to measure your baseline growth.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {!addedMilestones ? (
              <button
                id="btn-add-all-milestones"
                onClick={handleAddAllMilestones}
                className="flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add to Milestone Tracker
              </button>
            ) : (
              <button
                onClick={onViewMilestoneTracker}
                className="flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                Added! View Checklist
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-2.5">
          {(result?.recommendedMilestones || []).map((rm, idx) => (
            <div
              key={idx}
              className="p-4 rounded-md border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-xs bg-slate-200 text-slate-700">
                    Week {rm.targetWeeks}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-indigo-50 text-indigo-700">
                    {rm.category}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{rm.title}</h4>
                </div>
                <p className="text-xs text-slate-600">{rm.description}</p>
                <p className="text-[11px] text-slate-500 font-medium">
                  Evidence Required: <span className="text-slate-700 font-medium">{rm.evidenceRequired}</span>
                </p>
              </div>

              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 shrink-0 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Ready to Track
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mentor 1-on-1 Discussion Prompts */}
      <div className="bg-indigo-50/60 rounded-lg border border-indigo-100 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-200/60">
          <MessageSquare className="w-4 h-4 text-indigo-700" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-950">
            Recommended Mentor 1-on-1 Discussion Prompts
          </h3>
        </div>
        <p className="text-xs text-indigo-900/80 mb-4">
          Bring these targeted prompts to your next mentoring session to facilitate high-impact coaching.
        </p>

        <div className="space-y-2">
          {(result?.mentorTalkingPoints || []).map((tp, idx) => (
            <div key={idx} className="bg-white p-3.5 rounded-md border border-indigo-100 text-xs text-slate-800 flex items-start gap-2.5 shadow-2xs">
              <span className="w-4 h-4 rounded-xs bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0 text-[10px]">
                {idx + 1}
              </span>
              <span className="leading-relaxed font-medium">{tp}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
