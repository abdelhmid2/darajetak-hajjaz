
/**
 * متجر الإلكتروني - ESTORE
 * الملف الرئيسي
 */

// استيراد الوحدات
import { initUI } from './modules/ui.js';
import { initCart } from './modules/cart.js';
import { initAllAnimations } from './modules/animations.js';

// تهيئة السنة الحالية في التذييل
const currentYearSpan = document.getElementById('currentYear');
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// تهيئة البصمة الزمنية للتخزين المؤقت للملفات
function initCaching() {
  const timestamp = new Date().getTime();
  const scriptLinks = document.querySelectorAll('script[src]');
  const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
  
  // تحديث روابط CSS
  cssLinks.forEach(link => {
    if (link.href.includes('?')) {
      link.href = `${link.href}&_=${timestamp}`;
    } else {
      link.href = `${link.href}?_=${timestamp}`;
    }
  });
  
  // تحديث روابط JavaScript
  scriptLinks.forEach(script => {
    if (script.src.includes('?')) {
      script.src = `${script.src}&_=${timestamp}`;
    } else {
      script.src = `${script.src}?_=${timestamp}`;
    }
  });
}

// تهيئة نموذج النشرة الإخبارية
function initNewsletterForm() {
  const newsletterForm = document.querySelector('.newsletter-form');
  if (!newsletterForm) return;
  
  newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const emailInput = this.querySelector('input[type="email"]');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    if (!email) {
      alert('الرجاء إدخال بريد إلكتروني صالح');
      return;
    }
    
    // إظهار رسالة نجاح (في التطبيق الحقيقي سيتم إرسال البيانات إلى الخادم)
    this.innerHTML = '<div class="success-message">شكراً لاشتراكك في النشرة البريدية!</div>';
    
    // ظهور الرسالة بتأثير جميل
    const successMessage = this.querySelector('.success-message');
    if (successMessage) {
      successMessage.style.opacity = '0';
      successMessage.style.transform = 'translateY(10px)';
      successMessage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      
      setTimeout(() => {
        successMessage.style.opacity = '1';
        successMessage.style.transform = 'translateY(0)';
      }, 10);
    }
  });
}

// تهيئة التوافق مع المتصفحات القديمة
function initCompatibility() {
  // إضافة دعم للمتصفحات التي لا تدعم IntersectionObserver
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
  
  // دعم خصائص CSS الحديثة للمتصفحات القديمة
  if (!CSS.supports('(backdrop-filter: blur(10px))')) {
    // تطبيق تعديلات للمتصفحات التي لا تدعم backdrop-filter
    const header = document.querySelector('.header');
    if (header) {
      header.style.backgroundColor = 'white';
    }
  }
}

// الدالة الرئيسية للتهيئة
function init() {
  // تهيئة التخزين المؤقت
  initCaching();
  
  // تهيئة النشرة الإخبارية
  initNewsletterForm();
  
  // تهيئة التوافق
  initCompatibility();
  
  // تهيئة الواجهة
  initUI();
  
  // تهيئة السلة
  initCart();
  
  // تهيئة التأثيرات الحركية
  initAllAnimations();
  
  console.log('تم تهيئة التطبيق بنجاح! 🚀');
}

// تشغيل التهيئة عندما يتم تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', init);

// إضافة الاستمعين المخصصين
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

// الكشف عن وضع عدم الاتصال
window.addEventListener('offline', () => {
  // إظهار إشعار بعدم الاتصال
  const notification = document.createElement('div');
  notification.className = 'offline-notification';
  notification.textContent = 'أنت غير متصل بالإنترنت حالياً';
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #ef4444;
    color: white;
    padding: 10px 20px;
    border-radius: 8px;
    z-index: 9999;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 5000);
});
