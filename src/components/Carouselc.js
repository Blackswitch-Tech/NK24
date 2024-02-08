import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./styles.css";
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
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Artle.jpg?alt=media&token=f5e0fc71-88c4-47a5-945c-537f48282b4f"
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Neo%20Graffiti.jpg?alt=media&token=50cc9156-5218-443c-96cc-6a12cbe3218a"
  },
  //Second image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Pencil%20Mania.jpg?alt=media&token=edf839e6-b381-4a91-8e1f-74ae52f4aa1a"
  },
  //Third image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Double%20Trouble.jpg?alt=media&token=d4a489b5-c967-4485-8cd8-b7fcbc751e95"
  },

  //Fourth image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Duo%20Dance.jpg?alt=media&token=93c5019d-651a-4140-a6ae-d538cf098378"
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/Sync%20Step1.jpg?alt=media&token=a5e09542-63aa-4d30-821a-4d43a22108ac"
  },
  //Second image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/BASKETBALL.png?alt=media&token=38ca6811-60c7-4c6f-a5df-d7085d535220"
  },
  //Third image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/COUNTY%20CRICKET.png?alt=media&token=aa7d8e74-97af-4d47-a0a1-fbd0c427a8c9"
  },

  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/FOOTBALL.png?alt=media&token=622da273-5c44-4b6c-9599-09ab37a67b32"
  }
];
const Carouselc = () => {
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
              <img src={imageUrl.url} alt="movie" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Carouselc;
