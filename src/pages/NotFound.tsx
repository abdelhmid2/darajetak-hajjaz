
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center p-6">
        <div className="glass-card rounded-2xl shadow-xl overflow-hidden max-w-lg w-full mx-auto text-center p-8">
          <div className="animate-float">
            <div className="text-9xl font-bold text-deep-blue opacity-20 mb-4">404</div>
          </div>
          <h1 className="text-3xl font-bold text-deep-blue mb-4">الصفحة غير موجودة</h1>
          <p className="text-gray-600 mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم حذفها. يرجى التحقق من الرابط أو العودة إلى الصفحة الرئيسية.
          </p>
          <Button className="bg-deep-blue hover:bg-deep-blue/90 text-white py-6 px-8 rounded-lg inline-flex items-center gap-2">
            <Home size={18} />
            العودة إلى الصفحة الرئيسية
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
