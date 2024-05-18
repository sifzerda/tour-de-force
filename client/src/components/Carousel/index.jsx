import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../App.css';

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
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-c-1.jpg" alt="Slide 1" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-im-1.webp" alt="Slide 2" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-ts-1.webp" alt="Slide 3" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-dl-1.jpg" alt="Slide 4" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-c-2.jpg" alt="Slide 5" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-im-2.webp" alt="Slide 6" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-ts-2.webp" alt="Slide 7" className="carousel-image" />
          </div>
        </div>
        <div className="carousel-slide">
          <div className="aspect-ratio-box">
            <img src="/images/c-dl-2.jpg" alt="Slide 8" className="carousel-image" />
          </div>
        </div>
      </Slider>
    );
  }
  
  export default Carousel;