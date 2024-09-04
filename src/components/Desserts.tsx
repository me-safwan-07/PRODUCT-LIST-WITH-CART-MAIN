import React, { useState } from 'react';
import data from '../../data.json';
import { MdAddShoppingCart } from "react-icons/md";

const Desserts: React.FC = () => {
    // Track the cart items and their quantities
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [count, setCount] = useState(0)
    // Handler to add items to the cart
    const handleAddToCart = (index: number) => {
        setCart(prevCart => ({
            ...prevCart,
            [index]: (prevCart[index] || 0) + 1
        }));
        setCount(prevCount => prevCount + 1);
    };

    // Handler to remove items from the cart
    const handleRemoveFromCart = (index: number) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            if (updatedCart[index] > 1) {
                updatedCart[index] -= 1;
            } else {
                delete updatedCart[index];
            }
            return updatedCart;
        });
        setCount(prevCount => prevCount - 1);
    };

    console.log(cart)

    return (
        <>
            <div className="m-0 px-36 py-12 bg-pink-100 flex">
                <div className="w-3/4">
                    <h1 className='text-4xl py-10 font-bold'>Desserts</h1>
                    <div className="flex flex-row flex-wrap gap-4">
                        {data.map((cake, index) => (
                            <div key={index} className="m-1 w-1/4 h-auto relative rounded-sm">
                                <img
                                    src={cake.image.desktop}
                                    className="rounded-lg p-1 w-full h-auto"
                                    alt={cake.name}
                                />
                                {cart[index] ? (
                                    <div className="border rounded-full absolute z-10 px-3 py-2 bg-white text-sm flex gap-2"
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            width: '120px',
                                            height: '45px',
                                            transform: 'translate(-50%, -50%)',
                                            marginTop: '30px',
                                            marginLeft: '0px',
                                        }}>
                                        <button onClick={() => handleRemoveFromCart(index)}>-</button>
                                        {cart[index]}
                                        <button onClick={() => handleAddToCart(index)}>+</button>
                                    </div>
                                ) : (
                                    <button
                                        className='border rounded-full absolute z-10 px-3 py-2 bg-white text-sm flex gap-2'
                                        style={{
                                            top: '50%',
                                            left: '50%',
                                            width: '120px',
                                            height: '45px',
                                            transform: 'translate(-50%, -50%)',
                                            marginTop: '30px',
                                            marginLeft: '0px',
                                        }}
                                        onClick={() => handleAddToCart(index)}
                                    >
                                        <MdAddShoppingCart /> Add To Cart
                                    </button>
                                )}
                                <div className="pt-6">
                                    <div>
                                        <p className='gray'>{cake.category}</p>
                                        <p>{cake.name}</p>
                                    </div>
                                    <p>${cake.price.toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-1/4 m-14 h-max bg-white">
                    <h2>Your Cart ({count})</h2>
                        {Object.keys(cart).map(index => (
                            <div key={index} className="flex flex-col gap-2 justify-between py-2 px-4">
                                <span>{data[+index].name}</span>
                                <div className="flex gap-2">
                                    <span className='text-red-800 font-bold'>{cart[+index]}x</span>
                                    <span>${(data[+index].price).toFixed(2)}</span>
                                    <span>${(data[+index].price * cart[+index]).toFixed(2)}</span>
                                </div>
                                <hr />
                            </div>
                        ))}
                    <div className="">
                        <button
                            className='rounded-full border px-14 py-4 bg-orange-500'
                        >
                            Confirm Order
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Desserts;