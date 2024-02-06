import React from 'react';

const Technical = () => {
    // Your component logic goes here

    return (
        <div className="w-full ">
      <div className="justify-center align-middle flex">
        <h1 className="text-white font-libre text-7xl mt-8">Cultural Events</h1>
      </div>
      <div className="flex flex-row justify-center mx-10">
        <div class="max-w-md mx-auto w-full mt-10">
          <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
            <div class="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
              type="text"
              id="search"
              placeholder="Search Events"
            />
          </div>

        </div>
        
        <div></div>
      </div>
    </div>
    );
};

export default Technical;