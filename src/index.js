import React, { useEffect, useState } from "react";
import ReactDOM  from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

import { 
        Homepage,
        Posts,
        Profile,
        LogIn,
        RegisterForm,
        ErrorMessage,
        AddPost,
        EditPost,
        AddMessage
        } from "./components";



const App= () => {

    const [currentUser, setCurrentUser] = useState({});
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [postList, setPostList] = useState([])
    

    useEffect(() => {
        const tokenCheck = () => {
            
            if (localStorage.token) {
              setIsLoggedIn(true)
              setToken(JSON.parse(localStorage.token))
            } else {
                console.log("isloggedin: ", isLoggedIn)
            }

            }
        
        tokenCheck();
        
        const userFromLocalStorage = localStorage.getItem('currentUser');
        userFromLocalStorage ? 
                setCurrentUser(JSON.parse(userFromLocalStorage))
                :
                null
        setUsername(currentUser.username)
    }, [isLoggedIn])
    
    return (
        <div className='app'>
            <Router>
                <h1 id='strangersthings'>Strangers Things</h1>
                <navbar className="navbar">
                    <Link to="/">Home</Link>
                    <Link to="/posts">Posts</Link>
                    <Link to="/profile">Profile</Link>
                    {
                        !localStorage.currentUser  ?
                            <Link to="/log-in/">Log In</Link>
                            :
                            <Link to="/"
                                  onClick={(evt) => {
                                    evt.preventDefault();
                                    localStorage.removeItem('currentUser')
                                    localStorage.removeItem('token')
                                    setUsername('')
                                    setPassword('')
                                    setToken('')
                                    setIsLoggedIn(false);
                                }}> Log Out
                            </Link>
                    }
                
                    
                </navbar>
                <Routes>
                    <Route path="/" 
                            element={<Homepage
                                isLoggedIn={isLoggedIn}
                                currentUser={currentUser}
                            /> }
                    />
                    <Route path="/posts" 
                            element={<Posts 
                                isLoggedIn={isLoggedIn}
                                token={token}
                                username={username}
                                currentUser={currentUser}
                                postList={postList}
                                setPostList={setPostList}
                            />} 
                    /> 
                    <Route path="/profile" 
                            element={<Profile
                                isLoggedIn={isLoggedIn} 
                                token={token}
                                setToken={token}
                                username={username}
                                currentUser={currentUser}
                                />}
                    /> 
                    <Route path="/log-in/"
                            element={<LogIn 
                                currentUser={currentUser} setCurrentUser={setCurrentUser}
                                username={username} setUsername={setUsername}
                                password={password} setPassword={setPassword}
                                token={token} setToken={setToken}
                                isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}
                                />}
                    />        
                    <Route path="/*" element={<ErrorMessage />}/>  
                    <Route path="/register" 
                            element={<RegisterForm 
                                currentUser={currentUser} setCurrentUser={setCurrentUser}
                                username={username} setUsername={setUsername}
                                password={password} setPassword={setPassword}
                                token={token} setToken={setToken}
                                />}
                    />
                    <Route path="/add-post"
                             element={<AddPost 
                                isLoggedIn={isLoggedIn}
                                currentUser={currentUser}
                                token={token}/>}
                    />
                    <Route path='/edit-post/:postId'
                             element={<EditPost 
                                isLoggedIn={isLoggedIn}
                                currentUser={currentUser}
                                token={token}
                            />}    
                    />
                    <Route path='/add-message'
                            element={<AddMessage
                                isLoggedIn={isLoggedIn}
                                username={username}
                            />}
                    />     
                </Routes>




            </Router>
        </div>
    )
}

const appElement = document.getElementById('app');
const root = ReactDOM.createRoot(appElement);
root.render(<App />)