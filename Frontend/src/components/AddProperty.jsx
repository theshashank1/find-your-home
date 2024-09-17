import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchProperties } from "../store/popertiesSlice.js";

const AddProperty = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: {
      address: '',
      city: '',
      country: '',
      postalCode: ''
    },
    type: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
    whatsappNumber: ''
  });
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const key = name.split('.')[1];
      setFormData((prev) => ({
        ...prev,
        location: {
          ...prev.location,
          [key]: value
        }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'location') {
        Object.keys(formData.location).forEach((locKey) => {
          data.append(`location.${locKey}`, formData.location[locKey]);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    Array.from(images).forEach((file) => {
      data.append('images', file);
    });

    if (user && user._id) {
      data.append('ownerId', user._id);
    }

    try {
      await axios.post('http://localhost:3000/api/properties', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Property Added Successfully');
      dispatch(fetchProperties());
      setFormData({
        title: '',
        description: '',
        price: '',
        location: {
          address: '',
          city: '',
          country: '',
          postalCode: ''
        },
        type: '',
        bedrooms: '',
        bathrooms: '',
        amenities: '',
        whatsappNumber: ''
      });
      setImages([]);
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError('Failed to add property: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Add Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Price:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <fieldset className="mb-4 border p-4 rounded-lg">
          <legend className="text-lg font-medium mb-2">Location:</legend>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Address:</label>
            <input
              type="text"
              name="location.address"
              value={formData.location.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">City:</label>
            <input
              type="text"
              name="location.city"
              value={formData.location.city}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Country:</label>
            <input
              type="text"
              name="location.country"
              value={formData.location.country}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Postal Code:</label>
            <input
              type="text"
              name="location.postalCode"
              value={formData.location.postalCode}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
        </fieldset>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Type:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="">Select...</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="studio">Studio</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Bedrooms:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Bathrooms:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Amenities (comma separated):</label>
          <input
            type="text"
            name="amenities"
            value={formData.amenities}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">WhatsApp Number (including +91):</label>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">Images:</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full border rounded-lg"
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
