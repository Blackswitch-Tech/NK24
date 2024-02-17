import DefaultAccordion from "../components/DefaultAccordion";
import Carouselc from "../components/Carouselc";
import { motion } from "framer-motion";
import img1 from "../assets/Mar1 asset(1).png";
import img2 from "../assets/Mar2 asset(2).png";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Homepage() {
  const location = useLocation();
  useEffect(() => {
    localStorage.setItem("refcode", location.search.split("=")[1]);
  }, []);
  return (
    <div className="main-container">
      <div
        className="upper-section flex h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${require("../assets/bg3.jpg")})` }}
      >
        <div className="w-full flex flex-col  backdrop-brightness-40">
          <div className="flex w-full h-fit max-w-full justify-center mt-56 lg:mt-56 overflow-hidden ">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "15vh",
                width: "100%",
                position: "relative",
              }}
            >
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <motion.div
                  initial={{ x: "-50%" }}
                  animate={{ x: "17%" }}
                  transition={{ duration: 1 }}
                  className="w-12/12 sm:w-1/2 md:w-2/3 lg:w-1/4 2xl:w-1/4 flex justify-end mt-12 "
                >
                  <img src={img1} alt="Left Image" style={{ width: "100%" }} />
                </motion.div>
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                style={{
                  width: "5px",
                  height: "80%",
                  backgroundColor: "white",
                }}
              />
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              >
                <motion.div
                  initial={{ x: "50%" }}
                  animate={{ x: "-17%" }}
                  transition={{ duration: 1 }}
                  className="w-12/12 sm:w-1/2 md:w-2/3 lg:w-1/4 2xl:w-1/4 flex justify-end mt-12"
                >
                  <img src={img2} alt="Right Image" style={{ width: "100%" }} />
                </motion.div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 1,
              ease: [0, 0.71, 0.2, 1.01],
            }}
            className="flex flex-col w-full h-fit max-w-full justify-center mt-50"
          >
            <div className="font-aurora text-white text-5xl xs:text-5xl sm:text-7xl lg:text-7xl mt-10 grid place-items-center">
              nakshatra
            </div>
            <div className="font-milk text-white text-xl xs:text-2xl sm:text-3xl grid place-items-center">
              CINEVERSE EXTRAVAGANZA
            </div>
          </motion.div>
        </div>
      </div>
      <div className="middle-section">
        <div className=" mx-3 font-pop  text-white text-3xl">
          Featured Events
        </div>
        <Carouselc />
      </div>

      <div
        className="about-section flex h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${require("../assets/bottom.jpg")})` }}
      >
        <div className="container mx-auto lg:mx-4 px-4 py-8 bg-cover bg-center">
          <div className="flex flex-wrap items-center">
            <div className="w-full sm:w-3/4 md:w-1/2 px-2 sm:px-4 md:order-first">
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-pop mb-4">
                About Us
              </h2>
              <p className="text-base sm:text-lg text-white font-pop">
                Saintgits College of Engineering presents NAKSHATRA 2024, the
                annual techno-cultural fest. It is hosted every year to
                recognise fledging engineers who have a flair of technical
                expertise and artistry. It is one of the most eminent fests with
                more than 4000 entrants from across the nation. This
                extravaganza unfolds a two-day mega event that transports you
                into a new realm. Get enraptured in performances by budding
                engineers and artists that will leave you spellbound. Join in to
                be a part of our exquisite fest, NAKSHATRA 2024.
              </p>
            </div>
            <div className="w-full sm:w-3/4 md:w-1/2 px-2 sm:px-4 flex justify-center md:justify-end order-first md:order-none">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Saintgits%20New%20logo.png?alt=media&token=90dec050-d8f9-4c66-9d9d-d99becd51251"
                alt="About Us"
                className="rounded-lg shadow-lg max-w-full h-auto mt-4 sm:mt-0"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="end-section mx-8 mt-40 py-8 lg:mt-2 ">
        <div className="text-white font-extrabold text-5xl font-pop">
          FAQ
        </div>
        <DefaultAccordion />
      </div>
    </div>
  );
}
