import React, { useEffect, useState } from "react";


const fetchImageUrl = async (image_id) => {
  const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);

  // Esto es lo que tenemos en recetas deberiamos tener algo parecido en users
  // const buffer = new Uint8Array(image.image.data.data);
  // const blob = new Blob([buffer], { type: image.image.contentType });
  // return URL.createObjectURL(blob);
};

const getUserInfo = async (user) => {
  const token = user.token;
  const username = user.username;

  try {
    const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Rethrow the error to be caught by the caller
  }
};

export function UserInfo({ user }) {
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log("UserInfo useEffect");
    console.log("user:", user);
    getUserInfo(user)
      .then((newUserInfo) => {
        setUserInfo(newUserInfo[0]);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error in UserInfo useEffect:", error);
      });
  }, [user]); // Include 'user' in the dependency array to re-run effect when user changes

  return (
    <>
      <div>
        <h1>UserInfo</h1>
        {userInfo && (
          <div>
            <p id="username" >{userInfo.username}</p>

            <p id="first_name" >{userInfo.first_name}</p>

            <p id="last_name" >{userInfo.last_name}</p>

            <p id="profile_description" >{userInfo.profile_description}</p>

            <p id="email" >{userInfo.email}</p>
            
          </div>
        )}
      </div>
    </>
  );
}
