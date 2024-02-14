import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      {/* Payment-related queries section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-pop mb-4">Payment-Related Queries</h2>
        <p className='font-pop'>If you have any issues with payments, such as failed transactions or payment success but not registered, please contact:</p>
        <ul className="list-disc pl-5">
          <li>Fredy Somy - <a href="mailto:fredysomy@gmail.com" className="text-blue-500 font-pop">fredysomy@gmail.com</a></li>
          <li>Jane Smith - <a href="mailto:reachallenbastian@gmail.com" className="text-blue-500 font-pop">reachallenbastian@gmail.com</a></li>
        </ul>
      </div>

      {/* Basic event-related queries section */}
      <div className="mb-8 font-pop">
        <h2 className="text-2xl font-semibold mb-4 font-pop">Basic Queries</h2>
        <p className='font-pop'>For general questions about the event, please reach out to:</p>
        <ul className="list-disc pl-5">
          <li>Alex Brown - <a href="mailto:alex@example.com" className="text-blue-500 font-pop">alex@example.com</a></li>
          
        </ul>
      </div>

      {/* Other queries about the tech fest */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold font-pop mb-4">Other Queries</h2>
        <p className='font-pop'>For any other inquiries related to the tech fest, please get in touch with:</p>
        <ul className="list-disc pl-5">
          <li>Michael Clark - <a href="mailto:michael@example.com" className="text-blue-500 font-pop">michael@example.com</a></li>
          
        </ul>
      </div>
    </div>
  );
};

export default ContactUsPage;
