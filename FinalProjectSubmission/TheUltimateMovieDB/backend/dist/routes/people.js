"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('/', (_, res) => {
    res.json('return a list of people');
});
router.get('/:person', ({ params: { person } }, res) => {
    console.log(person);
    res.json(person);
});
exports.default = router;
