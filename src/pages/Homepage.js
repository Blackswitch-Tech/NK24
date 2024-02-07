import DefaultAccordion from "../components/DefaultAccordion";
import Carouselc from "../components/Carouselc";
import { motion } from "framer-motion";
import img1 from "../assets/Mar1 asset(1).png";
import img2 from "../assets/Mar2 asset(2).png";
export default function Homepage() {
  return (
    <div className="main-container">
      <div
        className="upper-section flex h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${require("./upper.jpeg")})` }}
      >
        <div className="w-full flex  backdrop-brightness-40">
          <div className="flex w-full h-fit max-w-full justify-center mt-48 ">
          <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "15vh",
        width: "100vw",
        position: "relative"
      }}
    >
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "17%" }}
          transition={{ duration: 1 }}
   
          className="w-12/12 sm:w-1/2 md:w-2/3 lg:w-1/4 2xl:w-1/4 flex justify-end mt-12" 
        >
          <img
            src={img1}
            alt="Left Image"
            style={{ width: "100%" }}
          />
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
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-start" }}>
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: "-17%" }}
          transition={{ duration: 1 }}
          className="w-12/12 sm:w-1/2 md:w-2/3 lg:w-1/4 2xl:w-1/4 flex justify-end mt-12" 
        >
          <img
            src={img2}
            alt="Right Image"
            style={{ width: "100%" }}
          />
        </motion.div>
      </div>
    </div>
          </div>
        </div>
      </div>
      <div className="middle-section">
        <Carouselc />
        <div className="w-full h-full flex  justify-left items-center">
          <div className="text-white text-4xl w-1/2 text-center"></div>
        </div>
      </div>
      <div className="end-section mx-8">
        <div className="text-white">FAQ</div>
        <DefaultAccordion />
      </div>
    </div>
  );
}
