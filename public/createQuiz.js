document.addEventListener('DOMContentLoaded', function() {
    const createQuizForm = document.getElementById('createQuizForm');
    const questionsContainer = document.getElementById('questionsContainer');
    const addQuestionBtn = document.getElementById('addQuestionBtn');
    let questionCount = 1;

    addQuestionBtn.addEventListener('click', function() {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <label for="question${questionCount}">Question ${questionCount + 1}:</label>
            <input type="text" id="question${questionCount}" name="question${questionCount}" required>
            <div class="options">
                <label>Options:</label>
                <input type="text" name="question${questionCount}_option0" required>
                <input type="text" name="question${questionCount}_option1" required>
                <input type="text" name="question${questionCount}_option2" required>
                <input type="text" name="question${questionCount}_option3" required>
            </div>
            <label for="answer${questionCount}">Correct Answer:</label>
            <input type="text" id="answer${questionCount}" name="answer${questionCount}" required>
        `;
        questionsContainer.appendChild(questionDiv);
        questionCount++;
    });

    createQuizForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(createQuizForm);
        const quizName = formData.get('quizName');

        const newQuiz = {
            name: quizName,
            questions: []
        };

        for (let i = 0; i < questionCount; i++) {
            const question = formData.get(`question${i}`);
            const options = [
                formData.get(`question${i}_option0`),
                formData.get(`question${i}_option1`),
                formData.get(`question${i}_option2`),
                formData.get(`question${i}_option3`)
            ];
            const answer = formData.get(`answer${i}`);

            newQuiz.questions.push({ question, options, answer });
        }

        fetch('/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newQuiz)
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Quiz name already exists') {
                alert('Quiz name already exists. Please choose a different name.');
            } else {
                alert(data);
                window.location.href = 'index.html';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the quiz.');
        });
    });
});
