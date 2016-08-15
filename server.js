var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
    id: 1,
    description: 'Meet wife in station',
    completed: false
},
    {
        id: 2,
        description: 'Call wife shortly',
        completed: false
    },
    {
        id: 3,
        description: 'Go to swimming pool',
        completed: true
    }];

app.get('/', function (req, res) {
    res.send('TODO API Root');
});

// GET /todos
app.get('/todos', function (req, res) {
    res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function (req, res) {
    var todo = todos.filter(function (obj) {
        return obj.id === parseInt(req.params.id);
    })[0];

    if (!todo) {
        res.status(404).send('Todo with such id not exist!');
    }

    res.json(todo);
});

app.listen(PORT, function () {
    console.log('Express listenting on port ' + PORT + '!');
})