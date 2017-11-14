const express = require('express');
const app = express();
const bodyparser = require('body-parser');


const users = [{
        "id": 1,
        "name": "Jordan",
        "age": 54
    },
    {
        "id": 2,
        "name": "Walter",
        "age": 64
    },
    {
        "id": 3,
        "name": "Susie",
        "age": 45
    },
    {
        "id": 4,
        "name": "Marge",
        "age": 18
    }
];
const userNS = require('./user');
//Node does not like import: SyntaxError: Unexpected token import
//import userNS from './user';
const user = new userNS.user(users);


app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({ extended:true}));
app.use((request, response, next) => {
    console.log(request.headers);
    next();
});

app.use((request, response, next) => {
    request.chance = Math.random();
    next();
});


app.get('/', (request, response) => {
    throw new Error('Oops');
    response.json({
        chance: request.chance
    });
});

app.get('/users', (request, response) => {
    let users = user.users;

    if (users.length > 0) {
        response.json(users);
    } else {
        response.json({ "error": "User list is empty." });
    }

});

app.get('/user/:id', (request, response) => {
    let id = Number(request.params.id);
    let item = {};
    console.log(`user param ${id}`);

    item = user.getUser(id);

    if (typeof(item.id) === 'undefined') {
        console.log('user not found');
        throw new Error('user not found');
    } else {
        response.json(item);
    }

});

app.post('/user', (request, response, next) => {
    if (typeof(request.body) !== 'undefined') {
        let user = request.body;
        let id = users.length > 0 ? users[users.length - 1].id + 1 : 1;
        console.log(`posted user:`);
        console.log(user);
        users.push({
            id: id,
            name: user.name,
            age: user.age
        });
    } else {
        console.log('request.body was undefined');
        console.log(request.body);

        throw new Error('user data not received.');
    }

    response.json(users[users.length - 1]);
});
//the error middleware must be last
app.use((err, request, response, next) => {
    //log the error for now just console.log it
    console.log(err);
    response.status(500).send(err);
});
//CF requires using the PORT environment variable
app.listen(process.env.PORT || 3000);