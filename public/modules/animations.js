
/**
 * متجر الإلكتروني - ESTORE
 * وحدة الرسوم المتحركة (Animations)
 */

// تهيئة سلايدر للعلامات التجارية
export function initBrandsSlider() {
  const brands = document.querySelectorAll('.brand-card');
  brands.forEach((brand, index) => {
    brand.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
  });
}

// تهيئة تأثيرات حركية للمنتجات عند تحميل الصفحة
export function initProductAnimations() {
  const productCards = document.querySelectorAll('.product-card');
  
  // محاكاة تحميل المنتجات مع تأخير بسيط للحصول على تأثير بصري
  productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 50));
  });
}

// إضافة تأثير حركي عند المرور بمؤشر الماوس
export function addHoverEffects() {
  const hoverElements = document.querySelectorAll('.category-card, .offer-card, .product-card');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      element.style.transform = 'translateY(-5px)';
      element.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      element.style.transform = '';
      element.style.boxShadow = '';
    });
  });
}
