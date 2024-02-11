import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-black text-white font-neu text-lg md:text-base lg:text-lg xl:text-xl 2xl:text-2xl p-8 flex items-center justify-center h-screen">
      <div className="max-w-2xl w-full">
        <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-7xl font-bold mb-4 text-center">Privacy Policy</h1>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-4">
          This page outlines our policies concerning the collection, use, and disclosure of information obtained from users of the site. By utilizing this site, you consent to the collection and utilization of information as per this policy.
        </p>
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl mb-4">
          We solely collect the information voluntarily provided by users, ensuring the minimum necessary personal data is obtained to fulfill the intended purpose of the interaction. All data gathered from users will be passed on annually to the succeeding Nakshatra team of coordinators. This transfer aims to aid in the development of new services or enhancements to existing ones, as well as to keep users informed and updated about events and information pertinent to Nakshatra. Your privacy is of utmost importance, and we are committed to handling your information responsibly.
        </p>
        
        <p className="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">
          If you have any inquiries or concerns regarding our privacy practices, please contact us using the provided contact details.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
