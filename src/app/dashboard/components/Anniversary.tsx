import React from 'react';
import FlowerCarousel from './FlowerCarousel';

const Anniversary: React.FC = () => {
  return (
    <FlowerCarousel
      occasion='anniversary'
      title='Anniversary'
      link='occasions/anniversary'
    />
  );
};

export default Anniversary;
