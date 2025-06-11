
import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle, XCircle, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const SkillQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create custom hooks",
        "To optimize rendering performance"
      ],
      correct: 1,
      explanation: "useEffect handles side effects like API calls, subscriptions, and DOM manipulation in functional components.",
      category: "React"
    },
    {
      id: 2,
      question: "Which HTTP status code indicates a successful request?",
      options: ["404", "500", "200", "301"],
      correct: 2,
      explanation: "HTTP 200 indicates that the request was successful and the server returned the requested data.",
      category: "Web Development"
    },
    {
      id: 3,
      question: "What does CSS Grid provide that Flexbox doesn't?",
      options: [
        "Better browser support",
        "Two-dimensional layout control",
        "Easier responsive design",
        "Better performance"
      ],
      correct: 1,
      explanation: "CSS Grid provides two-dimensional layout control (rows and columns), while Flexbox is primarily one-dimensional.",
      category: "CSS"
    },
    {
      id: 4,
      question: "In JavaScript, what does the '===' operator do?",
      options: [
        "Assignment",
        "Loose equality comparison",
        "Strict equality comparison",
        "Greater than or equal"
      ],
      correct: 2,
      explanation: "The '===' operator performs strict equality comparison, checking both value and type without type coercion.",
      category: "JavaScript"
    },
    {
      id: 5,
      question: "What is the main purpose of TypeScript?",
      options: [
        "To replace JavaScript entirely",
        "To add static typing to JavaScript",
        "To improve runtime performance",
        "To simplify DOM manipulation"
      ],
      correct: 1,
      explanation: "TypeScript adds static typing to JavaScript, helping catch errors at compile time and improving code quality.",
      category: "TypeScript"
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, quizStarted, quizCompleted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setTimeLeft(30);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setTimeLeft(30);
    setQuizCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "Excellent! You're a coding expert! 🚀";
    if (percentage >= 60) return "Good job! Solid understanding! 👍";
    if (percentage >= 40) return "Not bad! Keep learning! 📚";
    return "Keep practicing! You'll get there! 💪";
  };

  if (!quizStarted) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-terminal-green mb-4">
              <span className="syntax-keyword">class</span> <span className="syntax-function">SkillAssessment</span> {"{"}
            </h2>
            <p className="text-terminal-text/80 mb-6">
              Test your development knowledge with our interactive quiz
            </p>
          </div>

          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center">
            <Brain className="w-16 h-16 text-terminal-green mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-terminal-text mb-4">Ready to Test Your Skills?</h3>
            <p className="text-terminal-text/80 mb-6">
              {questions.length} questions • 30 seconds each • Multiple choice
            </p>
            <button
              onClick={startQuiz}
              className="px-8 py-3 bg-terminal-green text-terminal-bg rounded-lg font-mono font-semibold hover:bg-terminal-green/90 transition-colors"
            >
              Start Quiz
            </button>
          </div>

          <div className="text-center mt-8">
            <p className="text-terminal-green text-2xl font-bold">{"}"}</p>
          </div>
        </div>
      </section>
    );
  }

  if (quizCompleted) {
    return (
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border p-8 text-center">
            <Award className="w-16 h-16 text-terminal-green mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-terminal-text mb-4">Quiz Completed!</h3>
            <div className="text-4xl font-bold text-terminal-green mb-4">
              {score}/{questions.length}
            </div>
            <p className="text-terminal-text/80 mb-6">{getScoreMessage()}</p>
            <button
              onClick={resetQuiz}
              className="px-8 py-3 bg-terminal-green text-terminal-bg rounded-lg font-mono font-semibold hover:bg-terminal-green/90 transition-colors"
            >
              Take Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#1e1e1e] rounded-lg border border-terminal-border overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-3 bg-[#323233] border-b border-terminal-border">
            <div className="flex items-center space-x-2">
              <Brain className="w-4 h-4 text-terminal-text" />
              <span className="text-terminal-text text-sm">
                Question {currentQuestion + 1} of {questions.length}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-terminal-green">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{timeLeft}s</span>
              </div>
              <div className="text-terminal-text text-sm">
                Score: {score}/{currentQuestion}
              </div>
            </div>
          </div>

          <div className="p-8">
            {showResult ? (
              <div className="text-center">
                <div className="mb-6">
                  {selectedAnswer === question.correct ? (
                    <CheckCircle className="w-16 h-16 text-terminal-green mx-auto" />
                  ) : (
                    <XCircle className="w-16 h-16 text-terminal-red mx-auto" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-terminal-text mb-4">
                  {selectedAnswer === question.correct ? 'Correct!' : 'Incorrect!'}
                </h3>
                <p className="text-terminal-text/80 mb-4">{question.explanation}</p>
                <div className="text-terminal-green font-mono">
                  Correct answer: {question.options[question.correct]}
                </div>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className="px-3 py-1 bg-terminal-green/20 text-terminal-green rounded-full text-sm font-mono">
                    {question.category}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-terminal-text mb-8">
                  {question.question}
                </h3>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 text-left rounded-lg border transition-all ${
                        selectedAnswer === index
                          ? 'border-terminal-green bg-terminal-green/10 text-terminal-green'
                          : 'border-terminal-border hover:border-terminal-green/50 text-terminal-text'
                      }`}
                    >
                      <span className="font-mono mr-3">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      {option}
                    </button>
                  ))}
                </div>

                {selectedAnswer !== null && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleNextQuestion}
                      className="px-6 py-3 bg-terminal-green text-terminal-bg rounded-lg font-mono font-semibold hover:bg-terminal-green/90 transition-colors"
                    >
                      {currentQuestion + 1 === questions.length ? 'Finish Quiz' : 'Next Question'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="h-2 bg-terminal-border">
            <div 
              className="h-full bg-terminal-green transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillQuiz;
