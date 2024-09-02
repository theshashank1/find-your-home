import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { useNavigate } from "react-router-dom";

// Utility function to format image URLs
const getFullImageUrl = (imagePath) => {
  const baseUrl = "http://localhost:3000/";

  // Check if the imagePath already includes the base URL
  if (imagePath.startsWith("uploads/")) {
    return `${baseUrl}${imagePath}`;
  }

  // Return the imagePath as is if it already contains the base URL
  return imagePath;
};

const Card = ({ data }) => {
  const { _id, type, images, bedrooms, bathrooms, title, price, amenities } = data;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("details/" + _id);
  };

  return (
    <div onClick={handleClick} className="bg-white rounded-lg overflow-hidden shadow-md w-[22%] cursor-pointer h-[350px] flex flex-col">
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
      </div>
    </div>
  );
};

export default Card;
