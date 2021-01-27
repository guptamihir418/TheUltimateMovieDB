import React, { FC, useState, useEffect } from 'react'
import axios from 'axios'

import { PageProps } from '../lib/types'

import './editProfile.css'

const EditProfile:FC<PageProps> = () => {
  const [ userData, setUserData ] = useState( { email: '', role: '' } )

  const handleSubmit = () => {
    const userId = localStorage.getItem( 'userId' )
    axios.put( '/api/users/update', { email: userData.email, role: userData.role, userId } ).then( res => {
      localStorage.setItem('userType',userData.role);
      alert( 'User was successfully updated' )
    } ).catch( e => {
      alert( 'User could not be updated' )
      console.log( e )
    } )
  }

  useEffect( () => {
    const userId = localStorage.getItem( 'userId' )
    if ( !userId ) {
      window.location.href = '/login'
    }
    axios.get( `/api/users/${userId}` ).then( res => {
      console.log( res.data )
      setUserData( { email: res.data.email, role: res.data.role } )
    } ).catch( e => {
      console.log( e )
      window.location.href = '/login'
    } )
  }, [] )
  return (
    <div className="container">

      <div className="login-form">
        <div className="main-div">
          <div className="panel">
            <h2>Edit Profile</h2>
            <p>You can change your account information here</p>
          </div>
          <form id="Login">

            <div className="form-group">

              <input
                type="email"
                value={userData.email}
                onChange={e => {
                  const email = e.target.value
                  console.log( e.target.value )
                  setUserData( prev => ( { role: prev.role, email } ) )
                }}
                className="form-control"
                id="inputEmail"
                placeholder="Email Address"
              />

            </div>

            <div className="form-group">
              {/* <label htmlFor="exampleFormControlSelect1">Example select</label> */}
              <select
                placeholder="Select your role"
                onChange={e => {
                  const role = e.target.value
                  console.log( e.target.value )
                  setUserData( prev => ( { role, email: prev.email } ) )
                }}
                className="form-control"
                id="exampleFormControlSelect1"
              >
                {[ 'Contributing' ].map( role => {
                  if ( userData.role === 'Contributing' ) {
                    return (
                      <><option disabled>Choose role</option>
                        <option selected>Contributing</option>
                        <option>Regular</option>
                      </>
                    )
                  }
                  if ( userData.role === 'Regular' ) {
                    return (
                      <><option disabled>Choose role</option>
                        <option>Contributing</option>
                        <option selected>Regular</option>
                      </>
                    )
                  }

                  return (
                    <><option disabled selected>Choose role</option>
                      <option>Contributing</option>
                      <option>Regular</option>
                    </>
                  )
                } )}

              </select>
            </div>
            <button className="btn btn-primary" onClick={e => { e.preventDefault(); handleSubmit() }}>Update</button>

          </form>
        </div>
      </div>
    </div>
  )
}
export default EditProfile
