// import './UserInfo.css'

const IP = "10.6.128.69";

import { useEffect, useState } from "react";
import axios from "axios";

const fetchImageUrl = async (image_id: string) => {
  const response = await fetch(`http://${IP}:3000/images?image_id=${image_id}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};

const getUserInfo = async (user: any) => {
  const token = user.token;
  const username = user.username;

  console.log('token', token);
  console.log('username', username);

  axios.get(`http:${IP}:3000/users/${username}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })
  .then(response => {
    console.log("sjbhafijbfiasbfbasbnasf")
    // Process the response data here
    console.log('response', response.data);
    return response.data;
  })
  .catch(error => {
    // Handle errors
    console.error('Error fetching data:', error);
  });
  
}


export function UserInfo({ user }) {
  const [userInfo, setUserInfo] = useState({});
  
  useEffect(() => {
    console.log('useEffect')
    getUserInfo(user).then((newUserInfo) => {
      setUserInfo(newUserInfo);
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
