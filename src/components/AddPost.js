import React, { useState } from "react";
import { postPost } from "../api";
import {  Link } from 'react-router-dom'


const AddPost = ({ isLoggedIn, currentUser, token }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('[On Request]')
    const [willDeliver, setWillDeliver]= useState(false)
    const [postAdded, setPostAdded ] = useState(false)
    const [newPost, setNewPost] = useState({})


    const submitPost = async (evt) => {
        evt.preventDefault();
        const result = await postPost(token, title, description, price, location, willDeliver)
        console.log('result ', result)
        setPostAdded(true)
        setNewPost(result)
    }


    return(
        <section className='add-post-container'>
            {
                postAdded ? 
                    <section className="each-post-section">
                        <h1>My Post</h1>
                        <p>*ADDED*</p>
                        <span className="post-label">Item: </span>
                        <span className="post-title">{ newPost.title}</span><br></br>
                        <span className="post-label">Location: </span>
                        <span className="post-location">{ newPost.location}</span><br></br>
                        <span className="post-label">Description: </span>
                        <span className="post-description">{ newPost.description}</span><br></br>
                        <span className="post-label">Price: </span>
                        <span className="post-price">{ newPost.price}</span><br></br>
                        <span className="post-label">Delivery Available: </span>
                        <span className="post-delivery">{ newPost.willDeliver ? "Yes" : "No"}</span><br></br>
                        <br></br>
                        <Link className="nav-link" to="/posts">Back to All Posts</Link>
                     </section>
                    
                    :
                    null
            }
            {
                isLoggedIn ?
                    <section>
                        <form
                            id='add-post-form'
                            onSubmit={submitPost}
                        >
                            <h1>Add a Post</h1>
                            <label className='form-label'>Title</label>
                            <input
                                type='text'
                                required
                                value={title}
                                placeholder="What're you looking to sell?"
                                onChange={(evt) => setTitle(evt.target.value)}
                            >
                            </input>
                            <label className='form-label'>Description</label>
                            <input
                                type='text'
                                required
                                value={description}
                                placeholder="Tell the world about it"
                                onChange={(evt) => setDescription(evt.target.value)}
                            >
                            </input>
                            <label className='form-label'>Price</label>
                            <input
                                type='text'
                                required
                                value={price}
                                onChange={(evt) => setPrice(evt.target.value)}
                            >
                            </input>
                            <label className='form-label'>Location</label>
                            <input
                                type='text'
                                value={location}
                                placeholder="optional*"
                                onChange={(evt) => setLocation(evt.target.value)}
                            >
                            </input>
                            <label className='form-label'>Willing to Deliver?</label>
                            <input
                                type='checkbox'
                                checked={willDeliver}
                                id="willdeliverycheckbox"
                                onChange={(evt) => setWillDeliver(!willDeliver)}
                            >
                            </input>
                            <input
                                id="add-post-button"
                                type="submit"
                                value= "Add Post"
                            >
                            </input>
                        </form>
                    </section>
                :
                <h1>Please <Link to="/log-in/">Log In</Link> to Add a Post</h1>
            }
        </section>
    )
}




export default AddPost;