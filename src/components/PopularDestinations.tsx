
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DestinationCard from './DestinationCard';
import { fadeUp } from '../utils/animations';

const destinations = {
  domestic: [
    {
      id: 1,
      image: "/destinations/sharm.jpg",
      title: "شرم الشيخ",
      location: "جنوب سيناء، مصر",
      price: 2500,
      rating: 4.8,
      discount: 15,
      duration: "3-5 أيام",
      featured: true
    },
    {
      id: 2,
      image: "/destinations/luxor.jpg",
      title: "الأقصر",
      location: "صعيد مصر",
      price: 1800,
      rating: 4.7,
      duration: "2-4 أيام"
    },
    {
      id: 3,
      image: "/destinations/hurghada.jpg",
      title: "الغردقة",
      location: "البحر الأحمر، مصر",
      price: 2200,
      rating: 4.6,
      discount: 10,
      duration: "4-6 أيام"
    },
    {
      id: 4,
      image: "/destinations/aswan.jpg",
      title: "أسوان",
      location: "جنوب مصر",
      price: 1950,
      rating: 4.5,
      duration: "3-4 أيام"
    },
    {
      id: 5,
      image: "/destinations/alexandria.jpg",
      title: "الإسكندرية",
      location: "شمال مصر",
      price: 1200,
      rating: 4.4,
      duration: "2-3 أيام"
    }
  ],
  international: [
    {
      id: 6,
      image: "/destinations/dubai.jpg",
      title: "دبي",
      location: "الإمارات العربية المتحدة",
      price: 5500,
      rating: 4.9,
      discount: 8,
      duration: "5-7 أيام",
      featured: true
    },
    {
      id: 7,
      image: "/destinations/istanbul.jpg",
      title: "اسطنبول",
      location: "تركيا",
      price: 4800,
      rating: 4.7,
      duration: "4-6 أيام"
    },
    {
      id: 8,
      image: "/destinations/paris.jpg",
      title: "باريس",
      location: "فرنسا",
      price: 7200,
      rating: 4.8,
      discount: 5,
      duration: "5-8 أيام"
    },
    {
      id: 9,
      image: "/destinations/london.jpg",
      title: "لندن",
      location: "المملكة المتحدة",
      price: 7500,
      rating: 4.6,
      duration: "6-8 أيام"
    },
    {
      id: 10,
      image: "/destinations/rome.jpg",
      title: "روما",
      location: "إيطاليا",
      price: 6800,
      rating: 4.5,
      duration: "4-7 أيام"
    }
  ]
};

const dummyImages = {
  "/destinations/sharm.jpg": "https://images.unsplash.com/photo-1527142879-95b61a0916b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/luxor.jpg": "https://images.unsplash.com/photo-1562693316-7c331ebbe879?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/hurghada.jpg": "https://images.unsplash.com/photo-1559686043-aef1bf817a2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/aswan.jpg": "https://images.unsplash.com/photo-1612329869569-d73c7a93e0df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/alexandria.jpg": "https://images.unsplash.com/photo-1543159821-9262c2a68356?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/dubai.jpg": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/istanbul.jpg": "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/paris.jpg": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/london.jpg": "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  "/destinations/rome.jpg": "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
};

const PopularDestinations = () => {
  const [activeTab, setActiveTab] = useState("domestic");

  // Helper to get actual image URL
  const getImageUrl = (path: string) => dummyImages[path] || path;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className={`${fadeUp(100)} text-center max-w-3xl mx-auto mb-12`}>
        <span className="inline-block px-4 py-1 bg-deep-blue/10 text-deep-blue rounded-full text-sm font-medium mb-4">
          اكتشف العالم
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-deep-blue mb-4">أفضل الوجهات السياحية</h2>
        <p className="text-gray-600">
          اكتشف أجمل الوجهات السياحية في مصر والعالم واستمتع بباقات سفر متكاملة وعروض خاصة على الرحلات والإقامة
        </p>
      </div>
      
      <Tabs defaultValue="domestic" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger 
              value="domestic" 
              className={`px-6 py-2 ${activeTab === "domestic" ? "bg-deep-blue text-white" : ""}`}
            >
              داخل مصر
            </TabsTrigger>
            <TabsTrigger 
              value="international" 
              className={`px-6 py-2 ${activeTab === "international" ? "bg-deep-blue text-white" : ""}`}
            >
              خارج مصر
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="domestic" className="mt-0">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children`}>
            {destinations.domestic.map((dest) => (
              <DestinationCard
                key={dest.id}
                image={getImageUrl(dest.image)}
                title={dest.title}
                location={dest.location}
                price={dest.price}
                rating={dest.rating}
                discount={dest.discount}
                duration={dest.duration}
                featured={dest.featured}
              />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="international" className="mt-0">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children`}>
            {destinations.international.map((dest) => (
              <DestinationCard
                key={dest.id}
                image={getImageUrl(dest.image)}
                title={dest.title}
                location={dest.location}
                price={dest.price}
                rating={dest.rating}
                discount={dest.discount}
                duration={dest.duration}
                featured={dest.featured}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center mt-12">
        <button className="bg-transparent hover:bg-deep-blue text-deep-blue hover:text-white border border-deep-blue px-8 py-3 rounded-lg transition-colors duration-300 font-medium">
          عرض المزيد من الوجهات
        </button>
      </div>
    </section>
  );
};

export default PopularDestinations;
