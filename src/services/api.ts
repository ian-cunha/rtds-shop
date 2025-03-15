import axios from 'axios';
import { Product } from '../types';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
});

export const getProducts = async (limit: number = 10, skip: number = 0): Promise<Product[]> => {
  const response = await api.get(`products?limit=${limit}&skip=${skip}`);
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await api.get(`products/${id}`);
  return response.data;
};