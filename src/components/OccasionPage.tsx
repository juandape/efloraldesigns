'use client';

import { useEffect, useState } from 'react';
import HandleOccasion from '@/components/HandleOccasion';
import useFetchSubcategories from '@/components/useFetchSubcategories';

interface OccasionPageProps {
  occasion: string;
  headerImageSrc: string;
  headerImageAlt: string;
  headerTitle: string;
  headerText: string;
}

const OccasionPage = ({
  occasion,
  headerImageSrc,
  headerImageAlt,
  headerTitle,
  headerText,
}: OccasionPageProps) => {
  const occasions = useFetchSubcategories();
  const [filteredSubcategories, setFilteredSubcategories] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const occasionCategories = occasions
      .filter((item) => item.occasion === occasion)
      .flatMap((item) => item.subCategories);

    const subcategoriesObject = occasionCategories.reduce((acc, subcategory) => {
      acc[subcategory.name] = subcategory.description || '';
      return acc;
    }, {} as { [key: string]: string });

    setFilteredSubcategories(subcategoriesObject);
  }, [occasions, occasion]);

  return (
    <HandleOccasion
      occasion={occasion}
      headerImageSrc={headerImageSrc}
      headerImageAlt={headerImageAlt}
      headerTitle={headerTitle}
      headerText={headerText}
      subcategories={filteredSubcategories}
    />
  );
};

export default OccasionPage;
