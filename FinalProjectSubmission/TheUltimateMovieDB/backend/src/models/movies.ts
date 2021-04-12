import mongoose from 'mongoose'

const schema = new mongoose.Schema({
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
  imdbRating:{
    type: String,
    default:"7"
  },
  released:{
    type: String,
  },
  reviews:[
    {
      review:{
      user:{
        type:mongoose.Types.ObjectId,
        ref:'users'
      },
      text:{
        type:String
      },
      dateTime:{
       type: String,
       default:new Date().toDateString()
      }
    }
  }
  ]
});

const Movie = mongoose.model("movies", schema);

module.exports = { Movie };

