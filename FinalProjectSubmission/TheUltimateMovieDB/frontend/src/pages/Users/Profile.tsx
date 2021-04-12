/* eslint-disable no-console */
import React, { FC, useEffect,useRef ,useState} from 'react'
import { Link, useParams } from '@reach/router'
import useSWR from 'swr'
import './profile.css'
import axios from 'axios';

import { PageProps } from '../../lib/types'
import Layout from '../../components/Layout'

const DummyContribData:FC<any> = (props) => (
  <>

    <div className="flex flex-col w-full mt-8 md:w-1/2 px-4">
      <h3 className="text-xl text-center font-medium">Top 5 recent Likes</h3>
      <div className="text-lg border-gray-400 border-2 rounded-lg flex flex-col">
        {/* <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/1">Toy Story</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/10">GoldenEye</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/7">Sabrina</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/asdf">Anatomy Park</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/515">Pilot</Link> */}
      </div>  
{props.contributions?<div>add template for contributions</div>:        <div className="noDataHeading">
      No contributions yet 
          </div>    }           
      </div>

    <div className="flex flex-col w-full mt-8 md:w-1/2 px-4">
      <h3 className="text-xl text-center font-medium">Top 5 recent Contributions</h3>
      <div className="text-lg border-gray-400 border-2 rounded-lg flex flex-col">
        {/* <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/Anchor Gear">Anchor Gear</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/Mortynight Run">Mortynight Run</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/Close Rick-counters of the Rick Kind">Close Rick-counters of the Rick Kind</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/Heat">Heat</Link>
        <Link className="ml-2 py-2 hover:text-yellow-400" to="/movies/2">Jumanji</Link> */}
      </div>
       {props.likes?<div>add template for Likes</div>:        <div className="noDataHeading">
      No likes  yet 
          </div>    }  
    </div>
  </>

)

type UserProfileDataProps = {
  name: string;
  userRole: string;
  followStatus:boolean;
  id:string;
}

const UserDataFetch = ( { name, userRole,followStatus,id }: UserProfileDataProps ) => {
  const userId=useRef('');
  const [follow, setFollow] = useState(false)
  useEffect( () => {
    const user = localStorage.getItem( 'userId' )
    if ( !user ) {
      window.location.href = '/login'
    }
    else{
      setFollow(followStatus);
      userId.current=user;
    }
  }, [] )

  const handleFollow=()=>{
    console.log('====================================');
    // console.log(event.target.value);
    console.log('====================================');
    axios.post('/api/users/follow',{userId:userId.current,user:id}).then(()=>{
      setFollow(true);
    }).catch(e=>{
      console.log(e);
      alert('Error while');
    });
  }

   const handleUnFollow=()=>{
    console.log('====================================');
    // console.log(event.target.value);
    console.log('====================================');
    axios.post('/api/users/unfollow',{userId:userId.current,user:id}).then(()=>{
      setFollow(false);
    }).catch(e=>{
      console.log(e);
      alert('Error while');
    });
  }


  return (

    <div className="flex justify-around mt-8">
      <img className="rounded-full h-56" src="https://via.placeholder.com/300" alt="Dummy Profile Pic" />
{console.log(followStatus)
}
      <div className=" my-auto">
        <h1 className="text-4xl font-medium">{name}</h1>
        <h3 className="text-lg">Role: {userRole}</h3>
        {follow?<button type="button" onClick={handleUnFollow} className="btn btn-warning followBtn">Unfollow</button>
        : 
        <button type="button" onClick={handleFollow} className="btn btn-info followBtn">Follow</button>}
       
        
      </div>
    </div>
  )
}
const UserProfile: FC<PageProps> = () => {
  const { userId } = useParams()
  const id = localStorage.getItem( 'userId' )
  console.log( 'in profile.tsx', id )
  if ( !id ) {
    window.location.href = '/login'
  }
  const { data, error } = useSWR( `/api/users/${userId}` )
  
  const checkFollowStatus=(followers:any [])=>{
    console.log('in check follow status',followers);
    
    let ret=false;
    followers.map(follower=>{
       if(follower.follower._id===id){
              ret=true;
       }
    });
    return ret;
  }

  return (
    <Layout>
{console.log(data)}
      {!error && !data && <div>Loading...</div>}
      {error && <h1 className="text-center text-3xl pt-16">We have a problem! User not found</h1>}
      {data && (
      <>
        <UserDataFetch id={data._id} name={data.name} userRole={data.role} followStatus={checkFollowStatus(data.followers)}/>
        <div className="flex flex-col md:flex-row justify-around">
          
        {['1'].map(el=>{
          if(data.contributions && data.likes){
            return <DummyContribData contributions={data.contributions} likes={data.likes}/>
          }
                      return <DummyContribData contributions={null} likes={null}/>
        })}
        </div>
      </>
      )}
    </Layout>
  )
}
export default UserProfile
