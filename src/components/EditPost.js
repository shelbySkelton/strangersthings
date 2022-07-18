import React, { useState, useEffect }from "react";
import { useParams} from 'react-router-dom';
import { fetchAllPosts, patchEdit } from "../api";



const EditPost = ({ isLoggedIn, username, token }) => {
    const { postId } = useParams();

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('[On Request]')
    const [willDeliver, setWillDeliver]= useState(false)
    const [postList, setPostList] = useState([])

    useEffect(() =>  {
        let returnedPosts= []
        
        const getPosts = async () => {
            returnedPosts = await fetchAllPosts(token);
            setPostList(returnedPosts);
        }
        getPosts()

        postList.map((eachPost) => {
                        
            let eachpostid = ":" + eachPost._id
            if (eachpostid === postId) {
                setTitle(eachPost.title);
                setDescription(eachPost.description)
                setPrice(eachPost.price)
                setLocation(eachPost.location)
                setWillDeliver(eachPost.willDeliver)
            }
        })
    
    },[postList])

    const submitEdits = async (evt) => {
        evt.preventDefault();
            console.log(token, title, description, price, location, willDeliver)
        // const result = await patchEdit(postId, token, title, description, price, location, willDeliver)
    }
    

    return (
        
        <section id='edit-post-container'>

            


            <h1>Edit Post {postId} </h1>

                <form
                    id='edit-post-form'
                    onSubmit={submitEdits}
                >
                    <label className='form-label'>Title: {title}</label>
                    <input
                        type='text'
                        placeholder={title}
                        onChange={(evt) => setTitle(evt.target.value)}
                    >
                    </input>
                    <label className='form-label'>Description: {description}</label>
                    <input
                        type='text'
                        placeholder={description}
                        onChange={(evt) => setDescription(evt.target.value)}
                    >
                    </input>
                    <label className='form-label'>Price: {price}</label>
                    <input
                        type='text'
                        placeholder={price ? price : 'not provided'}
                        onChange={(evt) => setPrice(evt.target.value)}
                    >
                    </input>
                    <label className='form-label'>Location: {location}</label>
                    <input
                        type='text'
                        placeholder={location ? location : 'not provided'}
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
                        type="submit"
                        disabled= {isLoggedIn ? false : true}
                        value="Edit Post"
                    >
                    </input>
                </form>
            
        </section>
    )
}



export default EditPost;