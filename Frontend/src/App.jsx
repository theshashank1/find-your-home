import React from "react";
import SignUp from "./components/SignUp"
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Properties from "./components/Properties"
import Details from "./components/Details";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/properties" element={<Properties/>}></Route>
      <Route path="/details/:id" element={<Details/>}></Route>
    </Routes>

    </>
  )
};

export default App;
