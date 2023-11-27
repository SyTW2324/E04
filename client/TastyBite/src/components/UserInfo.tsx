import React, { useEffect, useState } from "react";

const IP = "10.6.128.69";

const fetchImageUrl = async (image_id) => {
  const response = await fetch(`http://localhost:3000/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const getUserInfo = async (user) => {
  const token = user.token;
  const username = user.username;

  try {
    const response = await fetch(`http://localhost:3000/users/${username}`, {
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
            <p>{userInfo.username}</p>
            <p>{userInfo.first_name}</p>
            <p>{userInfo.last_name}</p>
            <p>{userInfo.profile_description}</p>
            {/* <img src={userInfo.userWithImage} alt="User" /> */}
            <p>{userInfo.email}</p>
          </div>
        )}
      </div>
    </>
  );
}
