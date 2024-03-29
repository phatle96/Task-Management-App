const express = require('express');
const cors = require('cors');

const index_route = require('../routes/index.route')
const list_route = require('../routes/list.route');
const task_route = require('../routes/task.route');
const subtask_route = require('../routes/subtask.route');
const person_route = require('../routes/person.route');
const cors_config = require('../configs/cors.config')
const compression = require("compression");

function createServer() {

    const app = express();
    app.use(cors(cors_config));
    app.use(compression());
    app.use(express.json());
    app.use('/api', index_route);
    app.use('/api/list', list_route,);
    app.use('/api/task', task_route);
    app.use('/api/subtask', subtask_route);
    app.use('/api/person', person_route);

    return app
}

module.exports = createServer;  
