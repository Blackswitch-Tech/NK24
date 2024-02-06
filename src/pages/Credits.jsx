import React from "react";

function Credits() {
  // Array of team members
  const teamMembers = [
    {
      name: "Fredy",
      role: "Head",
      imgSrc:
        "https://cdn.discordapp.com/attachments/946018559421734914/1193508900851437649/android-chrome-192x192.png",
      insta: "a",
      github: "",
      linkedIn: "",
    },
    {
      name: "Tom",
      role: "Sub-Head",
      imgSrc:
        "https://cdn.discordapp.com/attachments/946018559421734914/1193508900851437649/android-chrome-192x192.png",
      insta: "",
      github: "",
      linkedIn: "",
    },
    {
      name: "Abhishek",
      role: "sub-head",
      imgSrc:
        "https://cdn.discordapp.com/attachments/946018559421734914/1193508900851437649/android-chrome-192x192.png",
      insta: "",
      github: "",
      linkedIn: "",
    },
    {
      name: "Jobin",
      role: "Dev",
      imgSrc:
        "https://cdn.discordapp.com/attachments/946018559421734914/1193508900851437649/android-chrome-192x192.png",
      insta: "",
      github: "",
      linkedIn: "",
    },
    {
      name: "Adil",
      role: "Dev",
      imgSrc:
        "https://cdn.discordapp.com/attachments/946018559421734914/1193508900851437649/android-chrome-192x192.png",
      insta: "",
      github: "",
      linkedIn: "",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center mt-10">
      <h1 className="w-full text-center sm:z-10 mb-4 p-10 text-4xl font-extrabold leading-none tracking-tight text-red-500 md:text-5xl lg:text-6xl dark:text-white">
        Our Team
      </h1>
      {/* Mapping over team members array */}
      {teamMembers.map((member, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
        >
          <div className="bg-gray-500 shadow-lg rounded-lg p-8 text-center">
            <div className="w-32 h-32 mx-auto mb-8 flex items-center justify-center">
              {/* <div className="w-32 h-32 bg-purple-400 rounded-full mx-auto mb-8 flex items-center justify-center"> */}
              <img
                src={member.imgSrc}
                alt={member.name}
                className="w-28 h-28 "
              />
            </div>
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-sm text-gray-500 uppercase mb-4">
              {member.role}
            </p>
            <div className="flex justify-center space-x-4">
              <a
                href={member.github}
                className="text-purple-500 hover:text-purple-600"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href={member.linkedIn}
                className="text-purple-500 hover:text-purple-600"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href={member.insta}
                className="text-purple-500 hover:text-purple-600"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Credits;
