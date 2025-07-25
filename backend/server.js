const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const questions = JSON.parse(fs.readFileSync('./data/questions.json', 'utf-8'));

app.get('/api/questions', (req, res) => {
  const safeQuestions = questions.map(({ answer, ...rest }) => rest);
  res.json(safeQuestions);
});

app.post('/api/submit', (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;

  userAnswers.forEach((ans, index) => {
    if (ans === questions[index].answer) score++;
  });

  res.json({ score, total: questions.length });
});

app.listen(port, () => {
  console.log(`Quiz API running at http://localhost:${port}`);
});
