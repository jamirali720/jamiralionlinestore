import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useGetLatestSportsQuery } from "../../redux/api/productsApi";
import { Card, Rate } from "antd";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const { data } = useGetLatestSportsQuery(undefined, {
    pollingInterval: 30000,
    skip: false,
  });

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,

    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="md:p-20 py-32 ">
      <Slider {...settings}>
        {data?.data?.slice(0, 10).map((product, index) => (
          <Card
            className="w-full max-w-full md:h-[600px] h-96 rounded-sm mx-auto border  border-[#E7E7E7]"
            key={index}
          >
            <div className="flex justify-center justify-items-center">
              <div className="w-full h-full">
                <div className="w-full md:h-[25vmax]">
                  <img
                    src={product?.image?.url}
                    alt={product.name}
                    className="object-fill w-full h-full hover:scale-110 ease-in-out duration-300 "
                  />
                </div>
                <div className="p-3">
                  <h1 className="text-start text-1xl font-semibold">
                    {product.name}
                  </h1>
                  <h3 className="text-start font-bold text-green-700">
                    $ {product.price}
                  </h3>
                  <div className="md:flex justify-between justify-items-center gap-1">
                    <Rate
                      allowHalf
                      count={5}
                      disabled
                      style={{ fontSize: 16 }}
                      value={product.ratings}
                    />
                    <span>(Reviews {product.reviews?.length} ) </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
