import { useRef } from 'react';

interface DragScrollProps {
  children: React.ReactNode;
  className?: string;
}

const DragScroll: React.FC<DragScrollProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  let isDown = false;
  let startX: number;
  let scrollLeft: number;

  // Funciones de manejo de arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    if (!scrollRef.current) return;
    scrollRef.current.classList.add('active');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing'; 
  };

  const handleMouseLeave = () => {
    isDown = false;
    if (!scrollRef.current) return;
    scrollRef.current.classList.remove('active');
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    isDown = false;
    if (!scrollRef.current) return;
    scrollRef.current.classList.remove('active');
    scrollRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // velocidad desplazamiento
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      ref={scrollRef}
      className={`${className} scroll-container`}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      style={{ cursor: 'grab' }} 
    >
      {children}
    </div>
  );
};

export default DragScroll;
