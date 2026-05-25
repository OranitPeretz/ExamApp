import { db } from './mockDb';
import { configService } from '../core/classes/ConfigService';

class ExamService {
  getAllExams() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getTable('exams'));
      }, configService.get('apiDelay'));
    });
  }

  getExamById(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exam = db.getTable('exams').find(e => e.id === id);
        if (exam) {
          resolve({ ...exam });
        } else {
          reject(new Error("Exam code not found."));
        }
      }, configService.get('apiDelay'));
    });
  }

  createExam(examData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newExam = { ...examData, id: 'exam-' + Date.now().toString().slice(-4) };
        db.insert('exams', newExam);
        resolve(newExam);
      }, configService.get('apiDelay'));
    });
  }

  changeStatus(examId, status) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = db.updateExamStatus(examId, status);
        if (success) resolve();
        else reject(new Error("Failed to change exam status."));
      }, configService.get('apiDelay'));
    });
  }

  getStudentScores() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(db.getTable('studentScores'));
      }, configService.get('apiDelay'));
    });
  }

  saveStudentScore(scoreRecord) {
    return new Promise((resolve) => {
      setTimeout(() => {
        db.insert('studentScores', scoreRecord);
        resolve();
      }, configService.get('apiDelay'));
    });
  }
}

export const examService = new ExamService();