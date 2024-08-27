import React, { useEffect } from "react";
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import Carousel from "./Carousel";
import Card from "./Card";
import AboutUs from "./AboutUS"
import ContactForm from "./ContactForm";
const Home = () => {
    const user=useSelector((state)=>state.user)
    const navigate=useNavigate()

    useEffect(()=>{
        if (!user){
            navigate("/")
       }

    })
    const propertyData = {
      "location": {
        "address": "123 Main St",
        "city": "New York",
        "country": "USA",
        "postalCode": "10001"
      },
      "_id": "66c826cffc7688fa7693aff7",
      "ownerId": "66c823ccceeabcb828531a33",
      "title": "Modern Apartment in Downtown",
      "description": "A beautiful and modern apartment located in the heart of downtown with all the amenities you need for a comfortable stay.",
      "price": 1500,
      "type": "apartment",
      "bedrooms": 2,
      "bathrooms": 2,
      "amenities": [
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Gym"
      ],
      "images": [
        "https://drive.google.com/file/d/16s4OSrfTrvSW3QS7Xw09mZmqB46Mm_jU/view?usp=sharing",
        "https://drive.google.com/file/d/1RlEuSKERpThBztGcpdnDDSDI4j6i-hvN/view?usp=sharing",
        "https://drive.google.com/file/d/152Up5GbeyJTbymzjGX5mB6rHh9ZmgboG/view?usp=sharing"
      ],
      "chat": "https://wa.me/+919492834190?text=Hello%2C%0A%0AI%20am%20interested%20in%20your%20property%20%22Modern%20Apartment%20in%20Downtown%22%20which%20is%20available%20for%20rent.%0A%0ALocated%20at%3A%0A123%20Main%20St%2C%20New%20York%2C%20USA%2C%2010001%0A%0A%20With%20the%20property%20features%3A%0A-%20Bedrooms%3A%202%0A-%20Bathrooms%3A%202%0A%0APlease%20let%20me%20know%20more%20details%20about%20the%20availability%20and%20rental%20terms.%0A%0AThank%20you!",
      "createdAt": "2024-08-23T06:06:07.559Z",
      "updatedAt": "2024-08-23T06:11:09.342Z",
      "__v": 0
    };
    
   
  return (
    <>
    <Carousel/>
    <div className="flex flex-col w-full items-center my-9 gap-5">
        <h1 className="text-3xl font-bold ">
          Check our <span className="text-green-500 text-4xl">Properties</span> 
        </h1>
        <div className="w-full flex items-center justify-around">
        <Card />
        <Card/>
        <Card/>
        <Card/>
        </div>
        <button onClick={()=>navigate("/properties")} className="w-[9rem] h-[3rem] bg-green-500 rounded-lg font-semibold text-white">View All</button>
        
    </div>
    <AboutUs/>
    <ContactForm/>
    </>
  )
};

export default Home;
