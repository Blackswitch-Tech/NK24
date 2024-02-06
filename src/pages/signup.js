import React from 'react';

const SignInComponent = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-[url('https://i.pinimg.com/736x/d9/46/d3/d946d33dc95c1b560b13cf8a78b801ba.jpg')] bg-no-repeat bg-cover bg-center" >
      <div className="font-bebas bg-red-600 bg-opacity-75 text-white text-center p-2 mb-4 rounded-2xl shadow-md sm:w-96 md:w-70 lg:w-100">
        <p>Note: Your chosen name will be displayed on the certificate</p>
      </div>
      
      <div className="bg-transsparent backdrop-filter backdrop-blur-lg bg-opacity-30  bg-stone p-8  rounded-2xl shadow-lg sm:w-4/12 md:w-4/12 ">
        
        <div className="mb-4 ">
          
          <input
            className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl"
            id="displayName"
            type="text"
            placeholder="Display Name"
          />
        </div>
        <div className="mb-4 ">
          
          <input
            className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl"
            id="displayName"
            type="text"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="mb-4 ">
          
          <input
            className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl"
            id="displayName"
            type="text"
            placeholder="College name"
          />
        </div>
        <div className="mb-4 ">
          
          <input
            className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl"
            id="displayName"
            type="text"
            placeholder="Branch"
          />
        </div>
        <div className="mb-4 ">
          
          <input
            className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl"
            id="displayName"
            type="text"
            placeholder="Semester"
          />
        </div>
        <div className="mb-4 ">
          
          <input
            className="shadow appearance-none border rounded-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-2xl"
            id="displayName"
            type="text"
            placeholder="WhatsApp number"
          />
        </div>
        
        {/* Repeat above div for each form field */}
        <div className="mb-6 flex items-center justify-center">
          <button className="bg-red-500 mt-3 hover:bg-red-700 center text-white font-bold py-2 px-5 rounded-full focus:outline-none focus:shadow-outline">
            Sign up
          </button>
        </div>
        
      </div>
      <div className="text-center mt-4">
          <p className='text-white text-lg'>
            Saintgits College of Engineering <br /> Kottukulam Hills, Pathamuttom P.O, Kottayam, Kerala 686532
          </p> 
          
        </div>
      <div className="text-center ">
          <a href="#" className="text-lg inline-block mt-5 text-sm p-4 pb-0 text-white align-baseline hover:text-grey-800">
            About Us
          </a>
          <a href="#" className="text-lg inline-block mt-5 text-sm p-4 text-white align-baseline hover:text-white-800">
            Refund policy
          </a>
          <a href="#" className="text-lg inline-block text-sm p-4 text-white align-baseline hover:text-white-800">
            Privacy policy
          </a>
        </div>
    </div>
  );
};

export default SignInComponent;
