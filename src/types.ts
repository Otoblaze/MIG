export type UserRole = 'mentee' | 'mentor';

export type AssessmentCategory = 'identity_self_awareness' | 'communication_influence' | 'execution_strategy' | 'leadership_transition';

export interface QuestionOption {
  id: string;
  text: string;
  valueTag: string; // e.g. 'Integrity', 'Mastery', 'Autonomy', 'Empathy', 'Impact', 'Innovation'
  motivatorTag: string; // e.g. 'Purpose', 'Mastery', 'Leadership', 'Autonomy', 'Recognition'
  scoreWeight: number; // 1 - 5
  adaptiveFollowUpTrigger?: string; // Optional conditional trigger for deeper questions
}

export interface AssessmentQuestion {
  id: string;
  category: 'core_values' | 'professional_motivators' | 'self_awareness_scenarios' | 'adaptive_deep_dive';
  prompt: string;
  context?: string;
  options: QuestionOption[];
  isAdaptive?: boolean;
  parentTriggerCondition?: {
    questionId: string;
    triggerTag: string;
  };
}

export interface AssessmentDefinition {
  id: string;
  title: string;
  category: AssessmentCategory;
  tagline: string;
  description: string;
  estimatedMinutes: number;
  totalQuestions: number;
  badgesAwarded: string[];
  questions: AssessmentQuestion[];
}

export interface AssessmentResponseItem {
  questionId: string;
  questionPrompt: string;
  selectedOptionId: string;
  selectedOptionText: string;
  valueTag: string;
  motivatorTag: string;
  scoreWeight: number;
  openReflection?: string;
}

export interface CoreValueScore {
  value: string;
  score: number;
  analysis: string;
}

export interface MotivatorScore {
  motivator: string;
  score: number;
  impact: string;
}

export interface GrowthPillar {
  title: string;
  focusArea: string;
  strategy: string;
  weeklyHabit: string;
}

export interface RecommendedMilestone {
  title: string;
  category: string;
  description: string;
  targetWeeks: number;
  evidenceRequired: string;
}

export interface AssessmentEvaluationResult {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  completedAt: string;
  menteeId: string;
  overallScore: number;
  archetype: string;
  executiveSummary: string;
  coreValues: CoreValueScore[];
  professionalMotivators: MotivatorScore[];
  blindSpots: string[];
  growthPillars: GrowthPillar[];
  recommendedMilestones: RecommendedMilestone[];
  mentorTalkingPoints: string[];
  rawResponses: AssessmentResponseItem[];
}

export type MilestoneStatus = 'not_started' | 'in_progress' | 'under_review' | 'completed';

export interface MilestoneFeedback {
  id: string;
  mentorId: string;
  mentorName: string;
  createdAt: string;
  rating: number; // 1-5
  praisePoints: string[];
  constructiveCritique: string;
  coachingQuestions: string[];
  suggestedStretchGoal?: string;
}

export interface Milestone {
  id: string;
  menteeId: string;
  title: string;
  category: string;
  description: string;
  targetWeeks: number;
  dueDate?: string;
  evidenceRequired: string;
  status: MilestoneStatus;
  submissionNotes?: string;
  submissionLink?: string;
  completedAt?: string;
  feedback?: MilestoneFeedback;
  isAiGenerated?: boolean;
}

export interface MenteeProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  bio: string;
  joinedDate: string;
  primaryMentorId: string;
  mentorName: string;
  targetCareerGoal: string;
  baselineCompleted: boolean;
  latestScore?: number;
  archetype?: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  title: string;
  company: string;
  avatarUrl: string;
  expertise: string[];
  activeMenteesCount: number;
}
