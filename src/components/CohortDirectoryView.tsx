import React, { useState } from 'react';
import { MentorProfile, MenteeProfile } from '../types';
import {
  Users,
  Award,
  Search,
  Filter,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Calendar,
  Building,
  Briefcase,
  Star,
} from 'lucide-react';

interface CohortDirectoryViewProps {
  mentors?: MentorProfile[];
  mentees?: MenteeProfile[];
  onSelectMentor: (mentor: MentorProfile) => void;
  onSelectMentee: (mentee: MenteeProfile) => void;
  onNavigateToTab: (tab: string) => void;
}

export const CohortDirectoryView: React.FC<CohortDirectoryViewProps> = ({
  mentors = [],
  mentees = [],
  onSelectMentor,
  onSelectMentee,
  onNavigateToTab,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'mentors' | 'cohorts'>('mentors');

  const allSpecialties = Array.from(
    new Set((mentors || []).flatMap((m) => m.specialties || []))
  );

  const filteredMentors = (mentors || []).filter((m) => {
    const matchesSearch =
      (m.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.company || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.title || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpec =
      selectedSpecialty === 'all' || (m.specialties || []).includes(selectedSpecialty);

    return matchesSearch && matchesSpec;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                Ecosystem Directory
              </span>
              <span className="text-xs text-slate-400 font-mono">Cohorts & Leadership</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Executive Mentors & Active Cohorts
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Connect with seasoned Staff+ engineers, Principal Architects, and Engineering Directors guiding the next generation of technical leaders.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-md border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('mentors')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'mentors'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Mentors ({mentors.length})
            </button>
            <button
              onClick={() => setActiveTab('cohorts')}
              className={`px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'cohorts'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Cohort Mentees ({mentees.length})
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'mentors' ? (
        <>
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by mentor or company..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-sm focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Specialty:
              </span>
              <button
                onClick={() => setSelectedSpecialty('all')}
                className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                  selectedSpecialty === 'all'
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All
              </button>
              {(allSpecialties || []).map((spec) => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  className={`px-2.5 py-1 rounded-xs text-[10px] font-bold uppercase tracking-wider shrink-0 transition-colors cursor-pointer ${
                    selectedSpecialty === spec
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Mentors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(filteredMentors || []).map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="w-14 h-14 rounded-md object-cover ring-1 ring-slate-200"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
                      <p className="text-xs text-indigo-600 font-semibold">{mentor.title}</p>
                      <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                        <Building className="w-3 h-3" /> {mentor.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-md border border-slate-200">
                    {mentor.bio}
                  </p>

                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                      Expertise Areas
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(mentor.specialties || []).map((spec, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-slate-100 text-slate-700"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">
                    {mentor.yearsExperience} Yrs Experience
                  </span>

                  <button
                    onClick={() => {
                      onSelectMentor(mentor);
                      onNavigateToTab('mentor_hub');
                    }}
                    className="px-3 py-1.5 rounded-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Select Mentor Hub
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* Cohort Mentees Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(mentees || []).map((mentee) => (
            <div
              key={mentee.id}
              className="bg-white p-6 rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between hover:border-indigo-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={mentee.avatarUrl}
                    alt={mentee.name}
                    className="w-14 h-14 rounded-md object-cover ring-1 ring-slate-200"
                  />
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{mentee.name}</h3>
                    <p className="text-xs text-indigo-600 font-semibold">{mentee.role}</p>
                    <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1 mt-0.5">
                      <Building className="w-3 h-3" /> {mentee.company}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-md border border-slate-200 space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 block">
                    Career Target Goal
                  </span>
                  <p className="text-xs text-slate-800 font-semibold">{mentee.careerGoal}</p>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Baseline Assessment:</span>
                  {mentee.baselineCompleted ? (
                    <span className="px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-800 font-bold font-mono text-[10px]">
                      {mentee.latestScore}% Completed
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-xs bg-amber-100 text-amber-800 font-bold font-mono text-[10px]">
                      Pending Test
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">Cohort Spring '26</span>

                <button
                  onClick={() => {
                    onSelectMentee(mentee);
                    onNavigateToTab('dashboard');
                  }}
                  className="px-3 py-1.5 rounded-sm bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  View Mentee Workspace
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
