import React, { useState } from 'react';
import { getExamById, saveStudentScore } from '../../services/examService';

const StudentPortal = ({ user }) => {
  const [examId, setExamId] = useState('');
  const [exam, setExam] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examFinished, setExamFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(null);

  const handleStartExam = () => {
    if (!examId) {
      setError('Please enter a valid Exam ID.');
      return;
    }
    setLoading(true);
    setError('');
    setExam(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setExamFinished(false);

    getExamById(examId)
      .then(data => {
        setExam(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    exam.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.answer) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / exam.questions.length) * 100);
    setFinalScore(score);

    saveStudentScore({
      studentName: user.name, // נלקח אוטומטית מחשבון הסטודנט המחובר
      examId: exam.id,
      score: score
    }).then(() => {
      setExamFinished(true);
    });
  };

  const progressPercentage = exam ? ((currentQuestionIndex + 1) / exam.questions.length) * 100 : 0;

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-success text-white py-3">
        <h4 className="mb-0">🎓 Student Examination Portal</h4>
      </div>
      <div className="card-body p-4">
        
        {!exam && !examFinished && (
          <div className="row g-3 align-items-end justify-content-center">
            <div className="col-md-8">
              <label className="form-label fw-semibold">Enter Exam ID to Start</label>
              <div className="input-group input-group-lg">
                <input
                  type="text"
                  className="form-control"
                  placeholder="e.g. math-101"
                  value={examId}
                  onChange={(e) => setExamId(e.target.value)}
                />
                <button className="btn btn-success px-4" onClick={handleStartExam} disabled={loading}>
                  {loading ? 'Fetching...' : 'Start Exam'}
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {exam && !examFinished && (
          <div className="mt-2">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="badge bg-light text-dark border fw-bold fs-6">{exam.title}</span>
              <span className="text-muted small">Question {currentQuestionIndex + 1} of {exam.questions.length}</span>
            </div>
            
            <div className="progress mb-4" style={{ height: '8px' }}>
              <div className="progress-bar bg-success" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="card shadow-sm border-0 bg-light mb-4">
              <div className="card-body p-4">
                <h5 className="card-title fw-bold mb-3">{exam.questions[currentQuestionIndex].text}</h5>
                <div className="d-flex flex-column gap-2">
                  {exam.questions[currentQuestionIndex].options.map((option, idx) => (
                    <label key={idx} className={`btn text-start p-3 border rounded ${selectedAnswers[currentQuestionIndex] === option ? 'btn-success text-white border-success' : 'btn-outline-secondary bg-white'}`}>
                      <input 
                        type="radio" 
                        name={`question-${currentQuestionIndex}`} 
                        className="me-3 form-check-input"
                        checked={selectedAnswers[currentQuestionIndex] === option}
                        onChange={() => setSelectedAnswers({...selectedAnswers, [currentQuestionIndex]: option})}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary px-4" disabled={currentQuestionIndex === 0} onClick={() => setCurrentQuestionIndex(prev => prev - 1)}>
                Previous
              </button>
              {currentQuestionIndex < exam.questions.length - 1 ? (
                <button className="btn btn-primary px-4" onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                  Next
                </button>
              ) : (
                <button className="btn btn-danger px-4 fw-bold" onClick={handleSubmitExam}>
                  Submit Exam
                </button>
              )}
            </div>
          </div>
        )}

        {examFinished && (
          <div className="text-center py-4">
            <div className="display-1 text-success mb-3">🎉</div>
            <h2 className="text-success fw-bold">Exam Completed!</h2>
            <p className="lead text-muted">Well done, <strong>{user.name}</strong>! Your exam has been graded.</p>
            <div className="alert alert-info d-inline-block px-5 py-3 fs-4 border-0 shadow-sm rounded-pill mb-4">
              Your Score: <strong className="text-primary">{finalScore}%</strong>
            </div>
            <div>
              <button className="btn btn-outline-primary px-4 rounded-pill" onClick={() => { setExam(null); setExamFinished(false); setExamId(''); }}>
                Take Another Exam
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;