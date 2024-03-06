import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import UserContextWrapper from "./context/user/UserContext";

function App() {
  return (
    <>
      <UserContextWrapper>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/*" element={<h1>404 Page not found!</h1>} />
          </Routes>
        </BrowserRouter>
      </UserContextWrapper>
    </>
  );
}

export default App;
