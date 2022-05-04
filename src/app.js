const express = require('express');

//Importing global error controller

const { globalErrorHandler } = require('./controllers/errors.controller');

//Routers
const { usersRouter } = require('./routes/users.routes');
const { repairRouter } = require('./routes/repairs.routes');

//Init express app
const app = express();

//For to enable incoming JSON data
app.use(express.json());

//Endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/repairs', repairRouter);

//Global error controller app
app.use('*', globalErrorHandler);

module.exports = { app };
