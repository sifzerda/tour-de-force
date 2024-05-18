import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
    };
  
    return (
      <Slider {...settings}>
        <div>
          <img src="image1.jpg" alt="Slide 1" />
        </div>
        <div>
          <img src="image2.jpg" alt="Slide 2" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 3" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 4" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 5" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 6" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 7" />
        </div>
        <div>
          <img src="image3.jpg" alt="Slide 8" />
        </div>
      </Slider>
    );
  }

  export default Carousel;