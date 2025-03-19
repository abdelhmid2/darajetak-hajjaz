
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SearchForm from '../components/SearchForm';
import PopularDestinations from '../components/PopularDestinations';
import Footer from '../components/Footer';
import { useIntersectionObserver } from '../utils/animations';

const Index = () => {
  // Initialize animation observers
  useIntersectionObserver('.animate-on-scroll', 'animate-fade-up', { threshold: 0.1 });
  
  // Preload images for better UX
  useEffect(() => {
    const preloadImages = [
      'https://images.unsplash.com/photo-1527142879-95b61a0916b7',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
    ];
    
    preloadImages.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <SearchForm />
      <PopularDestinations />
      <Footer />
      
      {/* Back to top button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 bg-deep-blue text-white p-3 rounded-full shadow-lg hover:bg-deep-blue/90 transition-all duration-300 z-40"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default Index;
