import React, { useState } from 'react';
import {
  MentorProfile,
  MenteeProfile,
  Milestone,
  AssessmentEvaluationResult,
  MilestoneFeedback,
} from '../types';
import { generateMentorFeedbackAI } from '../services/api';
import {
  UserCheck,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  Star,
  ExternalLink,
  ChevronRight,
  Plus,
  Compass,
  MessageSquare,
  TrendingUp,
  Loader2,
  FileText,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MentorDashboardProps {
  mentor: MentorProfile;
  mentees: MenteeProfile[];
  milestones: Milestone[];
  evaluations: Record<string, AssessmentEvaluationResult>;
  onUpdateMilestone: (updatedMilestone: Milestone) => void;
  onAddMilestoneToMentee: (menteeId: string, milestone: Omit<Milestone, 'id' | 'menteeId'>) => void;
  onSelectMenteeForView: (mentee: MenteeProfile) => void;
}

export const MentorDashboard: React.FC<MentorDashboardProps> = ({
  mentor,
  mentees = [],
  milestones = [],
  evaluations = {},
  onUpdateMilestone,
  onAddMilestoneToMentee,
  onSelectMenteeForView,
}) => {
  const [selectedMenteeId, setSelectedMenteeId] = useState<string>(mentees?.[0]?.id || '');
  const [reviewingMilestone, setReviewingMilestone] = useState<Milestone | null>(null);

  // Review Form state
  const [rating, setRating] = useState(5);
  const [praiseText, setPraiseText] = useState('');
  const [critiqueText, setCritiqueText] = useState('');
  const [coachingQuestionsText, setCoachingQuestionsText] = useState('');
  const [stretchGoalText, setStretchGoalText] = useState('');
  const [isGeneratingAiCoPilot, setIsGeneratingAiCoPilot] = useState(false);

  // Add Challenge Modal
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeCategory, setChallengeCategory] = useState('Leadership');
  const [challengeDesc, setChallengeDesc] = useState('');
  const [challengeWeeks, setChallengeWeeks] = useState(2);
  const [challengeEvidence, setChallengeEvidence] = useState('');

  // Filter milestones needing review across the cohort
  const pendingReviewMilestones = (milestones || []).filter((m) => m.status === 'under_review');

  const activeSelectedMentee = (mentees || []).find((m) => m.id === selectedMenteeId) || (mentees || [])[0];
  const menteeEval = activeSelectedMentee ? evaluations[activeSelectedMentee.id] : undefined;
  const selectedMenteeMilestones = (milestones || []).filter((m) => m.menteeId === activeSelectedMentee?.id);

  const handleStartReview = (m: Milestone) => {
    setReviewingMilestone(m);
    setRating(5);
    setPraiseText('');
    setCritiqueText('');
    setCoachingQuestionsText('');
    setStretchGoalText('');

    // Pre-seed with existing feedback if editing
    if (m.feedback) {
      setRating(m.feedback.rating);
      setPraiseText(m.feedback.praisePoints.join('\n'));
      setCritiqueText(m.feedback.constructiveCritique);
      setCoachingQuestionsText(m.feedback.coachingQuestions.join('\n'));
      setStretchGoalText(m.feedback.suggestedStretchGoal || '');
    }
  };

  const handleGenerateAiFeedback = async () => {
    if (!reviewingMilestone) return;

    setIsGeneratingAiCoPilot(true);
    const targetMentee = mentees.find((m) => m.id === reviewingMilestone.menteeId);

    try {
      const coPilot = await generateMentorFeedbackAI({
        menteeName: targetMentee?.name || 'Mentee',
        milestoneTitle: reviewingMilestone.title,
        menteeNotes: reviewingMilestone.submissionNotes,
        assessmentSummary: menteeEval?.executiveSummary,
        feedbackType: 'Constructive growth and stretch coaching',
      });

      setRating(coPilot.rating || 5);
      setPraiseText(coPilot.praisePoints.join('\n'));
      setCritiqueText(coPilot.constructiveCritique);
      setCoachingQuestionsText(coPilot.coachingQuestions.join('\n'));
      setStretchGoalText(coPilot.suggestedStretchGoal || '');
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAiCoPilot(false);
    }
  };

  const handleSaveAndApproveFeedback = () => {
    if (!reviewingMilestone) return;

    const feedbackObj: MilestoneFeedback = {
      id: `fb-${Date.now()}`,
      mentorId: mentor.id,
      mentorName: mentor.name,
      createdAt: new Date().toISOString(),
      rating,
      praisePoints: praiseText.split('\n').map((p) => p.trim()).filter(Boolean),
      constructiveCritique: critiqueText.trim(),
      coachingQuestions: coachingQuestionsText.split('\n').map((q) => q.trim()).filter(Boolean),
      suggestedStretchGoal: stretchGoalText.trim() || undefined,
    };

    onUpdateMilestone({
      ...reviewingMilestone,
      status: 'completed',
      completedAt: new Date().toISOString(),
      feedback: feedbackObj,
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    setReviewingMilestone(null);
  };

  const handleAddChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (!challengeTitle.trim() || !activeSelectedMentee) return;

    onAddMilestoneToMentee(activeSelectedMentee.id, {
      title: challengeTitle.trim(),
      category: challengeCategory,
      description: challengeDesc.trim() || 'Assigned by mentor to accelerate growth edge',
      targetWeeks: Number(challengeWeeks),
      evidenceRequired: challengeEvidence.trim() || 'Artifact review in next 1-on-1',
      status: 'not_started',
      isAiGenerated: false,
    });

    setShowChallengeModal(false);
    setChallengeTitle('');
    setChallengeDesc('');
    setChallengeEvidence('');
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Mentor Header Profile - Geometric Balance */}
      <div className="bg-slate-900 rounded-lg p-6 sm:p-8 text-white border border-slate-800 shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={mentor.avatarUrl}
            alt={mentor.name}
            className="w-14 h-14 rounded-md object-cover ring-2 ring-indigo-500"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                Mentor Command Center
              </span>
              <span className="text-xs text-slate-400 font-mono">{mentor.company}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">{mentor.name}</h1>
            <p className="text-xs text-indigo-300">{mentor.title}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-800/80 px-4 py-2 rounded-md border border-slate-700 text-center min-w-[100px]">
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold block">
              Cohort
            </span>
            <span className="text-lg font-bold text-white font-mono">{mentees.length} Mentees</span>
          </div>

          <div className="bg-slate-800/80 px-4 py-2 rounded-md border border-slate-700 text-center min-w-[100px]">
            <span className="text-[9px] uppercase tracking-wider text-rose-300 font-bold block">
              Pending
            </span>
            <span className="text-lg font-bold text-rose-400 font-mono">{pendingReviewMilestones.length} Reviews</span>
          </div>
        </div>
      </div>

      {/* Pending Reviews Queue */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xs bg-rose-50 text-rose-600 border border-rose-200 flex items-center justify-center font-mono font-bold text-xs">
              {pendingReviewMilestones.length}
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">Milestone Review Queue</h2>
              <p className="text-xs text-slate-400">Mentees awaiting your coaching evaluation and feedback</p>
            </div>
          </div>
        </div>

        {pendingReviewMilestones.length === 0 ? (
          <div className="p-8 text-center bg-slate-50 rounded-md border border-slate-200">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-xs font-bold uppercase tracking-wider text-slate-700">All submissions are reviewed</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Tight feedback loops maintain high mentee velocity.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {(pendingReviewMilestones || []).map((m) => {
              const submittingMentee = (mentees || []).find((me) => me.id === m.menteeId);
              return (
                <div
                  key={m.id}
                  className="p-4 rounded-md border border-indigo-200 bg-indigo-50/15 hover:border-indigo-300 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={submittingMentee?.avatarUrl}
                          alt={submittingMentee?.name}
                          className="w-6 h-6 rounded-xs object-cover"
                        />
                        <span className="text-xs font-bold text-slate-900">{submittingMentee?.name}</span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 rounded-xs bg-indigo-100 text-indigo-700 font-bold uppercase tracking-wider">
                        {m.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{m.title}</h3>

                    {m.submissionNotes && (
                      <p className="text-xs text-slate-600 line-clamp-2 bg-white p-2.5 rounded-xs border border-slate-100 italic">
                        "{m.submissionNotes}"
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-indigo-100 flex items-center justify-between">
                    {m.submissionLink ? (
                      <a
                        href={m.submissionLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 hover:underline flex items-center gap-1 font-medium"
                      >
                        <ExternalLink className="w-3 h-3" /> Artifact
                      </a>
                    ) : (
                      <span className="text-[11px] font-mono text-slate-400">No link attached</span>
                    )}

                    <button
                      id={`btn-review-${m.id}`}
                      onClick={() => handleStartReview(m)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-2xs transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
                      Review Co-Pilot
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Cohort Management & Deep Dive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Mentee Roster */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Cohort Mentees</h2>
            <span className="text-xs text-slate-400 font-mono">{(mentees || []).length} Members</span>
          </div>

          <div className="space-y-2">
            {(mentees || []).map((m) => {
              const isSelected = m.id === activeSelectedMentee?.id;
              const menteeMilestonesCount = (milestones || []).filter((ms) => ms.menteeId === m.id);
              const completedCount = menteeMilestonesCount.filter((ms) => ms.status === 'completed').length;
              const hasPending = menteeMilestonesCount.some((ms) => ms.status === 'under_review');

              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMenteeId(m.id)}
                  className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50/40 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={m.avatarUrl}
                      alt={m.name}
                      className="w-10 h-10 rounded-md object-cover ring-1 ring-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 truncate">{m.name}</h3>
                        {hasPending && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate">{m.role}</p>

                      <div className="flex items-center gap-2 mt-2">
                        {m.baselineCompleted ? (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 font-bold uppercase tracking-wider">
                            Score: {m.latestScore || 85}%
                          </span>
                        ) : (
                          <span className="text-[9px] px-1.5 py-0.5 rounded-xs bg-amber-100 text-amber-800 font-bold uppercase tracking-wider">
                            Pending
                          </span>
                        )}

                        <span className="text-[10px] text-slate-400 font-mono">
                          {completedCount}/{menteeMilestonesCount.length} Done
                        </span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-slate-400 mt-2 ${isSelected ? 'text-indigo-600' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Selected Mentee Deep Dive & Coaching Tools */}
        <div className="lg:col-span-2 space-y-6">
          {activeSelectedMentee && (
            <>
              {/* Mentee Profile Summary Card */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeSelectedMentee.avatarUrl}
                      alt={activeSelectedMentee.name}
                      className="w-12 h-12 rounded-md object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">{activeSelectedMentee.name}</h2>
                      <p className="text-xs text-slate-400">
                        {activeSelectedMentee.role} • {activeSelectedMentee.company}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowChallengeModal(true)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Assign Stretch
                    </button>
                    <button
                      onClick={() => onSelectMenteeForView(activeSelectedMentee)}
                      className="px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
                    >
                      Mentee View
                    </button>
                  </div>
                </div>

                {/* Target Career Goal */}
                <div className="mt-4 p-3.5 bg-indigo-50/40 rounded-md border border-indigo-100 flex items-start gap-2.5">
                  <Compass className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-indigo-700 block">
                      Target Career Goal
                    </span>
                    <p className="text-xs text-slate-800 font-medium leading-relaxed">
                      {activeSelectedMentee.targetCareerGoal}
                    </p>
                  </div>
                </div>

                {/* Self-Awareness Baseline Profile (if completed) */}
                {menteeEval ? (
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Award className="w-4 h-4 text-indigo-600" />
                        <h3 className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                          Baseline Self-Awareness & Values
                        </h3>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-xs border border-indigo-100">
                        {menteeEval.archetype}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-200">
                      {menteeEval.executiveSummary}
                    </p>

                    {/* Top Core Values */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {(menteeEval.coreValues || []).slice(0, 3).map((cv, i) => (
                        <div key={i} className="p-2.5 bg-slate-50 rounded-md border border-slate-200 text-xs">
                          <span className="font-bold text-slate-800 block truncate">{cv.value}</span>
                          <span className="text-[11px] text-indigo-600 font-mono font-bold">{cv.score}% align</span>
                        </div>
                      ))}
                    </div>

                    {/* 1-on-1 Mentor Prompts */}
                    <div className="p-3.5 bg-amber-50/60 rounded-md border border-amber-200">
                      <span className="text-[9px] uppercase font-bold tracking-wider text-amber-800 flex items-center gap-1 mb-1.5">
                        <MessageSquare className="w-3 h-3" /> Recommended 1-on-1 Coaching Prompts
                      </span>
                      <ul className="list-disc list-inside text-xs text-amber-950 space-y-1">
                        {(menteeEval.mentorTalkingPoints || []).slice(0, 2).map((tp, idx) => (
                          <li key={idx}>{tp}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="mt-4 p-4 text-center bg-slate-50 rounded-md border border-slate-200">
                    <p className="text-xs text-slate-500">This mentee has not taken their baseline identity assessment yet.</p>
                  </div>
                )}
              </div>

              {/* Active Milestones Checklist */}
              <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">Milestone Roadmap</h3>
                  <span className="text-xs text-slate-400 font-mono">
                    {selectedMenteeMilestones.length} Total Goals
                  </span>
                </div>

                <div className="space-y-2.5">
                  {(selectedMenteeMilestones || []).map((m) => (
                    <div
                      key={m.id}
                      className={`p-3.5 rounded-md border transition-colors flex items-center justify-between gap-3 ${
                        m.status === 'completed'
                          ? 'border-emerald-200 bg-emerald-50/15'
                          : m.status === 'under_review'
                          ? 'border-indigo-200 bg-indigo-50/15'
                          : 'border-slate-200 bg-slate-50/40'
                      }`}
                    >
                      <div className="space-y-0.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-xs ${
                              m.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : m.status === 'under_review'
                                ? 'bg-indigo-100 text-indigo-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {m.status.replace('_', ' ')}
                          </span>
                          <span className="text-[11px] font-semibold text-slate-600">{m.category}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 truncate">{m.title}</h4>
                      </div>

                      <button
                        onClick={() => handleStartReview(m)}
                        className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200 rounded-xs bg-slate-100 shrink-0 cursor-pointer"
                      >
                        {m.feedback ? 'Edit Feedback' : 'Evaluate'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Review & AI Co-Pilot Modal */}
      {reviewingMilestone && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 my-8">
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600">Mentor Review & Feedback</span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">{reviewingMilestone.title}</h3>
                <p className="text-xs text-slate-400 font-mono">
                  {reviewingMilestone.category} • Target Week {reviewingMilestone.targetWeeks}
                </p>
              </div>

              {/* AI Co-Pilot Button */}
              <button
                id="btn-ai-copilot-draft"
                onClick={handleGenerateAiFeedback}
                disabled={isGeneratingAiCoPilot}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                {isGeneratingAiCoPilot ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                )}
                <span>{isGeneratingAiCoPilot ? 'Drafting...' : 'Auto-Draft AI'}</span>
              </button>
            </div>

            {/* Mentee Submission context */}
            {reviewingMilestone.submissionNotes && (
              <div className="p-3.5 bg-slate-50 rounded-md border border-slate-200 text-xs space-y-1">
                <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider block">Mentee Notes</span>
                <p className="text-slate-800 leading-relaxed">{reviewingMilestone.submissionNotes}</p>
                {reviewingMilestone.submissionLink && (
                  <a
                    href={reviewingMilestone.submissionLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-600 font-medium hover:underline flex items-center gap-1 mt-1"
                  >
                    <ExternalLink className="w-3 h-3" /> View Submitted Artifact
                  </a>
                )}
              </div>
            )}

            {/* Form Fields */}
            <div className="space-y-4">
              {/* Star Rating */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Milestone Mastery Rating (1-5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform cursor-pointer"
                    >
                      <Star
                        className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-mono font-bold text-slate-700 ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              {/* Praise Points */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Praise & Positive Reinforcement (One per line)
                </label>
                <textarea
                  value={praiseText}
                  onChange={(e) => setPraiseText(e.target.value)}
                  placeholder="Highlights, demonstrated strengths, craftsmanship..."
                  rows={2}
                  className="w-full text-xs p-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Constructive Guidance */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Constructive Critique & Guidance
                </label>
                <textarea
                  value={critiqueText}
                  onChange={(e) => setCritiqueText(e.target.value)}
                  placeholder="Where to refine, trade-offs to consider next time..."
                  rows={2}
                  className="w-full text-xs p-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Coaching Questions */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  1-on-1 Coaching Question(s)
                </label>
                <input
                  type="text"
                  value={coachingQuestionsText}
                  onChange={(e) => setCoachingQuestionsText(e.target.value)}
                  placeholder="e.g. How will you scale this decision framework to other initiatives?"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>

              {/* Optional Stretch Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Suggested Stretch Challenge (Optional)
                </label>
                <input
                  type="text"
                  value={stretchGoalText}
                  onChange={(e) => setStretchGoalText(e.target.value)}
                  placeholder="e.g., Deliver a 10-minute lightning talk to the group..."
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setReviewingMilestone(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                id="btn-save-approve-feedback"
                onClick={handleSaveAndApproveFeedback}
                className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm shadow-xs cursor-pointer"
              >
                Save Feedback & Mark Completed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assign Stretch Challenge Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="pb-2 border-b border-slate-100">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600">Mentor Direct Assignment</span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                Assign Stretch Goal to {activeSelectedMentee.name}
              </h3>
            </div>

            <form onSubmit={handleAddChallenge} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Goal Title *</label>
                <input
                  type="text"
                  value={challengeTitle}
                  onChange={(e) => setChallengeTitle(e.target.value)}
                  placeholder="e.g. Lead Cross-Team Technical Workshop"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category</label>
                  <select
                    value={challengeCategory}
                    onChange={(e) => setChallengeCategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                  >
                    <option value="Leadership">Leadership</option>
                    <option value="Strategic Execution">Strategic Execution</option>
                    <option value="Craft Mastery">Craft Mastery</option>
                    <option value="Communication">Communication</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Target Weeks</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={challengeWeeks}
                    onChange={(e) => setChallengeWeeks(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Context & Expectations</label>
                <textarea
                  value={challengeDesc}
                  onChange={(e) => setChallengeDesc(e.target.value)}
                  placeholder="Why this stretch goal will accelerate their growth..."
                  rows={2}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChallengeModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!challengeTitle.trim()}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm cursor-pointer"
                >
                  Assign to Mentee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
