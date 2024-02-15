import React from "react";

const people = [
  {
    name: 'Fredy Somy',
    role: 'Head',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/fredy.jpg?alt=media&token=50ddba52-c5dd-4d57-a4c7-ac2fb09197ba',
  },
  {
    name: 'Abhishek J Mathew',
    role: 'Sub Head',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/abhishek.jpg?alt=media&token=50577a46-9895-4e7a-aac2-612da2b5cd9e',
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
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/bhagya.jpg?alt=media&token=960326a7-e9db-47fa-9449-40b081a2d549',
  },
  {
    name: 'Jobin Tom',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/jobin.jpg?alt=media&token=0379e882-f4e8-4ccf-9e94-1fea9c99164e',
  },
  {
    name: 'Jefrin Thomas',
    role: 'Data and Quality Testing',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/jefrin.jpg?alt=media&token=eee0aa80-d963-4ba3-a7f0-158a31b47e43',
  },
  {
    name: 'Bonny David',
    role: 'Data and Quality Testing',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/bonny.jpg?alt=media&token=7992bf5e-2377-4991-a5ed-ff5030e8e09a',
  },
  {
    name: 'Chandhrashekar C A',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/chandu.jpg?alt=media&token=f7d9e46b-4d4d-4415-88ea-129c5a1e8cf8',
  },
  {
    name: 'Mohammed Aadil',
    role: 'Developer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/aadil.jpg?alt=media&token=cb565f3b-2afb-4751-a7f2-c2ef7243d861',
  },
  {
    name: 'Ashish George',
    role: 'Designer',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/ashish.jpg?alt=media&token=65403ab9-bf60-4aed-a265-b3030c9a1fc4',
  },
  {
    name: 'Alaina Byju',
    role: 'Designer ',
    imageUrl:
      'https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/alaina.jpg?alt=media&token=11df67eb-24a3-416a-accc-0bb7bdd5006f',
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