import React, { FC, useEffect, useState } from 'react'

import { PageProps } from '../lib/types'
import SearchBar from '../components/Search'
import LinkButton from '../components/LinkButton'

const HomePage:FC<PageProps> = () => {
  const [ category, setCategory ] = useState( 'title' )
  const [ search, setSearch ] = useState( 'null' )
  console.log( search )
  console.log( category )

  useEffect( () => {
    const userId = localStorage.getItem( 'userId' )
    if ( !userId ) {
      window.location.href = '/login'
    }
  }, [] )
  return (
    <main>
      <div className="flex h-screen items-center justify-center">

        <div className="-mt-64 flex flex-col items-center justify-center w-full md:w-3/4 lg:w-2/4">
          <img src="/logo-dark.png" alt="Logo" className="h-64 pb-8" />
          <SearchBar onSearchChange={( value: any ) => { const query = value; setSearch( query ) }} />

          {/* <label htmlFor="exampleFormControlSelect2">Example multiple select</label> */}
          <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Select category for search</label>
            <select
              onChange={e => {
                const categoryValue = e.target.value
                setCategory( categoryValue )
              }}
              className="form-control"
              id="exampleFormControlSelect1"
            >
              <option selected disabled> CATEGORY  </option>
              <option>TITLE</option>
              <option>GENRE</option>
              <option>YEAR</option>
              <option>MIN-RATING</option>
              <option>DIRECTOR</option>
              <option>ACTORS</option>
            </select>
          </div>

          <div className="pt-4">
            <LinkButton to={`searchMovies?${category}=${search}`} label="Search Movie" customStyles="md:mr-16 mr-2" />
            {/* <Button /> */}
            {/* <button type="button" className="btn btn-primary">Primary</button> */}
            <LinkButton to="movies" label="Random Movie" />
          </div>

        </div>

      </div>
    </main>
  )
}

export default HomePage
