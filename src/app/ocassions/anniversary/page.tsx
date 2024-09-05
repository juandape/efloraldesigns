'use client';

import HandleOccasion from '@/components/HandleOccasion';

const Anniversary = () => {
  const subcategories = {
    Bouquets:
      'Our anniversary bouquetes are the perfect gift for your loved one.',
    Gifts: 'Our anniversary gifts are the perfect gift for your loved one.',
  };

  return (
    <HandleOccasion
      occasion='anniversary'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
      headerImageAlt='Anniversary'
      headerTitle='Anniversary'
      headerText='Celebrate your anniversary with our beautiful flowers'
      subcategories={subcategories}
    />
  );
};

export default Anniversary;