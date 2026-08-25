import React, { useState } from 'react';
import { MigLogo } from './MigLogo';
import {
  Compass,
  Sparkles,
  CheckSquare,
  UserCheck,
  Award,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  MessageSquare,
  BookOpen,
  ChevronDown,
  Layers,
  Star,
  Target,
  Zap,
} from 'lucide-react';
import { MenteeProfile, MentorProfile } from '../types';

interface LandingPageProps {
  onLaunchApp: () => void;
  onStartAssessment: () => void;
  onNavigateToTab?: (tab: string) => void;
  mentees?: MenteeProfile[];
  mentors?: MentorProfile[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  onStartAssessment,
  onNavigateToTab = (_tab: string) => {},
  mentees = [],
  mentors = [],
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedDemoArchetype, setSelectedDemoArchetype] = useState<string>('Architect / Systems Thinker');

  const archetypesDemo = [
    {
      title: 'Architect / Systems Thinker',
      tagline: 'Technical depth with cross-system scalability',
      topValues: ['Technical Excellence', 'Autonomy & Mastery', 'Long-term Impact'],
      recommendedFocus: 'Distributed consensus RFCs, latency budget governance, cross-team API architecture',
      sampleMilestone: 'Author and defend L4-L5 architectural trade-off document for distributed event bus',
    },
    {
      title: 'Multiplier / Team Catalyst',
      tagline: 'Organizational leverage and engineering velocity',
      topValues: ['Empathy & Mentorship', 'Collaborative Velocity', 'Team Health'],
      recommendedFocus: 'Engineering sprint retrospectives, junior onboarding runbooks, pairing programs',
      sampleMilestone: 'Establish bi-weekly team design critique review reducing PR revision cycles by 30%',
    },
    {
      title: 'Strategic Operator',
      tagline: 'Product-engineering alignment and commercial impact',
      topValues: ['Business Value', 'Pragmatic Execution', 'Customer Empathy'],
      recommendedFocus: 'Quarterly roadmap sequencing, engineering-to-revenue ROI modeling, risk mitigation',
      sampleMilestone: 'Deliver multi-tenant billing migration milestone 2 weeks ahead of scheduled launch',
    },
  ];

  const activeArchetypeData =
    archetypesDemo.find((a) => a.title === selectedDemoArchetype) || archetypesDemo[0];

