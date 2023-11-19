const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const questionStore = require('./questionStore'); // Create questionStore.js to handle data

app.use(bodyParser.json());

// Endpoint to get a random question paper
app.get('/generate-question-paper', (req, res) => {
  const totalMarks = req.query.totalMarks || 100; // Default total marks to 100 if not provided in the request
  const difficultyDistribution = {
    easy: 0.2,
    medium: 0.5,
    hard: 0.3,
  };

  const questionPaper = generateQuestionPaper(totalMarks, difficultyDistribution);
  res.json({ questionPaper });
});

// Function to generate a question paper
function generateQuestionPaper(totalMarks, difficultyDistribution) {
  const questionPaper = [];
  const availableQuestions = questionStore.getQuestions(); // Implement getQuestions() in questionStore.js

  Object.entries(difficultyDistribution).forEach(([difficulty, percentage]) => {
    const marksForDifficulty = totalMarks * percentage;
    const questions = getQuestionsByDifficulty(availableQuestions, difficulty, marksForDifficulty);
    questionPaper.push(...questions);
  });

  return questionPaper;
}

// Function to filter questions by difficulty and marks
function getQuestionsByDifficulty(questions, difficulty, marks) {
  return questions
    .filter((question) => question.difficulty.toLowerCase() === difficulty.toLowerCase())
    .slice(0, marks);
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
