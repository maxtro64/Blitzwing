import React from 'react'
import { Link } from 'react-router-dom';

const Illustrations = () => {
  const images = [
    'pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 
    'pic5.jpg', 'pic6.jpg', 'pic7.jpg', 'pic8.jpg',
    'pic9.jpg', 'pic10.jpg', 'pic11.jpg', 'pic12.jpg',
    'pic13.jpg', 'pic14.jpg', 'pic15.jpg', 'pic16.jpg',
    'pic17.jpg', 'pic18.jpg'
  ];

  return (
    <section className='py-4 md:p-10'>
      <div className='px-18'>

      <h1 className='text-3xl font-bold mb-2'>DIGITAL ART</h1>
      <span className='text-lg text-gray-600'>Selection of Digital art.</span>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-6'>
        {images.map((image, index) => (
          <div key={index} className='overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'>
            <img 
              src={image} 
              className='w-full h-64  object-contain hover:scale-105 transition-transform duration-300'
              alt={`Digital art ${index + 1}`}
              loading='lazy'
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Illustrations
