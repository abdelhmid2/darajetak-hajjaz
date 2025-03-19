
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';
import { fadeUp } from '../utils/animations';

const Footer = () => {
  return (
    <footer className="bg-night-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 stagger-children`}>
          <div>
            <h3 className="text-2xl font-bold mb-6">
              <span className="text-gold">Air</span>Egypt
            </h3>
            <p className="text-gray-300 mb-6">
              نوفر لك تجربة سفر فريدة من نوعها مع أفضل العروض والخدمات للوجهات المحلية والعالمية. اكتشف معنا روعة السفر واستمتع برحلات لا تُنسى.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Facebook size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Instagram size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Twitter size={18} />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">روابط سريعة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  الرئيسية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  الرحلات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  العروض الخاصة
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  الوجهات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  تواصل معنا
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">خدمات الشركة</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  رحلات الطيران
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  حجوزات الفنادق
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  الباقات السياحية
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  تأجير السيارات
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gold transition-colors duration-300 flex items-center">
                  <span className="ml-2">›</span>
                  رحلات العمرة
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6">تواصل معنا</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 ml-3 text-gold flex-shrink-0" />
                <span className="text-gray-300">
                  1234 شارع النصر، مدينة نصر، القاهرة، جمهورية مصر العربية
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="ml-3 text-gold flex-shrink-0" />
                <span className="text-gray-300 hover:text-white transition-colors duration-300">
                  +20 123 456 7890
                </span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="ml-3 text-gold flex-shrink-0" />
                <a href="mailto:info@airegypt.com" className="text-gray-300 hover:text-white transition-colors duration-300">
                  info@airegypt.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 mb-8" />
        
        <div className={`${fadeUp(700)} flex flex-col md:flex-row justify-between items-center`}>
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} AirEgypt. جميع الحقوق محفوظة.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              سياسة الخصوصية
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              الشروط والأحكام
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-300">
              سياسة الاسترجاع
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
