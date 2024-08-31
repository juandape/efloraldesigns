'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/flowers`;

interface Flower {
  imageName: string;
  ocassion: string;
  image: string;
  position?: number;
}

export const useFetchFlowersByOccasion = (occasion: string, limit: number = 4) => {
  const [flowers, setFlowers] = useState<Flower[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlowers = async () => {
      try {
        const response = await axios.get(url);
        const filteredFlowers = response.data.flowers
          .filter((flower: Flower) => flower.ocassion === occasion)
          .slice(0, limit);
        setFlowers(filteredFlowers);
      } catch (error) {
        console.error(error);
        setError('Failed to fetch flowers data.');
      }
    };

    fetchFlowers();
  }, [occasion, limit]);

  return { flowers, error };
};
