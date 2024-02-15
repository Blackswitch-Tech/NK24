import React from 'react';

const ContactUsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 h-screen">
          <h1 className="text-3xl font-bold text-center text-white mb-8">Contact Us</h1>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold font-pop mt-3 text-white mb-4">Payment-Related Queries</h2>
            <p className='font-pop text-white mt-3'>If you have any issues with payments, such as failed transactions or payment success but not registered, please contact:</p>
            <ul className="list-disc pl-5">
              <li className='font-pop text-white mt-3'>Fredy Somy - <a href="mailto:fredysomy@gmail.com" className="text-blue-500 font-pop">fredysomy@gmail.com</a></li>
              <li className='font-pop text-white'>Allen Bastian Joy - <a href="mailto:reachallenbastian@gmail.com" className="text-blue-500 font-pop">reachallenbastian@gmail.com</a></li>
            </ul>
          </div>

          <div className="mb-8 font-pop ">
            <h2 className="text-2xl font-semibold text-white mb-4 font-pop">Other Queries</h2>
            <p className='font-pop text-white'>For general questions about the event, please reach out to:</p>
            <ul className="list-disc pl-5">
              <li className='font-pop text-white mt-3'>Noble Sajan - <a href="mailto:alex@noble.ceb2125@saintgits.org" className="text-blue-500 font-pop">noble.ceb2125@saintgits.org</a>&nbsp; +91 7558069423</li>
              <p className='font-pop text-white'>Project Manager</p>
            </ul>
          </div>
    </div>
  );
};

export default ContactUsPage;
