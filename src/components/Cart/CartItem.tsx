import React from 'react';
import data from '../../../data.json';

interface CartItemProps {
    index: number;
    quantity: number;
    handleRemoveFromCart: (index: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ index, quantity, handleRemoveFromCart }) => {
    return (
        <div className="flex flex-col gap-2 justify-between py-2">
            <span>{data[index].name}</span>
            <div className="flex justify-between items-center gap-2">
                <span className="text-red-800 font-bold">{quantity}x</span>
                <span>${data[index].price.toFixed(2)}</span>
                <span>${(data[index].price * quantity).toFixed(2)}</span>
                <button
                    className="text-sm text-black bg-red-299rounded-full"
                    onClick={() => handleRemoveFromCart(index)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                </button>
            </div>
        </div>
    );
};

export default CartItem;
