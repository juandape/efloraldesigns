'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/flowers`;

interface Flower {
  imageName: string;
  occasion: string;
  subcategory: string;
  image: string;
  position?: number;
  description?: string;
}

export const useFetchFlowersByOccasion = (occasion: string) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(url);
        const filteredFlowers = response.data.flowers.filter(
          (flower: Flower) => flower.occasion === occasion
        );
        setFlowers(filteredFlowers);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch flowers data.');
      }
    };

    fetchFlowers();
  }, [occasion]);

  return { flowers, error };
};
