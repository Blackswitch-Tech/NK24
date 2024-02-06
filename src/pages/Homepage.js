import DefaultAccordion from "../components/DefaultAccordion";

export default function Homepage() {
  return (
    <div className="main-container">
      <div
        className="upper-section flex h-screen bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${require("./upper.jpeg")})` }}
      >
        <div className="w-full flex  backdrop-brightness-40">
          <div className="flex w-full h-fit max-w-full justify-center mt-48 ">
            <img
              className="object-contain w-2/3 sm:w-2/3 lg:w-1/4 backdrop-brightness-40 "
              src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/date.png?alt=media&token=a46e48d2-b337-4c60-942e-70ba28cd05c4"
              alt="Descriptive Alt Text"
            />
            
          </div>
        </div>
      </div>
      <div
        className="middle-section flex h-screen bg-no-repeat bg-cover bg-center opacity-30"
        
      >
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
