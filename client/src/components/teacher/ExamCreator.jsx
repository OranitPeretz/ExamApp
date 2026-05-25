import React, { useState } from 'react';
import { examService } from '../../services/examService';
import { notifyService } from '../../core/classes/NotifyService';

const ExamCreator = ({ onExamCreated }) => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [qText, setQText] = useState('');
  const [opts, setOpts] = useState(['', '', '']);
  const [correct, setCorrect] = useState('');

  const handleAddQuestion = () => {
    if (!qText || opts.some(o => !o) || !correct) {
      notifyService.show('Please complete the question parameters.', 'danger');
      return;
    }
    const newQ = { id: questions.length + 1, text: qText, options: [...opts], answer: correct };
    setQuestions([...questions, newQ]);
    setQText('');
    setOpts(['', '', '']);
    setCorrect('');
    notifyService.show('Question appended to active buffer.');
  };

  const handleSaveExam = () => {
    if (!title || questions.length === 0) {
      notifyService.show('Exam requires a title and at least one question.', 'danger');
      return;
    }
    const examPayload = { title, status: 'Draft', questions };
    examService.createExam(examPayload).then(() => {
      notifyService.show('Exam Draft initialized successfully!');
      setTitle('');
      setQuestions([]);
      onExamCreated();
    });
  };

  return (
    <div className="card border-0 bg-light p-3 shadow-sm mb-4">
      <h5 className="fw-bold text-dark border-bottom pb-2">➕ Build New Examination</h5>
      <div className="mb-3">
        <label className="form-label small fw-bold">Exam Title</label>
        <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g., Computer Science Advanced" />
      </div>

      <div className="card p-3 border-0 shadow-sm bg-white mb-3">
        <h6 className="fw-bold text-secondary">Append Question ({questions.length} total)</h6>
        <input type="text" className="form-control form-control-sm mb-2" value={qText} onChange={e => setQText(e.target.value)} placeholder="Question Text" />
        {opts.map((o, idx) => (
          <input key={idx} type="text" className="form-control form-control-sm mb-1" value={o} onChange={e => {
            const next = [...opts]; next[idx] = e.target.value; setOpts(next);
          }} placeholder={`Option ${idx + 1}`} />
        ))}
        <input type="text" className="form-control form-control-sm mt-1" value={correct} onChange={e => setCorrect(e.target.value)} placeholder="Exact Correct Option string value" />
        <button type="button" className="btn btn-sm btn-outline-primary mt-2" onClick={handleAddQuestion}>Add Question</button>
      </div>
      <button className="btn btn-primary fw-bold" onClick={handleSaveExam}>Save Exam Template</button>
    </div>
  );
};

export default ExamCreator;