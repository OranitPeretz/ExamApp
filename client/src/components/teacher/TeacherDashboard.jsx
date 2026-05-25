import React, { useState, useEffect } from 'react';
import { examService } from '../../services/examService';
import ExamCreator from './ExamCreator';
import { notifyService } from '../../core/classes/NotifyService';

const TeacherDashboard = () => {
  const [exams, setExams] = useState([]);
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  const reloadData = () => {
    setLoading(true);
    Promise.all([examService.getAllExams(), examService.getStudentScores()])
      .then(([examsData, scoresData]) => {
        setExams(examsData);
        setScores(scoresData);
        setLoading(false);
      });
  };

  useEffect(() => { reloadData(); }, []);

  const handleStatusChange = (id, nextStatus) => {
    examService.changeStatus(id, nextStatus).then(() => {
      notifyService.show(`Exam state changed to ${nextStatus}.`);
      reloadData();
    });
  };

  return (
    <div className="card shadow border-0 p-4">
      <h3 className="fw-bold mb-4">👨‍🏫 Academic Control Station</h3>
      <div className="row">
        <div className="col-lg-4">
          <ExamCreator onExamCreated={reloadData} />
        </div>
        <div className="col-lg-8">
          <div className="p-3 border rounded bg-white shadow-sm mb-4">
            <h5 className="fw-bold mb-3">📋 Managed Modules</h5>
            {loading ? <div className="spinner-border text-primary" /> : (
              <ul className="list-group">
                {exams.map(e => (
                  <li key={e.id} className="list-group-item d-flex justify-content-between align-items-center py-3">
                    <div>
                      <span className="fw-bold d-block">{e.title}</span>
                      <small className="text-muted">Questions: {e.questions.length} | ID: <code>{e.id}</code></small>
                    </div>
                    <div className="d-flex gap-1 align-items-center">
                      <span className={`badge me-2 bg-${e.status === 'Active' ? 'success' : e.status === 'Draft' ? 'warning text-dark' : 'danger'}`}>{e.status}</span>
                      <button className="btn btn-xs btn-outline-success py-0 px-1 small" style={{fontSize: '11px'}} onClick={() => handleStatusChange(e.id, 'Active')}>Activate</button>
                      <button className="btn btn-xs btn-outline-danger py-0 px-1 small" style={{fontSize: '11px'}} onClick={() => handleStatusChange(e.id, 'Archived')}>Archive</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-3 border rounded bg-white shadow-sm">
            <h5 className="fw-bold mb-3">📈 Logged Grade Submissions</h5>
            <div className="table-responsive">
              <table className="table table-sm align-middle text-center mb-0">
                <thead className="table-dark">
                  <tr><th>Student Name</th><th>Exam ID</th><th>Evaluated Grade</th></tr>
                </thead>
                <tbody>
                  {scores.map((s, idx) => (
                    <tr key={idx}><td>{s.studentName}</td><td><code>{s.examId}</code></td><td><span className="badge bg-primary">{s.score}%</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;