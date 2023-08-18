import React from 'react'

function ErrorHandler() {
  return (
    <section class="bg-white dark:bg-gray-900 ">
      <div class="container min-h-screen px-6 py-12 mx-auto lg:flex lg:items-center lg:gap-12">
        <div class="wf-ull lg:w-1/2">
          <p class="text-xl font-medium text-[#e50010]">
            404 error
          </p>
          <h1 class="mt-3 text-3xl font-semibold text-gray-800 dark:text-white md:text-3xl">
            Page not found
          </h1>
          <p class=" text-lg mt-4 text-gray-500 dark:text-gray-400">
            Sorry, the page you are looking for doesn't exist.Here are some
            helpful links:
          </p>

        </div>

        <div class="relative w-full mt-12 lg:w-1/2 lg:mt-0">
          <img
            class="w-full max-w-lg lg:mx-auto"
            src="https://merakiui.com/images/components/illustration.svg"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default ErrorHandler