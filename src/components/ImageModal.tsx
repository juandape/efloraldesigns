import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

interface ImageModalProps {
  item: {
    name: string;
    image?: string;
    video?: string;
    description?: string;
  };
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ item, onClose }) => {
  // Cerrar modal al presionar Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Cerrar modal al hacer clic fuera de la imagen
  const handleClickOutside = (e: React.MouseEvent) => {
    const modalContent = e.target as HTMLElement;
    if (modalContent && modalContent.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className='modal-overlay fixed h-screen inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50'
      onClick={handleClickOutside}
    >
      <div className='relative'>
        <img
          src={item.image}
          alt={item.name}
          className='w-80 h-80 md:w-[500px] md:h-[500px] object-cover px-5 mx-auto'
        />
        <h2 className='text-white text-xl font-bold mt-5 text-center'>
          {item.name}
        </h2>
        <p className='text-white text-lg mt-5 text-center'>
          {item.description}
        </p>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
