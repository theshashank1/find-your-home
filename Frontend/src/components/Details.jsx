import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaSpinner } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import { FaBed, FaBath, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Details = () => {
  const { id } = useParams(); // Fetch the ID from the URL
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/properties/${id}`); // Replace with your backend endpoint
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

 

  if (!data) {
    return <p className="text-center text-red-500">Failed to load data.</p>;
  }

  return (
  
    <div className="p-6 pt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Carousel Section */}
        <div className="w-full flex justify-center mt-4">
          <Carousel 
            showThumbs={false} 
            infiniteLoop={true} 
            autoPlay={true} 
            className="w-80 h-80"
          >
            {data?.images?.map((image, index) => (
              <div key={index} className="flex justify-center items-center">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-80 h-80 object-cover rounded-lg"
                />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="p-6">
          {/* Title and Type */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{data?.title}</h1>
              <p className="text-gray-500">{data?.type.charAt(0).toUpperCase() + data?.type.slice(1)}</p>
            </div>
            <a
              href={data?.chat}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              <FaWhatsapp className="mr-2" /> Contact Owner
            </a>
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-4">{data?.description}</p>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <FaMapMarkerAlt className="text-gray-500" />
            <p className="text-gray-700">
              {data?.location?.address}, {data?.location?.city}, {data?.location?.country}
            </p>
          </div>

          {/* Bedrooms and Bathrooms */}
          <div className="flex gap-6 mb-4">
            <div className="flex items-center gap-2">
              <FaBed className="text-gray-500" />
              <p>{data?.bedrooms} Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <FaBath className="text-gray-500" />
              <p>{data?.bathrooms} Bathrooms</p>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Amenities</h2>
            <ul className="list-disc pl-5">
              {data?.amenities?.map((amenity, index) => (
                <li key={index} className="text-gray-700">
                  {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
