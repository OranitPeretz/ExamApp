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
      notifyService.show('Please fill in all configuration parameters for this question.', 'danger');
      return;
    }
    if (!opts.includes(correct.trim())) {
      notifyService.show('The correct option string value must match one of the three options provided.', 'danger');
      return;
    }

    const newQ = { 
      id: questions.length + 1, 
      text: qText.trim(), 
      options: opts.map(o => o.trim()), 
      answer: correct.trim() 
    };

    setQuestions([...questions, newQ]);
    
    setQText('');
    setOpts(['', '', '']);
    setCorrect('');
    notifyService.show('Question successfully appended to the active template buffer.');
  };

  const handleSaveExam = () => {
    if (!title.trim() || questions.length === 0) {
      notifyService.show('An exam blueprint requires a valid title and at least one question to deploy.', 'danger');
      return;
    }

    const examPayload = { 
      title: title.trim(), 
      status: 'Draft', 
      questions 
    };

    examService.createExam(examPayload).then(() => {
      notifyService.show('New examination blueprint deployed successfully as Draft!');
      setTitle('');
      setQuestions([]);
      onExamCreated();
    });
  };

  return (
    <div className="card shadow border-0 p-4 bg-white rounded-3">
      <h4 className="fw-bold text-dark border-bottom pb-3 mb-4">🛠️ Institutional Exam Design Studio</h4>
      
      <div className="row g-4">
        {/* Left Input Console Form */}
        <div className="col-lg-6">
          <div className="p-3 border rounded-3 bg-light mb-3">
            <h5 className="fw-bold text-secondary mb-3">1. General Exam Configuration</h5>
            <div className="mb-3">
              <label className="form-label small fw-bold">Exam Title / Subject Context</label>
              <input 
                type="text" 
                className="form-control form-control-lg bg-white" 
                value={title} 
                onChange={e => setTitle(e.target.value)} 
                placeholder="e.g., Data Structures & Algorithms Final" 
              />
            </div>
          </div>

          <div className="p-3 border rounded-3 bg-light">
            <h5 className="fw-bold text-secondary mb-3">2. Construct Multiple-Choice Question</h5>
            
            <div className="mb-3">
              <label className="form-label small fw-semibold">Question Formulation</label>
              <input 
                type="text" 
                className="form-control bg-white" 
                value={qText} 
                onChange={e => setQText(e.target.value)} 
                placeholder="Type the validation statement..." 
              />
            </div>

            <div className="mb-3">
              <label className="form-label small fw-semibold">Distractor Options (Provide 3 Options)</label>
              {opts.map((o, idx) => (
                <input 
                  key={idx} 
                  type="text" 
                  className="form-control bg-white mb-2" 
                  value={o} 
                  onChange={e => {
                    const next = [...opts]; 
                    next[idx] = e.target.value; 
                    setOpts(next);
                  }} 
                  placeholder={`Option Statement ${idx + 1}`} 
                />
              ))}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-success">Exact String of Correct Answer</label>
              <input 
                type="text" 
                className="form-control border-success bg-white" 
                value={correct} 
                onChange={e => setCorrect(e.target.value)} 
                placeholder="Type the identical character string corresponding to the valid answer" 
              />
            </div>

            <button type="button" className="btn btn-outline-primary w-100 fw-bold mt-2" onClick={handleAddQuestion}>
              ➕ Add Question to Template
            </button>
          </div>
        </div>

        {/* Right Output Real-Time Preview Block */}
        <div className="col-lg-6">
          <div className="p-3 border rounded-3 bg-light h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="fw-bold text-dark mb-3">👀 Live Exam Blueprint Preview ({questions.length} Questions)</h5>
              {questions.length === 0 ? (
                <p className="text-muted small">No items appended yet. Complete the parameter configuration form to register test blocks.</p>
              ) : (
                <div className="overflow-auto pe-1" style={{maxHeight: '380px'}}>
                  {questions.map((q, index) => (
                    <div key={q.id} className="card p-3 border-0 shadow-sm rounded-3 mb-2 bg-white">
                      <strong className="text-primary d-block mb-2">Item {index + 1}: {q.text}</strong>
                      <ul className="list-unstyled ps-2 mb-1 small">
                        {q.options.map((opt, i) => (
                          <li key={i} className={opt === q.answer ? "text-success fw-bold" : "text-muted"}>
                            {opt === q.answer ? "✓ " : "• "} {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-top pt-3 mt-3">
              <button className="btn btn-success btn-lg w-100 fw-bold shadow-sm" onClick={handleSaveExam} disabled={questions.length === 0}>
                💾 Save and Deploy Exam Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCreator;