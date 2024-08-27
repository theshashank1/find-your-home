import React, { useState, useEffect } from "react";
import image1 from '../assets/image1.jpg';
import image2 from '../assets/image2.jpg';
import image3 from '../assets/image3.jpg';
import image4 from "../assets/image4.jpg";
import { useNavigate } from "react-router-dom";

const animations = {
  slide: "translate-x-0 opacity-100",
  fade: "opacity-0",
  zoom: "scale-100",
};

const Carousel = ({ animationType = "slide" }) => {
  const images = [image1, image2, image3, image4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [animation, setAnimation] = useState(animations[animationType]);
  const navigate=useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation(""); // Reset animation for smooth transition
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setAnimation(animations[animationType]); // Apply selected animation
  }, [animationType]);

  return (
    <div className="flex justify-around items-center py-5" >
      <div className="w-[40%] h-auto flex flex-col justify-between">
        <h1 className="text-4xl font-bold ">
          Find A <span className="text-green-500 text-5xl">Perfect Home</span> 
        </h1>
        <h1 className="text-3xl font-sans my-3">To Live With Your Family</h1>
        <p className="text-1xl my-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iste saepe quis ea itaque, assumenda numquam nam autem, vitae soluta, ipsa iusto perspiciatis suscipit necessitatibus porro libero qui rem optio animi!</p>
        <button 
  type="button" 
  onClick={()=>navigate("/properties")}
  className="w-[14rem] h-[3.5rem] focus:outline-none text-white bg-green-400 hover:bg-green-400 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-lg px-6 py-3 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
>
  Get Started
</button>      </div>

      <div id="animation-carousel" className="relative w-[40%] h-96 border-2 overflow-hidden rounded-3xl">
        <div className="relative w-full h-full rounded-lg">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Slide ${index}`}
              className={`absolute w-full h-full object-cover top-0 left-0 transition-all duration-1000 ease-in-out ${index === currentImageIndex ? animation : "opacity-0"} ${animationType === "slide" && index === currentImageIndex ? "translate-x-0" : "translate-x-full"} ${animationType === "zoom" && index === currentImageIndex ? "scale-100" : "scale-110"}`}
              style={{ opacity: index === currentImageIndex ? 1 : 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
