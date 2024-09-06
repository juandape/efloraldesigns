import React, { useEffect, useState } from 'react';
import Slider, { CustomArrowProps } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import ImageModal from '@/components/ImageModal';

interface Item {
  name: string;
  image: string;
}

interface CarouselProps {
  items: Item[];
  title: string;
  carouselDescription?: string;
  elementId: string;
  visibleClass: string;
  hiddenClass: string;
  limit?: number;
}

const NextArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className={`cursor-pointer hover:shadow hover:rounded-full absolute top-1/2 right-0 sm:-mr-20 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10`}
      onClick={onClick}
    >
      <MdArrowForwardIos className='w-6 h-6' />
      <span className='sr-only'>Next</span>
    </div>
  );
};

const PrevArrow: React.FC<CustomArrowProps> = (props) => {
  const { onClick } = props;
  return (
    <div
      className={`cursor-pointer hover:shadow hover:rounded-full absolute top-1/2 left-0 sm:-ml-20 pl-2 transform -translate-y-1/2 z-30 flex items-center justify-center h-10 w-10`}
      onClick={onClick}
    >
      <MdArrowBackIos className='w-6 h-6' />
      <span className='sr-only'>Previous</span>
    </div>
  );
};

const useScrollAnimation = (elementId: string, threshold = 0.5) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const element = document.getElementById(elementId);

      if (element) {
        const elementTop = element.offsetTop;
        const elementBottom = elementTop + element.offsetHeight;

        setIsVisible(
          scrollPosition > elementTop && window.scrollY < elementBottom
        );
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementId, threshold]);

  return isVisible;
};

const Carousel: React.FC<CarouselProps> = ({
  items,
  title,
  carouselDescription,
  elementId,
  visibleClass,
  hiddenClass,
  limit,
}) => {
  const sliderVisible = useScrollAnimation(elementId);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const displayedItems = limit ? items.slice(0, limit) : items;

  const settings = {
    dots: false,
    infinite: true,
    centerMode: true,
    focusOnSelect: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1180,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          centerMode: false,
          focusOnSelect: false,
        },
      },
    ],
  };

  return (
    <div
      id={elementId}
      className={`max-w-7xl mx-auto p-6 text-center transition-opacity ${
        sliderVisible ? visibleClass : hiddenClass
      }`}
    >
      <h2 className='text-xl sm:text-3xl text-center my-10 font-semibold'>
        {title}
      </h2>
      {carouselDescription && (
        <p className='text-lg text-center mb-10 font-semibold'>{carouselDescription}</p>
      )}
      <Slider {...settings}>
        {displayedItems.map((item, index) => (
          <div key={index} className='flex justify-center'>
            <img
              src={item.image}
              alt={item.name}
              className='w-80 h-80 object-cover shadow-lg mx-auto rounded-xl cursor-pointer'
              onClick={() => setSelectedItem(item)}
            />
            <p className='mt-5 text-lg'>{item.name}</p>
          </div>
        ))}
      </Slider>
      {selectedItem && (
        <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </div>
  );
};

export default Carousel;
