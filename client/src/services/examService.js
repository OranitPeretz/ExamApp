import { mockDb } from './mockDb';

export const getAllExams = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDb.exams]);
    }, 600);
  });
};

export const getExamById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exam = mockDb.exams.find(e => e.id === id);
      if (exam) {
        resolve({ ...exam });
      } else {
        reject(new Error("Exam not found. Please check the ID."));
      }
    }, 500);
  });
};

export const createExam = (exam) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newExam = { ...exam, id: Date.now().toString() };
      mockDb.exams.push(newExam);
      resolve(newExam);
    }, 800);
  });
};

export const getStudentScores = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockDb.studentScores]);
    }, 500);
  });
};

export const saveStudentScore = (scoreEntry) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDb.studentScores.push(scoreEntry);
      resolve(scoreEntry);
    }, 400);
  });
};