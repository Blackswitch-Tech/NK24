import React from 'react';

const Refund = () => {
  return (
    <div className="bg-black text-white font-neu text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-8 flex items-center justify-center h-screen">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold mb-4 text-center">Refund Policy</h1>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-4">
        All payments made for services are non-refundable, including registrations, subscriptions, or any other transactions on the Nakshatra platform; however, in exceptional cases, issues related to payments may be considered on an individual basis, and in the event of a payment failure or technical issue, users are encouraged to promptly contact the Nakshatra Team via email at nakshatra@saintgits.org for assistance and resolution.
        </p>
        
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          If you have any inquiries or concerns regarding our privacy practices, please contact us using the provided contact details.
        </p>
      </div>
    </div>
  );
};

export default Refund;
