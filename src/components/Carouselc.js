import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";
import { useNavigate } from "react-router-dom";
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 5,
    slidesToSlide: 3 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 767, min: 300 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const sliderImageUrl = [
  //First image url
  {
    url: "https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FCultural%20Events%2Fnirvananation.jpg?alt=media&token=000da85f-a57d-491a-8457-e12b6e4eb2ff",
    eventlink :  "/events/cultural/NK-34"
  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FCultural%20Events%2FSync%20Step.jpg?alt=media&token=430094be-335d-4174-9bed-de18f1d613e9",
    eventlink : "/events/cultural/NK-23"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FTechnical%20Events%2FRobo%20Soccer%20Final.jpg?alt=media&token=83c17492-f307-4190-bddf-28981906cf45",
    eventlink : "/events/cultural/NK-33"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FCultural%20Events%2Fvoiceofnk.jpg?alt=media&token=ac66e263-1149-48b8-915a-baffaa0bd684",
    eventlink : "/events/cultural/NK-58"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FTechnical%20Events%2Fchemhunt%20fixed.jpg?alt=media&token=67e2d909-be1b-475c-a661-854ef7f2bb29",
    eventlink : "/events/cultural/NK-57"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FCultural%20Events%2Fmr%26ms%20NAKSHATRA%202.jpg?alt=media&token=24ab91a7-f7db-48d3-908f-098e9ffcc4df",
    eventlink : "/events/cultural/NK-44"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/EventImages%2FCultural%20Events%2Finfinityglam.jpg?alt=media&token=7d189330-533d-4fbd-bfbf-37d95e83e3cd",
    eventlink : "/events/cultural/NK-05"

  },
  
 
  
];
const Carouselc = () => {
 const nav = useNavigate();
  return (
    <div className="parent">
      <Carousel
        responsive={responsive}
        autoPlay={true}
        swipeable={true}
        draggable={true}
        showDots={true}
        infinite={true}
        partialVisible={false}
        dotListClass="custom-dot-list-style"
      >
        {sliderImageUrl.map((imageUrl, index) => {
          return (
            <div className="slider" key={index}>
              <img src={imageUrl.url} alt="movie" className="hover:scale-110 transition duration-200 cursor-pointer" 
              onClick={()=>{nav(imageUrl.eventlink)}} />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Carouselc;
