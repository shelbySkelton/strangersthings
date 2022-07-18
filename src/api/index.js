import React from "react";
export const BASE_URL = 'https://strangers-things.herokuapp.com';
export const cohortName = '2206-ftb-et-web-ft-b';
// export const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmQyMWVkZWM3ODA5MDAwMTcxMzA1NGQiLCJ1c2VybmFtZSI6InNuczA5ZiIsImlhdCI6MTY1NzkzNzYzMH0.sYZ0u-ZbNaeu3ZrAuZakv9s9eErRBdkdhtJM2eAUV9Q'

export const patchEdit = async (postId, token, title, description, price, location, willDeliver) => {
    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/posts/${postId}`,
        {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                "post": {
                    "title": title,
                    "description": description,
                    "price": price,
                    "location": location,
                    "willDeliver": willDeliver
                }
                })
        });
            const result = await response.json();
            console.log(result.success)
            return result.data.post;
    } catch(error) {
            console.error(error)
        }

}




export const deletePost = async (token, postID) => {
    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/posts/${postID}`,
        {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const result = await response.json();
        return result;
        } catch(error) {
            console.error(error)
        }
}

export const postPost = async (token, title, description, price, location, willDeliver) => {
    try{
        const response = await fetch(`${BASE_URL}/api/${cohortName}/posts`,
        {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    "title": title,
                    "description": description,
                    "price": price,
                    "location": location,
                    "willDeliver": willDeliver
                }
                })

        }
        );
            const result = await response.json();
            return result.data.post;
    } catch(error) {
        console.error(error)
    }
}




export const getMe = async (token) =>  {

    try{
        const response = await fetch(`${BASE_URL}/api/${cohortName}/users/me`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }
        );
            const result = await response.json();
            return result;
    } catch(error) {
        console.error(error)
    }

}


export const postLogIn = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/users/login`, 
                {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    user: {
                        "username": username,
                        "password": password
                    }
                    })
                }
        );
            const result = await response.json()
            if (result.success){
                return result;
            }
            else {
                return result.error
            }
            ;
        }
        catch(error){
            console.log(error)
        }
}



export const postNewUser = async (username, password) => {

    try {
        const response = await fetch(`${BASE_URL}/api/${cohortName}/users/register`, 
                {
                    method: "POST",
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                    user: {
                        "username": username,
                        "password": password
                    }
                    })
                }
            );
            const result = await response.json()
            const resultToken = result.data.token
            return resultToken;
        }
        catch(error){
            console.error(error)
        }
}

export const fetchPosts = async () => {
 
    try {
      const response = await fetch(`${ BASE_URL }/api/${ cohortName }/posts`);
      const data = await response.json();
      const actualPosts = data.data.posts
      return actualPosts;
    } catch (error) {
      console.error(error);
      }
  }

  export const fetchAllPosts = async (token) => {
    try {
        const response = await fetch(`${ BASE_URL }/api/${ cohortName }/posts`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        const data = await response.json();
        const actualPosts = data.data.posts
        return actualPosts;
    } catch (error) {
        console.error(error)
        } 
  }