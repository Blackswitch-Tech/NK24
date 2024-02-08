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
    <div className=" min-h-screen flex flex-col items-center justify-center bg-[url('https://i.pinimg.com/736x/d9/46/d3/d946d33dc95c1b560b13cf8a78b801ba.jpg')] bg-no-repeat bg-cover bg-fixed bg-center" >
      <div className="font-pop  mt-24 bg-red-600 bg-opacity-1 text-white text-center p-2 mb-4 rounded-2xl shadow-md sm:w-96 md:w-70 lg:w-100">
        <p>Note: Your chosen name will be displayed on the certificate</p>
      </div>
      <div className="bg-transsparent bg-stone pt-8 px-8 rounded-2xl shadow-lg sm:w-4/12 md:w-4/12 ">
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="white">
        Sign Up
      </Typography>
      <Typography color="white" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="white" className="-mb-3">
            Your Name
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-white focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Your Email
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
          />
          <Typography variant="h6" color="white" className="-mb-3">
            Password
          </Typography>
          <Input
            type="password"
            size="lg"
            placeholder="********"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <a href="#" className="font-medium text-gray-900">
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
