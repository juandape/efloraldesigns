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

export default function Weddings() {
  const { flowers, error } = useFetchFlowersByOccasion('weddings');

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  // Define un mapa de subcategorías y sus descripciones
  const subcategories: { [key: string]: string } = {
    Bouquets: 'Our wedding bouquets are the perfect gift for your loved one.',
    Decorations:
      'Our wedding decorations are the perfect touch for your celebration.',
    // Agrega más subcategorías aquí si es necesario
  };

  // Función para crear una lista de elementos a partir de flores
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
        imageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034086/efloraldesigns/122282e1a1f1846019313044fedbdbfb.png'
        imageAlt='Weddings'
        title='Weddings'
        headerText='We have the perfect flowers for your special day'
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
              key={subcategory} // Asegúrate de que cada Carousel tenga un ID único
              items={displayedItems}
              title={subcategory}
              carouselDescription={subcategories[subcategory]}
              elementId={`${subcategory.toLowerCase()}-slider`} // Genera un ID único
              visibleClass='animate-slide-right'
              hiddenClass='block'
              limit={10}
            />
          );
        })}
      </section>
    </div>
  );
}