  const faqs = [
    {
      q: 'How does the AI Self-Awareness Assessment work?',
      a: 'The baseline assessment presents 12 real-world engineering and leadership situational trade-offs. Gemini 3.7 evaluates your selections to extract your primary career values, blindspots, and developmental archetype, creating a tailored roadmap rather than a generic checklist.',
    },
    {
      q: 'What is the Milestone & Evidence verification process?',
      a: 'Mentees don’t just check boxes—they attach concrete deliverables (RFC links, GitHub pull requests, architecture documents, or reflection logs). Mentors review submissions using AI-assisted coaching prompts to provide immediate, actionable feedback.',
    },
    {
      q: 'Can mentors and organizations customize growth tracks?',
      a: 'Yes. While the Gemini AI generates calibrated roadmaps automatically, mentors have direct authority to assign custom stretch goals, modify target sprint weeks, and calibrate evaluation rubrics for specific organizational leveling tracks.',
    },
    {
      q: 'How are mentors matched with cohort mentees?',
      a: 'MIG matches mentees with Staff+ engineers and Engineering Directors based on complementary strengths, technical domains, and target leadership milestones. Mentors manage their cohort through the centralized Mentor Command Center.',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-18 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Engine Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#2D0A75]/5 border border-[#2D0A75]/20 rounded-md text-xs font-bold text-[#2D0A75] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#E817AE] animate-pulse" />
              <span>MIG • Adaptive Engineering Mentorship Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
              Architect Your Career Trajectory with{' '}
              <span className="text-[#2D0A75]">MIG</span> & World-Class Mentors
            </h1>

            {/* Subheading */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
              MIG bridges self-awareness, sequential developmental milestones, and structured mentor feedback into one unified growth engine for engineering professionals.
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="hero-btn-start-test"
                onClick={onStartAssessment}
                className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-indigo-200" />
                Take Free Baseline Assessment
              </button>

              <button
                id="hero-btn-launch-workspace"
                onClick={onLaunchApp}
                className="w-full sm:w-auto px-6 py-3.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enter Live Workspace</span>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Verification Stats Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-100 max-w-3xl mx-auto">
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900">94%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Milestone Velocity</span>
              </div>
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900">&lt; 24 hrs</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mentor Review Loop</span>
              </div>
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900">12+</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Situational Scenarios</span>
              </div>
              <div className="text-center">
                <span className="block text-xl sm:text-2xl font-bold font-mono text-slate-900">100%</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Evidence Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive AI Archetype Simulator Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-lg p-6 sm:p-10 border border-slate-800 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
                Interactive Engine Preview
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1">
                Explore Calibrated Growth Archetypes
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                See how MIG translates self-awareness assessment data into specific milestones, core values, and developmental targets.
              </p>
            </div>

            {/* Archetype Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {archetypesDemo.map((arch) => (
                <button
                  key={arch.title}
                  onClick={() => setSelectedDemoArchetype(arch.title)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedDemoArchetype === arch.title
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
                >
                  {arch.title.split('/')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          {/* Active Preview Card */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {/* Values Column */}
            <div className="bg-slate-800/80 p-5 rounded-md border border-slate-700 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                Primary Core Values
              </span>
              <div className="space-y-2">
                {(activeArchetypeData?.topValues || []).map((val, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-900/60 rounded-xs text-xs">
                    <span className="font-semibold text-slate-200">{val}</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold">Top Priority</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Strategy Column */}
            <div className="bg-slate-800/80 p-5 rounded-md border border-slate-700 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">
                Strategic Development Focus
              </span>
              <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xs border border-slate-700/50">
                {activeArchetypeData.recommendedFocus}
              </p>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Calibrated for senior engineering tracks</span>
              </div>
            </div>

            {/* Sample Milestone & CTA */}
            <div className="bg-slate-800/80 p-5 rounded-md border border-slate-700 space-y-3 flex flex-col justify-between h-full">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                  Actionable Milestone Sprint
                </span>
                <p className="text-xs text-slate-200 font-semibold mt-2 leading-relaxed">
                  "{activeArchetypeData.sampleMilestone}"
                </p>
              </div>

              <button
                onClick={onStartAssessment}
                className="w-full mt-4 py-2 rounded-sm bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Discover Your Archetype</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Platform Modules (Feature Pillars) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xs border border-indigo-100">
            Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Four Connected Engines for Continuous Mastery
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every module in MIG feeds into a continuous cycle of self-discovery, execution, and expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Module 1 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Module 01</span>
              <h3 className="text-base font-bold text-slate-900">Adaptive Self-Awareness</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Situational assessments uncover values, trade-off tendencies, and blindspots to establish your baseline profile.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Values & Archetypes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 2 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Module 02</span>
              <h3 className="text-base font-bold text-slate-900">Milestone Roadmap</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Break lofty goals into tangible deliverables with required evidence, target weeks, and submission artifacts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Evidence Repository</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 3 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Module 03</span>
              <h3 className="text-base font-bold text-slate-900">Mentor AI Co-Pilot</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mentors evaluate submissions with automated praise, constructive critique, and 1-on-1 coaching prompts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Review Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Module 4 */}
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-sm bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Module 04</span>
              <h3 className="text-base font-bold text-slate-900">Habits & Reflections</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Log weekly micro-commitments, journal critical decisions, and prepare structured agendas for mentorship sessions.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>Strategic Growth Log</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Step-by-Step Methodology */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              The Progression Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              How MIG Delivers Measurable Growth
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              A structured 4-step cadence replacing vague advice with verifiable technical and organizational achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-xs bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Baseline Assessment</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete realistic scenarios evaluating leadership trade-offs, architecture decisions, and conflict management.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-xs bg-indigo-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">AI Goal Synthesis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini AI parses your baseline scores to formulate targeted sprint roadmaps, growth pillars, and weekly habits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-xs bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Deliverable Submission</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Complete milestones by attaching links to pull requests, architecture RFCs, slide decks, or team meeting notes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-xs bg-emerald-600 text-white font-mono font-bold text-xs flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Mentor Feedback Loop</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mentors review evidence, rate mastery, provide praise & critique, and assign stretch goals during 1-on-1s.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Featured Mentors & Cohort Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xs border border-indigo-100">
              Executive Mentors
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-2">
              Learn from Engineering Leaders
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Active engineering directors and staff architects mentoring upcoming technical leaders.
            </p>
          </div>

          <button
            onClick={() => onNavigateToTab('cohorts')}
            className="text-xs font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 cursor-pointer"
          >
            <span>View All Cohorts & Mentors</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(mentors || []).map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={mentor.avatarUrl}
                    alt={mentor.name}
                    className="w-12 h-12 rounded-md object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{mentor.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">{mentor.title}</p>
                    <p className="text-[11px] text-slate-400 font-mono">{mentor.company}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-200">
                  {mentor.bio}
                </p>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Core Specialties
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(mentor.specialties || []).map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-slate-100 text-slate-700"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono">{mentor.yearsExperience} Yrs Experience</span>
                <button
                  onClick={onLaunchApp}
                  className="px-3 py-1.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Select in Workspace
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Real Outcomes & Testimonials */}
      <section className="bg-slate-900 text-white py-16 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-400">
              Verified Career Impact
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Built for High-Stakes Career Transitions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How engineers and newly minted managers level up their technical influence and executive presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/80 p-6 rounded-lg border border-slate-700 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "The self-awareness baseline revealed that I was over-indexing on raw execution while neglecting stakeholder consensus. The milestone tracker helped me transition to Staff Engineer in 5 months."
              </p>
              <div className="pt-2 border-t border-slate-700/60">
                <h4 className="text-xs font-bold text-white">Elena Rostova</h4>
                <p className="text-[10px] text-indigo-300">Staff Distributed Systems Engineer</p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-lg border border-slate-700 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "As a mentor, reviewing mentee submissions used to take hours of unstructured back-and-forth. MIG's AI co-pilot and evidence repository cut review time by 60% while dramatically improving coaching quality."
              </p>
              <div className="pt-2 border-t border-slate-700/60">
                <h4 className="text-xs font-bold text-white">David Chen</h4>
                <p className="text-[10px] text-indigo-300">VP of Engineering • CloudScale</p>
              </div>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-lg border border-slate-700 space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Having my mentor assign concrete stretch goals with week targets turned vague 1-on-1s into an engineering sprint. I knew exactly what evidence to present each month."
              </p>
              <div className="pt-2 border-t border-slate-700/60">
                <h4 className="text-xs font-bold text-white">Maya Lin</h4>
                <p className="text-[10px] text-indigo-300">Engineering Manager • FinScale</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xs border border-indigo-100">
            Platform FAQ
          </span>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500">
            Everything you need to know about MIG's assessment algorithms, verification, and role workflows.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-slate-900 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. Bottom CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-indigo-600 rounded-lg p-8 sm:p-12 text-white text-center shadow-lg relative overflow-hidden space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs bg-white/20 text-white border border-white/20">
              Start Your Mentorship Journey Today
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to Accelerate Your Career Trajectory?
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed">
              Take the baseline self-awareness test or launch directly into the live workspace to track your milestone roadmap.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-6 py-3 rounded-sm bg-white text-indigo-900 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Start Baseline Test (~8 min)
            </button>
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto px-6 py-3 rounded-sm bg-indigo-950 text-white hover:bg-slate-900 font-bold text-xs uppercase tracking-wider border border-indigo-400/40 shadow-sm transition-all cursor-pointer"
            >
              Launch Live Workspace
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
