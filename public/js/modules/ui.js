
/**
 * متجر الإلكتروني - ESTORE
 * وحدة واجهة المستخدم (UI)
 */

// التعامل مع تمرير الصفحة وتأثيرات الهيدر
export function handleScroll() {
  const header = document.querySelector('.header');
  const backToTopButton = document.getElementById('backToTop');
  
  if (!header) return;
  
  // تطبيق تأثيرات على الهيدر عند التمرير
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    header.style.background = 'rgba(255, 255, 255, 0.98)';
  } else {
    header.classList.remove('scrolled');
    header.style.boxShadow = '';
    header.style.background = '';
  }
  
  // إظهار/إخفاء زر العودة للأعلى
  if (backToTopButton) {
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  }
}

// التمرير إلى أعلى الصفحة مع تأثير سلس
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// إظهار/إخفاء القائمة المتنقلة
export function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuToggle = document.getElementById('menuToggle');
  
  if (!mobileMenu || !menuToggle) return;
  
  const isOpen = mobileMenu.classList.toggle('show');
  
  // تغيير شكل زر القائمة
  const spans = menuToggle.querySelectorAll('span');
  if (isOpen) {
    menuToggle.classList.add('active');
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    menuToggle.classList.remove('active');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

// إظهار/إخفاء قائمة اللغات
export function toggleLangDropdown(event) {
  event.stopPropagation();
  const langDropdown = document.getElementById('langDropdown');
  
  if (!langDropdown) return;
  
  langDropdown.classList.toggle('show');
}

// التعامل مع التبويبات
export function handleTabChange(event) {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');
  
  if (tabButtons.length === 0 || productCards.length === 0) return;
  
  // إزالة الفئة النشطة من جميع التبويبات
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // إضافة الفئة النشطة إلى التبويب المحدد
  event.target.classList.add('active');
  
  // الحصول على الفئة المحددة
  const selectedCategory = event.target.dataset.category;
  
  // تطبيق تأثير على التبويب المحدد
  event.target.style.fontWeight = '700';
  setTimeout(() => {
    event.target.style.fontWeight = '';
  }, 300);
  
  // إظهار/إخفاء المنتجات حسب الفئة المحددة
  productCards.forEach(card => {
    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
      // إظهار المنتج مع تأثير
      card.style.display = 'block';
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      }, 50);
    } else {
      // إخفاء المنتج
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        card.style.display = 'none';
      }, 300);
    }
  });
}

// فتح نافذة العرض السريع
export function openQuickViewModal() {
  const quickViewModal = document.getElementById('quickViewModal');
  if (!quickViewModal) return;
  
  // الحصول على معلومات المنتج من البطاقة التي تم النقر عليها
  const productCard = this.closest('.product-card, .offer-card');
  if (!productCard) return;
  
  // إستخراج البيانات
  const productName = productCard.querySelector('h3')?.textContent || '';
  const productPrice = productCard.querySelector('.price')?.textContent || productCard.querySelector('.current')?.textContent || '';
  const productImage = productCard.querySelector('img')?.src || '';
  const productRating = productCard.querySelector('.rating')?.innerHTML || '';
  
  // تحديث النافذة المنبثقة
  const modalTitle = quickViewModal.querySelector('h2');
  const modalPrice = quickViewModal.querySelector('.price');
  const modalImage = quickViewModal.querySelector('.product-quick-image img');
  const modalRating = quickViewModal.querySelector('.rating');
  
  if (modalTitle) modalTitle.textContent = productName;
  if (modalPrice) modalPrice.textContent = productPrice;
  if (modalImage) modalImage.src = productImage;
  if (modalRating) modalRating.innerHTML = productRating;
  
  // عرض النافذة
  quickViewModal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // تطبيق تأثير دخول
  const modalContent = quickViewModal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
      modalContent.style.opacity = '1';
      modalContent.style.transform = 'scale(1)';
      modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    }, 10);
  }
}

// إغلاق نافذة العرض السريع
export function closeQuickViewModal() {
  const quickViewModal = document.getElementById('quickViewModal');
  if (!quickViewModal) return;
  
  // تطبيق تأثير خروج
  const modalContent = quickViewModal.querySelector('.modal-content');
  if (modalContent) {
    modalContent.style.opacity = '0';
    modalContent.style.transform = 'scale(0.95)';
    modalContent.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  }
  
  // إغلاق النافذة بعد تأثير الخروج
  setTimeout(() => {
    quickViewModal.classList.remove('show');
    document.body.style.overflow = '';
  }, 300);
}

