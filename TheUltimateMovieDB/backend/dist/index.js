"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./routes");
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.get('/', (_req, res) => {
    res.json({
        name: 'The Ultimate MovieDB',
    });
});
app.use('/users', routes_1.Users);
app.use('/movies', routes_1.Movies);
app.use('/people', routes_1.People);
app.listen(4000, () => {
    console.log('Server ready at http://localhost:4000/');
});
