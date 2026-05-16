export const mockDb = {
  exams: [
    {
      id: "math-101",
      title: "Mathematics Basics",
      questions: [
        { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5"], answer: "4" },
        { id: 2, text: "What is 10 / 2?", options: ["2", "5", "10"], answer: "5" }
      ]
    },
    {
      id: "hist-202",
      title: "World History",
      questions: [
        { id: 1, text: "Who was the first president of the USA?", options: ["Lincoln", "Washington", "Jefferson"], answer: "Washington" }
      ]
    }
  ],
  studentScores: [
    { studentName: "John Doe", examId: "math-101", score: 100 },
    { studentName: "Jane Smith", examId: "math-101", score: 85 }
  ]
};
