import React from "react";

function CheckOutSteps({ activeStep }) {
  const steps = [
    { name: "Shipping", icon: "🚚" },
    { name: "Confirm", icon: "📦" },
    { name: "Payment", icon: "💳" },
  ];

  return (
    <div className=" cursor-pointer max-w-md mx-4 lg:mx-auto flex justify-between items-center my-6 lg:my-10">
      {steps.map((stepItem, index) => (
        <div
          key={index}
          className={`flex items-center ${
            activeStep >= index ? "text-red-500 font-semibold" : "text-gray-500"
          }`}
          onClick={() => activeStep = index} // Update activeStep on click
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:mr-2">{stepItem.icon}</div>
            <div>{stepItem.name}</div>
          </div>
          {index !== activeStep && (
            <div className="h-1 w-8 bg-gray-300 mx-2" /> // Add line between steps
          )}
        </div>
      ))}
    </div>
  );
}

export default CheckOutSteps;
