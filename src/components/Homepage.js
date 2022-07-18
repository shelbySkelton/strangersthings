import React from "react";
import Profile from "./Profile";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


const Homepage = ({ isLoggedIn, currentUser, token }) => {




    return (
        <div className="homepage-container">
            <h1>Welcome to Strangers Things!</h1>
            <br></br>
            {
                isLoggedIn ? 
                
                    <div id='homepage-logged-in display'>
                        <h3>We're logged in as {currentUser.username}</h3>
                    </div>
                
                : "Log In Please"
            }
            
                 
            

        </div>
    )
}

export default Homepage;