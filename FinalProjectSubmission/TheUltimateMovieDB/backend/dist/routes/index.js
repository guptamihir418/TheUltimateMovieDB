"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.People = exports.Movies = exports.Users = void 0;
var users_1 = require("./users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return __importDefault(users_1).default; } });
var movies_1 = require("./movies");
Object.defineProperty(exports, "Movies", { enumerable: true, get: function () { return __importDefault(movies_1).default; } });
var people_1 = require("./people");
Object.defineProperty(exports, "People", { enumerable: true, get: function () { return __importDefault(people_1).default; } });
