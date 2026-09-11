import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quiz-questions';
import { 
  HelpCircle, CheckCircle2, XCircle, RotateCcw, 
  Award, Sparkles, ArrowRight, BookOpen 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const QuizSection: React.FC = () => {
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (userAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score >= QUIZ_QUESTIONS.length * 0.75) {
      confetti({
        particleCount: 80,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(userAnswers).length;
  const isComplete = answeredCount === QUIZ_QUESTIONS.length;

  return (
    <section id="quiz" className="py-16 bg-[#0b0f19] border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20 mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>Conceptual Check</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Linked List Knowledge Check
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Test your understanding of nodes, pointer assignments, traversal order, and time complexity tradeoffs.
          </p>
        </div>

        {/* Score Card when submitted */}
        {submitted && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-amber-500/40 mb-8 shadow-xl text-center">
            <Award className="w-12 h-12 text-amber-400 mx-auto mb-2" />
            <h3 className="text-2xl font-extrabold text-slate-100">
              Your Score: <span className="text-amber-400">{score}</span> / {QUIZ_QUESTIONS.length}
            </h3>
            <p className="text-slate-300 text-sm mt-1 mb-4">
              {score === QUIZ_QUESTIONS.length
                ? "Perfect score! You have mastered singly linked list fundamentals."
                : score >= 6
                ? "Great job! You have a solid grasp of pointers and sequential data structures."
                : "Good effort! Review the line explanations below to solidify the pointer mechanics."}
            </p>
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Retake Quiz
            </button>
          </div>
        )}

        {/* Questions List */}
        <div className="space-y-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const selectedOpt = userAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;

            return (
              <div
                key={q.id}
                className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-md transition-all"
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 shrink-0 mt-0.5">
                      Q{qIndex + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-100 leading-snug">
                      {q.question}
                    </h3>
                  </div>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold ring-1 ring-emerald-500/40';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200 ring-1 ring-rose-500/40';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold ring-1 ring-amber-400/40';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-full text-[11px] font-mono font-bold flex items-center justify-center border ${
                            isSelected ? 'bg-amber-400 text-slate-950 border-amber-400' : 'border-slate-700 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        {submitted && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {submitted && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box on submit */}
                {submitted && (
                  <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed flex items-start gap-2.5">
                    <BookOpen className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-400 font-semibold">Explanation:</strong> {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Quiz Action */}
        {!submitted && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmitQuiz}
              disabled={answeredCount === 0}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-base hover:from-amber-400 hover:to-orange-400 disabled:opacity-40 transition-all shadow-lg shadow-amber-500/20 active:scale-98"
            >
              Submit & Check Answers ({answeredCount}/{QUIZ_QUESTIONS.length} Answered)
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
