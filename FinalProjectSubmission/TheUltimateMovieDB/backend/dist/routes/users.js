"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../models/users");
const router = express_1.Router();
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_1.User.find({});
        console.log(users);
        res.json(users);
    }
    catch (error) {
        res.status(400).send({ error: "Error finding users!" });
    }
}));
router.get('/:user', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.params.user);
        const currentUser = yield users_1.User.findById(req.params.user).populate('followers.follower').populate('following.following', ['name', '_id']);
        console.log('currentUser:', currentUser);
        if (currentUser === undefined) {
            res.status(404);
        }
        res.json(currentUser);
    }
    catch (error) {
        res.status(404).send(error);
    }
}));
router.post('/', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield new users_1.User(body).save();
        res.status(200).json({ message: 'Successfully added the user' });
    }
    catch (error) {
        res.status(404).send(error);
    }
}));
router.put('/update', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(body);
        yield users_1.User.findByIdAndUpdate(body.userId, body.updates, { runValidators: true });
        res.status(200).send({ message: 'user successfully updated!' });
    }
    catch (error) {
        res.status(400).send({ message: 'user cannot be updated!' });
    }
}));
router.post('/login', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginUser = yield users_1.User.findOne(body).exec();
        console.log('loginUser:', loginUser);
        if (!loginUser) {
            console.log('user was not found', body);
            res.status(400).json({ message: 'login information is incorrect!' });
            return;
        }
        console.log('user was found', body);
        res.status(200).json({ message: 'Successfully logged in the user', userId: loginUser.id });
    }
    catch (error) {
        res.status(400).json({ message: 'login information is incorrect!' });
    }
}));
router.post('/logout', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(body);
        const user = yield users_1.User.findById(body.userId);
        console.log('user:', user);
        if (!user) {
            res.status(400).json({ message: 'Error logging out!' });
            return;
        }
        res.status(200).json({ message: 'Successfully logged out' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error logging out!' });
    }
}));
router.post('/follow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = yield users_1.User.findByIdAndUpdate(req.body.userId, { $push: { following: { following: req.body.user } } }, { new: true }).exec();
        const user2 = yield users_1.User.findByIdAndUpdate(req.body.user, { $push: { followers: { follower: req.body.userId } } }, { new: true }).exec();
        res.status(200).json({ message: 'Successfully followed user' });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error following!' });
    }
}));
router.post('/unfollow', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const user = yield users_1.User.findByIdAndUpdate(req.body.userId, { $pull: { following: { following: req.body.user } } }, { new: true }).exec();
        const user2 = yield users_1.User.findByIdAndUpdate(req.body.user, { $pull: { followers: { follower: req.body.userId } } }, { new: true }).exec();
        res.status(200).json({ message: 'Successfully unfollowed user' });
    }
    catch (error) {
        res.status(400).json({ message: 'Error unfollowing!' });
    }
}));
exports.default = router;
