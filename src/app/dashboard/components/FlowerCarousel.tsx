'use client';

import React, { useEffect } from 'react';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';
interface FlowerCarouselProps {
  occasion: string;
  title: string;
  limit?: number;
  link: string;
}

const FlowerCarousel: React.FC<FlowerCarouselProps> = ({
  occasion,
  title,
  limit = 20,
  link
}) => {
  const { flowers, error } = useFetchFlowersByOccasion(occasion);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const flowersItems = flowers
    .map((flower) => ({
      name: flower.imageName,
      image: flower.image,
      occasion: flower.ocassion,
      position: flower.position || 1,
      description: flower.description,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <Carousel
      items={flowersItems}
      title={title}
      elementId={`slider-${occasion}`}
      visibleClass='animate-slide-right'
      hiddenClass='block'
      limit={limit}
      link={`/${link}`}
    />
  );
};

export default FlowerCarousel;
