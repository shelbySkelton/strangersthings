import React from "react";



const AddMessage = ({ username, token, isLoggedIn}) => {

    return (
        <section id="add-message-container">
            <h1>Message Form Here, {username}</h1>
            <form id= 'message-form'>
                <input
                    type='text'
                    value=""
                    placeholder="message content"
                    >
                </input>
            </form>
        </section>
    )

}

export default AddMessage;