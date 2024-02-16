import React from "react";
// import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Login from "./pages/login/Login";

// const Title = styled.h1`
//   color: rebeccapurple;
// `

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/*" element={<h1>404 Page not found!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
