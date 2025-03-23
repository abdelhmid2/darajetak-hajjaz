
/**
 * متجر الإلكتروني - ESTORE
 * وحدة الرسوم المتحركة (Animations)
 */

// تهيئة سلايدر للعلامات التجارية مع تأثيرات متطورة
export function initBrandsSlider() {
  const brandsContainer = document.querySelector('.brands-slider');
  const brands = document.querySelectorAll('.brand-card');
  
  if (!brandsContainer || brands.length === 0) return;
  
  // إضافة التمرير بالسحب للموبايل
  let isDown = false;
  let startX;
  let scrollLeft;
  
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
    const walk = (x - startX) * 2; // سرعة التمرير
    brandsContainer.scrollLeft = scrollLeft - walk;
  });
  
  // تحريك العناصر بشكل متسلسل
  brands.forEach((brand, index) => {
    brand.style.opacity = '0';
    brand.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
  });
}

// تهيئة تأثيرات حركية للمنتجات عند تحميل الصفحة مع تأثيرات أكثر تطوراً
export function initProductAnimations() {
  const productCards = document.querySelectorAll('.product-card');
  
  if (productCards.length === 0) return;
  
  // إضافة متابع للظهور على الشاشة
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-product');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // محاكاة تحميل المنتجات مع تأخير بسيط للحصول على تأثير بصري
  productCards.forEach((card, index) => {
    // إعداد الحالة الأولية
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    // إضافة فئة لتنشيط التحريك عند الظهور في العرض
    card.classList.add('product-animate-ready');
    
    // رصد الظهور على الشاشة
    observer.observe(card);
    
    // أيضًا نحرك المنتجات بعد فترة لضمان ظهورها حتى بدون دعم IntersectionObserver
    setTimeout(() => {
      card.classList.add('animate-product');
    }, 100 + (index * 50));
  });
}

// إضافة تأثير حركي محسن عند المرور بمؤشر الماوس
export function addHoverEffects() {
  const hoverElements = document.querySelectorAll('.category-card, .offer-card, .product-card');
  
  if (hoverElements.length === 0) return;
  
  // إضافة تأثيرات الحركة المتسلسلة
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-8px)';
      element.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      element.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translateY(0)';
      element.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
}

// تنشيط التأثيرات على العناصر المرئية عند التمرير
export function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.section-title, .hero-text, .newsletter-content');
  
  if (animatedElements.length === 0) return;
  
  // إضافة متابع للظهور على الشاشة
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-on-scroll');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  
  // تعيين الفئات والمتابعة
  animatedElements.forEach(element => {
    element.classList.add('scroll-animation-ready');
    observer.observe(element);
  });
}

// تهيئة تأثيرات التلاشي للصور
export function initImageEffects() {
  const productImages = document.querySelectorAll('.product-image img');
  
  if (productImages.length === 0) return;
  
  productImages.forEach(image => {
    // تطبيق تأثير التحول عند تحميل الصورة
    image.addEventListener('load', () => {
      image.classList.add('image-loaded');
    });
    
    // إذا كانت الصورة محملة بالفعل
    if (image.complete) {
      image.classList.add('image-loaded');
    }
  });
}

// إضافة كل التأثيرات الحركية
export function initAllAnimations() {
  // تشغيل كل التأثيرات
  initBrandsSlider();
  initProductAnimations();
  addHoverEffects();
  initScrollAnimations();
  initImageEffects();
}
