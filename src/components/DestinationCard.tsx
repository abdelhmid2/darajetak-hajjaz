
import { useState } from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

interface DestinationCardProps {
  image: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  discount?: number;
  duration?: string;
  featured?: boolean;
}

const DestinationCard = ({
  image,
  title,
  location,
  price,
  rating,
  discount,
  duration = "3-5 أيام",
  featured = false
}: DestinationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        relative overflow-hidden rounded-xl shadow-lg transition-all duration-500 
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''} 
        transform hover:-translate-y-2 hover:shadow-xl
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className={`
            w-full h-full object-cover transition-transform duration-700 ease-in-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        
        {discount && (
          <div className="absolute top-4 right-4 bg-gold text-white px-3 py-1 rounded-full text-sm font-bold">
            خصم {discount}%
          </div>
        )}
        
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
              <div className="flex items-center text-white/80 text-sm">
                <MapPin size={14} className="mr-1" />
                <span>{location}</span>
              </div>
            </div>
            <div className="text-right">
              {discount ? (
                <>
                  <span className="text-white/70 line-through text-sm">{price} ج.م</span>
                  <div className="text-white font-bold text-lg">
                    {Math.round(price * (1 - discount / 100))} ج.م
                  </div>
                </>
              ) : (
                <div className="text-white font-bold text-lg">
                  {price} ج.م
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Info & Action */}
      <div className="bg-white p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Calendar size={16} className="text-deep-blue mr-2" />
            <span className="text-gray-600 text-sm">{duration}</span>
          </div>
          <div>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-md">
              <span className="text-yellow-600 font-medium mr-1">{rating}</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.267 2.767a1 1 0 01-1.453-1.054l1.006-5.866-4.26-4.147a1 1 0 01.554-1.705l5.88-.855 2.63-5.33a1 1 0 011.788 0l2.63 5.33 5.88.855a1 1 0 01.554 1.705l-4.26 4.147 1.006 5.866a1 1 0 01-1.453 1.054L10 15.585z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <button 
          className={`
            w-full py-2 rounded-lg transition-all duration-300 flex items-center justify-center
            ${isHovered 
              ? 'bg-deep-blue text-white' 
              : 'bg-gray-100 text-deep-blue'}
          `}
        >
          احجز الآن
          <ArrowRight size={16} className="mr-2" />
        </button>
      </div>
    </div>
  );
};

export default DestinationCard;
