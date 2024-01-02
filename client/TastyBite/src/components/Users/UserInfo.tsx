import React, { useEffect, useState } from "react";
import "./UserInfo.css";

const fetchImageUrl = async (image_id) => {
  const response = await fetch(`https://teal-monkey-hem.cyclic.app/api/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
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
        {userInfo && (
          <div className="userinfo-container">
            <p id="username" >{userInfo.username}</p>
            <p id="first_name" >{userInfo.first_name}</p>
            <p id="last_name" >{userInfo.last_name}</p>
            <p id="profile_description" >{userInfo.profile_description}</p>
            <p id="email" >{userInfo.email}</p>
            <img>{userInfo.profile_picture}</img>
          </div>
        )}
      </div>
    </>
  );
}