// معالجة النقر خارج العناصر لإغلاقها
export function handleDocumentClick(event) {
  const langToggle = document.getElementById('langToggle');
  const langDropdown = document.getElementById('langDropdown');
  const quickViewModal = document.getElementById('quickViewModal');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuToggle = document.getElementById('menuToggle');
  
  // إغلاق قائمة اللغات عند النقر خارجها
  if (langToggle && langDropdown && !langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
    langDropdown.classList.remove('show');
  }
  
  // إغلاق النافذة المنبثقة عند النقر خارج المحتوى
  if (quickViewModal && event.target === quickViewModal) {
    closeQuickViewModal();
  }
  
  // إغلاق القائمة المتنقلة عند النقر خارجها
  if (mobileMenu && mobileMenu.classList.contains('show') && 
      !mobileMenu.contains(event.target) && 
      menuToggle && !menuToggle.contains(event.target)) {
    toggleMobileMenu();
  }
}

// تهيئة البحث الحي
export function initLiveSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (!searchInput) return;
  
  // إنشاء قائمة نتائج البحث
  let searchResults = document.getElementById('searchResults');
  if (!searchResults) {
    searchResults = document.createElement('div');
    searchResults.id = 'searchResults';
    searchResults.className = 'search-results';
    document.querySelector('.search-bar')?.appendChild(searchResults);
  }
  
  // إضافة المستمعين
  searchInput.addEventListener('focus', function() {
    if (this.value.length > 0) {
      performSearch(this.value);
    }
  });
  
  searchInput.addEventListener('input', function() {
    if (this.value.length > 0) {
      performSearch(this.value);
    } else {
      searchResults.innerHTML = '';
      searchResults.classList.remove('active');
    }
  });
  
  document.addEventListener('click', function(e) {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
      searchResults.classList.remove('active');
    }
  });
  
  function performSearch(query) {
    // في تطبيق حقيقي، ستكون هذه طلبات للخادم
    const allProducts = Array.from(document.querySelectorAll('.product-card h3, .offer-card h3')).map(el => el.textContent);
    
    const filteredProducts = allProducts.filter(name => 
      name && name.toLowerCase().includes(query.toLowerCase())
    );
    
    // عرض النتائج
    searchResults.innerHTML = '';
    
    if (filteredProducts.length > 0) {
      filteredProducts.slice(0, 5).forEach(name => {
        const item = document.createElement('div');
        item.className = 'search-item';
        item.textContent = name;
        
        item.addEventListener('click', () => {
          searchInput.value = name;
          searchResults.classList.remove('active');
          // هنا يمكن إضافة وظيفة للانتقال لصفحة المنتج
        });
        
        searchResults.appendChild(item);
      });
      
      searchResults.classList.add('active');
    } else {
      const noResults = document.createElement('div');
      noResults.className = 'search-item';
      noResults.textContent = 'لا توجد نتائج';
      searchResults.appendChild(noResults);
      
      searchResults.classList.add('active');
    }
  }
}

// تهيئة جميع وظائف واجهة المستخدم
export function initUI() {
  // تشغيل معالج التمرير أول مرة
  handleScroll();
  
  // إضافة مستمعي الأحداث
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('click', handleDocumentClick);
  
  // زر القائمة المتنقلة
  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', toggleMobileMenu);
    // إضافة تنسيق لحالة التحميل
    menuToggle.style.transition = 'transform 0.3s ease';
    const spans = menuToggle.querySelectorAll('span');
    spans.forEach(span => {
      span.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    });
  }
  
  // قائمة اللغات
  const langToggle = document.getElementById('langToggle');
  if (langToggle) {
    langToggle.addEventListener('click', toggleLangDropdown);
  }
  
  // أزرار التبويب
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', handleTabChange);
  });
  
  // أزرار العرض السريع
  const viewButtons = document.querySelectorAll('.action-btn:nth-child(2)');
  viewButtons.forEach(button => {
    button.addEventListener('click', openQuickViewModal);
  });
  
  // زر إغلاق النافذة المنبثقة
  const closeQuickViewButton = document.getElementById('closeQuickView');
  if (closeQuickViewButton) {
    closeQuickViewButton.addEventListener('click', closeQuickViewModal);
  }
  
  // زر العودة للأعلى
  const backToTopButton = document.getElementById('backToTop');
  if (backToTopButton) {
    backToTopButton.addEventListener('click', scrollToTop);
  }
  
  // تهيئة البحث
  initLiveSearch();
}
