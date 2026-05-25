import React, { useState, useEffect } from 'react';
import { examService } from '../../services/examService';
import { notifyService } from '../../core/classes/NotifyService';

const StudentPortal = ({ user }) => {
  const [activeExams, setActiveExams] = useState([]);
  const [exam, setExam] = useState(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isReviewing, setIsReviewing] = useState(false);

  const [pastAttempts, setPastAttempts] = useState([]);

  const loadPortalData = () => {
  
    examService.getAllExams().then(data => {
      setActiveExams(data.filter(e => e.status === 'Active'));
    });

   
    examService.getStudentScores().then(allScores => {
      const studentHistory = allScores.filter(s => s.studentName === user.name);
      setPastAttempts(studentHistory);
    });
  };

  useEffect(() => { loadPortalData(); }, [user.name]);

  // Countdown clock handling
  useEffect(() => {
    if (!exam || done) return;

    if (timeLeft <= 0) {
      notifyService.show('Time elapsed! System initiating automatic exam submission.', 'danger');
      handleFinish();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [exam, timeLeft, done]);

  const handleStartExam = (targetExam) => {
    setExam(targetExam);
    setCurrentIdx(0);
    setAnswers({});
    setDone(false);
    setIsReviewing(false);
    setTimeLeft((targetExam.durationMinutes || 30) * 60);
  };

  const handleFinish = () => {
    let hits = 0;
    exam.questions.forEach((q, i) => {
      if (answers[i] === q.answer) hits++;
    });
    const finalGrade = Math.round((hits / exam.questions.length) * 100);
    setScore(finalGrade);

    examService.saveStudentScore({ 
      studentName: user.name, 
      examId: exam.id, 
      score: finalGrade,
      responses: { ...answers } 
    }).then(() => {
      setDone(true);
      loadPortalData(); // Refresh history immediately upon submission
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="card shadow-lg border-0 p-4 bg-white rounded-3 animate__animated animate__fadeIn">
      {/* Portal Top Header banner block */}
      <div className="border-bottom pb-3 mb-4 d-flex justify-content-between align-items-center">
        <div>
          <h4 className="fw-bold text-success mb-1">🎓 Student Assessment Console</h4>
          <p className="text-muted small mb-0">Launch an examination module or review your complete historical performance records.</p>
        </div>
        {exam && !done && (
          <div className={`badge fs-5 px-3 py-2 border rounded-pill font-monospace ${timeLeft < 30 ? 'bg-danger text-white animate__flash animate__animated animate__infinite' : 'bg-dark text-warning'}`}>
            ⏱ Time Left: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      {/* Main Panel View Dashboard (Catalog + Attempts Logs History Widgets) */}
      {!exam && !done && (
        <div className="row g-4">
          {/* Left Column Area: Exam Catalog List */}
          <div className="col-xl-7 col-lg-6">
            <h5 className="fw-bold text-dark mb-3">Available Live Assessments</h5>
            <div className="row g-3">
              {activeExams.map(ex => (
                <div className="col-md-12" key={ex.id}>
                  <div className="card border border-light-subtle shadow-sm rounded-3 hover-shadow transition-all">
                    <div className="card-body p-3 d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="fw-bold text-dark mb-1">{ex.title}</h6>
                        <small className="text-muted">Questions: <strong>{ex.questions.length}</strong> | Allocated Duration: <strong>{ex.durationMinutes} mins</strong></small>
                      </div>
                      <button className="btn btn-sm btn-success fw-bold rounded-pill px-4" onClick={() => handleStartExam(ex)}>
                        Launch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Area: Personalized Student Past Attempts History Logger Tracker */}
          <div className="col-xl-5 col-lg-6">
            <div className="p-3 bg-light border rounded-3 h-100 shadow-sm">
              <h5 className="fw-bold text-dark mb-2">📊 My Past Attempts Log</h5>
              <p className="text-muted small mb-3">Track your total attempts count and registered evaluations below.</p>
              
              {pastAttempts.length === 0 ? (
                <div className="text-center text-muted py-4 bg-white rounded shadow-sm border small">No exam submissions recorded for your user profile yet.</div>
              ) : (
                <div className="table-responsive bg-white rounded shadow-sm">
                  <table className="table table-hover align-middle mb-0 text-center small">
                    <thead className="table-dark">
                      <tr>
                        <th># Attempt</th>
                        <th>Exam Target</th>
                        <th>Score Sheet</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pastAttempts.map((item, idx) => (
                        <tr key={idx}>
                          <td className="fw-bold text-secondary">Attempt #{idx + 1}</td>
                          <td><code>{item.examId}</code></td>
                          <td>
                            <span className={`badge px-2.5 py-1.5 rounded-pill ${item.score >= 70 ? 'bg-success' : item.score >= 55 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                              {item.score}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Active Question Solver Terminal Module */}
      {exam && !done && (
        <div>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="fw-bold mb-0 text-primary">{exam.title}</h5>
            <span className="text-muted small font-monospace">Item Matrix: {currentIdx + 1} / {exam.questions.length}</span>
          </div>
          
          <div className="progress mb-4" style={{height: '8px'}}>
            <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" style={{width: `${((currentIdx + 1)/exam.questions.length)*100}%`}}></div>
          </div>

          <div className="card p-4 border-0 shadow-sm bg-light mb-4 rounded-3">
            <h5 className="fw-bold mb-4 text-dark">{exam.questions[currentIdx].text}</h5>
            <div className="d-flex flex-column gap-2">
              {exam.questions[currentIdx].options.map((opt, i) => (
                <label key={i} className={`btn text-start p-3 rounded-3 border transition-all ${answers[currentIdx] === opt ? 'btn-success text-white border-success shadow' : 'btn-outline-secondary bg-white'}`}>
                  <input className="form-check-input me-3" type="radio" name="option-group" checked={answers[currentIdx] === opt} onChange={() => setAnswers({...answers, [currentIdx]: opt})} />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-secondary px-4 rounded-pill" disabled={currentIdx === 0} onClick={() => setCurrentIdx(p => p - 1)}>Back</button>
            {currentIdx < exam.questions.length - 1 ? (
              <button className="btn btn-primary px-4 rounded-pill" onClick={() => setCurrentIdx(p => p + 1)}>Next</button>
            ) : (
              <button className="btn btn-danger px-4 fw-bold rounded-pill shadow-sm" onClick={handleFinish}>Submit Assessment</button>
            )}
          </div>
        </div>
      )}

      {/* Post Evaluation Results & Detailed review mode */}
      {done && (
        <div className="text-center py-4">
          {!isReviewing ? (
            <div className="py-5 px-4 bg-light rounded-3 border shadow-sm animate__animated animate__zoomIn">
              <div className="display-3 text-success mb-2">🎉</div>
              <h3 className="text-success fw-bold">Evaluation Flow Complete</h3>
              <p className="text-muted lead">Academic transcript verified for student <strong>{user.name}</strong>.</p>
              
              <div className="my-4 d-inline-block bg-white border px-5 py-3 rounded-3 shadow">
                <div className="small text-uppercase text-muted fw-bold mb-1">Your Verified Metric Score</div>
                <div className={`display-3 fw-bold font-monospace ${score >= 70 ? 'text-success' : score >= 55 ? 'text-warning' : 'text-danger'}`}>{score}%</div>
              </div>

              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-outline-primary px-4 rounded-pill shadow-sm" onClick={() => setIsReviewing(true)}>
                  🔍 Review Answers
                </button>
                <button className="btn btn-primary px-4 rounded-pill shadow-sm" onClick={() => { setExam(null); setDone(false); }}>
                  Return to Dashboard
                </button>
              </div>
            </div>
          ) : (
            <div className="text-start bg-light p-4 rounded-3 border shadow-sm animate__animated animate__fadeIn">
              <h4 className="fw-bold text-dark border-bottom pb-2 mb-4">📝 Performance Review Sheet: {exam.title}</h4>
              <div className="d-flex flex-column gap-3 mb-4">
                {exam.questions.map((q, idx) => {
                  const studentAns = answers[idx];
                  const isCorrect = studentAns === q.answer;
                  return (
                    <div key={q.id} className={`card p-3 border-0 shadow-sm rounded-3 border-start border-4 ${isCorrect ? 'border-success' : 'border-danger'}`}>
                      <h6 className="fw-bold text-dark">Question {idx + 1}: {q.text}</h6>
                      <div className="ps-2 small mt-2">
                        <div className={`p-2 rounded mb-1 ${isCorrect ? 'bg-success-subtle text-success fw-bold' : 'bg-danger-subtle text-danger'}`}>
                          Your Answer: {studentAns || '[No Answer Provided]'} {!isCorrect && '❌'} {isCorrect && '✓'}
                        </div>
                        {!isCorrect && <div className="p-2 rounded bg-success-subtle text-success fw-bold">Correct Answer: {q.answer} ✓</div>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <button className="btn btn-dark rounded-pill px-4" onClick={() => { setExam(null); setDone(false); }}>
                Finish Review & Exit
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;