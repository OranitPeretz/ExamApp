import StorageService from '../core/classes/StorageService';
import LoggerService from '../core/classes/LoggerService';

const logger = new LoggerService('MockDatabase');

class MockDatabase {
  constructor() {
    this.STORAGE_KEY = 'etest_mock_db';
    this.init();
  }

  init() {
    const existingData = StorageService.get(this.STORAGE_KEY);
    if (existingData) {
      this.data = existingData;
      logger.info("Loaded data from local persistence.");
    } else {
      this.data = {
        users: [
          { username: "admin", password: "125", role: "teacher", name: "Professor Smith" }
        ],
        exams: [
          {
            id: "math-101",
            title: "Mathematics Basics",
            status: "Active", // Statuses: Draft, Active, Archived
            questions: [
              { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
              { id: 2, text: "What is 10 / 2?", options: ["2", "5", "10"], answer: "5" }
            ]
          }
        ],
        studentScores: [
          { studentName: "John Doe", examId: "math-101", score: 100 }
        ]
      };
      this.save();
      logger.info("Initialized default mocking database structures.");
    }
  }

  save() {
    StorageService.set(this.STORAGE_KEY, this.data);
  }

  getTable(tableName) {
    return this.data[tableName];
  }

  insert(tableName, record) {
    this.data[tableName].push(record);
    this.save();
    return record;
  }

  updateExamStatus(examId, newStatus) {
    const exam = this.data.exams.find(e => e.id === examId);
    if (exam) {
      exam.status = newStatus;
      this.save();
      return true;
    }
    return false;
  }
}

export const db = new MockDatabase();