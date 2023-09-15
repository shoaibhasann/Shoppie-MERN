import React, { useState } from "react";
import {
  FaMap,
  FaCity,
  FaPhoneAlt,
  FaGlobe,
  FaAddressBook,
  FaMapMarkedAlt,
} from "react-icons/fa";
import { Country, State } from "country-state-city"
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../MetaData";
import CheckOutSteps from "./CheckOutSteps";

function ShippingDetailsForm() {

  const dispatch = useDispatch();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [formData, setFormData] = useState({
    address: shippingInfo.address,
    city: shippingInfo.city,
    pincode: shippingInfo.pincode,
    phone: shippingInfo.phone,
    country: shippingInfo.country,
    state: shippingInfo.state,
  });

  const [activeStep, setActiveStep] = useState(0);

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name] : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the server)
    console.log("Form data submitted:", formData);
  };

  return (
    <>
      <MetaData title="Shoppie - Shipping Details" />
      <CheckOutSteps activeStep={activeStep} setActiveStep={setActiveStep} />
      <div className="w-full max-w-md lg:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
          <div className="mb-4 relative">
            <div className="flex items-center">
              <FaAddressBook className="text-red-500 mr-2 absolute left-2" />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full pl-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="Street Address"
                required
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <div className="flex items-center">
              <FaCity className="text-red-500 mr-2 absolute left-2" />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full pl-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="City"
                required
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <div className="flex items-center">
              <FaMapMarkedAlt className="text-red-500 mr-2 absolute left-2" />
              <input
                type="number"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full pl-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="Pincode"
                required
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <div className="flex items-center">
              <FaPhoneAlt className="text-red-500 mr-2 absolute left-2" />
              <input
                type="number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full pl-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-400"
                placeholder="Phone Number"
                required
              />
            </div>
          </div>

          <div className="mb-4 relative">
            <div className="flex items-center">
              <FaGlobe className="text-red-500 mr-2 absolute left-2" />
              <select
                name="country"
                value={formData.country}
                className="border w-full rounded pl-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="Country"
                onChange={handleChange}
              >
                <option className="text-gray-800" value="">
                  Select Country
                </option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="mb-4 relative">
            <div className="flex items-center">
              <FaMap className="text-red-500 mr-2 absolute left-2" />
              <select
                name="state"
                value={formData.state}
                className="border w-full rounded pl-8 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
                placeholder="State"
                onChange={handleChange}
              >
                <option className="text-gray-800" value="">
                  Select State
                </option>
                {State &&
                  State.getStatesOfCountry(formData.country).map((item) => (
                    <option value={item.isoCode} key={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={formData.state ? false : true}
              className="w-full cursor-pointer bg-slate-950 text-white py-2 border-2 transition border-transparent  hover:text-slate-950 hover:bg-white hover:border-2 hover:border-slate-950"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ShippingDetailsForm;
