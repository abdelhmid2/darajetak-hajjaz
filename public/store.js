
/**
 * متجر الإلكتروني - ESTORE
 * JavaScript Functionality
 */

// استيراد الوحدات
import * as UI from './modules/ui.js';
import * as Cart from './modules/cart.js';
import * as Animations from './modules/animations.js';

// عناصر DOM
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const tabButtons = document.querySelectorAll('.tab-btn');
const backToTopButton = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('currentYear');
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickViewButton = document.getElementById('closeQuickView');
const viewButtons = document.querySelectorAll('.action-btn:nth-child(2)');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const quantityMinusBtn = document.querySelector('.qty-btn.minus');
const quantityPlusBtn = document.querySelector('.qty-btn.plus');

// تهيئة السنة الحالية في التذييل
currentYearSpan.textContent = new Date().getFullYear();

// مستمعي الأحداث
window.addEventListener('scroll', UI.handleScroll);
menuToggle.addEventListener('click', UI.toggleMobileMenu);
langToggle.addEventListener('click', UI.toggleLangDropdown);
document.addEventListener('click', UI.handleDocumentClick);
backToTopButton.addEventListener('click', UI.scrollToTop);

// أزرار التبويب
tabButtons.forEach(button => {
  button.addEventListener('click', UI.handleTabChange);
});

// النافذة المنبثقة للعرض السريع
viewButtons.forEach(button => {
  button.addEventListener('click', UI.openQuickViewModal);
});
closeQuickViewButton.addEventListener('click', UI.closeQuickViewModal);

// أزرار إضافة إلى السلة
addToCartButtons.forEach(button => {
  button.addEventListener('click', Cart.addToCart);
});

// أزرار الكمية في النافذة المنبثقة
if (quantityMinusBtn && quantityPlusBtn) {
  quantityMinusBtn.addEventListener('click', () => Cart.handleQuantityChange(-1));
  quantityPlusBtn.addEventListener('click', () => Cart.handleQuantityChange(1));
}

// زر تحميل المزيد
const loadMoreBtn = document.querySelector('.load-more .btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', Cart.loadMoreProducts);
}

// تهيئة عند تحميل الصفحة
function init() {
  UI.handleScroll(); // تشغيل مرة واحدة عند تحميل الصفحة لتعيين الحالة الأولية
  Animations.initBrandsSlider(); // تهيئة سلايدر العلامات التجارية
  Animations.initProductAnimations(); // تهيئة تأثيرات حركية للمنتجات
  
  // إضافة تأثيرات إضافية على الهوفر
  if (window.matchMedia('(min-width: 768px)').matches) {
    Animations.addHoverEffects();
  }
}

// تشغيل التهيئة عندما يتم تحميل DOM بالكامل
document.addEventListener('DOMContentLoaded', init);
