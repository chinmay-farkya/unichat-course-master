import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = () => {
  const [loading, setLoading] = useState();

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/");
  };
  const getFile = async (url) => {
    let response = await fetch(url, { mode: "no-cors" });
    let data = await response.blob();

    return new File([data], "userPhoto.jpeg", { type: "image/jpeg" });
  };
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
    axios
      .get("https://api.chatengine.io/users/me/", {
        headers: {
          "project-id": "322523b1-f702-43f8-8c0b-3dea5da7ab13",
          username: user.email,
          secret: user.uid,
        },
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);
          axios
            .post("https://api.chatengine.io/users/", formdata, {
              headers: {
                "private-key": "3b68bb6b-9805-45e1-8fc0-4634e1173189",
              },
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, navigate]);

  if (!user || loading) return "Loading...";
  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">Chatcity</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>
      <ChatEngine
        height="calc(100vh - 66px)"
        projectID="322523b1-f702-43f8-8c0b-3dea5da7ab13"
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
