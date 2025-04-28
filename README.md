# tic_tac_toe
This is a simple Tic Tac Toe game built using HTML, CSS, and JavaScript. The game allows two players to play interactively in a browser. Player scores are tracked and stored in a MySQL database, making the game persistent across sessions.
#Features
Multiplayer: Players take turns as X and O to compete against each other.
Score Tracking: The game tracks each player's score and updates the database when a winner is determined.
Responsive UI: The game interface is designed to be mobile-friendly and responsive.
Real-Time Updates: Scores are updated in real-time and stored in a MySQL database using a simple Express.js backend.

#Technologies Used
Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express.js
Database: MySQL
Audio: Background sounds for turn changes and game over
Fetch API: For communication between the frontend and backend to save player scores

#Database Schema
sql
Copy
Edit
CREATE DATABASE tictactoe_db;
USE tictactoe_db;
CREATE TABLE players (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  score INT DEFAULT 0,
  UNIQUE(name, password)
);
