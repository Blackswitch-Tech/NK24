import { Typography } from "@material-tailwind/react";
import Logo from '../assets/NK24logo.webp'
 
export default function Footer() {
  return (
    <footer className="w-full bg-black p-8 font-pop">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-black  text-center md:justify-between">
        <img src={Logo} alt="logo-ct" className="w-20" />
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text- focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="White"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="gray" className="text-center font-normal">
        &copy; 2024 NAKSHATRA Website team
      </Typography>
    </footer>
  );
}