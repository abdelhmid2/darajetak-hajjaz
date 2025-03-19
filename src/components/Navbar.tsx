
import { useState, useEffect } from 'react';
import { Menu, X, Globe, User, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { fadeIn } from '../utils/animations';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="/" className={`${fadeIn(100)} font-bold text-2xl ${isScrolled ? 'text-deep-blue' : 'text-white'}`}>
          <span className="text-gold">Air</span>Egypt
        </a>

        <nav className={`hidden lg:flex items-center space-x-8 ${isScrolled ? 'text-deep-blue' : 'text-white'}`}>
          <a href="#" className={`${fadeIn(200)} hover:text-gold transition-colors duration-300`}>الرئيسية</a>
          <a href="#" className={`${fadeIn(300)} hover:text-gold transition-colors duration-300`}>الرحلات</a>
          <a href="#" className={`${fadeIn(400)} hover:text-gold transition-colors duration-300`}>العروض</a>
          <a href="#" className={`${fadeIn(500)} hover:text-gold transition-colors duration-300`}>الوجهات</a>
          <a href="#" className={`${fadeIn(600)} hover:text-gold transition-colors duration-300`}>تواصل معنا</a>
        </nav>

        <div className={`hidden lg:flex items-center space-x-4 ${fadeIn(700)}`}>
          <div className="relative group">
            <button className={`flex items-center space-x-1 ${isScrolled ? 'text-deep-blue' : 'text-white'}`}>
              <Globe size={18} />
              <span>AR</span>
              <ChevronDown size={16} />
            </button>
            <div className="absolute right-0 mt-2 w-32 p-2 rounded-md shadow-lg bg-white opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-10">
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">English</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">العربية</a>
            </div>
          </div>

          <Button variant="outline" className={`button-hover-effect ${isScrolled ? 'text-deep-blue border-deep-blue hover:bg-deep-blue/10' : 'text-white border-white hover:bg-white/10'}`}>
            <User size={18} className="mr-2" />
            تسجيل الدخول
          </Button>
        </div>

        <button 
          className={`lg:hidden ${isScrolled ? 'text-deep-blue' : 'text-white'} ${fadeIn(800)}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute w-full`}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <a href="#" className="block py-2 text-deep-blue hover:text-gold transition-colors duration-300">الرئيسية</a>
          <a href="#" className="block py-2 text-deep-blue hover:text-gold transition-colors duration-300">الرحلات</a>
          <a href="#" className="block py-2 text-deep-blue hover:text-gold transition-colors duration-300">العروض</a>
          <a href="#" className="block py-2 text-deep-blue hover:text-gold transition-colors duration-300">الوجهات</a>
          <a href="#" className="block py-2 text-deep-blue hover:text-gold transition-colors duration-300">تواصل معنا</a>
          
          <hr className="my-2" />
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe size={18} />
              <span>AR</span>
            </div>
            <Button variant="default" className="bg-deep-blue hover:bg-deep-blue/90 w-full mt-2">
              <User size={18} className="mr-2" />
              تسجيل الدخول
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
