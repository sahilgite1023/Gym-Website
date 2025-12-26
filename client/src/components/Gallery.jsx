import React, { useState, useEffect } from 'react';
import api from '../utils/api';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const response = await api.get('/upload/images');
      setImages(response.data.images);
    } catch (error) {
      console.error('Error loading images:', error);
      // Use temporary workout photos from Unsplash
      setImages([
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&q=80',
        'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80',
        'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=800&q=80',
        'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&q=80',
        'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&q=80'
      ]);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="gallery" className="py-16 md:py-24 bg-gym-darker">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gym-light mb-4">
            Workout Gallery
          </h2>
          <p className="text-gym-light/70 text-lg">See our members in action</p>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gym-accent border-t-transparent"></div>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {images.map((image, index) => (
              <div 
                key={index} 
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border-2 border-gym-accent/20 hover:border-gym-accent/60 transition-all duration-300"
                onClick={() => openModal(image)}
              >
                <img 
                  src={image} 
                  alt={`Gym ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x400/2d2d2d/ffffff?text=Gym+${index + 1}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gym-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                      <span className="font-semibold">View</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gym-light py-12">
            <p>No images available in gallery.</p>
          </div>
        )}
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" 
          onClick={closeModal}
        >
          <button 
            className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-gym-accent rounded-full text-white text-2xl hover:scale-110 transition-transform z-10"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-6xl max-h-[90vh] animate-scaleIn">
            <img 
              src={selectedImage} 
              alt="Enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600/2d2d2d/ffffff?text=Gym+Image';
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;