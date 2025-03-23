
/**
 * متجر الإلكتروني - ESTORE
 * وحدة واجهة المستخدم (UI)
 */

// التعامل مع تمرير الصفحة وتأثيرات الهيدر
export function handleScroll() {
  const header = document.querySelector('.header');
  const backToTopButton = document.getElementById('backToTop');
  
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // إظهار/إخفاء زر العودة للأعلى
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

// إظهار/إخفاء القائمة المتنقلة
export function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('show');
}

// إظهار/إخفاء قائمة اللغات
export function toggleLangDropdown(event) {
  event.stopPropagation();
  const langDropdown = document.getElementById('langDropdown');
  langDropdown.classList.toggle('show');
}

// التعامل مع التبويبات
export function handleTabChange(event) {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  // إزالة الفئة النشطة من جميع التبويبات
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // إضافة الفئة النشطة إلى التبويب المحدد
  event.target.classList.add('active');
  
  // الحصول على الفئة المحددة
  const selectedCategory = event.target.dataset.category;
  
  // إظهار/إخفاء المنتجات حسب الفئة المحددة
  productCards.forEach(card => {
    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// فتح نافذة العرض السريع
export function openQuickViewModal() {
  const quickViewModal = document.getElementById('quickViewModal');
  quickViewModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// إغلاق نافذة العرض السريع
export function closeQuickViewModal() {
  const quickViewModal = document.getElementById('quickViewModal');
  quickViewModal.classList.remove('show');
  document.body.style.overflow = '';
}

// التمرير إلى أعلى الصفحة
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// معالجة النقر خارج العناصر لإغلاقها
export function handleDocumentClick(event) {
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  const quickViewModal = document.getElementById('quickViewModal');
  
  // إغلاق قائمة اللغات عند النقر خارجها
  if (langToggle && langDropdown && !langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
    langDropdown.classList.remove('show');
  }
  
  // إغلاق النافذة المنبثقة عند النقر خارج المحتوى
  if (quickViewModal && event.target === quickViewModal) {
    closeQuickViewModal();
  }
}
