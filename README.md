# Question Paper Generator

This application generates question papers based on specified criteria.

## Endpoints

- `/generate-question-paper`: Generates a random question paper with difficulty distribution.
- `/generate-question-paper-with-topics`: Generates a question paper with both difficulty and topic distribution.

## Query Parameters

- `totalMarks` (optional): Total marks for the question paper. Default is 100.

## How to Run

1. Install dependencies: `npm install`
2. Start the server: `node src/app.js`
3. Access the endpoints using your browser or a tool like Postman.
