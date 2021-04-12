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
const movies_1 = require("../models/movies");
const router = express_1.Router();
const returnItems = ['id', 'title', 'genre', 'director', 'actors', 'poster', 'imdbRating', 'released'];
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let results;
        console.log(req.query);
        const category = Object.keys(req.query)[0];
        const value = Object.values(req.query)[0];
        console.log(category);
        console.log(value);
        if (category === 'MIN-RATING') {
            results = yield movies_1.Movie.find({ imdbRating: value }).exec();
        }
        else {
            results = yield movies_1.Movie.find({ [category.toLowerCase()]: value }).exec();
        }
        res.status(200).send(results);
    }
    catch (error) {
        res.status(400).send({ message: 'Error finding movies' });
    }
}));
router.get('/', (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movies_1.Movie.find();
        res.status(200).send(movies);
    }
    catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        res.status(400).send(error);
    }
}));
router.get('/:movie', ({ params: { movie } }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const withNames = yield movies_1.Movie.findById(movie).populate('reviews.review.user', ['name']).exec();
        console.log(withNames);
        if (withNames === undefined) {
            res.status(404);
        }
        res.json(withNames);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
router.post('/', ({ body }, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movie = yield new movies_1.Movie(Object.assign(Object.assign({}, body), { year: body.released })).save();
        res.status(200).json({ message: 'Successfully added the movie' });
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}));
router.post('/review', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const movie = yield movies_1.Movie.findByIdAndUpdate(req.body.movieId, { $push: { reviews: { review: req.body.review } } }, { new: true }).populate('reviews.review.user', ['name']).exec();
        res.status(200).json({ message: 'Successfully added review', review: movie.reviews[movie.reviews.length - 1] });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error adding review' });
    }
}));
exports.default = router;
