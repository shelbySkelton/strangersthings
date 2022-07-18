import React, { useState } from "react";
import { postPost } from "../api";


const AddPost = ({ isLoggedIn, currentUser, token }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('[On Request]')
    const [willDeliver, setWillDeliver]= useState(false)


    const submitPost = async (evt) => {
        evt.preventDefault();
        const result = await postPost(token, title, description, price, location, willDeliver)
        console.log(result)
        // let postObj = {
        //     title,
        //     description,
        //     price,
        //     location,
        //     willDeliver
        // }
        // console.log(postObj);
    }


    return(
        <section className='add-post-container'>
                <form
                    id='add-post-form'
                    onSubmit={submitPost}
                >
                <h1>Add a Post {currentUser.username}?</h1>
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
                    placeholder="In USD"
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
                    type="submit"
                    disabled= {isLoggedIn ? false : true}
                    value="Add Post"
                >
                </input>
                </form>
            
        </section>
    )
}




export default AddPost;