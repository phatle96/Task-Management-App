const express = require('express');

const index_route = require('./routes/index.route')
const list_route = require('./routes/list.route');
const task_route = require('./routes/task.route');
const subtask_route = require('./routes/subtask.route');
const person_route = require('./routes/person.route');

const app = express();
app.use('/', index_route);
app.use('/list', list_route);
app.use('/task', task_route);
app.use('/subtask', subtask_route);
app.use('/person', person_route);

const db = require('./connect.js');
db.connect();

module.exports = app;
