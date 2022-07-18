
import React, { useEffect, useState } from "react";
import {  fetchAllPosts, deletePost } from "../api";
import { Link } from 'react-router-dom'

const Posts = ({ isLoggedIn, token, currentUser, username, postList, setPostList }) => {
  
    const [postUpdate, setPostUpdate] = useState('')
    const [searchTerm, setSearchTerm] = useState('')
 

    
    useEffect(() =>  {
        let returnedPosts= []

        const getPosts = async () => {
            returnedPosts = await fetchAllPosts(token);
            setPostList(returnedPosts);
        }
        getPosts()
    }, [isLoggedIn, postUpdate])


    function postMatches(eachPost, searchTerm) {
            let instances = 0;
            let isItThere = false;
                let postTitleArray = eachPost.title.toLowerCase().split(" ")
                let postAuthArray = eachPost.author.username.toLowerCase().split(" ")
                let postPriceArray = eachPost.price.toLowerCase().split(" ")
                let postDescArray = eachPost.description.toLowerCase().split(" ")
                isItThere = postTitleArray.includes(searchTerm) || postDescArray.includes(searchTerm) || postAuthArray.includes(searchTerm) || postPriceArray.includes(searchTerm)
                if (isItThere) {
                    instances++
                }
            if (instances > 0) {
                isItThere = true;
            }
    return isItThere
    }

    const filteredPosts = postList.filter(eachPost => postMatches(eachPost, searchTerm))
    const postsToDisplay = searchTerm.length ? filteredPosts : postList;



    return (
            <div id="posts-container">
                  <h1 className='post-page-title'>Posts</h1>
                    <Link to='/add-post'>Add Post</Link>
                    <fieldset>
                        <input
                            id='search-words'
                            type='text'
                            value={searchTerm}
                            placeholder="Search Posts"
                            onChange={(evt)=> setSearchTerm(evt.target.value)}
                        ></input>
                    </fieldset>
                    {
                        searchTerm.length 
                        ? 
                            postsToDisplay.map((eachPost,idx) => {
                                return (
                                    <section className="each-post-section" key={idx}>
                                        <span className="post-label">Item: </span>
                                        <span className="post-title">{eachPost.title}</span><br></br>
                                        <span className="post-label">Location: </span>
                                        <span className="post-location">{eachPost.location}</span><br></br>
                                        <span className="post-label">Posted By: </span>
                                        <span className="post-author">{eachPost.author.username}</span><br></br>
                                        <span className="post-label">Status: </span>
                                        <span className="post-status">{eachPost.active ? "Active" : "No Longer Active"}</span><br></br>
                                        <span className="post-label">Description: </span>
                                        <span className="post-description">{eachPost.description}</span><br></br>
                                        <span className="post-label">Price: </span>
                                        <span className="post-price">{eachPost.price}</span><br></br>
                                        <span className="post-label">Delivery Available: </span>
                                        <span className="post-delivery">{eachPost.willDeliver ? "Yes" : "No"}</span><br></br>
                                        {/* <span className="post-label">Messages: </span> */}
                                        {/* <span className="post-delivery">{eachPost.messages ? "Yes" : "No"}</span><br></br> */}
                                        <span className="post-id">id: {eachPost._id}</span><br></br>
                                        <span><button
                                               hidden={ username === eachPost.author.username ? false : true}
                                               onClick={(evt) => deletePost(token, eachPost._id)}
                                               onChange={(evt) => setPostUpdate('updated')}
                                               >Delete my post</button></span>
                                        
                                        
                                    </section>
                                )
                            })
                        :
                            postList.map((eachPost, idx) => {
                                console.log(eachPost)
                                return (
                                    <section className="each-post-section" key={idx}>
                                        <span className="post-label">Item: </span>
                                        <span className="post-title">{eachPost.title}</span><br></br>
                                        <span className="post-label">Location: </span>
                                        <span className="post-location">{eachPost.location}</span><br></br>
                                        <span className="post-label">Posted By: </span>
                                        <span className="post-author">{eachPost.author.username}</span><br></br>
                                        <span className="post-label">Status: </span>
                                        <span className="post-status">{eachPost.active ? "Active" : "No Longer Active"}</span><br></br>
                                        <span className="post-label">Description: </span>
                                        <span className="post-description">{eachPost.description}</span><br></br>
                                        <span className="post-label">Price: </span>
                                        <span className="post-price">{eachPost.price}</span><br></br>
                                        <span className="post-label">Delivery Available: </span>
                                        <span className="post-delivery">{eachPost.willDeliver ? "Yes" : "No"}</span><br></br>
                                        {/* <span className="post-label">Messages: </span> */}
                                        {/* <span className="post-delivery">{eachPost.messages.content}</span><br></br> */}
                                        <span className="post-id">id: {eachPost._id}</span><br></br>
                                        <span><button
                                            hidden={ username === eachPost.author.username ? false : true}
                                            onClick={(evt) => deletePost(token, eachPost._id)}
                                            onChange={(evt) => setPostUpdate('updated')}
                                            >Delete my post</button></span>
                                   
                                        
                                    </section>
                                )
                            })
                    }
        </div>
    )
} 

export default Posts;