import React, { useEffect, useState } from "react";
import { BASE_URL, cohortName, postNewUser } from "../api";




const RegisterForm = ({ username, setUsername, password, setPassword, token, setToken, setCurrentUser }) => {

    const [newPW1, setNewPW1] = useState('')
    const [newPW2, setNewPW2] = useState('')


    useEffect(() =>  {
        
        console.log('useeffectfired')

    }, [token])


    const createUser = (evt) => {
        evt.preventDefault();
 
        const getToken = async () => {

            const returnedToken = await postNewUser(username, password);
            setToken(returnedToken)
            
        }
    getToken();
        

    }
 



    return (
        <section className='register-form-container'>
            <form
                id='register-form'
                onSubmit={createUser}
                >
                {
                    token ? 
                        "Thanks for signing up! Log in with your new Username & Password to get started."
                    :
                        <div id="log-in-inputs">
                            <h3>Create a Log-In</h3>
                            <input
                                type='text'
                                required
                                value={username}
                                id='username'
                                placeholder="Username"
                                onChange={(evt) => setUsername(evt.target.value)}
                            ></input>
                            <input
                                type='password'
                                required
                                value={newPW1}
                                id='password-submission1'
                                placeholder="Password"
                                onChange={(evt) => setNewPW1(evt.target.value)}
                            ></input>
                            <input
                                type='password'
                                required
                                value={newPW2}
                                id='password-submission2'
                                placeholder="Reconfirm Password"
                                onInput={(evt) => setNewPW2(evt.target.value)}
                                onChange={(evt) => setPassword(evt.target.value)}      
                            ></input>
                            <input
                                type='submit'
                                value='Create Account'
                                disabled= {(newPW1 === newPW2) ? false : true}
                            ></input>
                    </div>
                }
                
                <div>
                    {(newPW1 == newPW2 ) ? null : 'Passwords Must Match' }
                </div>
            </form>

        </section>
    )
}


export default RegisterForm;