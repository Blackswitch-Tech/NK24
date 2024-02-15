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
   "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },
  //Second image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },
  //Third image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },

  //Fourth image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },
  //Second image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },
  //Third image url
  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
  },

  {
    url:
      "https://firebasestorage.googleapis.com/v0/b/sampkle.appspot.com/o/WhatsApp%20Image%202024-02-15%20at%2022.51.22.jpeg?alt=media&token=01fb68e9-9262-4edb-8b49-13d21971f4db"
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
              <img src={imageUrl.url} alt="movie" className="hover:scale-110 transition duration-200 cursor-pointer" />
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};
export default Carouselc;
