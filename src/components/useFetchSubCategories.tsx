'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const url = `${BASE_URL}/api/sub-categories`;

interface SubCategory {
  occasionName: string;
  subCategories: string[];
}

const useFetchSubCategories = () => {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const response = await axios.get(url);
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
      }
    };

    fetchSubCategories();
  }, []);

  return { subCategories, error };
};
