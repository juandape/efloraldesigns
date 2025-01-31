'use client';

import { useEffect } from 'react';
import TopHeader from '@/components/TopHeader';
import Carousel from '@/components/Carousel';
import { useFetchFlowersByOccasion } from '@/components/useFetchFlowersByOcassion';

interface Flower {
  _id: string;
  imageName: string;
  image: string;
  ocassion: string;
  subcategory: string;
  position?: number;
  description?: string;
}

interface HandleOccasionProps {
  occasion: string;
  headerImageSrc: string;
  headerImageAlt: string;
  headerTitle: string;
  headerText: string;
  subcategories: { [key: string]: string };
}

const HandleOccasion: React.FC<HandleOccasionProps> = ({
  occasion,
  headerImageSrc,
  headerImageAlt,
  headerTitle,
  headerText,
  subcategories = {},
}) => {
  const { flowers, error } = useFetchFlowersByOccasion(occasion);

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  const createDisplayedItems = (items: Flower[]) =>
    items
      .map((flower) => ({
        _id: flower._id || '',
        name: flower.imageName,
        image: flower.image,
        ocassion: flower.ocassion,
        subcategory: flower.subcategory,
        position: flower.position || 1,
        description: flower.description,
      }))
      .sort((a, b) => a.position - b.position);

  return (
    <div className='mb-10'>
      <TopHeader
        imageSrc={headerImageSrc}
        imageAlt={headerImageAlt}
        title={headerTitle}
        headerText={headerText}
      />
      <section>
        {Object.keys(subcategories).map((subcategory) => {
          const filteredFlowers = flowers.filter(
            (flower) => flower.subcategory === subcategory
          );
          const displayedItems = createDisplayedItems(
            filteredFlowers as Flower[]
          );

          return (
            <Carousel
              key={subcategory}
              items={displayedItems}
              title={subcategory}
              carouselDescription={subcategories[subcategory]}
              elementId={`${subcategory.toLowerCase()}-slider`}
              visibleClass='animate-slide-right'
              hiddenClass='block'
              limit={30}
            />
          );
        })}
      </section>
    </div>
  );
};

export default HandleOccasion;
