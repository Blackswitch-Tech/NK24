import DefaultAccordion from "../components/DefaultAccordion"

export default function Homepage(){
    return(
        <div className="main-container">
            <div className="upper-section flex h-screen bg-no-repeat bg-cover bg-center"
             style={{ backgroundImage: `url(${require("./upper.jpeg")})` }}>
                 <div className="w-full h-full flex  justify-center items-center backdrop-brightness-40">
                 <div className="flex justify-center items-center h-screen ">
                    <img 
                        className="object-contain max-w-full h-auto sm:w-1/2 lg:w-1/3" 
                        src="https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/date.png?alt=media&token=a46e48d2-b337-4c60-942e-70ba28cd05c4" 
                        alt="Descriptive Alt Text" 
                    />
                    </div>
                 </div>
            </div>
            <div className="middle-section flex h-screen bg-no-repeat bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${require("./middle.jpg")})` }}>
                <div className="w-full h-full flex  justify-left items-center">
                     <div className="text-white text-4xl w-1/2 text-center">
                     </div>
                 </div>
                
            </div>
            <div className="end-section mx-8">
                <div className="text-white">FAQ</div>
                <DefaultAccordion/>
            </div>
        </div>
    )
}