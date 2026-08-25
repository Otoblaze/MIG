/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  UserRole,
  MenteeProfile,
  MentorProfile,
  Milestone,
  AssessmentEvaluationResult,
  AssessmentDefinition,
} from './types';
import {
  INITIAL_ASSESSMENTS,
  INITIAL_MENTEES,
  INITIAL_MENTORS,
  INITIAL_MILESTONES,
  INITIAL_EVALUATION_RESULTS,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { MethodologyView } from './components/MethodologyView';
import { CohortDirectoryView } from './components/CohortDirectoryView';
import { MenteeDashboard } from './components/MenteeDashboard';
import { AssessmentRunner } from './components/AssessmentRunner';
import { AssessmentResultView } from './components/AssessmentResultView';
import { MilestoneTracker } from './components/MilestoneTracker';
import { MentorDashboard } from './components/MentorDashboard';
import { GrowthPlanView } from './components/GrowthPlanView';

import { MigLogo } from './components/MigLogo';

export default function App() {
  // Roles & User State
  const [currentRole, setCurrentRole] = useState<UserRole>('mentee');
  const [mentees, setMentees] = useState<MenteeProfile[]>(() => {
    const saved = localStorage.getItem('mentorship_mentees');
    return saved ? JSON.parse(saved) : INITIAL_MENTEES;
  });
  const [mentors, setMentors] = useState<MentorProfile[]>(INITIAL_MENTORS);
  const [activeMenteeId, setActiveMenteeId] = useState<string>(() => {
    const saved = localStorage.getItem('mentorship_active_mentee_id');
    return saved || INITIAL_MENTEES[0].id;
  });
  const [activeMentorId, setActiveMentorId] = useState<string>(INITIAL_MENTORS[0].id);

  // Tab State - defaults to 'home' website experience
  const [activeTab, setActiveTab] = useState<string>('home');

  // Assessments & Evaluations State
  const [assessments] = useState<AssessmentDefinition[]>(INITIAL_ASSESSMENTS);
  const [evaluations, setEvaluations] = useState<Record<string, AssessmentEvaluationResult>>(() => {
    const saved = localStorage.getItem('mentorship_evaluations');
    return saved ? JSON.parse(saved) : INITIAL_EVALUATION_RESULTS;
  });
  const [activeRunningAssessmentId, setActiveRunningAssessmentId] = useState<string | null>(null);

  // Milestones State
  const [milestones, setMilestones] = useState<Milestone[]>(() => {
    const saved = localStorage.getItem('mentorship_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });

  // Local storage persistence
  useEffect(() => {
    localStorage.setItem('mentorship_mentees', JSON.stringify(mentees));
  }, [mentees]);

  useEffect(() => {
    localStorage.setItem('mentorship_evaluations', JSON.stringify(evaluations));
  }, [evaluations]);

  useEffect(() => {
    localStorage.setItem('mentorship_milestones', JSON.stringify(milestones));
  }, [milestones]);

  useEffect(() => {
    localStorage.setItem('mentorship_active_mentee_id', activeMenteeId);
  }, [activeMenteeId]);

  const activeMentee = mentees.find((m) => m.id === activeMenteeId) || mentees[0] || INITIAL_MENTEES[0];
  const activeMentor = mentors.find((m) => m.id === activeMentorId) || mentors[0] || INITIAL_MENTORS[0];
  const activeMenteeEvaluation = activeMentee ? evaluations[activeMentee.id] : undefined;

  const pendingReviewsCount = (milestones || []).filter((m) => m.status === 'under_review').length;

  // Handlers
  const handleStartAssessment = (assessmentId: string) => {
    setActiveRunningAssessmentId(assessmentId);
  };

  const handleCompleteAssessment = (result: AssessmentEvaluationResult) => {
    if (!activeMentee) return;
    setEvaluations((prev) => ({
      ...prev,
      [activeMentee.id]: result,
    }));

    // Update mentee baseline status & score
    setMentees((prev) =>
      (prev || []).map((m) =>
        m.id === activeMentee.id
          ? {
              ...m,
              baselineCompleted: true,
              latestScore: result.overallScore,
              archetype: result.archetype,
            }
          : m
      )
    );

    setActiveRunningAssessmentId(null);
    setActiveTab('assessments');
  };

  const handleUpdateMilestone = (updated: Milestone) => {
    setMilestones((prev) => (prev || []).map((m) => (m.id === updated.id ? updated : m)));
  };

  const handleAddMilestone = (newMilestone: Omit<Milestone, 'id'>) => {
    const fullMilestone: Milestone = {
      ...newMilestone,
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    setMilestones((prev) => [fullMilestone, ...(prev || [])]);
  };

  const handleAddMultipleMilestones = (newMilestones: Omit<Milestone, 'id' | 'menteeId'>[]) => {
    const fullMilestones: Milestone[] = (newMilestones || []).map((m, idx) => ({
      ...m,
      id: `m-${Date.now()}-${idx}`,
      menteeId: activeMentee?.id || 'mentee-1',
    }));
    setMilestones((prev) => [...fullMilestones, ...(prev || [])]);
  };

  const handleAddMilestoneToSpecificMentee = (menteeId: string, milestone: Omit<Milestone, 'id' | 'menteeId'>) => {
    const fullMilestone: Milestone = {
      ...milestone,
      id: `m-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      menteeId,
    };
    setMilestones((prev) => [fullMilestone, ...prev]);
  };

  const handleSelectMenteeFromMentorView = (selected: MenteeProfile) => {
    setActiveMenteeId(selected.id);
    setCurrentRole('mentee');
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        activeMentee={activeMentee}
        mentees={mentees}
        onSelectMentee={(m) => setActiveMenteeId(m.id)}
        activeMentor={activeMentor}
        mentors={mentors}
        onSelectMentor={(m) => setActiveMentorId(m.id)}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveRunningAssessmentId(null);
          setActiveTab(tab);
        }}
        pendingReviewsCount={pendingReviewsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        {/* Assessment Runner Active Mode */}
        {activeRunningAssessmentId ? (
          <AssessmentRunner
            assessment={
              assessments.find((a) => a.id === activeRunningAssessmentId) || assessments[0]
            }
            mentee={activeMentee}
            onComplete={handleCompleteAssessment}
            onCancel={() => setActiveRunningAssessmentId(null)}
          />
        ) : (
          <>
            {/* Website Landing Page */}
            {activeTab === 'home' && (
              <LandingPage
                onLaunchApp={() => setActiveTab('dashboard')}
                onStartAssessment={() => handleStartAssessment(assessments[0].id)}
                onNavigateToTab={(tab) => setActiveTab(tab)}
                mentees={mentees}
                mentors={mentors}
              />
            )}

            {/* Scientific Methodology Page */}
            {activeTab === 'methodology' && (
              <MethodologyView
                onStartAssessment={() => handleStartAssessment(assessments[0].id)}
                onLaunchMilestones={() => setActiveTab('milestones')}
              />
            )}

            {/* Mentors & Cohorts Directory */}
            {activeTab === 'cohorts' && (
              <CohortDirectoryView
                mentors={mentors}
                mentees={mentees}
                onSelectMentor={(m) => {
                  setActiveMentorId(m.id);
                  setCurrentRole('mentor');
                }}
                onSelectMentee={(m) => {
                  setActiveMenteeId(m.id);
                  setCurrentRole('mentee');
                }}
                onNavigateToTab={(tab) => setActiveTab(tab)}
              />
            )}

            {/* Dashboard View */}
            {activeTab === 'dashboard' && (
              <MenteeDashboard
                mentee={activeMentee}
                milestones={milestones}
                evaluation={activeMenteeEvaluation}
                assessments={assessments}
                onStartAssessment={handleStartAssessment}
                onViewAssessmentResult={() => setActiveTab('assessments')}
                onNavigateToMilestones={() => setActiveTab('milestones')}
                onNavigateToGrowth={() => setActiveTab('growth')}
              />
            )}

            {/* Assessments & Results View */}
            {activeTab === 'assessments' && (
              <>
                {activeMenteeEvaluation ? (
                  <AssessmentResultView
                    result={activeMenteeEvaluation}
                    onAddMilestonesToTracker={handleAddMultipleMilestones}
                    onViewMilestoneTracker={() => setActiveTab('milestones')}
                    onRetake={() => handleStartAssessment(assessments[0].id)}
                  />
                ) : (
                  <div className="max-w-4xl mx-auto py-12 px-4 text-center space-y-6">
                    <div className="bg-white p-8 sm:p-12 rounded-lg border border-slate-200 shadow-xs space-y-4">
                      <div className="w-12 h-12 mx-auto rounded-sm bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                        <div className="w-5 h-5 border-2 border-white rotate-45" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xs border border-indigo-100">
                          Module 01 • Baseline
                        </span>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pt-2">Baseline Assessment Required</h2>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
                        Take the <strong>Identity and Self-Awareness Test</strong> to evaluate your core values and professional motivators. Gemini AI will generate a tailored development plan with sequential milestones.
                      </p>
                      <div className="pt-2">
                        <button
                          onClick={() => handleStartAssessment(assessments[0].id)}
                          className="px-6 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer"
                        >
                          Start Identity and Self-Awareness Test (~8 min)
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Milestones Checklist View */}
            {activeTab === 'milestones' && (
              <MilestoneTracker
                mentee={activeMentee}
                milestones={milestones}
                onUpdateMilestone={handleUpdateMilestone}
                onAddMilestone={handleAddMilestone}
                onAddMultipleMilestones={handleAddMultipleMilestones}
              />
            )}

            {/* Growth Plan View */}
            {activeTab === 'growth' && (
              <GrowthPlanView
                evaluation={activeMenteeEvaluation}
                mentee={activeMentee}
                onTakeAssessment={() => handleStartAssessment(assessments[0].id)}
                onNavigateToMilestones={() => setActiveTab('milestones')}
              />
            )}

            {/* Mentor Center View */}
            {activeTab === 'mentor_hub' && (
              <MentorDashboard
                mentor={activeMentor}
                mentees={mentees}
                milestones={milestones}
                evaluations={evaluations}
                onUpdateMilestone={handleUpdateMilestone}
                onAddMilestoneToMentee={handleAddMilestoneToSpecificMentee}
                onSelectMenteeForView={handleSelectMenteeFromMentorView}
              />
            )}
          </>
        )}
      </main>

      {/* Website Full Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            {/* Column 1: Brand */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center gap-2.5">
                <MigLogo size="sm" showText={false} />
                <span className="font-extrabold text-xl tracking-tight text-white">
                  MIG<span className="text-[#E817AE]">.</span>
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adaptive engineering mentorship platform combining real-time self-awareness diagnostics, verifiable milestone tracking, and AI-powered growth insights.
              </p>
              <div className="flex items-center gap-2 text-[11px] font-mono text-purple-300">
                <span className="w-2 h-2 rounded-full bg-[#E817AE] animate-pulse" />
                <span>MIG Core Engine • Operational</span>
              </div>
            </div>

            {/* Column 2: Platform Modules */}
            <div className="space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Platform Architecture
              </span>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button
                    onClick={() => setActiveTab('assessments')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Identity & Values Assessment
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('milestones')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Milestone Verifier & RFC Tracker
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('growth')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    AI Growth Strategy Planner
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('mentor_hub')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Mentor Feedback & Rubric Hub
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Framework & Directory */}
            <div className="space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Framework & Cohorts
              </span>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <button
                    onClick={() => setActiveTab('methodology')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Scientific Methodology
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('cohorts')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Cohort Mentors Directory
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Live Mentee Workspace
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: Quick Action */}
            <div className="space-y-3 text-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Get Started
              </span>
              <p className="text-xs text-slate-400">
                Begin with the diagnostic baseline test or explore our cohort directory.
              </p>
              <button
                onClick={() => handleStartAssessment(assessments[0].id)}
                className="w-full py-2 px-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xs text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer text-center block"
              >
                Take Baseline Test
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-4">
            <div>© {new Date().getFullYear()} MIG Mentorship Foundation. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span>Security: AES-256</span>
              <span>Gemini 3.7 Flash Engine</span>
              <span>WCAG AA Compliant</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
