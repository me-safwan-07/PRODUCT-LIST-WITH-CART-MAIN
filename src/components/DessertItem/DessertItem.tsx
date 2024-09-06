import React from 'react';
import { MdAddShoppingCart } from "react-icons/md";

interface DessertItemProps {
    cake: {
        name: string;
        category: string;
        price: number;
        image: { mobile: string; tablet: string; desktop: string };
    };
    index: number;
    cart: { [key: number]: number };
    handleAddToCart: (index: number) => void;
    handleremoveCart: (index: number) => void;
}

const DessertItem: React.FC<DessertItemProps> = ({
    cake,
    index,
    cart,
    handleAddToCart,
    handleremoveCart
}) => {
    return (
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
                <p className="gray">{cake.category}</p>
                <p>{cake.name}</p>
                <p>${cake.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default DessertItem;
