import { Typography } from "@material-tailwind/react";
import Logo from '../assets/NK24logo.webp'
import React from "react";
import { useNavigate } from "react-router-dom";
const CustomTypography = () => {
  const nav=useNavigate()
  return (
    <div class='flex flex-row justify-center w-full' >
    <Typography color="white" className="text-center text-sm font-pop">
      Made with
    </Typography>
    <Typography color="red" className="text-center text-sm">
     &nbsp;❤&nbsp;
  </Typography>
  <a  className="text-center text-sm font-pop text-white underline" href="/credits" >
  by NK24 Website Team
</a>
</div>
  );
};
 
export default function Footer() {
  const nav=useNavigate()
  return (
    <footer className="w-full bg-black p-8 font-pop">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-black  text-center md:justify-between">
        <img src={Logo} alt="logo-ct" className="w-20" />
        <ul className="flex flex-wrap items-center gap-x-8">
          <li>
            <Typography
              as="a"
              onClick={() => {nav("/privacy")}}
              color="white"
              className="font-pop transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Privacy Policy
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              onClick={() => {nav("/terms")}}
              color="white"
              className="font-pop transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Terms and Conditions
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              onClick={() => {nav("/credits")}}
              color="white"
              className="font-pop transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Credits
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              onClick={() => {nav("/contact_us")}}
              color="white"
              className="font-pop transition-colors hover:text-blue-500 focus:text-blue-500"
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