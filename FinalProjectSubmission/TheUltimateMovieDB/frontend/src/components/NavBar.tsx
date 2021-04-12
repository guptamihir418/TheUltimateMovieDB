/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react'
import { Link } from '@reach/router'
import axios from 'axios'

export default function NavBar() {

const handleLogout=async()=>{
  const userId=localStorage.getItem('userId');
  if(!userId){
    alert('You have not registered or logged in yet!');
    return;
  }
   axios.post( '/api/users/logout', {
        userId: userId,
      } ).then(()=>{
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
         alert('logged out successfully!');
        window.location.href='http://localhost:3000/login'
      }).catch(e=>{
         alert('Error logging out!');
         console.log(e);
      });
}


  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">Ultimate movie</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="/">
                Home
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="register">
                Register
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="login">
                Login
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="profile">
                Users
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="movies">
                Movies
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="editProfile">
                Edit Profile
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="addUser">
                Add User
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="#">
              <Link to="addMovie">
                Add movie
              </Link>
              <span className="sr-only">(current)</span>
            </a>
          </li>
         
        </ul>
        <button onClick={e=>handleLogout()} className="btn btn-outline-warning my-2 my-sm-0">Logout</button>
  
      </div>
    </nav>
  )
}
