import React, { FC, useEffect } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'

import Layout from '../components/Layout'
import { PageProps } from '../lib/types'
import useQuery from '../hooks/use-query'
import './form.css'

const registerFormOptions = [
  { id: 'title', type: 'text', placeholder: 'Title' },
  { id: 'genre', type: 'text', placeholder: 'Genre' },
  { id: 'released', type: 'text', placeholder: 'Release year' },
  { id: 'director', type: 'text', placeholder: 'Director' },
  { id: 'actors', type: 'text', placeholder: 'Actors' },
  { id: 'poster', type: 'text', placeholder: 'Poster link' },
]

const Register: FC<PageProps> = () => {
  useEffect( () => {
    const userId = localStorage.getItem( 'userId' )
    if ( !userId ) {
      window.location.href = '/login'
    }
  }, [] )

  const formik = useFormik( {
    initialValues: {
      title: '',
      genre: '',
      released: '',
      director: '',
      actors: '',
      poster: '',
    },
    validationSchema: Yup.object().shape( {
      title: Yup.string()
        .min( 3, 'title must have at least 3 characters' )
        .max( 20, "title can't be longer than 20 characters" )
        .required( 'title is required' ),
      genre: Yup.string()
        .min( 5, 'Genre must have at least 5 characters' )
        .max( 30, "Genre can't be longer than 30 characters" )
        .required( 'genre is required' ),
      released: Yup.string()
        .min( 4, 'Year must have four numbers' )
        .max( 4, 'Year must have four numbers' )
        .required( 'Release year is required' ),
      director: Yup.string()
        .min( 5, 'Director must be 5 characters long' )
        .max( 30, "Director can't be longer than 30 characters" )
        .required( 'Director is required' ),
      actors: Yup.string()
        .min( 5, 'Actor must have at least 5 characters' )
        .max( 30, "Actor can't be longer than 30 characters" )
        .required( 'Actor is required' ),
      poster: Yup.string()
        .min( 8, 'Poster link have at least 8 characters' )
        .max( 500, "Poster link can't be longer than 100 characters" )
        .required( 'Poster link is required' ),
    } ),
    onSubmit: async values => {
      let type=localStorage.getItem('userType')
      if(type==='regular'){
         alert('You cannot add a movie! Change yourself to Contributing user to add a movie')
      }
      else{
 const response = await fetch( '/api/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          title: values.title,
          released: values.released,
          genre: values.genre,
          actors: values.actors,
          director: values.director,
          poster: values.poster,

        } ),
      } )

      // If all good take to all users page
      if ( response.status === 200 ) {
        // window.location.replace( '/login' )
        alert( 'You have added a new movie!' )
      } else {
        alert( 'Something went wrong while adding the movie!' )
      }
      }
     
    },
  } )

  return (
    <Layout>

      <div className="md:flex md:items-center md:-mt-16 md:h-screen pt-6">

        <form
          style={{ boxShadow: '2px 2px 15px 5px rgba(0,0,0,0.4)' }}
          className={clsx(
            'font-medium text-xl',
            'sm:w-3/4 mt-5 p-3 mx-auto',
            'border-2 box-border',
            'rounded-lg',
            'myForm'
          )}
          onSubmit={formik.handleSubmit}
        >

          <h1 className="text-3xl font-bold text-center">Add a New Movie</h1>

          {registerFormOptions.map( ( { id, type, placeholder } ) => (
            <label htmlFor={id} key={id} className="myLabel">

              <span>{placeholder}</span>

              <div className="flex">

                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  {...formik.getFieldProps( id )}
                  className={clsx(
                    'form-input my-2 block w-full rounded-lg text-black',
                    //  @ts-expect-error return type issue because of `id`. I trust myself.
                    { 'border-yellow-400 border-4': formik.errors[ id ] },
                  )}
                />

                {/* @ts-expect-error return type issue because of `id`. I trust myself. */}
                {formik.touched[ id ] && formik.errors[ id ] ? (
                  <div className="w-6 text-indigo-800 my-auto" style={{ marginLeft: '-35px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                ) : null}

              </div>

            </label>
          ) )}

          <div className="flex justify-center">
            <button
              type="submit"
              className={clsx(
                'mt-2 w-full py-1 font-semibold',
                'rounded-lg border-2 border-white',
                'hover:bg-yellow-400 hover:border-yellow-400 hover:text-indigo-800',
              )}
            >
              Add
            </button>
          </div>
        </form>

      </div>

    </Layout>
  )
}

export default Register
