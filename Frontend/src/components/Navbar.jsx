import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  const user=useSelector((state)=>state.user)
  console.log(user)
  return (
    <nav className={`w-full px-5 py-2 flex ${user ? "justify-between":"justify-center"}`}> 
      <div className="flex items-center w-[20%] ">
        <img src="/logo.avif" alt="" className="w-16 h-16" />
        <p className="text-2xl font-semibold">FindYourHome</p>
      </div>
     {
      user &&
      (
      <>
        <div className="w-[70%] flex items-center px-20">
        <ul className="w-full flex items-center justify-evenly">
         <li><a href="/home">Home</a></li>
         <li><a href="/properties">All Properties</a></li>
         <li> <a href="#aboutus" className="hover:cursor-pointer">About Us</a></li>
        <li><a href="#contactus" className="hover:cursor-pointer">Contact Us</a> </li>
         {
          user?.role=="landlord" && <li><a href="/addproperty">Add Property</a></li>
         }

        </ul>

      </div>
      <div className="w-[3rem] h-[3rem] mt-2 flex items-center text-2xl justify-center rounded-[50%] bg-gray-300"><FaUser /></div>
      </>
      )
     }
    </nav>
  )
};

export default Navbar;
