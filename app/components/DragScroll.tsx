import { useRef } from 'react';

interface DragScrollProps {
  children: React.ReactNode;
  className?: string;
}

const DragScroll: React.FC<DragScrollProps> = ({ children, className }) => {
  const scrollRef = useRef<HTMLDivElement>(null); // Referencia al contenedor desplazable
  let isDown = false; // Variables para manejar el estado
  let startX: number;
  let scrollLeft: number;

  // Se ejecuta cuando el usuario presiona el botón del ratón
  const handleMouseDown = (e: React.MouseEvent) => {
    isDown = true;
    if (!scrollRef.current) return;
    scrollRef.current.classList.add('active');
    startX = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = 'grabbing';
  };

  //se ejecuta cuando el cursor sale del área del contenedor
  const handleMouseLeave = () => {
    isDown = false;
    if (!scrollRef.current) return;
    scrollRef.current.classList.remove('active');
    scrollRef.current.style.cursor = 'grab';
  };

  // se ejecuta cuando el usuario suelta el botón del ratón
  const handleMouseUp = () => {
    isDown = false;
    if (!scrollRef.current) return;
    scrollRef.current.classList.remove('active');
    scrollRef.current.style.cursor = 'grab';
  };

  // maneja el movimiento del ratón mientras está presionado
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
