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
    url: "https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Cultural%20Events%2FNIRVANA%20(Kriswin)-min.jpg?alt=media&token=ff6c626a-3137-4c50-8489-8f4c97189b8f",
    eventlink :  "/events/cultural/NK-34"
  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Cultural%20Events%2FSyncStep.jpeg?alt=media&token=97b7a01f-c930-4094-9bb0-3c13c5bc1e32",
    eventlink : "/events/cultural/NK-23"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Technical%20Events%2FRobo%20Soccer%20-min.jpg?alt=media&token=732fea49-d8d5-4bba-a86f-a6788cb18231",
    eventlink : "/events/cultural/NK-33"

  },
  {
    url:"https://firebasestorage.googleapis.com/v0/b/nakshatra-9c45c.appspot.com/o/Cultural%20Events%2FVoiceofNK%20(Kriswin)-min.jpg?alt=media&token=07c746b8-0455-45a9-83be-17eff75d342f",
    eventlink : "/events/cultural/NK-58"

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
