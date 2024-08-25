import React from "react";
import SignUp from "./components/SignUp"
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
const App = () => {
  return (
    <>
    
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/signup" element={<SignUp/>}></Route>
    </Routes>

    </>
  )
};

export default App;
