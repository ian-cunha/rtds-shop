import React, { useState } from 'react';
import { z } from 'zod';
import { CheckoutData } from '../types';

const checkoutSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres'),
});

const Checkout: React.FC = () => {
  const [formData, setFormData] = useState<CheckoutData>({ name: '', email: '', address: '' });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutData, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      checkoutSchema.parse(formData);
      console.log('Compra finalizada:', formData);
      setErrors({});
      alert('Compra finalizada com sucesso!');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error.formErrors.fieldErrors);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-textPrimary mb-8 text-center">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
        <div>
          <label className="block text-textPrimary font-medium mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
          />
          {errors.name && <p className="text-danger text-sm mt-1">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-textPrimary font-medium mb-1">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
          />
          {errors.email && <p className="text-danger text-sm mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-textPrimary font-medium mb-1">Endereço</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-textPrimary"
          />
          {errors.address && <p className="text-danger text-sm mt-1">{errors.address}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-textLight py-3 rounded-lg 
                     hover:bg-secondary hover:scale-105 hover:shadow-lg 
                     transition-all duration-200 active:animate-pulse-btn cursor-pointer"
        >
          Confirmar Pedido
        </button>
      </form>
    </div>
  );
};

export default Checkout;