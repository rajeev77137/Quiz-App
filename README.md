# Quiz App

## Description
This is a simple Quiz App that allows users to create and take quizzes. The application has two main functionalities:
1. Creating a quiz with custom questions and options.
2. Taking a quiz and getting a score based on the correct answers.

## Features
- Create a quiz with multiple questions and options.
- Take a quiz and get instant feedback on your score.
- Data persistence using a JSON file to store quizzes.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js


## Setup and Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/Rabia2417/quiz-app.git
    cd quiz-app
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the server:**
    ```bash
    node server.js
    ```

## Usage

### Creating a Quiz
1. Go to the home page.
2. Click on "Create Quiz".
3. Fill in the quiz name and questions.
4. Submit the quiz. The quiz will be saved and available for taking.

### Taking a Quiz
1. Go to the home page .
2. Click on "Take Quiz".
3. Select a quiz from the list of available quizzes.
4. Answer the questions and submit the quiz to see your score.

## File Explanations

### `server.js`
Sets up the Express server to serve static files and handle API requests for creating and fetching quizzes.

### `public/index.html`
The home page with navigation to "Create Quiz" and "Take Quiz" pages.

### `public/createQuiz.html`
The page for creating a new quiz. Contains a form to input quiz questions and options.

### `public/takeQuiz.html`
The page for taking a quiz. Displays available quizzes and allows the user to take and submit a quiz.

### `public/createQuiz.js`
JavaScript for handling the creation of quizzes. Sends new quizzes to the server.

### `public/takeQuiz.js`
JavaScript for fetching available quizzes from the server and handling the quiz-taking process.

### `quizzes.json`
A JSON file that stores the created quizzes.

## Endpoints

### `GET /quizzes`
Fetches all the quizzes from `quizzes.json`.

### `POST /quizzes`
Saves a new quiz to `quizzes.json`.

## Notes
- Ensure the server is running before accessing the pages.
- The application uses a simple JSON file for data persistence.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Thank you to the creators of Node.js and Express.js for their amazing tools.
