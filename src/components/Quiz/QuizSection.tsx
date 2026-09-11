import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quiz-questions';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

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
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <section id="quiz" className="py-16 bg-[#0b0f19] border-b border-slate-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
            Quiz
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
            Quick Knowledge Check
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Verify your understanding of node structure, pointer assignments, and linked list traversal.
          </p>
        </div>

        {/* Score Card when submitted */}
        {submitted && (
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-slate-100">
                Score: <span className="text-amber-400 font-mono">{score}</span> of {QUIZ_QUESTIONS.length} correct
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {score === QUIZ_QUESTIONS.length
                  ? "All answers correct. You have a solid grasp of singly linked lists."
                  : "Review the explanations under each question to solidify pointer mechanics."}
              </p>
            </div>
            <button
              onClick={handleResetQuiz}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Quiz</span>
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
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm"
              >
                {/* Question Header */}
                <div className="flex items-start gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0 mt-0.5">
                    Q{qIndex + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                    {q.question}
                  </h3>
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-2 mb-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOpt === optIdx;
                    const isCorrect = optIdx === q.correctIndex;

                    let btnStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                    if (submitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-200 font-semibold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={`w-5 h-5 rounded text-[11px] font-mono font-bold flex items-center justify-center border ${
                            isSelected ? 'bg-amber-400 text-slate-950 border-amber-400' : 'border-slate-800 text-slate-500'
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
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <strong className="text-amber-400">Explanation:</strong> {q.explanation}
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
              className="px-6 py-2.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-sm hover:bg-amber-400 disabled:opacity-40 transition-all shadow-sm active:scale-98"
            >
              Submit Answers ({answeredCount}/{QUIZ_QUESTIONS.length})
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
