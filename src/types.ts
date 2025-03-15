export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
  }
  
  export interface CartItem {
    id: number;
    title: string;
    price: number;
    quantity: number;
  }
  
  export interface CheckoutData {
    name: string;
    email: string;
    address: string;
  }