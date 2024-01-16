import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";
import { Loader } from "../Loader/Loader";


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
    const buffer = new Uint8Array(user.profile_picture.image.data.data);

    const blob = new Blob([buffer], { type: user.profile_picture.image.contentType });

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
  const [modify, setModify] = useState(false);

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

  if ((userInfo as any).username === undefined) {
    return <Loader />
  }


  return (
    <>
      <div>
        {userInfo && (
          <div className="userinfo-container">
            <div className="userinfo-info-container">
              <h2>Información personal</h2>
              <div className="userinfo-info-text-container">
                <div className="userinfo-info-username">
                  <h3>Nombre de usuario</h3>
                  <p id="username" >{userInfo.username}</p>
                </div>
                <div className="userinfo-info-first-name">
                  <h3>Nombre </h3>
                  {modify ? (
                    <input
                      id="first_name"
                      type="text"
                      defaultValue={userInfo.first_name}
                    />
                  ) : (
                    <p id="first_name" >{userInfo.first_name}</p>
                  )}
                </div>
                <div className="userinfo-info-last-name">
                  <h3>Apellidos </h3>
                  {modify ? (
                    <input
                      id="last_name"
                      type="text"
                      defaultValue={userInfo.last_name}
                    />
                  ) : (
                    <p id="last_name" >{userInfo.last_name}</p>
                  )}
                </div>
                <div className="userinfo-info-description">
                  <h3>Descripción </h3>
                  {modify ? (
                    <textarea
                      id="profile_description"
                      defaultValue={userInfo.profile_description}
                    />
                  ) : (
                    <p id="profile_description" >{userInfo.profile_description}</p>
                  )}

                </div>
                <div className="userinfo-info-email">
                  <h3>Email </h3>
                  <p id="email" >{userInfo.email}</p>
                </div>
              </div>
            </div>
            <div className="userinfo-picture-container">
              <h2>Imagen del perfil</h2>
              {modify ? (
                <div className="userinfo-picture">
                  <img
                    src={userInfo.profile_picture}
                    alt="Profile"
                    className="profile-image"
                  />
                  <input type="file" name="profile_picture" />
                </div>
              ) : (
                <img id="profile_picture" src={userInfo.profile_picture} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
