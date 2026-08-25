import React, { useState } from 'react';
import { AssessmentEvaluationResult, MenteeProfile } from '../types';
import { Sparkles, Compass, CheckCircle2, BookmarkCheck, Calendar, BookOpen, Plus, MessageSquare, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GrowthPlanViewProps {
  evaluation?: AssessmentEvaluationResult;
  mentee: MenteeProfile;
  onTakeAssessment: () => void;
  onNavigateToMilestones: () => void;
}

export const GrowthPlanView: React.FC<GrowthPlanViewProps> = ({
  evaluation,
  mentee,
  onTakeAssessment,
  onNavigateToMilestones,
}) => {
  const [completedHabits, setCompletedHabits] = useState<Record<number, boolean>>({});
  const [journalEntries, setJournalEntries] = useState<Array<{ date: string; title: string; notes: string }>>([
    {
      date: '2026-08-20',
      title: 'Protected Deep Work Audit & Retrospective',
      notes: 'Successfully blocked Friday afternoon for deep architecture research. Shared 1 draft RFC with Dr. Sarah Chen with high feedback velocity.',
    },
  ]);
  const [newJournalTitle, setNewJournalTitle] = useState('');
  const [newJournalNotes, setNewJournalNotes] = useState('');
  const [showJournalForm, setShowJournalForm] = useState(false);

  const toggleHabit = (idx: number) => {
    setCompletedHabits((prev) => {
      const next = { ...prev, [idx]: !prev[idx] };
      if (next[idx]) {
        confetti({
          particleCount: 30,
          spread: 40,
        });
      }
      return next;
    });
  };

  const handleAddJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJournalTitle.trim() || !newJournalNotes.trim()) return;

    setJournalEntries((prev) => [
      {
        date: new Date().toISOString().split('T')[0],
        title: newJournalTitle.trim(),
        notes: newJournalNotes.trim(),
      },
      ...prev,
    ]);

    setNewJournalTitle('');
    setNewJournalNotes('');
    setShowJournalForm(false);
  };

  if (!evaluation) {
    return (
      <div className="max-w-3xl mx-auto py-16 px-4 text-center">
        <div className="bg-white p-8 sm:p-12 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <div className="w-14 h-14 mx-auto rounded-xs bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
            <Compass className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-bold uppercase tracking-wider text-slate-900">Personalized Growth Strategy Pending</h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Take the initial Identity & Self-Awareness Test to generate an AI-calibrated developmental strategy, strategic growth pillars, and weekly habits.
          </p>
          <button
            onClick={onTakeAssessment}
            className="px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            Start Identity & Self-Awareness Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header - Geometric Balance */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                Development Strategy
              </span>
              <span className="text-xs text-slate-400 font-mono">Mentee: {mentee.name}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Adaptive Growth Strategy & Habits</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Calibrated by Gemini AI based on your core values ({evaluation.coreValues?.[0]?.value || 'Engineering Leadership'}) and growth archetype ({evaluation.archetype || 'Technical Leader'}).
            </p>
          </div>

          <button
            onClick={onNavigateToMilestones}
            className="flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            <BookmarkCheck className="w-4 h-4" />
            Milestone Checklist Tracker
          </button>
        </div>
      </div>

      {/* 3 Growth Pillars */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-600" />
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Core Strategic Pillars</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {(evaluation.growthPillars || []).map((pillar, idx) => {
            const isHabitDone = completedHabits[idx];
            return (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="text-[9px] uppercase font-bold tracking-wider text-indigo-600 mb-1">
                    Pillar 0{idx + 1} • {pillar.focusArea}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5">{pillar.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{pillar.strategy}</p>
                </div>

                {/* Micro-habit card with interactive check */}
                <div
                  onClick={() => toggleHabit(idx)}
                  className={`p-3 rounded-md border cursor-pointer transition-all ${
                    isHabitDone
                      ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900'
                      : 'bg-indigo-50/40 border-indigo-100 hover:bg-indigo-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider mb-1">
                    <span className={isHabitDone ? 'text-emerald-700' : 'text-indigo-700'}>Weekly Habit</span>
                    <span className="flex items-center gap-1 font-mono">
                      {isHabitDone ? 'Logged' : 'Click to log'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-4 h-4 rounded-xs border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                        isHabitDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isHabitDone && <CheckCircle2 className="w-3 h-3" />}
                    </div>
                    <p className="text-xs font-medium leading-snug">{pillar.weeklyHabit}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reflection Journal & 1-on-1 Prep */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">Weekly Mentorship Reflection Log</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Record breakthroughs, experiments, and questions for your upcoming 1-on-1 mentoring session.
            </p>
          </div>

          <button
            onClick={() => setShowJournalForm(!showJournalForm)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            {showJournalForm ? 'Close Form' : 'Add Reflection'}
          </button>
        </div>

        {/* Reflection Form */}
        {showJournalForm && (
          <form onSubmit={handleAddJournal} className="p-4 bg-slate-50 rounded-md border border-slate-200 space-y-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Reflection Title *</label>
              <input
                type="text"
                value={newJournalTitle}
                onChange={(e) => setNewJournalTitle(e.target.value)}
                placeholder="e.g. Stakeholder Alignment on Cache RFC"
                className="w-full text-xs p-2.5 border border-slate-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Key Insights & Questions for Mentor *</label>
              <textarea
                value={newJournalNotes}
                onChange={(e) => setNewJournalNotes(e.target.value)}
                placeholder="What did you learn? What decision trade-off do you want to explore with your mentor?"
                rows={3}
                className="w-full text-xs p-2.5 border border-slate-200 rounded-md bg-white focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowJournalForm(false)}
                className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-500 hover:bg-slate-200 rounded-sm cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white rounded-sm hover:bg-indigo-700 cursor-pointer"
              >
                Save Reflection
              </button>
            </div>
          </form>
        )}

        {/* Entries List */}
        <div className="space-y-2.5">
          {(journalEntries || []).map((entry, idx) => (
            <div key={idx} className="p-3.5 rounded-md border border-slate-200 bg-slate-50/60 space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">{entry.title}</h4>
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {entry.date}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{entry.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
