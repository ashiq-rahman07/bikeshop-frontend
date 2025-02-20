import React from 'react';

const About= () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative h-96 flex items-center justify-center bg-[url('https://i.ibb.co.com/BnJZb7L/the-top-10-street-bikes-we-cant-wait-to-ride-in-2019-ducati-diavel.jpg')] bg-cover bg-center opacity-80">
        <div className="absolute inset-0 bg-black  opacity-75"></div>
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">Your journey starts here</p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img
              src="https://i.ibb.co.com/BnJZb7L/the-top-10-street-bikes-we-cant-wait-to-ride-in-2019-ducati-diavel.jpg"
              alt="Our Story"
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className=" mb-4">
              Welcome to <strong>Bike Shop</strong>, where passion for cycling meets exceptional
              service. Founded in 2010, we have been dedicated to providing high-quality bikes,
              accessories, and expert advice to cyclists of all levels.
            </p>
            <p className="">
              Our mission is to inspire and empower people to embrace cycling as a lifestyle. Whether
              you're a seasoned rider or just starting, we're here to support you every pedal of the
              way.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className=" py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <img
                src="https://noahcap.com/wp-content/uploads/2017/03/team5.jpg"
                alt="Team Member 1"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <img
                src="https://www.columbuspm.org/wp-content/uploads/2015/09/team-member-sample.jpg"
                alt="Team Member 2"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-gray-600">Head Mechanic</p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <img
                src="https://www.leadengine-wp.com/wp-content/uploads/sites/37/2018/02/personal1.jpg"
                alt="Team Member 3"
                className="w-48 h-48 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold">Mike Johnson</h3>
              <p className="text-gray-600">Sales Manager</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Reason 1 */}
          <div className="text-center shadow-xl py-4 px-4 rounded-lg">
            <div className="text-4xl mb-4">🚴‍♂️</div>
            <h3 className="text-xl font-bold mb-2">Expert Advice</h3>
            <p className="">
              Our team of cycling enthusiasts is here to guide you in finding the perfect bike and
              gear.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="text-center shadow-xl py-4 px-4 rounded-lg">
            <div className="text-4xl mb-4">🔧</div>
            <h3 className="text-xl font-bold mb-2">Quality Service</h3>
            <p className="">
              We offer top-notch maintenance and repair services to keep your bike in peak condition.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="text-center shadow-xl py-4 px-4 rounded-lg">
            <div className="text-4xl mb-4">💚</div>
            <h3 className="text-xl font-bold mb-2">Community Focused</h3>
            <p className="">
              We host events and rides to bring the cycling community together.
            </p>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="relative h-80 flex items-center justify-center bg-[url('https://i.ibb.co.com/BnJZb7L/the-top-10-street-bikes-we-cant-wait-to-ride-in-2019-ducati-diavel.jpg')] bg-cover bg-center opacity-90">
      <div className="absolute inset-0 bg-black  opacity-80"></div>
        <div className="container mx-auto px-6 text-center text-white opacity-90" >
          <h2 className="text-3xl font-bold mb-4 ">Ready to Ride?</h2>
          <p className="text-xl mb-8">Explore our collection of bikes and gear today!</p>
          <a
            href="/products"
            className="bg-white text-gray-800 px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;