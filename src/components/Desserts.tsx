import React, { useState, useEffect } from 'react';
import data from '../../data.json';
import { MdAddShoppingCart } from "react-icons/md";
// import {ReactComponent as Plus} from '../../public/assets/images/icon-increment-quantity.svg'
// import { ReactComponent as Empty } from '../../public/assets/images/illustration-empty-cart.svg';

const Desserts: React.FC = () => {
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [count, setCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        // Calculate the total amount based on the cart items
        let total = 0;
        Object.keys(cart).forEach(index => {
            const itemIndex = +index;
            total += data[itemIndex].price * cart[itemIndex];
        });
        setTotalAmount(total);
    }, [cart]);

    // useEffect(() => {
    //     
    // }, [cart, count, totalAmount]);

    // Handler to add items to the cart
    const handleAddToCart = (index: number) => {
        setCart(prevCart => {
            const updatedCart = {
                ...prevCart,
                [index]: (prevCart[index] || 0) + 1
            };

            return updatedCart
        });
        // setCount(isNaN(count) ? 0 : count);
        setCount(prevCount => prevCount + 1);
    };

    const handleremoveCart = (index: number) => {
        setCart(prevCart => {
            const updatedCart = {
                ...prevCart,
                [index]: Math.max((prevCart[index] || 1) - 1, 0)
            }
            
            return updatedCart
        });

        setCount(prevCount => prevCount - 1);
    }
    // Handler to remove items from the cart
    const handleRemoveFromCart = (index: number) => {
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
    
            // if (updatedCart[index] > 0) {
            //     updatedCart[index]--;
    
                // If the quantity for this item is now zero, remove it from the cart
                // if (updatedCart[index] === 0) {
                //     delete updatedCart[index];
                // }
            // }
    
            return updatedCart;
        });
    
        // Update the total count based on the updated cart
        setCount(prevCart => {
            const totalCount = Object.values(prevCart).reduce((acc, quantity) => acc + quantity, 0);
            return totalCount;
        });
    };

    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    const handleConfirmOrder = () => {
        setIsOrderConfirmed(true); // Show the confirmation message
    };
    

    return (
        <div className="m-0 md:px-36 px-4 py-12 bg-pink-100 flex flex-col lg:flex-row">
            <div className="lg:w-3/4 w-full">
                <h1 className="text-4xl py-10 font-bold">Desserts</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {data.map((cake, index) => (
                        <div key={index} className="m-1 relative rounded-sm">
                            
                            <img
                                srcSet={`${cake.image.mobile} 480w, ${cake.image.tablet} 768w, ${cake.image.desktop} 1200w`}
                                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
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
                                    <button onClick={() => handleremoveCart(index)}>-</button>
                                    {cart[index]}
                                    <button onClick={() => handleAddToCart(index)}>+</button>
                                </div>
                            ) : (
                                <button
                                    className="border rounded-full absolute z-10 px-3 py-2 bg-white text-sm flex gap-2"
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
                                    <p className="gray">{cake.category}</p>
                                    <p>{cake.name}</p>
                                </div>
                                <p>${cake.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {isOrderConfirmed && (
                        <div className="mt-4 p-4 bg-green-500 text-white rounded-md">
                            Order Confirmed!
                        </div>
            )}
            </div>

            <div className="lg:w-1/4 w-full h-max m-4 lg:m-14 bg-white p-4 rounded-lg">
                <h2>Your Cart ({count})</h2>
                {count > 0 ? (
                    <>
                        {Object.keys(cart).map(index => (
                            <div key={index} className="flex flex-col gap-2 justify-between py-2">
                                <span>{data[+index].name}</span>
                                <div className="flex justify-between items-center gap-2">
                                    <span className="text-red-800 font-bold">{cart[+index]}x</span>
                                    <span>${data[+index].price.toFixed(2)}</span>
                                    <span>${(data[+index].price * cart[+index]).toFixed(2)}</span>
                                    <button
                                        className="text-sm text-red-500"
                                        onClick={() => handleRemoveFromCart(+index)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#CAAFA7" d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"/></svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-between pt-6">
                            <span>Order Amount</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                    </>
                ) : (
                    // <Empty /> 
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
            
        </div>
    );
};

export default Desserts;
