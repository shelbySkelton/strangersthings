import React, { useState, useEffect } from "react";
// import RegisterForm from "./RegisterForm"
import { Link } from "react-router-dom";
import { postLogIn } from "../api";

const LogIn = ({ username, setUsername, password, setPassword, currentUser, setCurrentUser, token, setToken, isLoggedIn, setIsLoggedIn }) => {
    
    const [errorMessage, setErrorMessage] = useState('')
    // useEffect(() => {
    //     const userFromLocalStorage = localStorage.getItem('currentUser');
    //     const tokenFromLocalStorage = localStorage.getItem('token')

    //     let usernamefromLocalStorage = userFromLocalStorage
    //     tokenFromLocalStorage ?
    //         setToken(JSON.parse(tokenFromLocalStorage))
    //         :
    //         null

    //     userFromLocalStorage ? 
    //         setCurrentUser(JSON.parse(userFromLocalStorage))
    //         :
    //         null
    // },[])


    const loginUser = async (evt) => {
        evt.preventDefault();
        let loggedInUserObj = {
            username,
            password,
            // token
        }
        const result = await postLogIn(username, password);
        setToken(result.data.token)  
        setCurrentUser(loggedInUserObj);
        // setErrorMessage(result.message)
        // console.log(JSON.stringify(result.message))
        
            // console.log(result.error.message)
            // let resultError = result.data.error;
            // setErrorMessage(JSON.stringify(resultError.message))
            
        
        
        localStorage.setItem('currentUser', JSON.stringify(loggedInUserObj));
        localStorage.setItem('token', JSON.stringify(result.data.token))
        
        setIsLoggedIn(result.success);
        setUsername('');
        setPassword('');   
    }



    // console.log('token:',token)
    // console.log('currentUser: ', currentUser)
    // console.log('username  & pw', username, password)
    

    const logOutUser = (evt) => {
        evt.preventDefault();
        localStorage.removeItem('currentUser')
        localStorage.removeItem('token')
        setUsername('')
        setPassword('')
        setToken('')
        console.log(currentUser)
    }


    return (
        <section className='log-container'>
            <form 
                id='log-in-form'
                onSubmit={loginUser}
                >
                <h3>Log In</h3>
                <input
                     type='text'
                     required
                     value={username}
                     id="username"
                     placeholder="Username*"
                     onChange={(evt) => setUsername(evt.target.value)}
                ></input>
                <input
                    type='password'
                    required
                    value={password}
                    id='password'
                    placeholder='Password*'
                    onChange={(evt) => setPassword(evt.target.value)}
                ></input>
                <input
                    type='submit'
                    value="Log In"
                ></input>
            </form>
            <div>
                {
                //    localStorage.currentUser && localStorage.token ? 
                    isLoggedIn ?
                   <div>
                    <p>{errorMessage}</p>
                    <p>You are logged in as {currentUser.username}</p>
                   <input
                    onClick={logOutUser}
                    type='submit'
                    value="Log Out"
                    ></input>
                    </div>
                   :
                   <div id='no-user-logged-in-container'>
                        <p>{errorMessage}</p>
                        <p>You are not logged in.</p>
                        <Link to="/register">Sign Up!</Link>
                   </div>
                }
            </div>
        </section>

    )
}

export default LogIn;