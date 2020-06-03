# Hello

This is a small Note Taker Web Site, fully functional.

The Idea is simple, just Log In and Star writing your notes, saved in a database and folding support through categories.

## Technical Details

This project is developed completely in JavaScript.

Server running with Node, using the Express package for server development.

This project contains this features:

#### Database:
  Developed using Sequelize, and saved in SQLite3, to avoid using an external server.

#### Sign In System:
  Implemented with the Passport Package, developed as a API Microservice, this lead to deploying the microservice in a ultra secure server.

#### Log System:
  A full featured Logging system, using the Morgan Package.

  With this Log System, standard information and errors are logged daily in the system, allowing for debugging as well as analysis of the web site usage, traffic and more.

  The Log system is automatically manage, daily (or when a log file excess the 10MB in size) are rotated (create a fresh now log), and automatically compressed.

#### Responsive:
  Using the "Movil First" paradigm of Bootstrap, the Web Site is full responsive for either movil or desktop usage.

#### Dynamic Interaction:
  The web site is enabled with Comet, meaning that the server is in constant interaction with the client, updating the notes.

## Main Package / Frameworks used:
- Express
- Morgan
- Sequelize
- Passport
- Bootstrap
