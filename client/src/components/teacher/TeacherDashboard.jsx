import React, { useState, useEffect } from 'react';
import { getAllExams, getStudentScores } from '../../services/examService';

const TeacherDashboard = () => {
  const [exams, setExams] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getAllExams(), getStudentScores()])
      .then(([examsData, scoresData]) => {
        setExams(examsData);
        setScores(scoresData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-header bg-primary text-white py-3">
        <h4 className="mb-0">👨‍🏫 Teacher Management Dashboard</h4>
      </div>
      <div className="card-body p-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="text-muted mt-2">Fetching dashboard records...</p>
          </div>
        ) : (
          <div className="row g-4">
            {/* צד שמאל: רשימת מבחנים קיימים */}
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light h-100">
                <h5 className="fw-bold text-dark mb-3">📋 Available Exams</h5>
                <ul className="list-group shadow-sm">
                  {exams.map(exam => (
                    <li key={exam.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                      <div>
                        <div className="fw-semibold">{exam.title}</div>
                        <small className="text-muted">{exam.questions.length} Questions</small>
                      </div>
                      <span className="badge bg-secondary rounded-pill font-monospace">ID: {exam.id}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* צד ימין: טבלת ציוני סטודנטים */}
            <div className="col-md-6">
              <div className="p-3 border rounded bg-light h-100">
                <h5 className="fw-bold text-dark mb-3">📈 Student Performance</h5>
                {scores.length === 0 ? (
                  <p className="text-muted small">No exam submissions recorded yet.</p>
                ) : (
                  <div className="table-responsive shadow-sm rounded bg-white">
                    <table className="table table-hover align-middle mb-0 text-center">
                      <thead className="table-dark">
                        <tr>
                          <th>Student</th>
                          <th>Exam ID</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scores.map((s, idx) => (
                          <tr key={idx}>
                            <td className="text-start ps-3 fw-medium">{s.studentName}</td>
                            <td><code className="text-secondary">{s.examId}</code></td>
                            <td>
                              <span className={`badge px-2.5 py-1.5 ${s.score >= 70 ? 'bg-success' : 'bg-warning text-dark'}`}>
                                {s.score}%
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
      </div>
    </div>
  );
};

export default TeacherDashboard;