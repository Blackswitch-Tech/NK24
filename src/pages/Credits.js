import React from "react";

const people = [
  {
    name: 'Fredy Somy',
    role: 'Head',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/fredy.jpg?alt=media&token=50ddba52-c5dd-4d57-a4c7-ac2fb09197ba',
  },
  {
    name: 'Abhishek',
    role: 'Sub Head',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Tom Sabu',
    role: 'Sub Head',
    imageUrl:
    'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/tom.jpg?alt=media&token=df99a7be-9991-40b0-9876-2cfd260b8aca',
  },
  {
    name: 'Abhinand M',
    role: 'Lead Designer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/abhi.jpg?alt=media&token=79955179-e34f-4d43-a6a2-752ab89eb055',
  },
  {
    name: 'Allen Bastian',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/basti.jpg?alt=media&token=e7e4e77b-8168-4b72-b5d3-fafa753864ba',
  },
  {
    name: 'Basil Rari',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/1000019819-fotor-bg-remover-20231207205747.png?alt=media&token=7698f0bf-8630-4804-ac3c-0e58257e955c'
  },
  {
    name: 'Bhagya Suresh',
    role: 'Developer',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Jobin Tom',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/jobin.jpg?alt=media&token=0379e882-f4e8-4ccf-9e94-1fea9c99164e',
  },
  {
    name: 'Mohammed Aadil',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/aadil.jpg?alt=media&token=cb565f3b-2afb-4751-a7f2-c2ef7243d861',
  },
  {
    name: 'Bonny David',
    role: 'Designer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/bonny.jpg?alt=media&token=7992bf5e-2377-4991-a5ed-ff5030e8e09a',
  },
  {
    name: 'Jefrin Thomas',
    role: 'Data and Quality Testing',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/jefrin.jpg?alt=media&token=eee0aa80-d963-4ba3-a7f0-158a31b47e43',
  },

]

export default function Credits() {
  return (
    <div className="bg-black py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold font-pop tracking-tight text-white sm:text-4xl">Meet the Team</h2>
          <p className="mt-6 text-lg leading-8 text-white font-pop">
            This is the team that worked hard under the guidance of Basil to develop this amazing, responsive, fast and fabulous website for Nakshatra 2024.
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