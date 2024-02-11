import { Typography } from "@material-tailwind/react";
import Logo from '../assets/NK24logo.webp'
import React from "react";

const CustomTypography = () => {
  return (
    <div class='flex fle-row justify-center w-full'>
    <Typography color="white" className="text-center text-sm font-pop">
      Made with 
    </Typography>
    <Typography color="red" className="text-center text-sm">
     &nbsp;❤&nbsp;
  </Typography>
  <Typography color="white" className="text-center text-sm font-pop">
  by NK24 Website Team
</Typography>
</div>
  );
};
 
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
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
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
        <CustomTypography/>
    </footer>
  );
}