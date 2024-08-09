import React from 'react';
import Carousel from './Carousel';
import logo from '@/images/logo.png';
import flor1 from '@/images/flores/flor1.jpeg';
import flor2 from '@/images/flores/flor2.webp';
import flor3 from '@/images/flores/flor3.jpg';
import flor4 from '@/images/flores/flor4.jpg';

const flowersItems = [
  {
    name: 'Bouquet',
    image: flor1.src,
  },
  {
    name: 'Table Centerpiece',
    image: flor2.src,
  },
  {
    name: 'Candle Holder',
    image: flor3.src,
  },
  {
    name: 'Wall Decor',
    image: flor4.src,
  },
  // Add more items as needed
];

const Weddings: React.FC = () => {
  return (
    <Carousel
      items={flowersItems}
      title='Weddings'
      elementId='slider'
      visibleClass='animate-slide-right'
      hiddenClass='block'
    />
  );
};

export default Weddings;
