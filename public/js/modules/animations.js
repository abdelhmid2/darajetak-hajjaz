
/**
 * متجر الإلكتروني - ESTORE
 * وحدة الرسوم المتحركة (Animations)
 * إصدار محسن واحترافي
 */

// مدير التحريكات - يتحكم في جميع تأثيرات الصفحة
class AnimationManager {
  constructor() {
    this.animationStyles = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      
      @keyframes slideIn {
        from { transform: translateX(30px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      
      @keyframes pulseEffect {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
      }
      
      .product-animate-ready {
        transition: opacity 0.5s ease, transform 0.5s ease;
      }
      
      .animate-product {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .scroll-animation-ready {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.7s ease, transform 0.7s ease;
      }
      
      .animate-on-scroll {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      
      .image-loaded {
        animation: fadeIn 0.5s ease forwards;
      }
      
      .animate-pulse {
        animation: pulseEffect 2s infinite;
      }
    `;
    
    // إضافة أنماط CSS للتحريكات
    this.injectStyles();
  }
  
  // إضافة أنماط CSS للصفحة
  injectStyles() {
    if (!document.getElementById('animation-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'animation-styles';
      styleSheet.textContent = this.animationStyles;
      document.head.appendChild(styleSheet);
    }
  }
  
  // تحسين أداء المتصفح باستخدام requestAnimationFrame
  optimizedAnimation(callback) {
    return window.requestAnimationFrame(callback);
  }
  
  // تهيئة كل التأثيرات
  initAll() {
    this.initBrandsSlider();
    this.initProductAnimations();
    this.addHoverEffects();
    this.initScrollAnimations();
    this.initImageEffects();
    this.initButtonEffects();
    
    console.log('✓ تم تهيئة جميع التأثيرات بنجاح');
  }
  
  // تهيئة سلايدر العلامات التجارية
  initBrandsSlider() {
    const brandsContainer = document.querySelector('.brands-slider');
    const brands = document.querySelectorAll('.brand-card');
    
    if (!brandsContainer || brands.length === 0) return;
    
    // إضافة التمرير بالسحب للموبايل والويب
    let isDown = false;
    let startX;
    let scrollLeft;
    
    // تحسين تجربة المستخدم على الأجهزة اللمسية
    brandsContainer.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - brandsContainer.offsetLeft;
      scrollLeft = brandsContainer.scrollLeft;
    });
    
    brandsContainer.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.touches[0].pageX - brandsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      this.optimizedAnimation(() => {
        brandsContainer.scrollLeft = scrollLeft - walk;
      });
    });
    
    brandsContainer.addEventListener('touchend', () => {
      isDown = false;
    });
    
    // دعم الفأرة للكمبيوتر
    brandsContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      brandsContainer.style.cursor = 'grabbing';
      startX = e.pageX - brandsContainer.offsetLeft;
      scrollLeft = brandsContainer.scrollLeft;
    });
    
    brandsContainer.addEventListener('mouseleave', () => {
      isDown = false;
      brandsContainer.style.cursor = 'grab';
    });
    
    brandsContainer.addEventListener('mouseup', () => {
      isDown = false;
      brandsContainer.style.cursor = 'grab';
    });
    
    brandsContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - brandsContainer.offsetLeft;
      const walk = (x - startX) * 2;
      this.optimizedAnimation(() => {
        brandsContainer.scrollLeft = scrollLeft - walk;
      });
    });
    
    // تحريك العناصر بشكل متسلسل
    brands.forEach((brand, index) => {
      brand.style.opacity = '0';
      brand.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
    });
  }
  
  // تهيئة تأثيرات المنتجات
  initProductAnimations() {
    const productCards = document.querySelectorAll('.product-card');
    
    if (productCards.length === 0) return;
    
    // استخدام IntersectionObserver لتحسين الأداء
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.optimizedAnimation(() => {
            entry.target.classList.add('animate-product');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px 50px 0px' // لتحميل العناصر قبل ظهورها للمستخدم
    });
    
    // تهيئة المنتجات وإضافتها للمراقبة
    productCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.classList.add('product-animate-ready');
      
      // إضافة تأخير مختلف لكل منتج للحصول على تأثير متسلسل
      setTimeout(() => {
        observer.observe(card);
      }, Math.min(index * 50, 500)); // تحديد حد أقصى للتأخير
    });
  }
  
  // إضافة تأثيرات التحويم
  addHoverEffects() {
    const hoverElements = document.querySelectorAll('.category-card, .offer-card, .product-card');
    
    if (hoverElements.length === 0) return;
    
    hoverElements.forEach(element => {
      // استخدام CSS classes بدلاً من inline styles
      element.classList.add('hover-effect-ready');
      
      element.addEventListener('mouseenter', () => {
        this.optimizedAnimation(() => {
          element.style.transform = 'translateY(-8px)';
          element.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
          element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
      });
      
      element.addEventListener('mouseleave', () => {
        this.optimizedAnimation(() => {
          element.style.transform = 'translateY(0)';
          element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
      });
    });
  }
  
  // تأثيرات حركية عند التمرير
  initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.section-title, .hero-text, .newsletter-content, .footer-column');
    
    if (animatedElements.length === 0) return;
    
    // تحسين رصد العناصر باستخدام IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.optimizedAnimation(() => {
            entry.target.classList.add('animate-on-scroll');
          });
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.2,
      rootMargin: '0px 0px 50px 0px'
    });
    
    // تهيئة العناصر وإضافتها للمراقبة
    animatedElements.forEach(element => {
      element.classList.add('scroll-animation-ready');
      observer.observe(element);
    });
  }
  
  // تأثيرات حركية للصور
  initImageEffects() {
    const productImages = document.querySelectorAll('.product-image img, .banner-image img, .offer-card img');
    
    if (productImages.length === 0) return;
    
    productImages.forEach(image => {
      // تطبيق تأثير التلاشي عند تحميل الصور
      image.style.opacity = '0.6';
      
      image.addEventListener('load', () => {
        this.optimizedAnimation(() => {
          image.classList.add('image-loaded');
        });
      });
      
      // للصور المحملة بالفعل
      if (image.complete) {
        this.optimizedAnimation(() => {
          image.classList.add('image-loaded');
        });
      }
    });
  }
  
  // تأثيرات الأزرار
  initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .action-btn');
    
    if (buttons.length === 0) return;
    
    buttons.forEach(button => {
      button.addEventListener('mousedown', () => {
        this.optimizedAnimation(() => {
          button.style.transform = 'scale(0.95)';
        });
      });
      
      button.addEventListener('mouseup', () => {
        this.optimizedAnimation(() => {
          button.style.transform = 'scale(1)';
        });
      });
      
      button.addEventListener('mouseleave', () => {
        this.optimizedAnimation(() => {
          button.style.transform = 'scale(1)';
        });
      });
    });
    
    // إضافة تأثير نبض للأزرار المهمة
    const promotionalButtons = document.querySelectorAll('.btn-primary, .add-to-cart');
    promotionalButtons.forEach(button => {
      // إضافة تأثير نبض للفت الانتباه
      button.classList.add('animate-pulse');
      
      // إيقاف التأثير بعد التفاعل الأول
      button.addEventListener('mouseenter', () => {
        button.classList.remove('animate-pulse');
      });
    });
  }
}

// إنشاء مثيل واحد من مدير التحريكات واستخدامه
const animationManager = new AnimationManager();

// تصدير الدوال المطلوبة
export function initBrandsSlider() {
  animationManager.initBrandsSlider();
}

export function initProductAnimations() {
  animationManager.initProductAnimations();
}

export function addHoverEffects() {
  animationManager.addHoverEffects();
}

export function initScrollAnimations() {
  animationManager.initScrollAnimations();
}

export function initImageEffects() {
  animationManager.initImageEffects();
}

export function initAllAnimations() {
  animationManager.initAll();
}
