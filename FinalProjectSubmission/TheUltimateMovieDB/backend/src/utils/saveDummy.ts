const { User } = require("../models/users");
const { Movie } = require("../models/movies");
import dataset from '../movie-data'


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

module.exports.insertDummyUsers = async () => {
  try {
    await User.insertMany(users);
    console.log(" dummy Users inserted successfully!");
  } catch (error) {
    // console.log("====================================");
    // console.log("Error inserting dummy users!", error);
    // console.log("====================================");
  }
};

module.exports.insertMovies = async () => {
  try {
    // console.log(dataset[0]);
    await Movie.insertMany(dataset);
    console.log(" Movies inserted successfully!");
  } catch (error) {
    // console.log("====================================");
    // console.log("Error inserting movies!", error);
    // console.log("====================================");
  }
};