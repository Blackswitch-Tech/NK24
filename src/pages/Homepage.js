import DefaultAccordion from "../components/DefaultAccordion"

export default function Homepage(){
    return(
        <div className="main-container">
            <div className="upper-section flex h-screen bg-no-repeat bg-cover bg-center"
             style={{ backgroundImage: `url(${require("./upper.jpeg")})` }}>
            
            </div>
            <div className="middle-section flex h-screen bg-no-repeat bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${require("./middle.jpg")})` }}>

            </div>
            <div className="end-section">
                <DefaultAccordion/>
            </div>
        </div>
    )
}