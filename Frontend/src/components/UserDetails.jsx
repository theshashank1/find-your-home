import React, { useState } from "react";
import { useSelector } from "react-redux";
const UserDetails = () => {
    const user=useSelector(state=>state.user)


  return (
    <div className="max-w-sm mx-auto my-5 p-6 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 shadow-lg rounded-lg text-gray-900">
    <h2 className="text-3xl font-bold mb-6 text-center border-b-2 border-gray-300 pb-2">User Details</h2>
    <div className="mb-4">
      <strong className="block text-lg font-semibold">Username:</strong> 
      <span className="text-sm">{user.username}</span>
    </div>
    <div className="mb-4">
      <strong className="block text-lg font-semibold">Email:</strong> 
      <span className="text-sm">{user.email}</span>
    </div>
    <div className="mb-4">
      <strong className="block text-lg font-semibold">Role:</strong> 
      <span className="text-sm">{user.role}</span>
    </div>
    <div className="mb-4">
      <strong className="block text-lg font-semibold">Phone:</strong> 
      <span className="text-sm">{user.phone}</span>
    </div>
    <div className="mb-4">
      <strong className="block text-lg font-semibold">WhatsApp Number:</strong> 
      <span className="text-sm">{user.whatsappNumber}</span>
    </div>
    <div className="mb-4">
      <strong className="block text-lg font-semibold">Created At:</strong> 
      <span className="text-sm">{new Date(user.createdAt).toLocaleString()}</span>
    </div>
  </div>
  
  
  )
};

export default UserDetails;
