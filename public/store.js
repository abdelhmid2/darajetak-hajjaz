
/**
 * متجر الإلكتروني - ESTORE
 * JavaScript Functionality
 */

// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const tabButtons = document.querySelectorAll('.tab-btn');
const productCards = document.querySelectorAll('.product-card');
const backToTopButton = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('currentYear');
const quickViewModal = document.getElementById('quickViewModal');
const closeQuickViewButton = document.getElementById('closeQuickView');
const viewButtons = document.querySelectorAll('.action-btn:nth-child(2)');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const quantityMinusBtn = document.querySelector('.qty-btn.minus');
const quantityPlusBtn = document.querySelector('.qty-btn.plus');
const quantityInput = document.querySelector('.quantity-control input');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const wishlistButtons = document.querySelectorAll('.wishlist-btn');
const compareButtons = document.querySelectorAll('.compare-btn');
const sortSelect = document.getElementById('sortSelect');
const filterPriceMin = document.getElementById('filterPriceMin');
const filterPriceMax = document.getElementById('filterPriceMax');
const filterButton = document.getElementById('filterButton');
const clearFilterButton = document.getElementById('clearFilterButton');

// Initialize Current Year in Footer
currentYearSpan.textContent = new Date().getFullYear();

// Header scroll effect
function handleScroll() {
  if (window.scrollY > 10) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Show/Hide Back to Top button
  if (window.scrollY > 300) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

// Toggle Mobile Menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle('show');
  
  // Toggle menu icon between hamburger and close
  const icon = menuToggle.querySelector('i');
  if (icon) {
    if (mobileMenu.classList.contains('show')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  }
}

// Toggle Language Dropdown
function toggleLangDropdown(event) {
  event.stopPropagation();
  langDropdown.classList.toggle('show');
}

// Handle Tab Changes
function handleTabChange(event) {
  // Remove active class from all tabs
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Add active class to clicked tab
  event.target.classList.add('active');
  
  // Get the selected category
  const selectedCategory = event.target.dataset.category;
  
  // Show/Hide products based on selected category
  let visibleCount = 0;
  productCards.forEach(card => {
    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
      card.style.display = 'block';
      visibleCount++;
      
      // Add fade-in animation
      card.classList.add('fade-in');
      setTimeout(() => {
        card.classList.remove('fade-in');
      }, 500);
    } else {
      card.style.display = 'none';
    }
  });
  
  // Display message if no products found
  const noResults = document.querySelector('.no-results-message');
  if (noResults) {
    if (visibleCount === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }
}

// Open Quick View Modal
function openQuickViewModal(event) {
  // Get product details from the clicked product card
  const productCard = event.target.closest('.product-card');
  if (productCard) {
    const productImage = productCard.querySelector('.product-image img').src;
    const productTitle = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    const productRating = productCard.dataset.rating || "4.5";
    
    // Update modal content with product details
    const modalImage = quickViewModal.querySelector('.product-image img');
    const modalTitle = quickViewModal.querySelector('.product-info h3');
    const modalPrice = quickViewModal.querySelector('.product-price');
    
    if (modalImage) modalImage.src = productImage;
    if (modalTitle) modalTitle.textContent = productTitle;
    if (modalPrice) modalPrice.textContent = productPrice;
    
    // Set rating stars
    const ratingStars = quickViewModal.querySelectorAll('.rating-stars .star');
    if (ratingStars.length > 0) {
      const rating = parseFloat(productRating);
      ratingStars.forEach((star, index) => {
        if (index < Math.floor(rating)) {
          star.classList.add('filled');
        } else if (index === Math.floor(rating) && rating % 1 > 0) {
          star.classList.add('half-filled');
        } else {
          star.classList.remove('filled', 'half-filled');
        }
      });
    }
  }
  
  quickViewModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Close Quick View Modal
function closeQuickViewModal() {
  quickViewModal.classList.remove('show');
  document.body.style.overflow = '';
}

// Add to Cart functionality
function addToCart(event) {
  const button = event.target.closest('.add-to-cart');
  if (!button) return;
  
  const originalText = button.textContent;
  const productCard = button.closest('.product-card');
  let productName = "المنتج";
  
  if (productCard) {
    productName = productCard.querySelector('.product-title').textContent;
  }
  
  // Update cart count
  const cartCount = document.querySelector('.cart-count');
  let currentCount = parseInt(cartCount.textContent);
  cartCount.textContent = currentCount + 1;
  
  // Show toast notification
  showToast(`تمت إضافة ${productName} إلى سلة التسوق`, 'success');
  
  // Change button text temporarily
  button.textContent = 'تمت الإضافة ✓';
  button.disabled = true;
  
  // Reset button after 2 seconds
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2000);
  
  // Save cart items to localStorage
  saveToCart(productName);
}

// Save items to cart in localStorage
function saveToCart(productName) {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({
    name: productName,
    date: new Date().toISOString(),
    quantity: parseInt(quantityInput ? quantityInput.value : 1)
  });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Wishlist functionality
function toggleWishlist(event) {
  const button = event.target.closest('.wishlist-btn');
  if (!button) return;
  
  const productCard = button.closest('.product-card');
  let productName = "المنتج";
  
  if (productCard) {
    productName = productCard.querySelector('.product-title').textContent;
  }
  
  // Toggle active class
  button.classList.toggle('active');
  
  if (button.classList.contains('active')) {
    showToast(`تمت إضافة ${productName} إلى المفضلة`, 'info');
  } else {
    showToast(`تمت إزالة ${productName} من المفضلة`, 'info');
  }
}

// Compare functionality
function toggleCompare(event) {
  const button = event.target.closest('.compare-btn');
  if (!button) return;
  
  const productCard = button.closest('.product-card');
  let productName = "المنتج";
  
  if (productCard) {
    productName = productCard.querySelector('.product-title').textContent;
  }
  
  // Toggle active class
  button.classList.toggle('active');
  
  if (button.classList.contains('active')) {
    showToast(`تمت إضافة ${productName} إلى المقارنة`, 'info');
  } else {
    showToast(`تمت إزالة ${productName} من المقارنة`, 'info');
  }
}

// Toast notification function
function showToast(message, type = 'info') {
  // Create toast element if it doesn't exist
  let toastContainer = document.querySelector('.toast-container');
  
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-content">
      <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
      <div class="message">${message}</div>
    </div>
    <div class="toast-progress"></div>
  `;
  
  toastContainer.appendChild(toast);
  
  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.classList.add('fade-out');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Search functionality
function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  
  if (searchTerm.length < 2) {
    searchResults.style.display = 'none';
    return;
  }
  
  // Get all product titles
  const products = [];
  productCards.forEach(card => {
    const title = card.querySelector('.product-title').textContent;
    const price = card.querySelector('.product-price').textContent;
    const image = card.querySelector('.product-image img').src;
    
    products.push({ title, price, image });
  });
  
  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm)
  );
  
  // Display search results
  if (filteredProducts.length > 0) {
    let resultsHTML = '';
    filteredProducts.forEach(product => {
      resultsHTML += `
        <div class="search-result-item">
          <img src="${product.image}" alt="${product.title}">
          <div class="search-result-info">
            <h4>${product.title}</h4>
            <p>${product.price}</p>
          </div>
        </div>
      `;
    });
    
    searchResults.innerHTML = resultsHTML;
    searchResults.style.display = 'block';
  } else {
    searchResults.innerHTML = '<div class="no-results">لا توجد نتائج مطابقة</div>';
    searchResults.style.display = 'block';
  }
}

// Sort products
function sortProducts() {
  if (!sortSelect) return;
  
  const sortValue = sortSelect.value;
  const productsContainer = document.querySelector('.products-grid');
  
  if (!productsContainer) return;
  
  const products = Array.from(productCards);
  
  switch (sortValue) {
    case 'price-asc':
      products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
        return priceA - priceB;
      });
      break;
    case 'price-desc':
      products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
        const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
        return priceB - priceA;
      });
      break;
    case 'name-asc':
      products.sort((a, b) => {
        const nameA = a.querySelector('.product-title').textContent;
        const nameB = b.querySelector('.product-title').textContent;
        return nameA.localeCompare(nameB, 'ar');
      });
      break;
    case 'name-desc':
      products.sort((a, b) => {
        const nameA = a.querySelector('.product-title').textContent;
        const nameB = b.querySelector('.product-title').textContent;
        return nameB.localeCompare(nameA, 'ar');
      });
      break;
    case 'rating':
      products.sort((a, b) => {
        const ratingA = parseFloat(a.dataset.rating || 0);
        const ratingB = parseFloat(b.dataset.rating || 0);
        return ratingB - ratingA;
      });
      break;
  }
  
  // Reappend sorted products
  products.forEach(product => {
    productsContainer.appendChild(product);
  });
  
  // Show animation
  products.forEach((product, index) => {
    product.style.opacity = '0';
    product.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      product.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      product.style.opacity = '1';
      product.style.transform = 'translateY(0)';
    }, 50 * index);
  });
}

// Filter products by price
function filterByPrice() {
  if (!filterPriceMin || !filterPriceMax) return;
  
  const minPrice = parseFloat(filterPriceMin.value) || 0;
  const maxPrice = parseFloat(filterPriceMax.value) || Infinity;
  
  productCards.forEach(card => {
    const priceText = card.querySelector('.product-price').textContent;
    const price = parseFloat(priceText.replace(/[^\d.]/g, ''));
    
    if (price >= minPrice && price <= maxPrice) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Clear filters
function clearFilters() {
  if (filterPriceMin) filterPriceMin.value = '';
  if (filterPriceMax) filterPriceMax.value = '';
  
  productCards.forEach(card => {
    card.style.display = 'block';
  });
  
  // Reset tab buttons
  tabButtons.forEach(button => {
    button.classList.remove('active');
  });
  
  // Set "All" tab as active
  const allTabButton = document.querySelector('.tab-btn[data-category="all"]');
  if (allTabButton) {
    allTabButton.classList.add('active');
  }
}

// Quantity controls
function handleQuantityChange(amount) {
  if (!quantityInput) return;
  
  let value = parseInt(quantityInput.value);
  value += amount;
  
  // Ensure value is within min/max range
  if (value < parseInt(quantityInput.min || 1)) {
    value = parseInt(quantityInput.min || 1);
  } else if (value > parseInt(quantityInput.max || 99)) {
    value = parseInt(quantityInput.max || 99);
  }
  
  quantityInput.value = value;
}

// Back to Top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Handle click outside to close dropdowns
function handleDocumentClick(event) {
  // Close language dropdown if clicking outside
  if (langToggle && langDropdown && !langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
    langDropdown.classList.remove('show');
  }
  
  // Close search results if clicking outside
  if (searchInput && searchResults && !searchInput.contains(event.target) && !searchResults.contains(event.target)) {
    searchResults.style.display = 'none';
  }
  
  // Close modal when clicking outside content
  if (event.target === quickViewModal) {
    closeQuickViewModal();
  }
}

// Initialize slider for brands section
function initBrandsSlider() {
  const brands = document.querySelectorAll('.brand-card');
  brands.forEach((brand, index) => {
    brand.style.animation = `slideIn 0.5s ease forwards ${index * 0.1}s`;
  });
}

// Load More Products (dummy function - would connect to backend in real app)
function loadMoreProducts() {
  // Show loading indicator
  const loadMoreBtn = document.querySelector('.load-more .btn');
  if (loadMoreBtn) {
    loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
    loadMoreBtn.disabled = true;
  }
  
  // Simulate loading delay
  setTimeout(() => {
    // In a real app, this would fetch more products from the backend
    showToast('تم تحميل المزيد من المنتجات', 'success');
    
    // Reset button
    if (loadMoreBtn) {
      loadMoreBtn.innerHTML = 'تحميل المزيد';
      loadMoreBtn.disabled = false;
    }
  }, 1500);
}

// Currency formatter
function formatPrice(price) {
  return new Intl.NumberFormat('ar-EG', {
    style: 'currency',
    currency: 'EGP'
  }).format(price);
}

// Event Listeners
window.addEventListener('scroll', handleScroll);
if (menuToggle) menuToggle.addEventListener('click', toggleMobileMenu);
if (langToggle) langToggle.addEventListener('click', toggleLangDropdown);
document.addEventListener('click', handleDocumentClick);
if (backToTopButton) backToTopButton.addEventListener('click', scrollToTop);

// Tab buttons
tabButtons.forEach(button => {
  button.addEventListener('click', handleTabChange);
});

// Quick view modal
viewButtons.forEach(button => {
  button.addEventListener('click', openQuickViewModal);
});
if (closeQuickViewButton) closeQuickViewButton.addEventListener('click', closeQuickViewModal);

// Add to cart buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Wishlist buttons
if (wishlistButtons) {
  wishlistButtons.forEach(button => {
    button.addEventListener('click', toggleWishlist);
  });
}

// Compare buttons
if (compareButtons) {
  compareButtons.forEach(button => {
    button.addEventListener('click', toggleCompare);
  });
}

// Quantity buttons in modal
if (quantityMinusBtn && quantityPlusBtn) {
  quantityMinusBtn.addEventListener('click', () => handleQuantityChange(-1));
  quantityPlusBtn.addEventListener('click', () => handleQuantityChange(1));
}

// Search input
if (searchInput) {
  searchInput.addEventListener('input', handleSearchDebounced);
  document.addEventListener('click', (event) => {
    if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
      searchResults.style.display = 'none';
    }
  });
}

// Debounce function for search
function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

const handleSearchDebounced = debounce(handleSearch, 300);

// Sort select
if (sortSelect) {
  sortSelect.addEventListener('change', sortProducts);
}

// Filter buttons
if (filterButton) {
  filterButton.addEventListener('click', filterByPrice);
}

if (clearFilterButton) {
  clearFilterButton.addEventListener('click', clearFilters);
}

// Load more button
const loadMoreBtn = document.querySelector('.load-more .btn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', loadMoreProducts);
}

// Initialize on page load
function init() {
  handleScroll(); // Run once on page load to set initial state
  initBrandsSlider(); // Initialize brands slider
  
  // Simulate products loading with a slight delay for visual effect
  productCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 + (index * 50));
  });
  
  // Initialize cart count from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cartItems.length;
  }
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
