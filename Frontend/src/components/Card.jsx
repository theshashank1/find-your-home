import React from "react";

const Card = () => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-[22%] cursor-pointer">
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1570797197190-8e003a00c846?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=968&q=80')",
        }}
      ></div>
      <div className="p-6">
        <div className="flex items-baseline">
          <span className="inline-block bg-teal-200 text-teal-800 py-1 px-4 text-xs rounded-full uppercase font-semibold tracking-wide">
            New
          </span>
          <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
            3 beds &bull; 2 baths
          </div>
        </div>
        <h4 className="mt-2 font-semibold text-lg leading-tight truncate">
          Beautiful Home in the countryside
        </h4>
        <div className="mt-1">
          <span>$1,900.00</span>
          <span className="text-gray-600 text-sm">/ wk</span>
        </div>
        <div className="mt-2 flex items-center">
          <span className="text-teal-600 font-semibold">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="far fa-star"></i>
          </span>
          <span className="ml-2 text-gray-600 text-sm">34 reviews</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
