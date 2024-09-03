import React, { useState } from 'react'
import data from '../../data.json';
import { MdAddShoppingCart } from "react-icons/md";

const Desserts:React.FC = () => {
    const [cartCount, setCartCount] = useState(1)

    const handleCartCountAdd = () => {
        setCartCount(cartCount + 1);
    }
    const handleCartCountLess = () => {
        if (cartCount > 0) {
            setCartCount(cartCount - 1);
        }
        
    }
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
                        {cartCount == 0 ? 
                            <button
                                className='border rounded-full absolute z-10 px-3 py-2 bg-white text-sm flex gap-2'
                                style={{
                                    top: '50%',
                                    left: '50%',
                                    width: '120px', // Adjust width as needed
                                    height: '45px', // Adjust height as needed
                                    transform: 'translate(-50%, -50%)', // Center the button
                                    marginTop: '30px', // Adjust to move half of the button inside the image
                                    marginLeft: '0px', // Adjust to move half of the button inside the image
                                }}
                                onClick={handleCartCountAdd}
                            > 
                                <MdAddShoppingCart />Add To Cart
                            </button> :
                            <div className="">
                                <button onClick={handleCartCountLess}>-</button> {cartCount} <button onClick={handleCartCountAdd}>+</button>
                            </div>
                        
                        }
                        
                        <div className="pt-6">
                            <div>
                                <p key={index} className='gray'>{cake.category}</p>
                                <p key={index}>{cake.name}</p>
                            </div>
                            <p key={index}>${cake.price.toFixed(2)}</p>
                        </div>
                    </div>
                    
                    ))}
                </div>
            </div>
            
            <div className="w-1/4 m-14 h-20 bg-white">
                <h2>Order Now</h2>
                <div className=""></div>
                <div className=""></div>
                <div className="">
                    <button
                        className='rounded-full border px-14 py-4 bg-orange-500'
                    >Confirm Order</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Desserts