"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const router = express_1.Router();
let users = [
    {
        id: '1',
        name: 'Rick Sanchez',
        role: 'Contributor',
        email: "",
        password: ""
    },
    {
        id: '2',
        name: 'Bob',
        role: 'Contributor',
        email: "",
        password: ""
    },
    {
        id: '3',
        name: 'Tom Cruise',
        role: 'Contributor',
        email: "",
        password: ""
    },
    {
        id: '4',
        name: 'Jimmy Fallen',
        role: 'Contributor',
        email: "",
        password: ""
    },
];
router.get('/', (_, res) => {
    console.log(users);
    res.json(users);
});
router.get('/:user', (req, res) => {
    console.log(req.params.user);
    const currentUser = users.find((user) => user.id === req.params.user);
    console.log('currentUser:', currentUser);
    if (currentUser === undefined) {
        res.status(404);
    }
    res.json(currentUser);
});
router.post('/', ({ body }, res) => {
    users.push(Object.assign({ id: uuid_1.v4() }, body));
    res.status(200).json({ message: 'Successfully added the user' });
});
router.put('/update', ({ body }, res) => {
    try {
        console.log(body);
        users = users.map(user => {
            if (user.id === body.userId) {
                return Object.assign(Object.assign({}, user), { email: body.email, role: body.role });
            }
            return user;
        });
        res.status(200).send({ message: 'user successfully updated!' });
    }
    catch (error) {
        res.status(400).send({ message: 'user cannot be updated!' });
    }
});
router.post('/login', ({ body }, res) => {
    let loginUser = users.find((user) => {
        return user.email === body.email && user.password === body.password;
    });
    console.log('loginUser:', loginUser);
    if (!loginUser) {
        console.log('user was not found', body);
        res.status(400).json({ message: 'login information is incorrect!' });
        return;
    }
    console.log('user was found', body);
    res.status(200).json({ message: 'Successfully logged in the user', userId: loginUser.id });
});
exports.default = router;
