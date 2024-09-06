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
                    className="text-sm text-red-500"
                    onClick={() => handleRemoveFromCart(index)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
