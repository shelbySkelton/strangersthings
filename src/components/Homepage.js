import React from "react";
import { cohortName } from "../api";


const Homepage = ({ isLoggedIn, currentUser, token }) => {




    return (
        <div className="homepage-container">
            <h1>Welcome to Strangers Things!</h1>
            <br></br>
            {
                isLoggedIn ? 
                
                    <div id='homepage-logged-in display'>
                        <h2>Cohort: {cohortName}</h2>
                        <h3>You're logged in as {currentUser.username}</h3>
                        <h3>Write, edit or delete posts to share with your classmates.</h3>
                        <h3>Review posts your classmates have made and write a message if you're interested!</h3>

                    </div>
                
                : "Log In To Get Started!"
            }
            
                 
            

        </div>
    )
}

export default Homepage;