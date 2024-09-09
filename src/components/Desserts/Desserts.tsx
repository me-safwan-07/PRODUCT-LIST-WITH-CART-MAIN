import React, { useState, useEffect } from 'react';
import data from '../../../data.json';
import DessertItem from '../DessertItem/DessertItem';
import Cart from '../Cart/Cart';
import ConfirmOrder from '../ConfirmOrder';

const Desserts: React.FC = () => {
    const [cart, setCart] = useState<{ [key: number]: number }>({});
    const [count, setCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);

    useEffect(() => {
        // Calculate the total amount based on the cart items
        let total = 0;
        Object.keys(cart).forEach(index => {
            const itemIndex = +index;
            total += data[itemIndex].price * cart[itemIndex];
        });
        setTotalAmount(total);
    }, [cart]);

    const handleAddToCart = (index: number) => {
        setCart(prevCart => ({
            ...prevCart,
            [index]: (prevCart[index] || 0) + 1
        }));
        setCount(prevCount => prevCount + 1);
    };

    const handleremoveCart = (index: number) => {
        setCart(prevCart => ({
            ...prevCart,
            [index]: Math.max((prevCart[index] || 1) - 1, 0)
        }));
        setCount(prevCount => prevCount - 1);
    };

    const handleRemoveFromCart = () => { // in parentise if error add (index:number)
        setCart(prevCart => {
            const updatedCart = { ...prevCart };
            return updatedCart;
        });

        setCount(prevCart => {
            const totalCount = Object.values(prevCart).reduce((acc, quantity) => acc + quantity, 0);
            return totalCount;
        });
    };

    const handleConfirmOrder = () => {
        setIsOrderConfirmed(true);
    };

    const handleStartNewOrder = () => {
        setIsOrderConfirmed(false)
        setCart([])
    }
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
                handleRemoveFromCart={handleRemoveFromCart}
                handleConfirmOrder={handleConfirmOrder}
            />

            {isOrderConfirmed && (
                <ConfirmOrder
                    handleStartNewOrder = {handleStartNewOrder}
                />
            )}
        </div>
    );
};

export default Desserts;
