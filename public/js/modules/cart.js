
/**
 * متجر الإلكتروني - ESTORE
 * وحدة سلة التسوق (Cart)
 */

// حالة السلة - متغيرات للاحتفاظ بمحتويات السلة
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let cartTotal = 0;

// تحديث الواجهة بعد تغيير السلة
function updateCartUI() {
  const cartCount = document.querySelector('.cart-count');
  if (!cartCount) return;
  
  // تحديث عدد المنتجات في الأيقونة
  cartCount.textContent = cartItems.length;
  
  // تحديث السعر الإجمالي إذا كان موجودًا في الصفحة
  const totalElement = document.querySelector('.cart-total-price');
  if (totalElement) {
    totalElement.textContent = `${cartTotal.toFixed(2)} ج.م`;
  }
  
  // حفظ في التخزين المحلي
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// إضافة منتج إلى السلة مع دعم الكمية والتفاصيل
export function addToCart(event) {
  const button = event.target;
  const productCard = button.closest('.product-card, .offer-card') || button.closest('.product-quick-view');
  if (!productCard) return;
  
  const originalText = button.textContent;
  
  // الحصول على بيانات المنتج
  const productId = productCard.dataset.productId || `product-${Date.now()}`;
  const productName = productCard.querySelector('h3')?.textContent || productCard.querySelector('h2')?.textContent || 'منتج';
  const productPrice = parseFloat(productCard.querySelector('.price')?.textContent || productCard.querySelector('.current')?.textContent || '0');
  const productImg = productCard.querySelector('img')?.src || '';
  
  // الحصول على الكمية إذا كانت موجودة
  let quantity = 1;
  const quantityInput = productCard.querySelector('.quantity-control input');
  if (quantityInput) {
    quantity = parseInt(quantityInput.value) || 1;
  }
  
  // البحث عن المنتج في السلة
  const existingItemIndex = cartItems.findIndex(item => item.id === productId);
  
  if (existingItemIndex > -1) {
    // تحديث الكمية إذا كان المنتج موجود
    cartItems[existingItemIndex].quantity += quantity;
  } else {
    // إضافة منتج جديد
    cartItems.push({
      id: productId,
      name: productName,
      price: productPrice,
      image: productImg,
      quantity: quantity
    });
  }
  
  // إعادة حساب السعر الإجمالي
  calculateCartTotal();
  
  // تحديث واجهة المستخدم
  updateCartUI();
  
  // عرض إشعار بالإضافة
  showCartNotification(productName);
  
  // تغيير نص الزر مؤقتًا
  button.textContent = 'تمت الإضافة ✓';
  button.disabled = true;
  button.classList.add('added-to-cart');
  
  // إعادة تعيين الزر بعد ثانيتين
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove('added-to-cart');
  }, 2000);
}

// عرض إشعار بإضافة المنتج
function showCartNotification(productName) {
  // إنشاء عنصر الإشعار إذا لم يكن موجودًا
  let notification = document.getElementById('cart-notification');
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.className = 'cart-notification';
    document.body.appendChild(notification);
  }
  
  // تحديث محتوى الإشعار وإظهاره
  notification.textContent = `تمت إضافة "${productName}" إلى السلة`;
  notification.classList.add('show');
  
  // إخفاء الإشعار بعد 3 ثوان
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// حساب السعر الإجمالي للسلة
function calculateCartTotal() {
  cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// التحكم في الكمية
export function handleQuantityChange(amount) {
  const quantityInput = document.querySelector('.quantity-control input');
  if (!quantityInput) return;
  
  let value = parseInt(quantityInput.value) || 1;
  value += amount;
  
  // ضمان أن القيمة ضمن النطاق المسموح به
  const min = parseInt(quantityInput.min) || 1;
  const max = parseInt(quantityInput.max) || 99;
  
  if (value < min) {
    value = min;
  } else if (value > max) {
    value = max;
  }
  
  quantityInput.value = value;
}

// إزالة منتج من السلة
export function removeFromCart(productId) {
  cartItems = cartItems.filter(item => item.id !== productId);
  calculateCartTotal();
  updateCartUI();
}

// تحميل المزيد من المنتجات (وظيفة محسنة)
export function loadMoreProducts() {
  const loadMoreBtn = document.querySelector('.load-more .btn');
  const productsGrid = document.querySelector('.products-grid');
  
  if (!loadMoreBtn || !productsGrid) return;
  
  // إظهار حالة التحميل
  loadMoreBtn.textContent = 'جاري التحميل...';
  loadMoreBtn.disabled = true;
  
  // محاكاة طلب للخادم
  setTimeout(() => {
    // نسخ منتجات عشوائية من الموجودة (في التطبيق الحقيقي ستكون من الخادم)
    const existingProducts = document.querySelectorAll('.product-card');
    if (existingProducts.length === 0) {
      loadMoreBtn.textContent = 'لا توجد منتجات إضافية';
      return;
    }
    
    // إضافة 4 منتجات كمثال
    for (let i = 0; i < 4; i++) {
      // نسخ منتج عشوائي
      const randomIndex = Math.floor(Math.random() * existingProducts.length);
      const productClone = existingProducts[randomIndex].cloneNode(true);
      
      // توليد معرف جديد
      productClone.dataset.productId = `product-new-${Date.now()}-${i}`;
      
      // تحديث بعض البيانات للتمييز
      const productPrice = productClone.querySelector('.price');
      if (productPrice) {
        const originalPrice = parseFloat(productPrice.textContent);
        productPrice.textContent = `${(originalPrice * 0.9).toFixed(0)} ج.م`;
      }
      
      // إضافة زر المتابعة
      const addToCartBtn = productClone.querySelector('.add-to-cart');
      if (addToCartBtn) {
        addToCartBtn.addEventListener('click', addToCart);
      }
      
      // إضافة المنتج للشبكة
      productsGrid.appendChild(productClone);
    }
    
    // تحديث زر التحميل
    loadMoreBtn.textContent = 'تحميل المزيد';
    loadMoreBtn.disabled = false;
    
    // تنشيط التأثيرات على المنتجات الجديدة
    import('./animations.js').then(module => {
      module.initProductAnimations();
      module.addHoverEffects();
    });
  }, 1500);
}

// تهيئة وحدة السلة
export function initCart() {
  // حساب المجموع الأولي وتحديث واجهة المستخدم
  calculateCartTotal();
  updateCartUI();
  
  // إضافة أزرار الإضافة إلى السلة
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
  });
  
  // معالجة أزرار الكمية
  const quantityMinusBtn = document.querySelector('.qty-btn.minus');
  const quantityPlusBtn = document.querySelector('.qty-btn.plus');
  
  if (quantityMinusBtn) {
    quantityMinusBtn.addEventListener('click', () => handleQuantityChange(-1));
  }
  
  if (quantityPlusBtn) {
    quantityPlusBtn.addEventListener('click', () => handleQuantityChange(1));
  }
  
  // زر تحميل المزيد
  const loadMoreBtn = document.querySelector('.load-more .btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', loadMoreProducts);
  }
}
