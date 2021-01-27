import { Router } from 'express'
import { v4 } from 'uuid'
import { pick } from 'lodash'
// import {searchMovie} from '../utils/searchMovies.js'

import dataset from '../movie-data'

const router = Router()

const returnItems = [ 'id', 'title', 'genre', 'director', 'actors', 'writer', 'poster', 'rated', 'released' ]

/**
 * Get all movies
 * Search params supported
 *   - title
 *   - genre
 *   - year
 *   - year
 *   - minrating
 */

router.get( '/search', ( req, res ) => {
  try {
    let results;
    const returnValue = ( value:any ):string => value.toString()
    const category = Object.keys( req.query )[ 0 ];
    const value = Object.values( req.query )[ 0 ];
if(category==='TITLE'){
    results = dataset.filter( ( movie ) => movie.title.includes( returnValue( value ) ) )
} else if(category==='GENRE'){
    results = dataset.filter( ( movie ) => movie.genre.includes( returnValue( value ) ) )
} else if(category==='YEAR'){
    results = dataset.filter( ( movie ) => movie.year.includes( returnValue( value ) ) )
} else if(category==='MIN-RATING'){
    results = dataset.filter( ( movie ) => parseFloat(movie.imdbRating)>=parseFloat(returnValue(value)) )
} else if(category==='DIRECTOR'){
    results = dataset.filter( ( movie ) => movie.director.includes( returnValue( value ) ) )
}
 else if(category==='ACTORS'){
    results = dataset.filter( ( movie ) => movie.actors.includes( returnValue( value ) ) )
}
    res.status( 200 ).send( results );
  } catch ( error ) {
    res.status( 400 ).send( { message: 'Error finding movies' } );
  }
} );

router.get( '/', ( _, res ) => {
  const temp:any = []

  dataset.forEach( ( a ) => temp.push( pick( a, returnItems ) ) )

  res.json( temp )
} )

/**
 * Get movie by ID
 * Return an object with following:
 *   - title
 *   - genre
 *   - year
 *   - actors
 *   - writer
 *   - director
 *   - poster
 *   - rated
 *   - released
 */
router.get( '/:movie', ( { params: { movie } }, res ) => {
  const currentMov = dataset.find( ( { id } ) => id === movie )

  if ( currentMov === undefined ) {
    res.status( 404 )
  }

  res.json( pick( currentMov, returnItems ) )
} )

// Post a movie
router.post( '/', ( { body }, res ) => {
  const input = { id: v4(), ...body }
  dataset.push( input )
  res.status( 200 ).json( { message: 'Successfully added the movie' } )
} )

export default router
