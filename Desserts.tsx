import  { useState } from 'react';
import { useCart } from './';
import data from './data.json';
import DessertItem from './src/components/DessertItem/DessertItem';
import Cart from './src/components/Cart/Cart';
import ConfirmOrder from './src/components/ConfirmOrder';

const Desserts = () => {
  const { cart, count, totalAmount, handleAddToCart, handleremoveCart } = useCart();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  };

  const handleStartNewOrder = () => {
    setIsOrderConfirmed(false);
  };

  return (
    <div className="m-0 md:px-10 px-4 py-12 bg-pink-100 flex flex-col lg:flex-row">
      <div className="lg:w-3/4 w-full">
        <h1 className="text-4xl py-10 font-bold">Desserts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.map((cake, index) => (
            <DessertItem
              key={index}
              cake={cake}
              index={index}
              cart={cart}
              handleAddToCart={handleAddToCart}
              handleremoveCart={handleremoveCart}
            />
          ))}
        </div>
      </div>

      <Cart
        cart={cart}
        count={count}
        totalAmount={totalAmount}
        handleConfirmOrder={handleConfirmOrder}
        handleRemoveFromCart={handleremoveCart}
      />

      {isOrderConfirmed && (
        <ConfirmOrder handleStartNewOrder={handleStartNewOrder} />
      )}
    </div>
  );
};

export default Desserts;
