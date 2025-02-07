import React from 'react';
import FlowerCarousel from './FlowerCarousel';

const Weddings: React.FC = () => {
  return (
    <FlowerCarousel
      occasion='weddings'
      title='Weddings'
      link='occasions/weddings'
    />
  );
};

export default Weddings;
