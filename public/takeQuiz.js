document.addEventListener('DOMContentLoaded', function() {
    const topicsContainer = document.querySelector('.main');
    const quizContainer = document.querySelector('.quiz-container');
    const quizQuestionsContainer = document.querySelector('.quiz-questions');
    const submitQuizBtn = document.getElementById('submitQuizBtn');
    const quizResult = document.getElementById('quizResult');
    const goBackBtn = document.getElementById('goBackBtn');

    // Fetch quizzes from the server
    fetch('/quizzes')
        .then(response => response.json())
        .then(data => {
            data.quizzes.forEach(quiz => {
                const topicElement = document.createElement('a');
                topicElement.classList.add('topic');
                topicElement.href = '#';
                topicElement.textContent = quiz.name;
                topicElement.addEventListener('click', function() {
                    loadQuiz(quiz);
                });
                topicsContainer.appendChild(topicElement);
            });
        })
        .catch(error => console.error('Error fetching quiz data:', error));

    function loadQuiz(quiz) {
        topicsContainer.classList.add('hidden');
        quizContainer.classList.remove('hidden');
        submitQuizBtn.classList.remove('hidden');
        quizQuestionsContainer.innerHTML = '';

        quiz.questions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.innerHTML = `
                <h3>${question.question}</h3>
                ${question.options.map((option, optionIndex) => `
                    <label>
                        <input type="radio" name="question${index}" value="${option}"> ${option}
                    </label>
                `).join('')}
            `;
            quizQuestionsContainer.appendChild(questionElement);
        });

        submitQuizBtn.onclick = function() {
            let score = 0;
            quiz.questions.forEach((question, index) => {
                const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
                if (selectedOption && selectedOption.value === question.answer) {
                    score++;
                }
            });
            quizResult.textContent = `You scored ${score} out of ${quiz.questions.length}`;
            quizResult.classList.remove('hidden');
            submitQuizBtn.classList.add('hidden');
            goBackBtn.classList.remove('hidden');
        };
    }

    goBackBtn.addEventListener('click', function() {
        topicsContainer.classList.remove('hidden');
        quizContainer.classList.add('hidden');
        quizResult.classList.add('hidden');
        goBackBtn.classList.add('hidden');
    });
});
