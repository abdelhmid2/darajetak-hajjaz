
/**
 * متجر الإلكتروني - ESTORE
 * الملف الرئيسي - نسخة محسنة واحترافية
 * 
 * تم تطويره بواسطة: فريق تطوير ESTORE
 * الإصدار: 2.0
 */

// استيراد الوحدات
import { initUI } from './modules/ui.js';
import { initCart } from './modules/cart.js';
import { initAllAnimations } from './modules/animations.js';

// فئة إدارة التطبيق الرئيسية
class AppManager {
  constructor() {
    this.initialized = false;
    this.version = '2.0.0';
    
    // تعيين العام الحالي في التذييل
    this.updateCopyright();
    
    // تفعيل الكاش المناسب للملفات
    this.setupCaching();
    
    // تهيئة حالة التوافق
    this.checkBrowserCompatibility();
    
    // إرفاق معالجي الأحداث
    this.attachEventListeners();
  }
  
  // طريقة بدء التشغيل
  init() {
    if (this.initialized) {
      console.warn('المتجر محمّل بالفعل! تجنب التهيئة المتكررة.');
      return;
    }
    
    console.log(`🚀 بدء تشغيل متجر ESTORE (الإصدار: ${this.version})`);
    
    // تشغيل جميع وحدات التطبيق
    this.initModules();
    
    // تفعيل الوضع الليلي إذا كان مفضلاً من قبل المستخدم
    this.setupDarkModeSupport();
    
    // تسجيل الخدمة العاملة للعمل في وضع عدم الاتصال (إذا كان مدعوماً)
    this.registerServiceWorker();
    
    // علامة لتأكيد التهيئة
    this.initialized = true;
    
    console.log('✅ تم تهيئة التطبيق بنجاح!');
  }
  
  // تهيئة جميع وحدات التطبيق
  initModules() {
    // تهيئة واجهة المستخدم
    initUI();
    
    // تهيئة سلة التسوق
    initCart();
    
    // تهيئة التأثيرات الحركية
    initAllAnimations();
    
    // تهيئة نموذج النشرة الإخبارية
    this.initNewsletterForm();
  }
  
