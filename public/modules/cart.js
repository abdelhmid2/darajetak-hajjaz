
/**
 * متجر الإلكتروني - ESTORE
 * وحدة سلة التسوق (Cart)
 */

// إضافة منتج إلى السلة
export function addToCart(event) {
  const button = event.target;
  const originalText = button.textContent;
  
  // تحديث عدد العناصر في السلة
  const cartCount = document.querySelector('.cart-count');
  let currentCount = parseInt(cartCount.textContent);
  cartCount.textContent = currentCount + 1;
  
  // تغيير نص الزر مؤقتًا
  button.textContent = 'تمت الإضافة ✓';
  button.disabled = true;
  
  // إعادة تعيين الزر بعد ثانيتين
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2000);
}

// التحكم في الكمية
export function handleQuantityChange(amount) {
  const quantityInput = document.querySelector('.quantity-control input');
  let value = parseInt(quantityInput.value);
  value += amount;
  
  // ضمان أن القيمة ضمن النطاق المسموح به
  if (value < parseInt(quantityInput.min)) {
    value = parseInt(quantityInput.min);
  } else if (value > parseInt(quantityInput.max)) {
    value = parseInt(quantityInput.max);
  }
  
  quantityInput.value = value;
}

// تحميل المزيد من المنتجات (وظيفة وهمية - ستتصل بالخادم الخلفي في التطبيق الحقيقي)
export function loadMoreProducts() {
  // في تطبيق حقيقي، سيتم جلب المزيد من المنتجات من الخادم الخلفي
  alert('سيتم تحميل المزيد من المنتجات...');
}
