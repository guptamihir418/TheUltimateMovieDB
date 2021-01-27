/* eslint-disable arrow-body-style */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable space-in-parens */
import { Router } from 'express'
import { v4 } from 'uuid'

const router = Router()

let users = [
  {
    id: '1',
    name: 'Rick Sanchez',
    role: 'Contributor',
    email:"",
    password:""
  },
  {
    id: '2',
    name: 'Bob',
    role: 'Contributor',
    email:"",
    password:""
  },
  {
    id: '3',
    name: 'Tom Cruise',
    role: 'Contributor',
    email:"",
    password:""
  },
  {
    id: '4',
    name: 'Jimmy Fallen',
    role: 'Contributor',
    email:"",
    password:""
  },
]

/**
 * Get all users
 * Search params supported:
 *  - name
 */
router.get( '/', ( _, res ) => {
  console.log(users);
  res.json( users )
} )

// Get user by ID
router.get( '/:user', ( req, res ) => {
  console.log(req.params.user);
  
  const currentUser = users.find( ( user ) => user.id === req.params.user )
  console.log('currentUser:',currentUser);
  
  if ( currentUser === undefined ) {
    res.status( 404 )
  }

  res.json( currentUser )
} )

// Add a user
router.post( '/', ( { body }, res ) => {
  users.push( { id: v4(), ...body } )
  res.status( 200 ).json( { message: 'Successfully added the user' } )
} )

//update user type
router.put('/update',({body},res)=>{
try {
  console.log(body);
  
    users=users.map(user=>{
    if(user.id===body.userId){
      return{...user,email:body.email,role:body.role};
    }
    return user;
  });
  res.status(200).send({message:'user successfully updated!'});
} catch (error) {
  res.status(400).send({message:'user cannot be updated!'});
  
}
});

//login by user
router.post( '/login', ( { body }, res ) => {
  // console.log(users);
  
 let loginUser= users.find((user)=>{
    return user.email===body.email && user.password===body.password
  })
  console.log('loginUser:',loginUser);
  
  if(!loginUser){
console.log('user was not found',body);
    res.status( 400 ).json( { message: 'login information is incorrect!' } )  
return;  
}
console.log('user was found',body);

  res.status( 200 ).json( { message: 'Successfully logged in the user' ,userId:loginUser.id } )
} )




export default router
