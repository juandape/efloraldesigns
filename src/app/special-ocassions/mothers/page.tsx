'use client';

import HandleOccasion from '@/components/HandleOccasion';
import { mothersSubcategories } from '@/components/subcategories';

const Mothers = () => {
  return (
    <HandleOccasion
      occasion='mothers'
      headerImageSrc='https://res.cloudinary.com/dpvmwsbq8/image/upload/v1725034060/efloraldesigns/c1ba2e6a8db10b5b718c900c17105701.webp'
      headerImageAlt="Mother's Day"
      headerTitle="Mother's Day"
      headerText='Celebrate your Mothers with our beautiful flowers'
      subcategories={mothersSubcategories}
    />
  );
};

export default Mothers;
