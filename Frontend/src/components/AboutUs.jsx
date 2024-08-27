import React from "react";

const AboutUs = () => {
  return (
    <div className="sm:flex items-center justify-around" id="aboutus">
      <div className="sm:w-1/2 p-5 flex justify-center">
        <div className="image object-center text-center">
          <img
            src="https://i.imgur.com/WbQnbas.png"
            alt="About Us"
            className="h-[25rem] object-contain"
          />
        </div>
      </div>
      <div className="sm:w-1/2 p-4">
        <div className="text">
          <span className="text-gray-500 border-b-2 border-green-600 uppercase">
            About us
          </span>
          <h2 className="my-2 font-bold text-2xl sm:text-3xl">
            About <span className="text-green-500">Our Company</span>
          </h2>
          <p className="text-gray-700 text-sm font-medium py-2">
          Welcome to your trusted partner in finding the perfect home for rent. Whether you’re looking for a cozy apartment in the heart of the city, a spacious family house in a quiet suburb, or a luxury villa by the beach, we are here to help you every step of the way.
          </p>
          <p className="text-gray-700 text-sm font-medium">
          Our mission is simple: to make the process of finding and renting a home as seamless and stress-free as possible. We understand that a home is more than just a place to live—it’s where memories are made, and lives are built. That’s why we offer a wide range of rental options to suit every lifestyle and budget.
          </p>

        </div>
      </div>
    </div>
  );
};

export default AboutUs;
