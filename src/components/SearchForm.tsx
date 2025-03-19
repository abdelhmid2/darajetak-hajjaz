
import { useState } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { CalendarIcon, PlaneTakeoff, PlaneLanding, Users, Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { fadeUp } from '../utils/animations';

const cities = [
  { value: "CAI", label: "القاهرة" },
  { value: "ALY", label: "الإسكندرية" },
  { value: "LXR", label: "الأقصر" },
  { value: "ASW", label: "أسوان" },
  { value: "SSH", label: "شرم الشيخ" },
  { value: "HRG", label: "الغردقة" },
  { value: "DXB", label: "دبي" },
  { value: "RUH", label: "الرياض" },
  { value: "IST", label: "اسطنبول" },
  { value: "LHR", label: "لندن" },
  { value: "CDG", label: "باريس" },
  { value: "FCO", label: "روما" }
];

const SearchForm = () => {
  const [tab, setTab] = useState("roundtrip");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [fromDropdown, setFromDropdown] = useState(false);
  const [toDropdown, setToDropdown] = useState(false);

  return (
    <section className="container mx-auto px-4 py-16 relative z-10">
      <div className={`${fadeUp(100)} glass-card rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto`}>
        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-deep-blue mb-6 text-center">ابحث عن رحلتك</h2>
          
          <Tabs defaultValue="roundtrip" className="w-full" onValueChange={setTab}>
            <TabsList className="w-full mb-6 bg-gray-100">
              <TabsTrigger value="roundtrip" className="flex-1 data-[state=active]:bg-deep-blue data-[state=active]:text-white">
                ذهاب وعودة
              </TabsTrigger>
              <TabsTrigger value="oneway" className="flex-1 data-[state=active]:bg-deep-blue data-[state=active]:text-white">
                ذهاب فقط
              </TabsTrigger>
              <TabsTrigger value="multicity" className="flex-1 data-[state=active]:bg-deep-blue data-[state=active]:text-white">
                وجهات متعددة
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="roundtrip" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">من</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PlaneTakeoff size={20} className="text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 transition-all duration-300 focus-ring"
                      placeholder="اختر مدينة الإقلاع"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      onFocus={() => setFromDropdown(true)}
                      onBlur={() => setTimeout(() => setFromDropdown(false), 200)}
                    />
                    {fromDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
                        {cities.map((city) => (
                          <div 
                            key={city.value} 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setFrom(city.label);
                              setFromDropdown(false);
                            }}
                          >
                            {city.label} ({city.value})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">إلى</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PlaneLanding size={20} className="text-gray-500" />
                    </div>
                    <input 
                      type="text" 
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-deep-blue focus:ring-2 focus:ring-deep-blue/20 transition-all duration-300 focus-ring"
                      placeholder="اختر مدينة الوصول"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      onFocus={() => setToDropdown(true)}
                      onBlur={() => setTimeout(() => setToDropdown(false), 200)}
                    />
                    {toDropdown && (
                      <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-lg z-10 max-h-60 overflow-y-auto">
                        {cities.map((city) => (
                          <div 
                            key={city.value} 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setTo(city.label);
                              setToDropdown(false);
                            }}
                          >
                            {city.label} ({city.value})
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">عدد المسافرين</label>
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button 
                      className="px-4 py-3 text-gray-500 hover:text-deep-blue" 
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    >
                      -
                    </button>
                    <div className="flex-1 text-center">
                      <div className="flex items-center justify-center">
                        <Users size={18} className="text-gray-500 mr-2" />
                        <span>{passengers} مسافر</span>
                      </div>
                    </div>
                    <button 
                      className="px-4 py-3 text-gray-500 hover:text-deep-blue" 
                      onClick={() => setPassengers(passengers + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">تاريخ المغادرة</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal border border-gray-200 py-6",
                          !departDate && "text-gray-500"
                        )}
                      >
                        <CalendarIcon className="ml-2 h-4 w-4" />
                        {departDate ? format(departDate, "dd MMMM yyyy", { locale: ar }) : "اختر تاريخ المغادرة"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={departDate}
                        onSelect={setDepartDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                {tab === "roundtrip" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1 mr-1">تاريخ العودة</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal border border-gray-200 py-6",
                            !returnDate && "text-gray-500"
                          )}
                        >
                          <CalendarIcon className="ml-2 h-4 w-4" />
                          {returnDate ? format(returnDate, "dd MMMM yyyy", { locale: ar }) : "اختر تاريخ العودة"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                          disabled={(date) => date < (departDate || new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>
              
              <Button className="w-full bg-deep-blue hover:bg-deep-blue/90 text-white py-6 text-lg font-semibold tracking-wide">
                <Search size={20} className="mr-2" />
                البحث عن الرحلات المتاحة
              </Button>
            </TabsContent>
            
            <TabsContent value="oneway" className="mt-0">
              {/* Similar form to roundtrip but without return date */}
              <div className="p-6 text-center text-gray-500">استخدم نفس النموذج بدون تاريخ العودة</div>
            </TabsContent>
            
            <TabsContent value="multicity" className="mt-0">
              <div className="p-6 text-center text-gray-500">قريباً - إضافة وجهات متعددة لرحلتك</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SearchForm;