  // تحديث حقوق النشر في التذييل
  updateCopyright() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
      currentYearSpan.textContent = new Date().getFullYear();
    }
  }
  
  // إعداد التخزين المؤقت
  setupCaching() {
    const timestamp = new Date().getTime();
    const cacheableLinks = document.querySelectorAll('link[rel="stylesheet"], script[src]');
    
    cacheableLinks.forEach(link => {
      const url = link.href || link.src;
      if (!url) return;
      
      const separator = url.includes('?') ? '&' : '?';
      const newUrl = `${url}${separator}_=${timestamp}`;
      
      if (link.href) {
        link.href = newUrl;
      } else if (link.src) {
        link.src = newUrl;
      }
    });
  }
  
  // التحقق من توافق المتصفح
  checkBrowserCompatibility() {
    // إضافة دعم للمتصفحات القديمة
    if (!('IntersectionObserver' in window)) {
      console.log('المتصفح الخاص بك لا يدعم IntersectionObserver. سيتم تحميل وظائف محدودة.');
      
      // تشغيل جميع التأثيرات مباشرة بدون انتظار التمرير
      const animatedElements = document.querySelectorAll('.scroll-animation-ready');
      animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
      });
      
      const productCards = document.querySelectorAll('.product-animate-ready');
      productCards.forEach(card => {
        card.classList.add('animate-product');
      });
    }
    
    // دعم خصائص CSS الحديثة
    if (window.CSS && !CSS.supports('(backdrop-filter: blur(10px))')) {
      // تطبيق تعديلات للمتصفحات التي لا تدعم backdrop-filter
      const header = document.querySelector('.header');
      if (header) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      }
    }
    
    // الكشف عن وضع استخدام الهاتف
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.body.classList.add('mobile-view');
    }
  }
  
  // تهيئة نموذج النشرة الإخبارية
  initNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = e.target.querySelector('input[type="email"]');
      if (!emailInput) return;
      
      const email = emailInput.value.trim();
      if (!email) {
        this.showNotification('الرجاء إدخال بريد إلكتروني صالح', 'error');
        return;
      }
      
      // التحقق من صحة البريد الإلكتروني
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        this.showNotification('الرجاء إدخال بريد إلكتروني صالح', 'error');
        return;
      }
      
      // محاكاة إرسال البيانات (في الإنتاج الفعلي، يجب إرسال البيانات إلى الخادم)
      e.target.innerHTML = '<div class="success-message">شكراً لاشتراكك في النشرة البريدية!</div>';
      
      // ظهور الرسالة بتأثير جميل
      const successMessage = e.target.querySelector('.success-message');
      if (successMessage) {
        successMessage.style.opacity = '0';
        successMessage.style.transform = 'translateY(10px)';
        successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
          successMessage.style.opacity = '1';
          successMessage.style.transform = 'translateY(0)';
        }, 10);
      }
      
      // إظهار إشعار للمستخدم
      this.showNotification('تم تسجيلك بنجاح في النشرة البريدية!', 'success');
    });
  }
  
  // إظهار إشعارات للمستخدم
  showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار إذا لم يكن موجودًا
    let notification = document.getElementById('app-notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.id = 'app-notification';
      notification.className = 'app-notification';
      document.body.appendChild(notification);
      
      // إضافة التنسيق للإشعار
      const style = document.createElement('style');
      style.textContent = `
        .app-notification {
          position: fixed;
          bottom: 20px;
          left: 20px;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.2);
          z-index: 9999;
          font-weight: 500;
          transform: translateY(20px);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
          max-width: 300px;
        }
        
        .app-notification.show {
          transform: translateY(0);
          opacity: 1;
        }
        
        .app-notification.success {
          background-color: #22c55e;
          color: white;
        }
        
        .app-notification.error {
          background-color: #ef4444;
          color: white;
        }
        
        .app-notification.info {
          background-color: #3b82f6;
          color: white;
        }
      `;
      document.head.appendChild(style);
    }
    
    // تعيين النوع والمحتوى
    notification.className = `app-notification ${type}`;
    notification.textContent = message;
    notification.classList.add('show');
    
    // إخفاء الإشعار بعد فترة
    setTimeout(() => {
      notification.classList.remove('show');
    }, 4000);
  }
  
  // دعم الوضع الليلي
  setupDarkModeSupport() {
    // التحقق من تفضيلات المستخدم
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // احترام تفضيلات المستخدم المخزنة
    const savedDarkMode = localStorage.getItem('darkMode');
    
    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
      document.body.classList.add('dark-mode');
    }
    
    // إضافة زر التبديل
    const addDarkModeToggle = () => {
      const actionsContainer = document.querySelector('.nav-actions');
      if (!actionsContainer) return;
      
      const darkModeToggle = document.createElement('div');
      darkModeToggle.className = 'action-item';
      darkModeToggle.innerHTML = `
        <button id="darkModeToggle" aria-label="تبديل الوضع الليلي">
          <i class="far fa-moon"></i>
        </button>
      `;
      
      actionsContainer.appendChild(darkModeToggle);
      
      // تحديث الأيقونة حسب الوضع الحالي
      const updateIcon = () => {
        const isDark = document.body.classList.contains('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (icon) {
          icon.className = isDark ? 'far fa-sun' : 'far fa-moon';
        }
      };
      
      updateIcon();
      
      // إضافة معالج الحدث للزر
      const toggle = darkModeToggle.querySelector('#darkModeToggle');
      if (toggle) {
        toggle.addEventListener('click', () => {
          document.body.classList.toggle('dark-mode');
          const isDark = document.body.classList.contains('dark-mode');
          localStorage.setItem('darkMode', isDark);
          updateIcon();
          this.showNotification(`تم تفعيل الوضع ${isDark ? 'الليلي' : 'النهاري'}`, 'info');
        });
      }
    };
    
    // إضافة الزر بعد تحميل DOM
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', addDarkModeToggle);
    } else {
      addDarkModeToggle();
    }
    
    // إضافة أنماط الوضع الليلي
    const darkModeStyles = document.createElement('style');
    darkModeStyles.textContent = `
      body.dark-mode {
        background-color: #121212;
        color: #e0e0e0;
      }
      
      body.dark-mode .header {
        background-color: #1a1a1a;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
      }
      
      body.dark-mode .nav-menu {
        background-color: #333;
      }
      
      body.dark-mode .category-card,
      body.dark-mode .product-card,
      body.dark-mode .offer-card,
      body.dark-mode .brand-card {
        background-color: #222;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
      }
      
      body.dark-mode .footer {
        background-color: #111;
      }
      
      body.dark-mode .search-bar input {
        background-color: #333;
        color: #e0e0e0;
        border-color: #444;
      }
      
      body.dark-mode .modal-content {
        background-color: #222;
      }
    `;
    document.head.appendChild(darkModeStyles);
  }
  
  // تسجيل Service Worker للعمل في وضع عدم الاتصال
  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('✓ تم تسجيل Service Worker بنجاح:', registration.scope);
          })
          .catch(error => {
            console.log('❌ فشل تسجيل Service Worker:', error);
          });
      });
    }
  }
  
  // إرفاق مستمعي الأحداث العامة
  attachEventListeners() {
    // استمع لتغييرات حجم النافذة
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // حدث تحميل الصفحة
    window.addEventListener('load', () => {
      // إخفاء شاشة التحميل إذا كانت موجودة
      const loader = document.querySelector('.page-loader');
      if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    });
    
    // رصد حالة الاتصال
    window.addEventListener('offline', () => {
      this.showNotification('أنت غير متصل بالإنترنت حالياً', 'error');
    });
    
    window.addEventListener('online', () => {
      this.showNotification('تم استعادة الاتصال بالإنترنت', 'success');
    });
  }
  
  // معالجة تغيير حجم النافذة
  handleResize() {
    // تحديث فئة العرض على الجسم
    if (window.matchMedia('(max-width: 768px)').matches) {
      document.body.classList.add('mobile-view');
    } else {
      document.body.classList.remove('mobile-view');
    }
  }
}

// إنشاء مثيل من مدير التطبيق
const app = new AppManager();

// تهيئة التطبيق عند اكتمال تحميل DOM
document.addEventListener('DOMContentLoaded', () => {
  app.init();
});

// تصدير مدير التطبيق للاستخدام في وحدات أخرى
export default app;
