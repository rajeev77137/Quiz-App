const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Endpoint to get quizzes
app.get('/quizzes', (req, res) => {
    fs.readFile('quizzes.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading quizzes file');
        } else {
            res.send(JSON.parse(data));
        }
    });
});


// Endpoint to save a new quiz
app.post('/quizzes', (req, res) => {
    fs.readFile('quizzes.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading quizzes file');
        } else {
            let quizzesData = JSON.parse(data);
            let quizzes = quizzesData.quizzes;
            const newQuiz = req.body;

            if (quizzes.some(quiz => quiz.name.toLowerCase() === newQuiz.name.toLowerCase())) {
                res.status(400).send('Quiz name already exists');
            } else {
                quizzes.push(newQuiz);
                fs.writeFile('quizzes.json', JSON.stringify(quizzesData, null, 2), (err) => {
                    if (err) {
                        res.status(500).send('Error writing quizzes file');
                    } else {
                        res.send('Quiz created successfully');
                    }
                });
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
