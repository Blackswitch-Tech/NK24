import React from "react";

const people = [
  {
    name: 'Fredy Somy',
    role: 'Head',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Ffredy.jpg?alt=media&token=d182265e-c938-4561-9b4c-665529373cbd',
  },
  {
    name: 'Abhishek J Mathew',
    role: 'Sub Head',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fabhishek.jpg?alt=media&token=f22be033-a86c-4248-b3b9-ce193d832916',
  },
  {
    name: 'Tom Sabu',
    role: 'Sub Head',
    imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Ftom.jpg?alt=media&token=e4f26d9b-6b62-410c-addc-509424fba58a',
  },
  {
    name: 'Abhinand M',
    role: 'Lead Designer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fabhi.jpg?alt=media&token=b3c690e0-6efe-4d57-af13-835c5358d412',
  },
  {
    name: 'Allen Bastian',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fbasti.jpg?alt=media&token=35062ddd-f504-493c-81d2-7b3ccfd99e83',
  },
  {
    name: 'Basil Rari',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2FBasil.png?alt=media&token=861ec40e-e6f4-4f0f-9b8d-248082324853'
  },
  {
    name: 'Bhagya Suresh',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fbhagya.jpg?alt=media&token=c8a9ede9-9fae-4290-8b47-c290849a21ff',
  },
  {
    name: 'Jobin Tom',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fjobin.jpg?alt=media&token=5c2d3a5f-5e5e-479e-b09a-ec4160776215',
  },
  {
    name: 'Jefrin Thomas',
    role: 'Data and Quality Testing',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fjefrin.jpg?alt=media&token=39b3b8b1-13f3-4453-81c1-f518edc5c067',
  },
  {
    name: 'Bonny David',
    role: 'Data and Quality Testing',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fbonny.jpg?alt=media&token=28cf6666-2ccd-49c7-b148-89938bcefeb6',
  },
  {
    name: 'Chandhrashekar C A',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fchandu.jpg?alt=media&token=1b75b0fb-cf71-4c51-b20d-e79efca2a13d',
  },
  {
    name: 'Mohammed Aadil',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Faadil.jpg?alt=media&token=28bf4a9f-fd7b-403d-af95-2a1de760b36e',
  },
  {
    name: 'Ashish George',
    role: 'Designer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Fashish.jpg?alt=media&token=97c73dba-0b74-40ba-a381-5c87660800bd',
  },
  {
    name: 'Alaina Baiju',
    role: 'Designer ',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Credits%2Falaina.jpg?alt=media&token=661b56c7-5f04-47a9-9b88-e228312c6d6a',
  },

]

export default function Credits() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold font-pop tracking-tight text-white sm:text-4xl">Meet the Team</h2>
          <p className="mt-6 text-lg leading-8 text-white font-pop">
          Discover the dedicated team powering Nakshatra 2024's online presence. 
          From project management to web development, content curation, SEO, and UX/UI design, each member plays a vital role. 
          
          </p> 
        </div>
        <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6 text-white">
                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-white font-pop">{person.name}</h3>
                  <p className="text-sm font-semibold leading-6 text-white font-pop">{person.role}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}