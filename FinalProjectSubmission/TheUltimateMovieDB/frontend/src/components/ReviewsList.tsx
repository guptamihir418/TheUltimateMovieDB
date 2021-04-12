import React,{useState,useEffect} from 'react'
import { Comment } from 'semantic-ui-react'

export default function ReviewsList(props:any) {
   const [reviews, setReviews] = useState(props.reviews)
   useEffect(() => {
    //    effect
    console.log(props);
    
       return () => {
        //    cleanup
       }
   }, [])
   
   return (
        <React.Fragment>
            <Comment.Group >    
    {reviews?reviews.map((review: { review: { user: { name: React.ReactNode; }; text: React.ReactNode; dateTime: React.ReactNode; }; })=><Comment className='reviewContainer'>
      <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
      <Comment.Content className='reviewContent'>
        <Comment.Author className="reviewAuthor" as='a'>{review.review.user.name}</Comment.Author>        
   <Comment.Text>{review.review.text}</Comment.Text>
        <Comment.Metadata>
          <div className='reviewTime'>{review.review.dateTime}</div>
        </Comment.Metadata>
      </Comment.Content>
    </Comment>)  :<h2>No reviews yet</h2>
    }
  
  </Comment.Group>
        </React.Fragment>
    )
}
