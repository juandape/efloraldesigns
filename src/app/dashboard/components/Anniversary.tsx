'use client';

import React, { useEffect } from 'react';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

const Anniversary: React.FC = () => {
  const { flowers, error } = useFetchFlowersByOccasion('anniversary');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const flowersItems = flowers
    .map((flower) => ({
      name: flower.imageName,
      image: flower.image,
      ocassion: flower.ocassion,
      position: flower.position || 1,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <Carousel
      items={flowersItems}
      title='Anniversary'
      elementId='slider'
      visibleClass='animate-slide-right'
      hiddenClass='block'
      limit={4}
    />
  );
};

export default Anniversary;
