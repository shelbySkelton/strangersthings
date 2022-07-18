import React, { useEffect, useState } from 'react';
import { Link , useParams, Route } from 'react-router-dom';
import { getMe, deletePost } from '../api'
import EditPost from './EditPost';


const Profile = ( { token, setToken, isLoggedIn, currentUser, username } ) => {

    const [myPosts, setMyPosts] = useState([]);
    const [myMessages, setMyMessages] = useState([])



 
    
    useEffect(() => {
        
        const getMyProfile = async () => {

            const userObject = await getMe(JSON.parse(localStorage.token));
            setMyPosts(userObject.data.posts)
            setMyMessages(userObject.data.messages)

        }

      getMyProfile();
      console.log("isLoggedin:", isLoggedIn)

    
    }, [isLoggedIn, setMyPosts])







    return (
        <div className="profile-container">
            {
                !isLoggedIn
                    ? 
                    <h1>Please Log In to View Your Profile</h1>
                    :
                        
                    <div className="profile-container">
                        <h1 id='welcome'>Welcome {username}!</h1>
                        <section id='my-messages-container'>
                        <h1 className="profile-title">My Messages</h1>
                            {
                            myMessages.length === 0
                            ?
                                <h3>You Don't Have Any Messages</h3>
                            :
                                myMessages.map((message, idx) => {
                                
                                    
                                    return (
                                        <section className='each-post-section' key={idx}>
                                            <span className="message-label">Item: </span>
                                            <span className="message-title">{message.post.title}</span><br></br>
                                            <span className="message-label">From User: </span>
                                            <span className="message-author">{message.fromUser.username}</span><br></br>
                                            <span className="message-label">Message: </span>
                                            <span className="message-title">{message.content}</span><br></br>
                                        </section>
                                    )
                                })
                            }
                        </section>
                        <section className='my-posts-container'>
                        <h1 className='profile-title'>My Posts</h1>
                            {
                            myPosts.length === 0
                            ?
                                <h3>You Don't Have Any Posts</h3>
                            :
                                myPosts.map((mypost, idx) => {
                                    
                    
                                    return (
                                        <section className='each-post-section' key={idx}>
                                           
                                            <span className="post-label">Item: </span>
                                            <span className="post-title">{mypost.title}</span><br></br>
                                            <span className="post-label">Location: </span>
                                            <span className="post-location">{mypost.location}</span><br></br>
                                            <span className="post-label">Status: </span>
                                            <span className="post-status">{mypost.active ? "Active" : <em>"No Longer Active"</em>}</span><br></br>
                                            <span className="post-label">Description: </span>
                                            <span className="post-description">{mypost.description}</span><br></br>
                                            <span className="post-label">Price: </span>
                                            <span className="post-price">{mypost.price}</span><br></br>
                                            <span className="post-label">Delivery Available: </span>
                                            <span className="post-delivery">{mypost.willDeliver ? "Yes" : "No"}</span><br></br>
                                            <span className="post-label">Messages :</span><br></br>
                                            {/* <span className="post-posted">{mypost.messages ? "PUTALINKHERE" : "No messages"}</span><br></br> */}
                                            <span className="post-id">id: {mypost._id}</span><br></br>
                                            <span className='delete-post'>
                                                <button
                                                    disabled= {mypost.active ? false : true }
                                                    onClick={(evt) => deletePost(token, mypost._id)}
                                                
                                                    >Delete Post
                                                </button>
                                            </span>
                                            <span className='edit-post'>
                                            <div id='edit-post-link'
                                                    hidden={!mypost.active}>
                                                        <Link to={`/edit-post/:${mypost._id}`} >Edit Post</Link>
                                            </div>
                                                
                                                {/* <Route path='/edit-post/:postId' element={<EditPost/>}/> */}
                                            </span>
                                        </section>
                                        )
                                })
                                
                            }
                        </section>
                    </div>
            }  
        </div>
    )
}

export default Profile;