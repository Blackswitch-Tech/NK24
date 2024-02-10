import "./dashstyle.css";
import { Button } from "@material-tailwind/react";
export default function Dash()
{

    return(
        <div className=" min-h-screen  flex flex-col items-center justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] bg-no-repeat bg-cover bg-fixed bg-center" >
         <div className="container mx-auto px-4 lg:px-8 mt-20 ">
  {/* Container with horizontal padding, adjustable for larger screens */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">

    <div className=" p-12 shadow-2xl flex flex-col justify-between  rounded-xl min-h-[300px] w-full"style={{ backgroundColor: 'rgb(22, 23, 27)' }} >
      <div className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">Welcome,User</div>
      <div className="text-20 font-pop mt-2">This is the dashboard. You can view the events you have regitered here.</div>
      <Button  className="mt-20 lg:w-1/2 font-pop text-xl text-red-900 hover:bg-white">LOG OUT</Button>

    </div>

    <div className="bg-white p-12 shadow-xl flex flex-col rounded-xl min-h-[300px] w-full" style={{ backgroundColor: 'rgb(22, 23, 27)' }}>
      <div className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">Campus Ambassador</div>
      <div className="text-20 font-pop mt-5">Have you dreamed of being a superhero ? Who needs superheroes when you can be a campus ambassador. “With great power comes great responsibility”. Here’s an opportunity to explore your inner influencer. Let’s see who will become the next face of Nakshatra
      </div>
      <Button  className="text-green-600 lg:w-1/2  text-xl mt-20 font-pop hover:bg-white">Register Now</Button>
    </div>

    <div className="bg-white p-12 shadow-xl rounded-xl md:col-span-2 min-h-[300px] w-full" style={{ backgroundColor: 'rgb(22, 23, 27)' }} /*style={{ animation: 'gradientAnimation 3s ease infinite', backgroundSize: '200% 200%' }}*/>
    <div className="text-3xl sm:text-xl md:text-2xl lg:text-3xl font-bold font-pop text-white">Registered Events</div>
    </div>
  </div>
</div>

        </div>
    )
}