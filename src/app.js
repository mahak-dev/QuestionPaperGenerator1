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
  const topicDistribution = {
    Waves: 0.4,
    Optics: 0.3,
    Thermodynamics: 0.3,
  };
  const questionPaper = generateQuestionPaper(totalMarks, difficultyDistribution);
  res.json({ questionPaper });
});

function getQuestionsByTopicAndDifficulty(questions, topic, difficulty, marks) {
  return questions
    .filter((question) => question.topic.toLowerCase() === topic.toLowerCase())
    .filter((question) => question.difficulty.toLowerCase() === difficulty.toLowerCase())
    .slice(0, marks);
}

// Function to generate a question paper
function generateQuestionPaperWithTopics(totalMarks, difficultyDistribution, topicDistribution) {
  const questionPaper = [];
  const availableQuestions = questionStore.getQuestions();

  Object.entries(difficultyDistribution).forEach(([difficulty, percentage]) => {
    const marksForDifficulty = totalMarks * percentage;

    Object.entries(topicDistribution).forEach(([topic, topicPercentage]) => {
      const marksForTopic = marksForDifficulty * topicPercentage;
      const questions = getQuestionsByTopicAndDifficulty(availableQuestions, topic, difficulty, marksForTopic);
      questionPaper.push(...questions);
    });
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
