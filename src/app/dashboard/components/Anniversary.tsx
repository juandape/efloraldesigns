import React from 'react';
import Carousel from '@/components/Carousel';
import flor9 from '@/images/flores/flor9.webp';
import flor10 from '@/images/flores/flor10.jpg';
import flor11 from '@/images/flores/flor11.webp';
import flor12 from '@/images/flores/flor12.webp';

const flowersItems = [
  {
    name: 'Rouses',
    image: flor9.src,
  },
  {
    name: 'Bouquet',
    image: flor10.src,
  },
  {
    name: 'White flowers',
    image: flor11.src,
  },
  {
    name: 'Sunflowers',
    image: flor12.src,
  },
  // Add more items as needed
];

const Anniversary: React.FC = () => {
  return (
    <Carousel
      items={flowersItems}
      title='Anniversary'
      elementId='slider'
      visibleClass='animate-slide-right'
      hiddenClass='block'
    />
  );
};

export default Anniversary;
