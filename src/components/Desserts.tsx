import React from 'react'
import data from '../../data.json';

const Desserts:React.FC = () => {
    
  return (
    <>
        <div className="m-12 flex">
            <div className="w-3/4">
                <h2>Deserts</h2>
                <div className="grid grid-cols-3 grid-rows-3 gap-4">
                    {data.map((cake, index) => (
                        <div key={index} className="m-1 relative">
                            <img 
                                src={cake.image.desktop}
                                className="rounded-lg p-1 w-full h-auto"
                                alt={cake.name}
                            />
                            <button
                                className='border rounded-full absolute bottom-20 right-20 z-50 px-4 py-2 bg-white' /* Adjusted positioning */
                            >
                                Add To Cart
                            </button>
                            <div className="pt-6">
                                <div className="">
                                    <p key={index}>{cake.category}</p>
                                    <p key={index}>{cake.name}</p>
                                </div>
                                <p key={index}>${cake.price.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="w-1/4 border">
                <h2>Order Now</h2>
                <div className=""></div>
                <div className=""></div>
                <div className="">
                    <button>Add To cart</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Desserts