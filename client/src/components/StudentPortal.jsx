import React, { useState } from 'react';
import { getExamById } from '../api/examService';

const StudentPortal = () => {
  const [examId, setExamId] = useState('');
  const [exam, setExam] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStartExam = () => {
    if (!examId) return;
    setLoading(true);
    setError('');
    setExam(null);

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

          {exam && (
            <div className="mt-4 p-3 border rounded">
              <h4>Exam Started: {exam.title}</h4>
              <p>Questions found: {exam.questions.length}</p>
              <button className="btn btn-outline-success">Begin Answering</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
