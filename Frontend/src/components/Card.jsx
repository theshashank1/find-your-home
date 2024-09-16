import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from "react-router-dom";
import axios from "axios"

// Utility function to format image URLs
const getFullImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:3000/";

  if (imagePath.startsWith("uploads/")) {
    return `${baseUrl}${imagePath}`;
  }

  return imagePath;
};

const Card = ({ data, statusChangeButton = false }) => {
  const { _id, type, images, bedrooms, bathrooms, title, price, amenities } = data;
  const navigate = useNavigate();
  const [status, setStatus] = useState(data.status);

  const handleClick = () => {
    navigate("details/" + _id);
  };

  const statusChangeHandler = async () => {
    try {
      const newStatus = status === "available" ? "unavailable" : "available";
      console.log("Changing status to:", newStatus); // Debug log
      const response = await axios.patch(`http://localhost:3000/api/properties/${_id}`, { status: newStatus });
      console.log("Server response:", response.data); // Debug log
      setStatus(newStatus);
    } catch (error) {
      console.log("Error changing status:", error);
    }
  };

  return (
    <div onClick={!statusChangeButton ? handleClick : undefined} className="bg-white rounded-lg overflow-hidden shadow-md w-[22%] cursor-pointer min-h-[400px] flex flex-col">
      <div className="flex-1">
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000} // Adjust the time between slides (in milliseconds)
          transitionTime={500} // Optional: adjust the duration of the transition (in milliseconds)
          className="h-48"
        >
          {images.map((image, index) => (
            <div key={index} className="h-48">
              <img
                src={getFullImageUrl(image)} // Use the utility function here
                alt={`House image ${index + 1}`}
                className="object-cover h-48 w-full"
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="p-4 flex-1">
        <div className="flex items-baseline">
          <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
            {type}
          </span>
          <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
            {bedrooms} beds &bull; {bathrooms} baths
          </div>
        </div>
        <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
          {title}
        </h4>
        <div className="mt-1">
          <span> ₹ {price.toFixed(2)}</span>
          <span className="text-gray-600 text-sm">/ wk</span>
        </div>

        <div className="mt-2">
          <h5 className="font-semibold text-sm mb-2">Amenities:</h5>
          <p className="text-gray-600 text-sm">
            {amenities.join(', ')}
          </p>
        </div>

        <div className="mt-2">
          <p
            className={`text-lg font-semibold ${status === "available" ? "text-green-500" : "text-red-500"}`}
          >
            Status: {status}
          </p>
        </div>
        {statusChangeButton &&
          <div className="mt-2">
            <button
              onClick={statusChangeHandler}
              type="button"
              className="text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Change Status
            </button>
          </div>
        }
      </div>
    </div>
  );
};

export default Card;
