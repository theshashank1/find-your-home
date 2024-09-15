import React from "react";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"
import { FaUser } from "react-icons/fa";
const Navbar = () => {
  const user=useSelector((state)=>state.user)
  console.log(user)
  
  return (
    <nav className={`w-full px-5 py-2 flex ${user ? "justify-between  bg-gray-100":"justify-center "}`}> 
      <div className="flex items-center w-[20%] ">
        <img src="/logo.avif" alt="" className="w-16 h-16 mix-blend-multiply" />
        <p className="text-2xl font-semibold">FindYourHome</p>
      </div>
     {
      user &&
      (
      <>
        <div className="w-[70%] flex items-center px-20">
        <ul className="w-full flex items-center justify-evenly ">
         <Link to="/home">Home</Link>
         <Link to="/properties">All Properties</Link>
         <a href="#aboutus" className="hover:cursor-pointer">About Us</a>
        <a href="#contactus" className="hover:cursor-pointer">Contact Us</a> 
         {
          user?.role=="landlord" && <Link to="/addproperty">Add Property</Link>
         }

        </ul>

      </div>
      <div className="w-[3rem] h-[3rem] mt-2 flex items-center text-2xl justify-center rounded-[50%] bg-gray-300">
        <Link to="/userdetails"><FaUser /></Link>
        </div>
      </>
      )
     }
    </nav>
  )
};

export default Navbar;
