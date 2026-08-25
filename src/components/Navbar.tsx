import React from 'react';
import { UserRole, MenteeProfile, MentorProfile } from '../types';
import { MigLogo } from './MigLogo';
import {
  Compass,
  Users,
  CheckSquare,
  Sparkles,
  UserCheck,
  ChevronDown,
  Award,
  Globe,
  LayoutDashboard,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeMentee: MenteeProfile;
  mentees: MenteeProfile[];
  onSelectMentee: (mentee: MenteeProfile) => void;
  activeMentor: MentorProfile;
  mentors: MentorProfile[];
  onSelectMentor: (mentor: MentorProfile) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingReviewsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  activeMentee,
  mentees = [],
  onSelectMentee,
  activeMentor,
  mentors = [],
  onSelectMentor,
  activeTab,
  setActiveTab,
  pendingReviewsCount = 0,
}) => {
  const isWebsitePage = ['home', 'methodology', 'cohorts'].includes(activeTab);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* MIG Brand & Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <MigLogo size="sm" showText={false} />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900 leading-none">
                  MIG<span className="text-[#E817AE] font-black">.</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-[#2D0A75]/10 text-[#2D0A75] border border-[#2D0A75]/20">
                  Adaptive AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Engineering Mentorship Platform
              </p>
            </div>
          </div>

          {/* Geometric Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-5 h-full text-xs font-semibold uppercase tracking-wider">
            {/* Website Pages */}
            <button
              id="nav-tab-home"
              onClick={() => setActiveTab('home')}
              className={`h-full flex items-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'home'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview
            </button>

            <button
              id="nav-tab-methodology"
              onClick={() => setActiveTab('methodology')}
              className={`h-full flex items-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'methodology'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Methodology
            </button>

            <button
              id="nav-tab-cohorts"
              onClick={() => setActiveTab('cohorts')}
              className={`h-full flex items-center border-b-2 transition-all cursor-pointer ${
                activeTab === 'cohorts'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Mentors & Cohorts
            </button>

            <span className="h-4 w-px bg-slate-200" />

            {/* App Workspace Pages */}
            <button
              id="nav-tab-dashboard"
              onClick={() => setActiveTab('dashboard')}
              className={`h-full flex items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Workspace
            </button>

            <button
              id="nav-tab-assessments"
              onClick={() => setActiveTab('assessments')}
              className={`h-full flex items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'assessments'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              Assessment
            </button>

            <button
              id="nav-tab-milestones"
              onClick={() => setActiveTab('milestones')}
              className={`h-full flex items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'milestones'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              Milestones
            </button>

            <button
              id="nav-tab-growth"
              onClick={() => setActiveTab('growth')}
              className={`h-full flex items-center gap-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'growth'
                  ? 'border-indigo-600 text-indigo-600 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Growth Plan
            </button>

            {currentRole === 'mentor' && (
              <button
                id="nav-tab-mentor-hub"
                onClick={() => setActiveTab('mentor_hub')}
                className={`h-full flex items-center gap-1.5 border-b-2 transition-all cursor-pointer ${
                  activeTab === 'mentor_hub'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-indigo-600/80 hover:text-indigo-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Mentor Hub
                {pendingReviewsCount > 0 && (
                  <span className="ml-1 px-1.5 py-0.2 rounded-xs text-[10px] bg-rose-500 text-white font-bold">
                    {pendingReviewsCount}
                  </span>
                )}
              </button>
            )}
          </nav>

          {/* Right Action Area: Role Switcher & User Dropdown */}
          <div className="flex items-center gap-3">
            {/* Geometric Role Switcher */}
            <div className="bg-slate-100 p-0.5 rounded-md flex items-center border border-slate-200">
              <button
                id="role-switch-mentee"
                onClick={() => {
                  setCurrentRole('mentee');
                  if (activeTab === 'mentor_hub') setActiveTab('dashboard');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold transition-all cursor-pointer ${
                  currentRole === 'mentee'
                    ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-indigo-600" />
                <span className="hidden sm:inline">Mentee</span>
              </button>
              <button
                id="role-switch-mentor"
                onClick={() => {
                  setCurrentRole('mentor');
                  setActiveTab('mentor_hub');
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold transition-all relative cursor-pointer ${
                  currentRole === 'mentor'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mentor</span>
                {pendingReviewsCount > 0 && currentRole !== 'mentor' && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5 ring-2 ring-white" />
                )}
              </button>
            </div>

            {/* Quick Launch CTA if on website page */}
            {isWebsitePage ? (
              <button
                onClick={() => setActiveTab('dashboard')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                <span>Launch App</span>
                <ArrowRight className="w-3 h-3 text-slate-400" />
              </button>
            ) : (
              <button
                onClick={() => setActiveTab('home')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-slate-200"
              >
                <Globe className="w-3 h-3 text-slate-500" />
                <span>Site Home</span>
              </button>
            )}

            {/* Geometric User ID & Dropdown */}
            <div className="relative group">
              {currentRole === 'mentee' ? (
                <div className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-white border border-slate-200 rounded-md cursor-pointer hover:border-slate-300 transition-colors">
                  <img
                    src={activeMentee.avatarUrl}
                    alt={activeMentee.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-300"
                  />
                  <div className="text-right hidden xl:block">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{activeMentee.name}</p>
                    <p className="text-[9px] text-slate-400 font-mono font-medium leading-tight">
                      Mentee ID: {activeMentee.id.replace('mentee-', '882')}
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              ) : (
                <div className="flex items-center gap-2 pl-2 pr-2.5 py-1 bg-white border border-indigo-200 rounded-md cursor-pointer hover:border-indigo-300 transition-colors">
                  <img
                    src={activeMentor.avatarUrl}
                    alt={activeMentor.name}
                    className="w-7 h-7 rounded-full object-cover border border-indigo-300"
                  />
                  <div className="text-right hidden xl:block">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{activeMentor.name}</p>
                    <p className="text-[9px] text-indigo-600 font-mono font-semibold leading-tight">
                      Mentor ID: 4102
                    </p>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              )}

              {/* Selector Popover */}
              <div className="absolute right-0 top-full mt-1.5 w-60 bg-white border border-slate-200 rounded-md shadow-lg p-2 hidden group-hover:block z-50">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 mb-1">
                  {currentRole === 'mentee' ? 'Switch Active Mentee' : 'Switch Active Mentor'}
                </div>
                {currentRole === 'mentee'
                  ? (mentees || []).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => onSelectMentee(m)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-sm text-left text-xs transition-colors cursor-pointer ${
                          m.id === activeMentee?.id
                            ? 'bg-indigo-50 text-indigo-900 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <img src={m.avatarUrl} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                        <div className="truncate">
                          <p className="font-semibold text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{m.role}</p>
                        </div>
                      </button>
                    ))
                  : (mentors || []).map((m) => (
                      <button
                        key={m.id}
                        onClick={() => onSelectMentor(m)}
                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-sm text-left text-xs transition-colors cursor-pointer ${
                          m.id === activeMentor?.id
                            ? 'bg-indigo-50 text-indigo-900 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <img src={m.avatarUrl} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                        <div className="truncate">
                          <p className="font-semibold text-slate-900">{m.name}</p>
                          <p className="text-[10px] text-slate-500 truncate">{m.title}</p>
                        </div>
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'home' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('methodology')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'methodology' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab('cohorts')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'cohorts' ? 'bg-slate-900 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Cohorts
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'dashboard' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Workspace
          </button>
          <button
            onClick={() => setActiveTab('assessments')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'assessments' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Assessments
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'milestones' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Milestones
          </button>
          <button
            onClick={() => setActiveTab('growth')}
            className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
              activeTab === 'growth' ? 'bg-indigo-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Growth Plan
          </button>
          {currentRole === 'mentor' && (
            <button
              onClick={() => setActiveTab('mentor_hub')}
              className={`px-3 py-1 rounded-sm font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer ${
                activeTab === 'mentor_hub' ? 'bg-indigo-600 text-white' : 'text-indigo-700 bg-indigo-50'
              }`}
            >
              Mentor Hub ({pendingReviewsCount})
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
