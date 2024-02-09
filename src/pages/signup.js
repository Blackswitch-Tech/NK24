import React from 'react';

import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
 
const Signup = () => {
  return (
    <div className=" min-h-screen  flex flex-col items-center justify-center bg-[url('https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Signupbg.jpeg?alt=media&token=94bfbc88-78f6-4c8a-a749-19fcb76fe493')] bg-no-repeat bg-cover bg-fixed bg-center" >
      <div className=" bg-transparent bg-stone pt-8 rounded-2xl shadow-lg mx-4 sm:w-4/12 md:w-4/12 ">
      <Card color="transparent" shadow={false} className='mt-10 md:mt-10 lg:mt-16'>
      <Typography variant="h4" color="white">
        Sign Up
      </Typography>
      <Typography color="white" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="white" className="-mb-3">
            Name
          </Typography>
          <Input
            size="lg"
            placeholder="John Doe"
            className=" !border-white hover:!border-gray-900  text-white"
            labelProps={{
              className: "before:content-none after:content-none ",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Phone Number
          </Typography>
          <Input
            size="lg"
            placeholder="91 XXXXXXXXXX"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            College
          </Typography>
          <Input
            size="lg"
            placeholder="SAINTGITS College Of Engineering"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Branch
          </Typography>
          <Input
            size="lg"
            placeholder="Computer Science"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Semester
          </Typography>
          <Input
            size="lg"
            placeholder="VI"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900 text-white"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
        </div>
        <Checkbox
          label={
            <Typography
              variant="small"
              color="gray"
              className="flex items-center font-normal text-white font-pop"
            >
              I agree the
              <a
                href="#"
                className="font-medium transition-colors hover:text-gray-900 font-pop"
              >
                &nbsp;Terms and Conditions
              </a>
            </Typography>
          }
          containerProps={{ className: "-ml-2.5" }}
        />
        <Button className="mt-6" fullWidth>
          Sign Up
        </Button>
        <Typography className="mt-4 text-center font-normal text-gray-50">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-50 hover:text-red-600 font-pop">
            Sign In
          </a>
        </Typography>
      </form>
    </Card>
      </div>
        
        

    </div>
  );
};

export default Signup;
