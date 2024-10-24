# Rule Evaluation System

A web application for combining and evaluating rules using Abstract Syntax Trees (AST). This project allows users to input rules in JSON format and evaluate them against provided data.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Contributing](#contributing)
- [License](#license)

## Features

- Combine two rules and display the combined AST.
- Evaluate rules against user-provided data.
- Error handling for invalid inputs.
- Responsive and user-friendly UI.

## Technologies Used

- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (if applicable)
- **Testing**: Jest, React Testing Library
- **Styling**: CSS (or any CSS framework you might be using)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Docker](https://www.docker.com/get-started) 
- A Docker Hub account (optional for pushing images)

### Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/Instinct28/assignmentOne.git
cd assignmentTwo
```
### Firstly start server : 
```bash
cd server
npm i
npm start
```

### Then start client : 
```bash
cd client
npm i
npm run dev
```

### Running with Docker
```bash
docker pull instinctyash/frontend:
```