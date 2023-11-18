// import './UserInfo.css'

import { useEffect, useState } from "react";

const fetchImageUrl = async (image_id: string) => {
  const response = await fetch(`http://localhost:3000/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const getUserInfo = async (username: string) => {
  const response = await fetch(`http://localhost:3000/users/${username}`);
  const userData = await response.json();
  
  const userWithImage = await fetchImageUrl(userData[0].profile_picture);
  
  return { ...userData[0] , userWithImage};
}

export function UserInfo() {
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(() => {
    console.log('useEffect')
    getUserInfo('facundo').then((userInfo) => {
      setUserInfo(userInfo);
    });
  }, []);


  return (
    <>
      <div>
        <h1>UserInfo</h1>
        {userInfo && 
          <div>
            <p>{userInfo.username}</p>
            <p>{userInfo.first_name}</p>
            <p>{userInfo.last_name}</p>
            <p>{userInfo.profile_description}</p>
            <img src={userInfo.userWithImage} />
            <p>{userInfo.email}</p>
          </div>
        }
      </div>
    </>
  )
} 
