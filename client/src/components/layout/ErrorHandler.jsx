import React from 'react'

function ErrorHandler({message, status}) {
  return (
    <section className="bg-white dark:bg-gray-900 ">
      <div className="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-xl font-medium text-[#e50010]">
            {`OOPS! ${status || 404} ERROR`}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            {message}
          </h1>
          <p className=" text-lg mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist or may be lost.
          </p>
        </div>

        <div className="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            className="w-full max-w-lg lg:mx-auto"
            src="https://merakiui.com/images/components/illustration.svg"
            alt="404"
          />
        </div>
      </div>
    </section>
  );
}

export default ErrorHandler