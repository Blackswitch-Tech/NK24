import React from 'react';

const SignInComponent = () => {
  return (
    <div className="bg-black bg-opacity-50 min-h-screen flex flex-col items-center justify-center bg-[url('https://i.pinimg.com/564x/8e/0d/0c/8e0d0c1639e803830d30df56d3652303.jpg')] bg-no-repeat bg-cover" >
      <div className="bg-red-600 text-white text-center p-4 mb-4 rounded-md shadow-md ">
        <p>Note: Your chosen name will be displayed on the certificate</p>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-4 opacity-90">
          <span className="text-2xl font-bold">Sign up</span>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="displayName">
            Display name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="displayName"
            type="text"
            placeholder="Display Name"
          />
        </div>
        {/* Repeat above div for each form field */}
        <div className="mb-6">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Sign up
          </button>
        </div>
        <div className="text-center">
          <a href="#" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
            About Us
          </a>
          <a href="#" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
            Refund policy
          </a>
          <a href="#" className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800">
            Privacy policy
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignInComponent;
