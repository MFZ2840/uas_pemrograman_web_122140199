import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, setCategories, fetchCategories };
};
