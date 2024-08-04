import React from "react";

const About = () => {
  return (
    <div className="bg-green-300 w-2/3 py-12 flex m-auto mt-10 rounded-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-8">About Us</h1>
        <div className="flex flex-col space-y-4">
          <p className="text-lg text-gray-800 font-medium">
            Welcome to our grocery shopping website! We aim to provide you with a convenient and enjoyable shopping experience for all your grocery needs.
          </p>
          <p className="text-lg text-gray-800">
            Our website offers a wide selection of fresh produce, pantry essentials, household items, and more, all available for delivery right to your doorstep.
          </p>
          <p className="text-lg text-gray-800">
            At <span className="text-lg font-medium">Grocery Shopping Website</span>, we prioritize quality, affordability, and customer satisfaction. Our team works hard to ensure that every product meets the highest standards of freshness and quality.
          </p>
          <p className="text-lg text-gray-800">
            Whether you're stocking up on essentials, trying out new recipes, or simply looking for everyday items, we've got you covered. Shop with us and experience the ease and convenience of online grocery shopping.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
