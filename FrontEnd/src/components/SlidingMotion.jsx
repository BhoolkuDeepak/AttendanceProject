import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// eslint-disable-next-line react/prop-types
function SlidingMotion({ items = [], renderItem, autoSlide = true, interval = 2000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(null);

  useEffect(() => {
    if (autoSlide && items.length > 1 && !isHovered) {
      const slideInterval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, interval);
      return () => clearInterval(slideInterval);
    }
  }, [items.length, isHovered, currentIndex]);

  // const goToItem = (index) => {
  //   setCurrentIndex(index);
  // };

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const updateIndex = (delta) => {
    setCurrentIndex((prevIndex) => (prevIndex + delta + items.length) % items.length);
  };
  
  const handleTouchMove = (e) => {
    if (!startX) return;
    const diffX = e.touches[0].clientX - startX;
    if (diffX > 50) {
      updateIndex(-1);
    } else if (diffX < -50) {
      updateIndex(1);
    }
    setStartX(null);
  };
  
  const handleDragEnd = (event, info) => {
    if (info.offset.x > 50) {
      updateIndex(-1);
    } else if (info.offset.x < -50) {
      updateIndex(1);
    }
  };
  

  //if else can be converted to function

  const getPositionStyle = (index) => {
    if (index === currentIndex) return "z-10 scale-110 opacity-100";
    if (index === (currentIndex - 1 + items.length) % items.length) return "z-0 scale-95 opacity-80 -translate-x-10";
    if (index === (currentIndex + 1) % items.length) return "z-0 scale-95 opacity-80 translate-x-10";
    return "hidden";
  };

  return (
    <div 
      className="relative w-full max-w-lg min-h-40 flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      {items.length === 0 ? (
        <p className="text-center text-gray-500">No items available.</p>
      ) : (
        <div className="relative flex items-center justify-center w-full h-full">
          {items.map((item, index) => (
            <motion.div 
              key={item?.memberId || item?.eventId || index} 
              className={`absolute transition-all duration-700 ${getPositionStyle(index)}`}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {renderItem(item)}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SlidingMotion;
