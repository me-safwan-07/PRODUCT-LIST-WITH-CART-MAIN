import React from 'react';
import CartItem from './CartItem';
// import data from '../../../data.json';

interface CartProps {
    cart: { [key: number]: number };
    count: number;
    totalAmount: number;
    handleRemoveFromCart: (index: number) => void;
    handleConfirmOrder: () => void;
}

const Cart: React.FC<CartProps> = ({
    cart,
    count,
    totalAmount,
    handleRemoveFromCart,
    handleConfirmOrder
}) => {
    return (
        <div className="lg:w-1/4 w-full h-max m-4 lg:m-14 bg-white p-4 rounded-lg">
            <h2>Your Cart ({count})</h2>
            {count > 0 ? (
                <>
                    {Object.keys(cart).map(index => (
                        <CartItem
                            key={index}
                            index={+index}
                            quantity={cart[+index]}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />
                    ))}
                    <hr />
                    <div className="flex justify-between pt-6">
                        <span>Order Amount</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                </>
            ) : (
                <h2>Your cart is empty</h2>
            )}
            <div className="pt-4">
                <button
                    className="rounded-full border px-6 py-2 bg-orange-500 w-full text-white"
                    onClick={handleConfirmOrder}
                >
                    Confirm Order
                </button>
            </div>
        </div>
    );
};

export default Cart;
