
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingPage = () => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip' | 'multiCity'>('roundTrip');
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');
  
  const airports = [
    { code: 'CAI', name: 'القاهرة', country: 'مصر' },
    { code: 'HBE', name: 'الإسكندرية', country: 'مصر' },
    { code: 'LXR', name: 'الأقصر', country: 'مصر' },
    { code: 'ASW', name: 'أسوان', country: 'مصر' },
    { code: 'SSH', name: 'شرم الشيخ', country: 'مصر' },
    { code: 'HRG', name: 'الغردقة', country: 'مصر' },
    { code: 'DXB', name: 'دبي', country: 'الإمارات' },
    { code: 'RUH', name: 'الرياض', country: 'السعودية' },
    { code: 'IST', name: 'اسطنبول', country: 'تركيا' },
    { code: 'LHR', name: 'لندن', country: 'المملكة المتحدة' },
    { code: 'CDG', name: 'باريس', country: 'فرنسا' },
    { code: 'FCO', name: 'روما', country: 'إيطاليا' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      tripType,
      departureCity,
      arrivalCity,
      departureDate,
      returnDate,
      passengers,
      cabinClass
    });
    alert('تم إرسال طلب الحجز بنجاح!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto glass-card rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">حجز رحلة طيران</h2>
          
          <Tabs defaultValue="roundTrip" className="mb-8" onValueChange={(value) => setTripType(value as 'oneWay' | 'roundTrip' | 'multiCity')}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="roundTrip">ذهاب وعودة</TabsTrigger>
              <TabsTrigger value="oneWay">ذهاب فقط</TabsTrigger>
              <TabsTrigger value="multiCity">وجهات متعددة</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* من أين */}
              <div className="space-y-2">
                <label htmlFor="departure" className="block text-sm font-medium text-gray-700">من أين</label>
                <select 
                  id="departure"
                  className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                  value={departureCity}
                  onChange={(e) => setDepartureCity(e.target.value)}
                  required
                >
                  <option value="">اختر مدينة المغادرة</option>
                  {airports.map(airport => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name} ({airport.code}) - {airport.country}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* إلى أين */}
              <div className="space-y-2">
                <label htmlFor="arrival" className="block text-sm font-medium text-gray-700">إلى أين</label>
                <select 
                  id="arrival"
                  className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                  value={arrivalCity}
                  onChange={(e) => setArrivalCity(e.target.value)}
                  required
                >
                  <option value="">اختر مدينة الوصول</option>
                  {airports.map(airport => (
                    <option key={airport.code} value={airport.code}>
                      {airport.name} ({airport.code}) - {airport.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* تاريخ المغادرة */}
              <div className="space-y-2">
                <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">تاريخ المغادرة</label>
                <div className="relative">
                  <input 
                    type="date" 
                    id="departureDate"
                    className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    required
                  />
                  <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
              
              {/* تاريخ العودة */}
              {tripType === 'roundTrip' && (
                <div className="space-y-2">
                  <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">تاريخ العودة</label>
                  <div className="relative">
                    <input 
                      type="date" 
                      id="returnDate"
                      className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required={tripType === 'roundTrip'}
                    />
                    <Calendar className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
              )}
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* عدد المسافرين */}
              <div className="space-y-2">
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">عدد المسافرين</label>
                <select 
                  id="passengers"
                  className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>{num} {num === 1 ? 'مسافر' : 'مسافرين'}</option>
                  ))}
                </select>
              </div>
              
              {/* درجة الحجز */}
              <div className="space-y-2">
                <label htmlFor="cabinClass" className="block text-sm font-medium text-gray-700">درجة الحجز</label>
                <select 
                  id="cabinClass"
                  className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                >
                  <option value="economy">الدرجة السياحية</option>
                  <option value="premiumEconomy">الدرجة السياحية المتميزة</option>
                  <option value="business">درجة رجال الأعمال</option>
                  <option value="first">الدرجة الأولى</option>
                </select>
              </div>
              
              {/* رمز الخصم */}
              <div className="space-y-2 md:col-span-2">
                <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700">رمز الخصم (اختياري)</label>
                <input 
                  type="text" 
                  id="promoCode"
                  placeholder="أدخل رمز الخصم"
                  className="w-full rounded-lg border-gray-300 shadow-sm p-3 focus:border-deep-blue focus:ring focus:ring-deep-blue/20 transition-all"
                />
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button 
                type="submit" 
                className="bg-deep-blue hover:bg-deep-blue/90 text-white py-3 px-10 rounded-lg text-lg font-semibold transition-all"
              >
                ابحث عن الرحلات
              </Button>
            </div>
          </form>
          
          <div className="mt-8 text-center text-sm text-gray-500">
            بالضغط على "ابحث عن الرحلات"، فإنك توافق على <a href="#" className="text-deep-blue hover:underline">شروط الاستخدام</a> و<a href="#" className="text-deep-blue hover:underline">سياسة الخصوصية</a>
          </div>
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-deep-blue mb-6">عروض خاصة</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-deep-blue to-soft-blue flex items-center justify-center text-white font-bold text-xl p-4 text-center">
                خصم 15% على رحلات شرم الشيخ
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">استمتع بعطلة على شواطئ البحر الأحمر مع خصم خاص</p>
                <Button variant="outline" className="w-full border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white">
                  اكتشف العرض
                </Button>
              </div>
            </div>
            
            <div className="glass-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-gold to-sand flex items-center justify-center text-deep-blue font-bold text-xl p-4 text-center">
                رحلات أوروبا - ادفع ليلة واحصل على ليلة مجانًا
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">استكشف أوروبا مع عروض الإقامة الخاصة لعملاء الشركة</p>
                <Button variant="outline" className="w-full border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white">
                  اكتشف العرض
                </Button>
              </div>
            </div>
            
            <div className="glass-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="h-40 bg-gradient-to-r from-night-blue to-deep-blue flex items-center justify-center text-white font-bold text-xl p-4 text-center">
                باقات عائلية مخفضة لرحلات مصر الداخلية
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">خصومات تصل إلى 20% للعائلات على الرحلات الداخلية</p>
                <Button variant="outline" className="w-full border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white">
                  اكتشف العرض
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingPage;
