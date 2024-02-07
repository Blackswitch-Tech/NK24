import DefaultAccordion from "../components/DefaultAccordion";
import Carouselc from "../components/Carouselc";


export default function Homepage() {
  return (
    <div className="main-container">
      <div
        className="upper-section flex h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${require("./upper.jpeg")})` }}>

        <div className="w-full flex  backdrop-brightness-40">
          <div className="flex w-full h-fit max-w-full justify-center mt-48 ">
            <img
              className="object-contain w-2/3 sm:w-2/3 lg:w-1/4 backdrop-brightness-40 "
              src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/date.png?alt=media&token=a46e48d2-b337-4c60-942e-70ba28cd05c4"
              alt="Descriptive Alt Text" />
            
          </div>
        </div>
      </div>
      <div className="middle-section">
      <Carouselc/>
      </div>
      <div className="container mx-auto lg:mx-4 px-4 py-8">
      <div className="flex flex-wrap items-center">
        <div className="w-full sm:w-3/4 md:w-1/2 px-2 sm:px-4 md:order-first">
          <h2 className="text-2xl sm:text-3xl font-bold font-pop mb-4">About Us</h2>
          <p className="text-base sm:text-lg font-pop">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        </div>
        <div className="w-full sm:w-3/4 md:w-1/2 px-2 sm:px-4 flex justify-center md:justify-end order-first md:order-none">
          <img src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Saintgits%20New%20logo.png?alt=media&token=37c5d9d9-4b01-4cea-910f-bfaf09d3f08b" alt="About Us" className="rounded-lg shadow-lg max-w-full h-auto mt-4 sm:mt-0" />
        </div>
      </div>
    </div>
      <div className="end-section mx-8">
        <div className="text-red-800 font-extrabold text-5xl font-pop">FAQ</div>
        <DefaultAccordion />
      </div>
    </div>
  );
}
