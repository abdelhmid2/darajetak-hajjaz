
import { useState, useEffect } from 'react';
import { PlaneTakeoff, MapPin } from 'lucide-react';
import { fadeUp } from '../utils/animations';

const destinations = [
  "القاهرة", "الإسكندرية", "الأقصر", "أسوان", "شرم الشيخ", "الغردقة", "دبي", "الرياض", "اسطنبول", "لندن", "باريس", "روما"
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const backgrounds = [
    'url(/hero-egypt.jpg)',
    'url(/hero-pyramids.jpg)',
    'url(/hero-nile.jpg)'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgrounds.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Slider */}
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out bg-cover bg-center"
          style={{
            backgroundImage: bg,
            opacity: currentImageIndex === index ? 1 : 0
          }}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-deep-blue/80 to-deep-blue/40" />
      
      {/* Content */}
      <div className="relative container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-3xl pt-32">
          <h5 className={`${fadeUp(100)} text-gold uppercase tracking-wider font-medium mb-2`}>استمتع برحلة لا تُنسى</h5>
          <h1 className={`${fadeUp(300)} text-5xl md:text-6xl font-bold text-white mb-6`}>
            اكتشف مصر واستمتع بأجمل<br />
            <span className="text-gold">الرحلات والوجهات</span>
          </h1>
          <p className={`${fadeUp(500)} text-white/90 text-lg mb-8 max-w-2xl`}>
            احجز رحلتك الآن واكتشف سحر مصر القديمة وجمال طبيعتها واستمتع بأفضل الخدمات على متن طائراتنا
          </p>
          
          {/* Quick Search */}
          <div className={`${fadeUp(700)} bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl`}>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PlaneTakeoff size={20} className="text-gray-500" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 transition-all duration-300 focus-ring"
                  placeholder="من أين تسافر؟"
                />
                <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto hidden group-focus-within:block">
                  {destinations.map((dest, i) => (
                    <div key={i} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{dest}</div>
                  ))}
                </div>
              </div>
              
              <div className="relative w-full md:w-1/3">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={20} className="text-gray-500" />
                </div>
                <input 
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 transition-all duration-300 focus-ring"
                  placeholder="إلى أين تتجه؟"
                />
              </div>
              
              <button className="w-full md:w-1/3 bg-deep-blue hover:bg-deep-blue/90 text-white py-3 px-6 rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg">
                ابحث عن الرحلات
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
        <div className="w-8 h-12 border-2 border-white/60 rounded-full flex justify-center">
          <div className="w-2 h-2 bg-white rounded-full mt-2 animate-bounce" />
        </div>
        <span className="text-white/60 mt-2 text-sm">اسحب للأسفل</span>
      </div>
    </section>
  );
};

export default Hero;
