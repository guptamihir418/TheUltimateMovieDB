import React, { FC } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link } from '@reach/router'
import axios from 'axios'

import Layout from '../components/Layout'
import { PageProps } from '../lib/types'
import useQuery from '../hooks/use-query'
import './form.css'
const registerFormOptions = [
  { id: 'email', type: 'email', placeholder: 'Email Address' },
  { id: 'password', type: 'password', placeholder: 'Password' },
]

const Register: FC<PageProps> = () => {
  const formik = useFormik( {
    initialValues: {
      email: useQuery( 'email' ) || '',
      password: '',
    },
    validationSchema: Yup.object().shape( {
      email: Yup.string()
        .email( 'Must be a valid email address' )
        .max( 100, 'Email must be less than 100 characters' )
        .required( 'Email is required' ),
      password: Yup.string()
        .min( 8, 'Password must be 8 characters long' )
        .max( 100, "Password can't be longer than 100 characters" )
        .matches( /^[a-zA-Z0-9]+$/, 'Password must be alpha numeric and contain Latin letters.' )
        .required( 'Password is required' ),
    } ),
    onSubmit: async values => {
      const response = await axios.post( '/api/users/login', {
        email: `${values.email}`,
        password: `${values.password}`,
      } )

      // console.log( response )

      // If all good take to all users page
      if ( response.status === 200 ) {
        window.location.replace( '/profile' )
        localStorage.setItem( 'loginStatus', 'true' )
        localStorage.setItem( 'userId', response.data.userId )
        localStorage.setItem('userType',"regular");
      } else {
        alert( 'Something went wrong!!!' )
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

          <h1 className="text-2xl font-bold text-center">Sign In</h1>

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
              Login
            </button>
          </div>

          <div className="text-xl pt-2">
            <Link to="/register" className="hover:text-yellow-400">
              Don&apos;t have an account? Create one today!
            </Link>
          </div>

        </form>

      </div>

    </Layout>
  )
}

export default Register
