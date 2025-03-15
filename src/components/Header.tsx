import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <nav className="bg-bgDark p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-textLight text-2xl font-bold hover:text-accent transition-colors duration-200">
          RTDS Shop
        </Link>
        <ul className="flex space-x-6 text-textLight">
          <li>
            <Link to="/" className="hover:text-accent transition-colors duration-200">
              Home
            </Link>
          </li>
          <li>
            <Link to="/cart" className="hover:text-accent transition-colors duration-200">
              Carrinho
            </Link>
          </li>
          <li>
            <Link to="/checkout" className="hover:text-accent transition-colors duration-200">
              Checkout
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;