import React, { useState } from 'react';
import { examService } from '../../services/examService';
import { notifyService } from '../../core/classes/NotifyService';

const StudentPortal = ({ user }) => {
  const [examId, setExamId] = useState('');
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);

  const handleFetch = () => {
    if (!examId) return;
    setLoading(true);
    examService.getExamById(examId)
      .then(data => {
        if (data.status !== 'Active') {
          notifyService.show('This exam is not available for testing currently.', 'danger');
          setLoading(false);
          return;
        }
        setExam(data);
        setCurrentIdx(0);
        setAnswers({});
        setDone(false);
        setLoading(false);
      })
      .catch(err => {
        notifyService.show(err.message, 'danger');
        setLoading(false);
      });
  };

  const handleFinish = () => {
    let hits = 0;
    exam.questions.forEach((q, i) => {
      if (answers[i] === q.answer) hits++;
    });
    const finalGrade = Math.round((hits / exam.questions.length) * 100);
    setScore(finalGrade);

    examService.saveStudentScore({ studentName: user.name, examId: exam.id, score: finalGrade })
      .then(() => {
        setDone(true);
        notifyService.show('Your scores have been safely committed.');
      });
  };

  return (
    <div className="card shadow border-0 p-4 bg-white">
      <h4 className="fw-bold text-success mb-3">🎓 Student Assessment Desk</h4>
      {!exam && !done && (
        <div className="input-group mb-3" style={{maxWidth: '500px'}}>
          <input type="text" className="form-control" value={examId} onChange={e => setExamId(e.target.value)} placeholder="Input target Active Exam Code (e.g. math-101)" />
          <button className="btn btn-success" onClick={handleFetch} disabled={loading}>{loading ? 'Fetching...' : 'Query'}</button>
        </div>
      )}

      {exam && !done && (
        <div>
          <h5 className="fw-bold mb-3 text-secondary">{exam.title}</h5>
          <div className="progress mb-3" style={{height: '6px'}}>
            <div className="progress-bar bg-success" style={{width: `${((currentIdx + 1)/exam.questions.length)*100}%`}}></div>
          </div>
          <div className="p-3 border rounded bg-light mb-3">
            <p className="fw-bold lead">{exam.questions[currentIdx].text}</p>
            {exam.questions[currentIdx].options.map((opt, i) => (
              <div key={i} className="form-check my-2">
                <input className="form-check-input" type="radio" name="option-group" checked={answers[currentIdx] === opt} onChange={() => setAnswers({...answers, [currentIdx]: opt})} id={`opt-${i}`} />
                <label className="form-check-label fw-medium" htmlFor={`opt-${i}`}>{opt}</label>
              </div>
            ))}
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-secondary btn-sm" disabled={currentIdx === 0} onClick={() => setCurrentIdx(p => p - 1)}>Back</button>
            {currentIdx < exam.questions.length - 1 ? (
              <button className="btn btn-primary btn-sm" onClick={() => setCurrentIdx(p => p + 1)}>Forward</button>
            ) : (
              <button className="btn btn-danger btn-sm fw-bold" onClick={handleFinish}>Complete Assessment</button>
            )}
          </div>
        </div>
      )}

      {done && (
        <div className="text-center py-4 bg-light rounded shadow-sm border">
          <h3 className="text-success fw-bold">Evaluation Ready!</h3>
          <p className="text-muted">Thank you, {user.name}. Your grade has been registered.</p>
          <div className="display-4 font-monospace text-primary my-3">{score}%</div>
          <button className="btn btn-outline-success rounded-pill px-4 btn-sm" onClick={() => { setExam(null); setDone(false); setExamId(''); }}>Exit Console</button>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;