import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { server } from "../../main.jsx";

function Contact() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleInquiry = async(e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
              `${server}/send-inquiry`,
              formData
            );

            if(data){
                toast.success(data.message);
                setFormData({
                    name: "",
                    email: "",
                    message: ""
                })
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            Contact Us
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Have questions or need assistance with your order? We're here to
              help! Contact our support team for prompt assistance.
            </p>
            <p className="text-lg text-gray-600">
              Email:{" "}
              <a
                href="mailto:shoppiecommerce@gmail.com"
                className="text-blue-500 hover:underline"
              >
                shoppiecommerce@gmail.com
              </a>
            </p>
          </div>
          <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Send Us Your Inquiry
            </h3>
            <form onSubmit={handleInquiry}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-600 font-medium"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleOnChange}
                  id="name"
                  name="name"
                  className="w-full py-2 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-600 font-medium"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  className="w-full py-2 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring focus:ring-blue-400"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-600 font-medium"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleOnChange}
                  rows="4"
                  className="w-full py-2 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring focus:ring-blue-400"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  disabled={
                    formData.name === "" ||
                    formData.email === "" ||
                    formData.message === ""
                  }
                  type="submit"
                  className="text-xl cursor-pointer transition bg-slate-950 py-2 px-6 text-white font-bold mt-5 border-2 border-transparent hover:text-slate-950 hover:bg-white hover:border-slate-950"
                >
                  Send Inquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
