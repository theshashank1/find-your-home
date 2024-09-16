import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card"
const MyProperties = () => {
    const [myProperties,setMyProperties]=useState()
    const user=useSelector(state=>state.user)
    const navigate=useNavigate()
    useEffect(()=>{
   if(!user){
    navigate("/")
   }
    },[])
    useEffect(() => {
      const fetchProperties = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/properties/owner/${user._id}`);
          console.log(response.data);
          setMyProperties(response.data);
        } catch (error) {
          console.error('Error fetching properties:', error);
        }
      };
    
      fetchProperties();
    }, []);
    
  return (
    <div className="w-full flex flex-wrap justify-around my-4">
     {
      myProperties?.map((property,index)=>{
        return <Card data={property} statusChangeButton={true} key={index}/>
      })
     }


    </div>
  )
};

export default MyProperties;
