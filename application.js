// app.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/generate-paper', (req, res) => {
  // Handle form submission and generate question paper here
  const difficulty = req.body.difficulty;
  const topic = req.body.topic;
  const marks = req.body.marks;

  // Implement question paper generation logic
  // ...

  // Send the generated paper as a response for now
  res.send(`Question Paper: ${JSON.stringify(req.body)}`);
});

app.listen(port, () => {
  console.log(`Question Paper Generator app listening at http://localhost:${port}`);
});
