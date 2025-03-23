
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
  productCards.forEach(card => {
    if (selectedCategory === 'all' || card.dataset.category === selectedCategory) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Open Quick View Modal
function openQuickViewModal() {
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
  const button = event.target;
  const originalText = button.textContent;
  
  // Update cart count
  const cartCount = document.querySelector('.cart-count');
  let currentCount = parseInt(cartCount.textContent);
  cartCount.textContent = currentCount + 1;
  
  // Change button text temporarily
  button.textContent = 'تمت الإضافة ✓';
  button.disabled = true;
  
  // Reset button after 2 seconds
  setTimeout(() => {
    button.textContent = originalText;
    button.disabled = false;
  }, 2000);
}

// Quantity controls
function handleQuantityChange(amount) {
  let value = parseInt(quantityInput.value);
  value += amount;
  
  // Ensure value is within min/max range
  if (value < parseInt(quantityInput.min)) {
    value = parseInt(quantityInput.min);
  } else if (value > parseInt(quantityInput.max)) {
    value = parseInt(quantityInput.max);
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
  if (!langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
    langDropdown.classList.remove('show');
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
  // In a real app, this would fetch more products from the backend
  alert('سيتم تحميل المزيد من المنتجات...');
}

// Event Listeners
window.addEventListener('scroll', handleScroll);
menuToggle.addEventListener('click', toggleMobileMenu);
langToggle.addEventListener('click', toggleLangDropdown);
document.addEventListener('click', handleDocumentClick);
backToTopButton.addEventListener('click', scrollToTop);

// Tab buttons
tabButtons.forEach(button => {
  button.addEventListener('click', handleTabChange);
});

// Quick view modal
viewButtons.forEach(button => {
  button.addEventListener('click', openQuickViewModal);
});
closeQuickViewButton.addEventListener('click', closeQuickViewModal);

// Add to cart buttons
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Quantity buttons in modal
if (quantityMinusBtn && quantityPlusBtn) {
  quantityMinusBtn.addEventListener('click', () => handleQuantityChange(-1));
  quantityPlusBtn.addEventListener('click', () => handleQuantityChange(1));
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
}

// Run initialization when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
