var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

var todoNextId = 1;
var todos = [];

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('TODO API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
    var todo = _.findWhere(todos, { id: parseInt(req.params.id) });
    if (!todo) {
        res.status(404).send('Todo with such id not exist!');
    }
    res.json(todo);
});

// POST /todos
app.post('/todos', function (req, res) {
    if (!_.isBoolean(req.body.completed) 
    || !_.isString(req.body.description) 
    || req.body.description.trim().length === 0) {
        res.status(400).send()
    }
    else{
        var todo = {
            id: todoNextId,
            description: req.body.description,
            completed: req.body.completed
        };
        todos.push(todo);
        todoNextId++;
        res.json(todo);
    }
});

app.listen(PORT, function () {
    console.log('Express listenting on port ' + PORT + '!');
})