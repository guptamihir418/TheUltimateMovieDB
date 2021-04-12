"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "Regular",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    followers: [
        {
            follower: {
                type: mongoose_1.default.Types.ObjectId,
                ref: 'users'
            },
        },
    ],
    following: [
        {
            following: {
                type: mongoose_1.default.Types.ObjectId,
                ref: 'users'
            },
        },
    ],
});
const User = mongoose_1.default.model("users", schema);
module.exports = { User };
