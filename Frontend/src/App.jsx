import React from "react";
import SignUp from "./components/SignUp"
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import UserDetails from "./components/UserDetails";
import Properties from "./components/Properties"
import Details from "./components/Details";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import AddProperty from "./components/AddProperty";
import "react-toastify/dist/ReactToastify.css";
import MyProperties from "./components/MyProperties";
const App = () => {
  return (
    <>
     <ToastContainer 
        position="top-center" 
        
      />
    <Navbar/>
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/Home" element={<Home/>}></Route>
      <Route path="/properties" element={<Properties/>}></Route>
      <Route path="/home/details/:id" element={<Details/>}></Route>
      <Route path="/properties/details/:id" element={<Details/>}></Route>
      <Route path="/addproperty" element={<AddProperty/>}></Route>
      <Route path="/userdetails" element={<UserDetails/>}></Route>
      <Route path="/myproperties" element={<MyProperties/>}></Route>
    </Routes>

    </>
  )
};

export default App;
