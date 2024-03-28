import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import UserContextWrapper from "./context/user/UserContext";
import Nearby from "./pages/nearby/Nearby";

import { onMessage } from "firebase/messaging";
import { generateToken, messaging } from "./utils/firebaseConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Message from "./components/small/Message";

function App() {
  // const { REACT_APP_VAPID_KEY } = process.env;

  // async function requestPermission() {
  //   //requesting permission using Notification API
  //   const permission = await Notification.requestPermission();

  //   if (permission === "granted") {
  //     const token = await getToken(messaging, {
  //       vapidKey: REACT_APP_VAPID_KEY,
  //     });

  //     //We can send token to server
  //     console.log("Token generated : ", token);
  //   } else if (permission === "denied") {
  //     //notifications are blocked
  //     alert("You denied for the notification");
  //   }
  // }

  const notificaation = {
    title: "BloodSocial",
    body: "Testingtttt"
  }

  useEffect(() => {
    // toast(<Message notification={notificaation} />);

    generateToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
      toast(<Message notification={payload.notification} />);
    });
  }, []);


  return (
    <>
      <UserContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nearby" element={<Nearby />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<h1>404 Page not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </UserContextWrapper>
      <ToastContainer />
    </>
  );
}

export default App;
