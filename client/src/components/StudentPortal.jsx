import React, { useState } from 'react';
import { getExamById } from '../api/examService';

const StudentPortal = () => {
  const [examId, setExamId] = useState('');
  const [exam, setExam] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [examFinished, setExamFinished] = useState(false);

  const handleStartExam = () => {
    if (!examId) return;
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

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-success text-white">
          <h3>Student Portal</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <label htmlFor="examIdInput" className="form-label">Enter Exam ID to Start</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="examIdInput"
                placeholder="e.g. math-101"
                value={examId}
                onChange={(e) => setExamId(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleStartExam}
                disabled={loading}
              >
                {loading ? 'Fetching...' : 'Start Exam'}
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {exam && !examFinished && (
            <div className="mt-4 p-3 border rounded">
              <h4 className="mb-4">Exam: {exam.title}</h4>
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="card-title">Question {currentQuestionIndex + 1} of {exam.questions.length}</h5>
                  <p className="card-text lead">{exam.questions[currentQuestionIndex].text}</p>
                  
                  <div className="d-flex flex-column gap-2 mt-3">
                    {exam.questions[currentQuestionIndex].options.map((option, idx) => (
                      <label key={idx} className="btn btn-outline-secondary text-start">
                        <input 
                          type="radio" 
                          name={`question-${currentQuestionIndex}`} 
                          className="me-3"
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
                <button 
                  className="btn btn-secondary" 
                  disabled={currentQuestionIndex === 0}
                  onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                >
                  Previous
                </button>
                {currentQuestionIndex < exam.questions.length - 1 ? (
                  <button className="btn btn-primary" onClick={() => setCurrentQuestionIndex(prev => prev + 1)}>
                    Next
                  </button>
                ) : (
                  <button className="btn btn-success" onClick={() => setExamFinished(true)}>
                    Submit Exam
                  </button>
                )}
              </div>
            </div>
          )}

          {examFinished && (
            <div className="mt-4 p-5 border rounded bg-light text-center shadow-sm">
              <h2 className="text-success">Exam Completed!</h2>
              <p className="lead">Your answers have been submitted successfully.</p>
              <button className="btn btn-primary mt-3" onClick={() => setExam(null)}>Return to Portal</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
