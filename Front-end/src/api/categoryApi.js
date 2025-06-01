// src/api/categoryApi.js
const BASE_URL = 'http://localhost:6543/api';

export const fetchCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories`);
  return await res.json();
};

export const createCategory = async (data) => {
  const res = await fetch(`${BASE_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
};

export const updateCategory = async (id, data) => {
  const res = await fetch(`${BASE_URL}/category/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await res.json();
};

export const deleteCategory = async (id) => {
  const res = await fetch(`${BASE_URL}/category/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
};
