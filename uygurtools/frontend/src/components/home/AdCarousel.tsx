import React, { useState, useEffect } from 'react';
import { Carousel } from 'antd';
import { adCarouselData } from '../../data/toolsData';

const AdCarousel: React.FC = () => {
  return (
    <div className="carousel-section grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {adCarouselData.map((carousel) => (
        <CarouselCard key={carousel.id} data={carousel} />
      ))}
    </div>
  );
};

interface CarouselCardProps {
  data: {
    id: number;
    slides: {
      color: string;
      text: string;
    }[];
  };
}

const CarouselCard: React.FC<CarouselCardProps> = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % data.slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [data.slides.length]);

  return (
    <div className="carousel-card bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-32">
        {data.slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 flex items-center justify-center text-white text-lg font-medium ${
              index === activeIndex ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundColor: slide.color }}
          >
            <span>{slide.text}</span>
          </div>
        ))}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center">
          {data.slides.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 mx-1 rounded-full transition-colors duration-300 ${
                index === activeIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setActiveIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdCarousel; 