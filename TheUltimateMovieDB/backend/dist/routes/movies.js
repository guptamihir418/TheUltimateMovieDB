"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const lodash_1 = require("lodash");
const movie_data_1 = __importDefault(require("../movie-data"));
const router = express_1.Router();
const returnItems = ['id', 'title', 'genre', 'director', 'actors', 'writer', 'poster', 'rated', 'released'];
router.get('/search', (req, res) => {
    try {
        let results;
        const returnValue = (value) => value.toString();
        const category = Object.keys(req.query)[0];
        const value = Object.values(req.query)[0];
        if (category === 'TITLE') {
            results = movie_data_1.default.filter((movie) => movie.title.includes(returnValue(value)));
        }
        else if (category === 'GENRE') {
            results = movie_data_1.default.filter((movie) => movie.genre.includes(returnValue(value)));
        }
        else if (category === 'YEAR') {
            results = movie_data_1.default.filter((movie) => movie.year.includes(returnValue(value)));
        }
        else if (category === 'MIN-RATING') {
            results = movie_data_1.default.filter((movie) => parseFloat(movie.imdbRating) >= parseFloat(returnValue(value)));
        }
        else if (category === 'DIRECTOR') {
            results = movie_data_1.default.filter((movie) => movie.director.includes(returnValue(value)));
        }
        else if (category === 'ACTORS') {
            results = movie_data_1.default.filter((movie) => movie.actors.includes(returnValue(value)));
        }
        res.status(200).send(results);
    }
    catch (error) {
        res.status(400).send({ message: 'Error finding movies' });
    }
});
router.get('/', (_, res) => {
    const temp = [];
    movie_data_1.default.forEach((a) => temp.push(lodash_1.pick(a, returnItems)));
    res.json(temp);
});
router.get('/:movie', ({ params: { movie } }, res) => {
    const currentMov = movie_data_1.default.find(({ id }) => id === movie);
    if (currentMov === undefined) {
        res.status(404);
    }
    res.json(lodash_1.pick(currentMov, returnItems));
});
router.post('/', ({ body }, res) => {
    const input = Object.assign({ id: uuid_1.v4() }, body);
    movie_data_1.default.push(input);
    res.status(200).json({ message: 'Successfully added the movie' });
});
exports.default = router;
