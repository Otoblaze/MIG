import React, { useState } from 'react';
import { AssessmentDefinition, AssessmentResponseItem, AssessmentEvaluationResult, MenteeProfile } from '../types';
import { evaluateAssessmentWithAI } from '../services/api';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, Award, Clock, Lightbulb, Compass, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentRunnerProps {
  assessment: AssessmentDefinition;
  mentee: MenteeProfile;
  onComplete: (result: AssessmentEvaluationResult) => void;
  onCancel: () => void;
}

export const AssessmentRunner: React.FC<AssessmentRunnerProps> = ({
  assessment,
  mentee,
  onComplete,
  onCancel,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, AssessmentResponseItem>>({});
  const [currentReflection, setCurrentReflection] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationStage, setEvaluationStage] = useState<string>('');

  const currentQuestion = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;
  const progressPercent = Math.round(((currentIndex) / totalQuestions) * 100);

  const selectedResponse = responses[currentQuestion.id];

  const handleSelectOption = (optionId: string) => {
    const option = currentQuestion.options.find((o) => o.id === optionId);
    if (!option) return;

    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        questionId: currentQuestion.id,
        questionPrompt: currentQuestion.prompt,
        selectedOptionId: option.id,
        selectedOptionText: option.text,
        valueTag: option.valueTag,
        motivatorTag: option.motivatorTag,
        scoreWeight: option.scoreWeight,
        openReflection: currentReflection.trim() || undefined,
      },
    }));
  };

  const handleNext = () => {
    if (!selectedResponse) return;

    // Save reflection into response if provided
    if (currentReflection.trim()) {
      setResponses((prev) => ({
        ...prev,
        [currentQuestion.id]: {
          ...prev[currentQuestion.id],
          openReflection: currentReflection.trim(),
        },
      }));
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
      const nextQ = assessment.questions[currentIndex + 1];
      setCurrentReflection(responses[nextQ.id]?.openReflection || '');
    } else {
      finishAssessment();
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      const prevQ = assessment.questions[currentIndex - 1];
      setCurrentReflection(responses[prevQ.id]?.openReflection || '');
    }
  };

  const finishAssessment = async () => {
    setIsEvaluating(true);
    setEvaluationStage('Analyzing psychological responses & values spectrum...');

    const responseList: AssessmentResponseItem[] = Object.values(responses);

    setTimeout(() => {
      setEvaluationStage('Calibrating adaptive baseline scores & career archetype...');
    }, 1200);

    setTimeout(() => {
      setEvaluationStage('Gemini AI generating personalized growth strategy & milestones...');
    }, 2400);

    try {
      const evaluation = await evaluateAssessmentWithAI({
        assessmentTitle: assessment.title,
        menteeName: mentee.name,
        responses: responseList,
        assessmentType: assessment.category,
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      const fullResult: AssessmentEvaluationResult = {
        id: `eval-${mentee.id}-${Date.now()}`,
        assessmentId: assessment.id,
        assessmentTitle: assessment.title,
        completedAt: new Date().toISOString(),
        menteeId: mentee.id,
        overallScore: evaluation.overallScore,
        archetype: evaluation.archetype,
        executiveSummary: evaluation.executiveSummary,
        coreValues: evaluation.coreValues,
        professionalMotivators: evaluation.professionalMotivators,
        blindSpots: evaluation.blindSpots,
        growthPillars: evaluation.growthPillars,
        recommendedMilestones: evaluation.recommendedMilestones,
        mentorTalkingPoints: evaluation.mentorTalkingPoints,
        rawResponses: responseList,
      };

      onComplete(fullResult);
    } catch (err) {
      console.error('Evaluation failed:', err);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (isEvaluating) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="bg-white p-8 sm:p-12 rounded-lg border border-slate-200 shadow-xs relative overflow-hidden">
          <div className="w-12 h-12 mx-auto mb-6 rounded-xs bg-indigo-600 flex items-center justify-center text-white shadow-xs">
            <div className="w-5 h-5 border-2 border-white rotate-45 animate-spin" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-xs border border-indigo-100 mb-2 inline-block">
            Gemini Adaptive Synthesis
          </span>

          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Evaluating Self-Awareness Matrix
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mb-8 max-w-md mx-auto">
            Our adaptive AI engine is synthesizing your responses against core values and professional motivator frameworks.
          </p>

          <div className="flex items-center justify-center gap-3 text-indigo-700 text-xs font-semibold uppercase tracking-wider bg-indigo-50 py-3 px-4 rounded-sm border border-indigo-200 max-w-md mx-auto">
            <Loader2 className="w-4 h-4 animate-spin shrink-0 text-indigo-600" />
            <span>{evaluationStage}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 space-y-6">
      {/* Header card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xs bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <div className="w-3.5 h-3.5 border-2 border-white rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">{assessment.title}</h2>
              <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
                Module 01
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">Mentee: {mentee.name} • Adaptive Calibration Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-slate-400">
          <span className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-sm text-slate-600">
            <Clock className="w-3 h-3" />
            ~{assessment.estimatedMinutes} min
          </span>
          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      {/* Geometric Progress Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span className="text-indigo-600 font-mono">{progressPercent}% Completed</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-xs overflow-hidden">
          <div
            className="bg-indigo-600 h-full rounded-xs transition-all duration-300 ease-out"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>
      </div>

      {/* Question Card - Geometric Left Accent Border */}
      <div className="bg-white rounded-r-lg border-y border-r border-l-4 border-indigo-600 border-slate-200 p-6 sm:p-8 shadow-xs">
        {/* Category tag */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-xs bg-indigo-50 text-indigo-700 border border-indigo-100">
            {currentQuestion.category.replace('_', ' ')}
          </span>
          <span className="text-[10px] text-slate-400 font-mono font-medium">Adaptive Calibration</span>
        </div>

        {/* Prompt */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-3">
          {currentQuestion.prompt}
        </h3>

        {currentQuestion.context && (
          <p className="text-xs text-slate-600 mb-6 flex items-start gap-2 bg-slate-50 p-3 rounded-md border border-slate-200">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span>{currentQuestion.context}</span>
          </p>
        )}

        {/* Options */}
        <div className="space-y-2.5 mb-6">
          {(currentQuestion?.options || []).map((opt) => {
            const isSelected = selectedResponse?.selectedOptionId === opt.id;
            return (
              <div
                key={opt.id}
                id={`option-${opt.id}`}
                onClick={() => handleSelectOption(opt.id)}
                className={`p-4 rounded-md border cursor-pointer transition-all duration-150 relative ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-4 h-4 rounded-xs mt-0.5 flex items-center justify-center border transition-all shrink-0 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-600 text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {isSelected && <CheckCircle2 className="w-3 h-3" />}
                  </div>

                  <div className="flex-1">
                    <p className={`text-xs sm:text-sm leading-relaxed ${isSelected ? 'text-slate-900 font-bold' : 'text-slate-700 font-medium'}`}>
                      {opt.text}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-slate-100 text-slate-600 font-semibold">
                        Value: {opt.valueTag}
                      </span>
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs bg-indigo-100/60 text-indigo-700 font-semibold">
                        Driver: {opt.motivatorTag}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Optional Reflection Box */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Personal Context / Reflection (Optional)
          </label>
          <textarea
            value={currentReflection}
            onChange={(e) => setCurrentReflection(e.target.value)}
            placeholder="Share a specific project experience, trade-off, or nuance related to this question for your mentor..."
            rows={2}
            className="w-full text-xs p-3 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 placeholder-slate-400 bg-slate-50/50"
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={currentIndex === 0}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-colors ${
            currentIndex === 0
              ? 'text-slate-300 cursor-not-allowed'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer'
          }`}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Previous
        </button>

        <button
          id="btn-next-question"
          onClick={handleNext}
          disabled={!selectedResponse}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
            selectedResponse
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          <span>{currentIndex === totalQuestions - 1 ? 'Complete Assessment & Generate Plan' : 'Next Question'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
