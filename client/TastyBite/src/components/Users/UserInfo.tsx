import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";


const getUserInfo = async (user) => {
  const token = user.token;
  const username = user.username;

  try {
    const response = await axios.get(`https://teal-monkey-hem.cyclic.app/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data[0];
    console.log("useraaa:", user);
    const buffer = new Uint8Array(user.profile_picture.image.data.data);
    console.log("desp buffer:", user);

    const blob = new Blob([buffer], { type: user.profile_picture.image.contentType });
    console.log("desp blob:", user);

    const url_profile = URL.createObjectURL(blob);
    const updateUser = {
      ...user,
      profile_picture: url_profile
      
    };
    

    return [updateUser];
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
          </div>
        )}
      </div>
    </>
  );
}
