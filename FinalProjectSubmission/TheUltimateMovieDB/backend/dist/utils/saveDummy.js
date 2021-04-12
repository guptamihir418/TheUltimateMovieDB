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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require("../models/users");
const { Movie } = require("../models/movies");
const movie_data_1 = __importDefault(require("../movie-data"));
let users = [
    {
        name: "Rick Sanchez",
        role: "Contributor",
        email: "rick@gmail.com",
        password: "231231fc",
    },
    {
        name: "Bob",
        role: "Contributor",
        email: "bob@gmail.com",
        password: "12312333",
    },
    {
        name: "Tom Cruise",
        role: "Contributor",
        email: "tom@gmail.com",
        password: "123131231",
    },
    {
        name: "Jimmy Fallen",
        role: "Contributor",
        email: "jimmy@gmail.com",
        password: "1231231331",
    },
];
module.exports.insertDummyUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield User.insertMany(users);
        console.log(" dummy Users inserted successfully!");
    }
    catch (error) {
    }
});
module.exports.insertMovies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Movie.insertMany(movie_data_1.default);
        console.log(" Movies inserted successfully!");
    }
    catch (error) {
    }
});
