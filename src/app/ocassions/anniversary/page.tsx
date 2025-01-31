'use client';

import HandleOccasion from '@/components/HandleOccasion';
import { anniversarySubcategories } from '@/components/subcategories';


const Anniversary = () => {

  return (
    <HandleOccasion
      occasion='anniversary'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
      headerImageAlt='Anniversary'
      headerTitle='Anniversary'
      headerText='Celebrate your anniversary with our beautiful flowers'
      subcategories={anniversarySubcategories}
    />
  );
};

export default Anniversary;