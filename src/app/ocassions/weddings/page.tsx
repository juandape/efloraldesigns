'use client';

import HandleOccasion from '@/components/HandleOccasion';
import { weddingSubcategories } from '@/components/subcategories';

const Weddings = () => {
  return (
    <HandleOccasion
      occasion='weddings'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034086/efloraldesigns/122282e1a1f1846019313044fedbdbfb.png'
      headerImageAlt='Weddings'
      headerTitle='Weddings'
      headerText='We have the perfect flowers for your special day'
      subcategories={weddingSubcategories}
    />
  );
};

export default Weddings;
