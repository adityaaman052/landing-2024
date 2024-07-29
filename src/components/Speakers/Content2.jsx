import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
  const gridRef = useRef(null);
  const gridItems = [
    { image: '/jane.jpg', description: "Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023." },
    { image: '/jane2.jpg', description: "Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023." },
    { image: '/jane.jpg', description: "Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023." },
    { image: '/jane2.jpg', description: "Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023." },
    { image: '/jane.jpg', description: "Her exceptional contributions to missile technology and defense systems have not only elevated India's capabilities but also inspired countless individuals, especially women, to pursue careers in science and technology. Dr. Thomas's keynote address promises to be an enlightening and inspiring start to our event, setting the stage for an incredible day of space exploration discussions and insights. Don't miss the opportunity to hear from this visionary leader at SpaceUp CUSAT on October 14, 2023." },
  ];

  useEffect(() => {
    const grid = gridRef.current;
    const items = Array.from(grid.children);

    const addListeners = (item, index) => {
      // Create floating animation
      gsap.to(item, {
        y: index % 2 === 0 ? 50 : -50,
        duration: 1,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        scrollTrigger: {
          trigger: grid,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });
      item.addEventListener('click', toggleGrid);
    };

    const removeListeners = (item) => {
      item.removeEventListener('click', toggleGrid);
    };

    items.forEach((item, index) => addListeners(item, index));

    return () => {
      items.forEach(removeListeners);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  const toggleGrid = (e) => {
    const item = e.currentTarget;
    const isExpanded = item.classList.contains('expanded');
    
    resetAllGridItems();

    if (!isExpanded) {
      gsap.to(item, { flex: '3', duration: 0.3, ease: 'power2.out' });
      gsap.to(item.querySelector('.description'), { opacity: 1, y: 0, duration: 0.3 });
      item.classList.add('expanded');
    }
  };

  const resetAllGridItems = () => {
    const items = Array.from(gridRef.current.children);
    items.forEach(item => {
      gsap.to(item, { flex: '1', duration: 0.3, ease: 'power2.out' });
      gsap.to(item.querySelector('.description'), { opacity: 0, y: 20, duration: 0.3 });
      item.classList.remove('expanded');
    });
  };

  return (
    <div ref={gridRef} className='cursor-pointer relative z-[102] flex w-screen h-screen'>
      {gridItems.map((item, i) => (
        <div 
          key={i}
          className='flex-1 relative overflow-hidden'
          style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className='bg-red-500 bg-opacity-50 h-full top-0 absolute bottom-0 left-0 w-full bg-opacity-50'>
            <h1 className='orbitron text-white text-4xl'></h1>
          </div>
          <div className="description absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4 opacity-0 transform translate-y-full">
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Content2;