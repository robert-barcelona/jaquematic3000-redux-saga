# Jaquematic 3000

This application is an update to the final project for the Skylab Academy full-stack bootcamp.  It is an online chess application that permits players to play with other players remotely.  Each user may play with an unlimited number of users at one time, maintaining one game open with each other player at a time.  The application checks for valid moves, and informs the users in case of check, checkmate, stalemate, lack of sufficient material to move, etc.  Players may play 'live', or at different times -- the moves are saved so that players do not need to be online at the same time.

This is a MERN stack application and as such uses

- NodeJS
- Express
- Mongoose
- MongoDB
- React
- Redux
- Redux-Saga
- SCSS

In addition, testing was done with 

- Mocha
- Chai

This version relies on polling instead of socketIO.  It uses redux and redux-saga.
## [Documentation](docs/README.md)

## [Live demo](https://jaquematic3000-redux-saga.surge.sh) 


