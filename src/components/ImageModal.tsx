import React from 'react';
import ReactDOM from 'react-dom';

interface ImageModalProps {
  item: {
    name: string;
    image: string;
    description?: string;
  };
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ item, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed h-screen inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover px-5" />
        <p className="text-white text-lg mt-4">{item.description}</p>
        <button
          className="absolute top-4 right-6 text-blue-sky text-2xl font-bold"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ImageModal;
