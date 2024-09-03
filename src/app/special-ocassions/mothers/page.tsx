'use client';

import { useEffect } from 'react';
import TopHeader from '@/components/TopHeader';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

export default function Mothers() {
  const { flowers, error } = useFetchFlowersByOccasion('mothers');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const displayedItems = flowers
    .map((flower) => ({
      name: flower.imageName,
      image: flower.image,
      ocassion: flower.ocassion,
      position: flower.position || 1,
      description: flower.description,
    }))
    .sort((a, b) => a.position - b.position);

  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725035176/efloraldesigns/birthdaybanner_p3qvyh.jpg'
        imageAlt='Mothers'
        title="Mother's Day"
        headerText='Celebrate your birthday with our beautiful flowers'
      />
      <section>
        <Carousel
          items={displayedItems}
          title='Bouquetes'
          carouselDescription="Our Mother's Day bouquetes are the perfect gift for your loved one."
          elementId='slider'
          visibleClass='animate-slide-right'
          hiddenClass='block'
          limit={10}
        />
        <Carousel
          items={displayedItems}
          title='Flowers'
          carouselDescription="Our Mother's Day flowers are the perfect gift for your loved one."
          elementId='slider2'
          visibleClass='animate-slide-right'
          hiddenClass='block'
          limit={10}
        />
      </section>
    </div>
  );
}
