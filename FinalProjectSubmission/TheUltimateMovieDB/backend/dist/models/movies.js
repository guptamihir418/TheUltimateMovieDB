"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    genre: {
        type: String,
        required: true,
    },
    year: {
        type: String,
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    actors: {
        type: String,
        required: true,
    },
    poster: {
        type: String,
    },
    imdbRating: {
        type: String,
        default: "7"
    },
    released: {
        type: String,
    },
    reviews: [
        {
            review: {
                user: {
                    type: mongoose_1.default.Types.ObjectId,
                    ref: 'users'
                },
                text: {
                    type: String
                },
                dateTime: {
                    type: String,
                    default: new Date().toDateString()
                }
            }
        }
    ]
});
const Movie = mongoose_1.default.model("movies", schema);
module.exports = { Movie };
