import React, { Suspense, lazy } from 'react'
import { Router } from '@reach/router'

import NavBar from './components/NavBar'

const Home = lazy( () => import( './pages/Home' ) )
const Movies = lazy( () => import( './pages/Movies' ) )
const NotFound = lazy( () => import( './pages/404' ) )
const Register = lazy( () => import( './pages/Register' ) )
const SearchMovies = lazy( () => import( './pages/SearchedMovies' ) )
const Login = lazy( () => import( './pages/Login' ) )
const Profile = lazy( () => import( './pages/Users' ) )
const EditProfile = lazy( () => import( './pages/EditProfile' ) )
const AddUser = lazy( () => import( './pages/AddUser' ) )
const AddMovie = lazy( () => import( './pages/AddMovie' ) )

/**
 * Setup Top-Level Routes for @reach/router
 */

const NavigationRoutes = () => (
  <>
    <NavBar />
    <Router>
      <NotFound default />
      <Home path="/" />
      <Movies path="movies/*" />
      <Register path="register" />
      <Login path="login" />
      <Profile path="profile/*" />
      <EditProfile path="editProfile" />
      <SearchMovies path="searchMovies" />
      <AddMovie path="addMovie" />
      <AddUser path="addUser" />
    </Router>
  </>
)

/**
 * Since we are lazy loading for router we use Suspense as fallback
 */
const App = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <NavigationRoutes />
  </Suspense>
)

export default App
