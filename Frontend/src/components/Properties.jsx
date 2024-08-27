import React from "react";
import Card from "./Card";
const Properties = () => {
  const searchHandler=()=>{
    
  }
  return (
    <div className="flex flex-col items-center py-5">
      <h2 className="text-4xl ">All properties</h2>
      <h3 className=" py-5 text-2xl text-green-500">Find Your Place to Leave Happpily</h3>
      <div>
        <input type="text" name="" id="" />
        <button onClick={searchHandler}>Search</button>
      </div>
      <div className="flex flex-wrap justify-around gap-10 w-[90%]">
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        <Card/>
        
      </div>
    </div>
  )
};

export default Properties;
