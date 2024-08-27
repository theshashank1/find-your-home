import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const SignUp = () => {
   const navigate=useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: '',
        phone: '',
        whatsappNumber: ''
      });
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/signup', formData);
            console.log('Signup response:', response.data);
            navigate('/'); // Redirect on successful signup
          }
           catch (error) {
            
            console.error('Signup error:', error);
          }
      
        
      };
    
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
    
            {/* Username and Email in one row */}
            <div className="mb-4 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
    
            {/* Password */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              />
            </div>
    
            {/* Role */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
              >
                <option value="" disabled>Select Role</option>
                <option value="landlord">Landlord</option>
                <option value="customer">Customer</option>
              </select>
            </div>
    
            {/* Phone and WhatsApp Number in one row */}
            <div className="mb-6 flex space-x-4">
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 mb-2" htmlFor="whatsappNumber">WhatsApp Number</label>
                <input
                  type="tel"
                  id="whatsappNumber"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
    
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      );
 
};

export default SignUp;
