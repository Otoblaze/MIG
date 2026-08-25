import React, { useState } from 'react';
import { Milestone, MenteeProfile, MilestoneStatus } from '../types';
import { generateCustomMilestonesAI } from '../services/api';
import {
  CheckSquare,
  Clock,
  Sparkles,
  Plus,
  Send,
  MessageSquare,
  Star,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  AlertCircle,
  Award,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface MilestoneTrackerProps {
  mentee: MenteeProfile;
  milestones: Milestone[];
  onUpdateMilestone: (updatedMilestone: Milestone) => void;
  onAddMilestone: (newMilestone: Omit<Milestone, 'id'>) => void;
  onAddMultipleMilestones: (newMilestones: Omit<Milestone, 'id' | 'menteeId'>[]) => void;
}

export const MilestoneTracker: React.FC<MilestoneTrackerProps> = ({
  mentee,
  milestones = [],
  onUpdateMilestone,
  onAddMilestone,
  onAddMultipleMilestones,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>(null);

  // Submit Modal state
  const [submittingMilestone, setSubmittingMilestone] = useState<Milestone | null>(null);
  const [submissionNotes, setSubmissionNotes] = useState('');
  const [submissionLink, setSubmissionLink] = useState('');

  // AI Generator Modal state
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiGoal, setAiGoal] = useState('');
  const [aiTimeframe, setAiTimeframe] = useState('6 weeks');
  const [aiFocusArea, setAiFocusArea] = useState('Strategic Execution');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Manual Add Modal state
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualCategory, setManualCategory] = useState('Execution');
  const [manualDesc, setManualDesc] = useState('');
  const [manualWeeks, setManualWeeks] = useState(2);
  const [manualEvidence, setManualEvidence] = useState('');

  const menteeMilestones = (milestones || []).filter((m) => m.menteeId === mentee?.id);

  const completedCount = menteeMilestones.filter((m) => m.status === 'completed').length;
  const totalCount = menteeMilestones.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Categories list
  const categories = ['all', ...Array.from(new Set(menteeMilestones.map((m) => m.category)))];

  const filteredMilestones = menteeMilestones.filter((m) => {
    const matchesStatus = selectedFilter === 'all' || m.status === selectedFilter;
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    return matchesStatus && matchesCategory;
  });

  const handleStatusChange = (milestone: Milestone, newStatus: MilestoneStatus) => {
    if (newStatus === 'under_review') {
      setSubmittingMilestone(milestone);
      setSubmissionNotes(milestone.submissionNotes || '');
      setSubmissionLink(milestone.submissionLink || '');
      return;
    }

    if (newStatus === 'completed') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    onUpdateMilestone({
      ...milestone,
      status: newStatus,
      completedAt: newStatus === 'completed' ? new Date().toISOString() : milestone.completedAt,
    });
  };

  const handleConfirmSubmission = () => {
    if (!submittingMilestone) return;

    onUpdateMilestone({
      ...submittingMilestone,
      status: 'under_review',
      submissionNotes: submissionNotes.trim(),
      submissionLink: submissionLink.trim(),
    });

    setSubmittingMilestone(null);
    setSubmissionNotes('');
    setSubmissionLink('');
  };

  const handleGenerateAiMilestones = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiGoal.trim()) return;

    setIsGeneratingAi(true);
    try {
      const generated = await generateCustomMilestonesAI({
        goal: aiGoal,
        timeframe: aiTimeframe,
        currentLevel: mentee.role,
        focusArea: aiFocusArea,
      });

      onAddMultipleMilestones(generated);
      setShowAiModal(false);
      setAiGoal('');

      confetti({
        particleCount: 40,
        spread: 50,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleCreateManualMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    onAddMilestone({
      menteeId: mentee.id,
      title: manualTitle.trim(),
      category: manualCategory,
      description: manualDesc.trim() || 'Custom milestone defined with mentor',
      targetWeeks: Number(manualWeeks),
      evidenceRequired: manualEvidence.trim() || 'Evidence document or PR review link',
      status: 'not_started',
      isAiGenerated: false,
    });

    setShowManualModal(false);
    setManualTitle('');
    setManualDesc('');
    setManualEvidence('');
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header & Progress Banner - Geometric Balance */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                Milestone Engine
              </span>
              <span className="text-xs text-slate-400 font-mono">Mentee: {mentee.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">Milestone Checklists & Evidence</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Track sequential developmental goals, attach reflection evidence, and collaborate directly with your mentor.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-open-ai-milestones"
              onClick={() => setShowAiModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
              Generate Milestones with AI
            </button>

            <button
              id="btn-add-manual-milestone"
              onClick={() => setShowManualModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Custom
            </button>
          </div>
        </div>

        {/* Progress Bar & Stats */}
        <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              <span>Milestone Sprint Completion</span>
              <span className="text-indigo-600 font-mono">{progressPercent}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-xs overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-xs transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Completed</span>
            <span className="text-base font-bold text-slate-900 font-mono">{completedCount} / {totalCount}</span>
          </div>

          <div className="bg-slate-50 p-3 rounded-md border border-slate-200 text-center">
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Mentor Reviews</span>
            <span className="text-base font-bold text-indigo-600 font-mono">
              {menteeMilestones.filter((m) => m.feedback).length} Received
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
        {/* Status Filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All Milestones' },
            { id: 'in_progress', label: 'In Progress' },
            { id: 'under_review', label: 'Under Review' },
            { id: 'completed', label: 'Completed' },
            { id: 'not_started', label: 'Not Started' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xs text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1 text-slate-700 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 font-medium"
            >
              <option value="all">All Categories</option>
              {categories.filter((c) => c !== 'all').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Milestone List */}
      <div className="space-y-3">
        {filteredMilestones.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">No milestones match your filter</h3>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Try adjusting your filter settings or generate fresh milestones with AI.
            </p>
            <button
              onClick={() => setShowAiModal(true)}
              className="px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white cursor-pointer"
            >
              Generate Milestones
            </button>
          </div>
        ) : (
          (filteredMilestones || []).map((m) => {
            const isExpanded = expandedMilestoneId === m.id;
            return (
              <div
                key={m.id}
                className={`bg-white rounded-lg border transition-all duration-150 ${
                  m.status === 'completed'
                    ? 'border-emerald-300/80 bg-emerald-50/15'
                    : m.status === 'under_review'
                    ? 'border-indigo-300 bg-indigo-50/15'
                    : 'border-slate-200'
                }`}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    {/* Left details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Status Badge */}
                        <span
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs ${
                            m.status === 'completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : m.status === 'under_review'
                              ? 'bg-indigo-100 text-indigo-800 animate-pulse'
                              : m.status === 'in_progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {m.status.replace('_', ' ')}
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-slate-100 text-slate-600">
                          {m.category}
                        </span>

                        <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Week {m.targetWeeks}
                        </span>

                        {m.isAiGenerated && (
                          <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" /> AI Calibrated
                          </span>
                        )}
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                        {m.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {m.description}
                      </p>

                      <div className="text-[11px] text-slate-500 font-medium pt-1">
                        Required Evidence: <span className="text-slate-800 font-medium">{m.evidenceRequired}</span>
                      </div>
                    </div>

                    {/* Right interactive control */}
                    <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
                      {m.status === 'not_started' && (
                        <button
                          onClick={() => handleStatusChange(m, 'in_progress')}
                          className="px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer"
                        >
                          Start Milestone
                        </button>
                      )}

                      {m.status === 'in_progress' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleStatusChange(m, 'under_review')}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            Submit
                          </button>
                          <button
                            onClick={() => handleStatusChange(m, 'completed')}
                            className="px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
                          >
                            Mark Done
                          </button>
                        </div>
                      )}

                      {m.status === 'under_review' && (
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xs border border-indigo-100 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 animate-spin" /> In Review
                          </span>
                          <button
                            onClick={() => handleStatusChange(m, 'completed')}
                            className="px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white hover:bg-emerald-700 transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                        </div>
                      )}

                      {m.status === 'completed' && (
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-xs">
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </span>
                      )}

                      {/* Expand / Collapse toggle */}
                      {(m.submissionNotes || m.feedback) && (
                        <button
                          onClick={() => setExpandedMilestoneId(isExpanded ? null : m.id)}
                          className="text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          {isExpanded ? 'Hide Details' : 'Notes & Mentor Feedback'}
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Submission Evidence / Mentor Feedback Drawer */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                      {m.submissionNotes && (
                        <div className="p-3 bg-slate-50 rounded-md border border-slate-200">
                          <span className="text-[9px] uppercase font-bold tracking-wider text-slate-400 block mb-1">
                            Mentee Reflection & Evidence
                          </span>
                          <p className="text-xs text-slate-700 leading-relaxed">{m.submissionNotes}</p>
                          {m.submissionLink && (
                            <a
                              href={m.submissionLink}
                              target="_blank"
                              rel="noreferrer"
                              className="text-xs text-indigo-600 hover:underline flex items-center gap-1 mt-2 font-medium"
                            >
                              <ExternalLink className="w-3 h-3" />
                              View Submission Artifact ({m.submissionLink})
                            </a>
                          )}
                        </div>
                      )}

                      {m.feedback && (
                        <div className="p-4 bg-indigo-50/70 rounded-md border border-indigo-100 space-y-2.5">
                          <div className="flex items-center justify-between pb-2 border-b border-indigo-100">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                                Feedback from {m.feedback.mentorName}
                              </span>
                              <div className="flex text-amber-500">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3.5 h-3.5 ${
                                      i < m.feedback!.rating ? 'fill-amber-400' : 'text-slate-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] font-mono text-slate-400">
                              {new Date(m.feedback.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[9px] uppercase font-bold text-emerald-700 tracking-wider block">Praise Points</span>
                            <ul className="list-disc list-inside text-xs text-slate-700 space-y-0.5">
                              {(m.feedback.praisePoints || []).map((p, i) => (
                                <li key={i}>{p}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <span className="text-[9px] uppercase font-bold text-indigo-700 tracking-wider block mb-0.5">
                              Constructive Guidance
                            </span>
                            <p className="text-xs text-slate-700 leading-relaxed">{m.feedback.constructiveCritique}</p>
                          </div>

                          {m.feedback.coachingQuestions?.length > 0 && (
                            <div>
                              <span className="text-[9px] uppercase font-bold text-indigo-700 tracking-wider block mb-0.5">
                                1-on-1 Coaching Question
                              </span>
                              <p className="text-xs text-slate-800 font-medium italic">
                                "{m.feedback.coachingQuestions[0]}"
                              </p>
                            </div>
                          )}

                          {m.feedback.suggestedStretchGoal && (
                            <div className="p-2.5 bg-white rounded-xs border border-indigo-100 text-xs text-indigo-950 font-medium">
                              🚀 Stretch Goal: {m.feedback.suggestedStretchGoal}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submit for Mentor Review Modal */}
      {submittingMilestone && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600">Submit Deliverable</span>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">{submittingMilestone.title}</h3>
              <p className="text-xs text-slate-400">Provide reflection notes and links for your mentor to evaluate.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Reflections, Learnings & Outcomes *
              </label>
              <textarea
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                placeholder="What went well? What trade-offs did you make? What questions do you have for your mentor?"
                rows={3}
                className="w-full text-xs p-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Artifact / Evidence Link (Optional)
              </label>
              <input
                type="text"
                value={submissionLink}
                onChange={(e) => setSubmissionLink(e.target.value)}
                placeholder="https://github.com/... or https://docs.google.com/..."
                className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSubmittingMilestone(null)}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmission}
                disabled={!submissionNotes.trim()}
                className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
              >
                Submit for Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Milestone Generator Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <div className="w-8 h-8 rounded-xs bg-indigo-600 text-white flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">AI Milestone Roadmap Generator</h3>
                <p className="text-xs text-slate-400">Gemini 3.7 creates tailored developmental milestones.</p>
              </div>
            </div>

            <form onSubmit={handleGenerateAiMilestones} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Target Developmental Goal *
                </label>
                <input
                  type="text"
                  value={aiGoal}
                  onChange={(e) => setAiGoal(e.target.value)}
                  placeholder="e.g., Transition to Tech Lead, Master Distributed Systems, Improve Executive Presence..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500 focus:outline-hidden"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Timeframe</label>
                  <select
                    value={aiTimeframe}
                    onChange={(e) => setAiTimeframe(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="4 weeks">4 Weeks</option>
                    <option value="6 weeks">6 Weeks</option>
                    <option value="8 weeks">8 Weeks</option>
                    <option value="12 weeks">12 Weeks</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Focus Area</label>
                  <select
                    value={aiFocusArea}
                    onChange={(e) => setAiFocusArea(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Strategic Execution">Strategic Execution</option>
                    <option value="Leadership & Influence">Leadership & Influence</option>
                    <option value="Craft Mastery">Craft Mastery</option>
                    <option value="Self-Awareness & Values">Self-Awareness & Values</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAiModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isGeneratingAi || !aiGoal.trim()}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white rounded-sm flex items-center gap-1.5 disabled:bg-slate-200 disabled:text-slate-400 cursor-pointer"
                >
                  {isGeneratingAi && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isGeneratingAi ? 'Synthesizing...' : 'Generate Roadmap'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Milestone Creation Modal */}
      {showManualModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-6 space-y-4">
            <div className="pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">Add Custom Milestone</h3>
              <p className="text-xs text-slate-400">Create a specific goal agreed upon with your mentor.</p>
            </div>

            <form onSubmit={handleCreateManualMilestone} className="space-y-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Milestone Title *</label>
                <input
                  type="text"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  placeholder="e.g. Lead Sprint Retrospective"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md focus:ring-1 focus:ring-indigo-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Category</label>
                  <select
                    value={manualCategory}
                    onChange={(e) => setManualCategory(e.target.value)}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                  >
                    <option value="Self-Awareness">Self-Awareness</option>
                    <option value="Execution">Execution</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Craft Mastery">Craft Mastery</option>
                    <option value="Communication">Communication</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Target Weeks</label>
                  <input
                    type="number"
                    min="1"
                    max="24"
                    value={manualWeeks}
                    onChange={(e) => setManualWeeks(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Description</label>
                <textarea
                  value={manualDesc}
                  onChange={(e) => setManualDesc(e.target.value)}
                  placeholder="Details of the deliverable..."
                  rows={2}
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Evidence Required</label>
                <input
                  type="text"
                  value={manualEvidence}
                  onChange={(e) => setManualEvidence(e.target.value)}
                  placeholder="e.g. PR link, meeting notes board, design doc"
                  className="w-full text-xs p-2.5 border border-slate-200 rounded-md"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-100 rounded-sm cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!manualTitle.trim()}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white rounded-sm cursor-pointer"
                >
                  Create Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
