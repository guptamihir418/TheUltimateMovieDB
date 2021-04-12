import React,{useState,useEffect,useRef} from 'react'
import { Button, Form, Header } from 'semantic-ui-react'
import ReviewList from './ReviewsList';
import './review.css'
import axios from 'axios'

const CommentExampleComment = (props:any):any => {

  const [review, setReview] = useState('')


  const userId = useRef('')

  useEffect(() => {
    const user=localStorage.getItem('userId');
    if(user){
      userId.current=user;
    }
    else {
      window.location.href = '/login'
    }
      
    return () => {
      userId.current='';
    }
  }, [])

const handlePostReview=()=>{
  if(review===''){
    alert('Cannot post empty review!');
    return;
  }
  axios.post( '/api/movies/review', {
    movieId:props.movieId,
    review:{
      user: userId.current,
        text:review
      }
      }).then(({data})=>{
         alert('Review posted successfully!');
         window.location.reload();
         console.log(data);
      }).catch(e=>{
         alert('Error posting review!');
         console.log(e);
      });
}
  
  
  
  return(
    <div>
    <Header as='h2' className='commentsTitle' dividing>
      <h2>Comments</h2>
    </Header>
    <Form className="addReviewForm" reply>
      <Button content='Write a review' labelPosition='left' icon='edit' primary />
      <Form.TextArea className='reviewTextArea'onChange={e=>setReview(e.target.value)}/>
     <button type="button" onClick={handlePostReview} className="btn btn-primary">Post</button>
    </Form>
    <ReviewList reviews={props.reviews}/>
</div>
)}

export default CommentExampleComment