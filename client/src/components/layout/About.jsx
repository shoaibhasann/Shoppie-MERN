import React from "react";

function About() {
  return (
    <section className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-16 text-white">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-white mb-6">About Us</h2>
          <p className="text-lg text-gray-200">
            <span className="text-2xl font-semibold p-3">Welcome to Shoppie!</span>{" "}
            We are on a mission to provide you with the best shopping
            experience. Our passion is to bring you high-quality products and
            exceptional service.
          </p>
        </div>
        <div className="bg-white bg-opacity-10 p-8 mt-10 rounded-lg">
          <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
          <p className="text-lg text-gray-200">
            At Shoppie, we believe in making shopping easy, enjoyable, and
            convenient. With our user-friendly interface and a wide selection of
            products, we aim to make your online shopping journey seamless and
            delightful.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
