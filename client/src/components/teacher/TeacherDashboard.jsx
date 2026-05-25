import React, { useState, useEffect } from 'react';
import { examService } from '../../services/examService';
import ExamCreator from './ExamCreator';
import { notifyService } from '../../core/classes/NotifyService';

const TeacherDashboard = () => {
  const [exams, setExams] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [metrics, setMetrics] = useState({ avg: 0, totalSubmissions: 0, totalExams: 0 });

  // State חדש לניהול רשומת הבדיקה המפורטת (Audit Log Sheet) של סטודנט ספציפי
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const reloadData = () => {
    setLoading(true);
    Promise.all([examService.getAllExams(), examService.getStudentScores()])
      .then(([examsData, scoresData]) => {
        setExams(examsData);
        setScores(scoresData);

        const totalSubmissions = scoresData.length;
        const avg = totalSubmissions > 0 
          ? Math.round(scoresData.reduce((acc, curr) => acc + curr.score, 0) / totalSubmissions) 
          : 0;

        setMetrics({ avg, totalSubmissions, totalExams: examsData.length });
        setLoading(false);
      });
  };

  useEffect(() => { reloadData(); }, []);

  const handleStatusChange = (id, nextStatus) => {
    examService.changeStatus(id, nextStatus).then(() => {
      notifyService.show(`Exam status successfully shifted to ${nextStatus}.`);
      reloadData();
    });
  };

  // תצוגת דוח הבדיקה המעמיק עבור המורה (Submission Audit Sheet View)
  if (selectedSubmission) {
    const targetExam = exams.find(e => e.id === selectedSubmission.examId);
    return (
      <div className="card shadow border-0 p-4 bg-white rounded-3 animate__animated animate__fadeIn">
        <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mb-4">
          <div>
            <h4 className="fw-bold text-dark mb-0">🔍 Submission Audit Sheet</h4>
            <p className="text-muted small mb-0">
              Reviewing detailed parameters filed by <strong>{selectedSubmission.studentName}</strong> for Exam <code>{selectedSubmission.examId}</code>.
            </p>
          </div>
          <button className="btn btn-dark rounded-pill px-4 shadow-sm" onClick={() => setSelectedSubmission(null)}>
            ← Close Audit Report
          </button>
        </div>

        <div className="alert alert-info d-flex justify-content-between align-items-center border-0 rounded-3 mb-4">
          <span>Student Name: <strong>{selectedSubmission.studentName}</strong></span>
          <span>Verified Final Grade: <strong className="fs-5">{selectedSubmission.score}%</strong></span>
        </div>

        <div className="d-flex flex-column gap-3">
          {targetExam ? (
            targetExam.questions.map((q, idx) => {
              // שליפת התשובה שהסטודנט סימן מתוך אובייקט ה-responses שנשמר ב-DB
              const studentAns = selectedSubmission.responses ? selectedSubmission.responses[idx] : undefined;
              const isCorrect = studentAns === q.answer;

              return (
                <div key={q.id} className={`card p-3 border-0 shadow-sm rounded-3 border-start border-4 ${isCorrect ? 'border-start-success bg-light' : 'border-start-danger bg-light'}`}>
                  <h6 className="fw-bold text-dark">Item {idx + 1}: {q.text}</h6>
                  <div className="small mt-2 ps-1">
                    <div className={`p-2 rounded mb-1 ${isCorrect ? 'bg-success-subtle text-success fw-bold' : 'bg-danger-subtle text-danger fw-semibold'}`}>
                      Student Answered: {studentAns || '[No Option Registered]'} {isCorrect ? '✓' : '❌'}
                    </div>
                    {!isCorrect && (
                      <div className="p-2 rounded bg-success-subtle text-success fw-bold">
                        Expected Correct Value: {q.answer} ✓
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-muted p-3">Error cross-referencing parent exam record. The exam template might have been wiped.</div>
          )}
        </div>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="container animate__animated animate__fadeIn">
        <div className="mb-4">
          <button className="btn btn-outline-secondary rounded-pill px-4 shadow-sm" onClick={() => setIsCreating(false)}>
            ← Cancel Design Session
          </button>
        </div>
        <ExamCreator onExamCreated={() => {
          setIsCreating(false);
          reloadData();
        }} />
      </div>
    );
  }

  return (
    <div className="card shadow-lg border-0 p-4 bg-white rounded-3 animate__animated animate__fadeIn">
      {/* Dashboard Control Banner */}
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h3 className="fw-bold text-primary mb-1">👨‍🏫 Institutional Admin Dashboard</h3>
          <p className="text-muted small mb-0">Manage course test templates, transition live deployment statuses, and analyze audit reports.</p>
        </div>
        <button className="btn btn-primary fw-bold rounded-pill px-4 shadow-sm" onClick={() => setIsCreating(true)}>
          ➕ Create New Examination
        </button>
      </div>

      {/* KPI Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 bg-primary text-white p-3 shadow-sm rounded-3">
            <small className="text-white-50 text-uppercase fw-bold">Global System Average</small>
            <div className="display-6 fw-bold font-monospace">{metrics.avg}%</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-success text-white p-3 shadow-sm rounded-3">
            <small className="text-white-50 text-uppercase fw-bold">Total Graded Submissions</small>
            <div className="display-6 fw-bold font-monospace">{metrics.totalSubmissions}</div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card border-0 bg-dark text-white p-3 shadow-sm rounded-3">
            <small className="text-white-50 text-uppercase fw-bold">Total Registered Modules</small>
            <div className="display-6 fw-bold font-monospace">{metrics.totalExams}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" /></div>
      ) : (
        <div className="row g-4">
          {/* Exams Grid Area */}
          <div className="col-xl-6">
            <div className="p-3 border rounded-3 bg-light shadow-sm h-100">
              <h5 className="fw-bold text-dark mb-3">📋 Course Examination Templates</h5>
              <div className="list-group shadow-sm bg-white rounded-3 overflow-hidden">
                {exams.map(e => (
                  <div key={e.id} className="list-group-item d-flex justify-content-between align-items-center p-3 border-start-0 border-end-0">
                    <div>
                      <span className="fw-bold h6 text-dark d-block mb-1">{e.title}</span>
                      <small className="text-muted">
                        Questions: <span className="fw-bold">{e.questions.length}</span> | Duration: <span className="fw-bold text-secondary">{e.durationMinutes}m</span> | Code: <code className="bg-light px-1.5 rounded text-danger fw-bold">{e.id}</code>
                      </small>
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <span className={`badge px-2.5 py-1.5 rounded-pill ${e.status === 'Active' ? 'bg-success' : e.status === 'Draft' ? 'bg-warning text-dark' : 'bg-danger'}`}>{e.status}</span>
                      <div className="btn-group btn-group-sm">
                        <button className="btn btn-sm btn-outline-success" disabled={e.status === 'Active'} onClick={() => handleStatusChange(e.id, 'Active')}>Publish</button>
                        <button className="btn btn-sm btn-outline-danger" disabled={e.status === 'Archived'} onClick={() => handleStatusChange(e.id, 'Archived')}>Archive</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Graded Performance Scoreboard Block */}
          <div className="col-xl-6">
            <div className="p-3 border rounded-3 bg-light shadow-sm h-100">
              <h5 className="fw-bold text-dark mb-3">📈 Live Scoreboard Records</h5>
              <div className="table-responsive bg-white rounded-3 shadow-sm">
                <table className="table table-hover align-middle text-center mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th className="text-start ps-3">Student Identity</th>
                      <th>Target Exam</th>
                      <th>Output</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scores.length === 0 ? (
                      <tr><td colSpan="4" className="text-muted py-3">No evaluation logs recorded yet.</td></tr>
                    ) : (
                      scores.map((s, idx) => (
                        <tr key={idx}>
                          <td className="text-start ps-3 fw-semibold">{s.studentName}</td>
                          <td><code className="text-secondary">{s.examId}</code></td>
                          <td>
                            <span className={`badge px-2.5 py-1.5 rounded-pill ${s.score >= 70 ? 'bg-success' : s.score >= 55 ? 'bg-warning text-dark' : 'bg-danger'}`}>
                              {s.score}%
                            </span>
                          </td>
                          <td>
                            {/* Drill-down audit button triggering the deep performance sheet view */}
                            <button 
                              className="btn btn-xs btn-outline-primary py-0.5 px-2 small" 
                              style={{ fontSize: '11px' }}
                              onClick={() => setSelectedSubmission(s)}
                            >
                              🔍 Audit
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;