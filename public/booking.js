
/**
 * AIR EGYPT - BOOKING PAGE
 * JavaScript Functionality
 */

// DOM Elements
const header = document.querySelector('.header');
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const langToggle = document.getElementById('langToggle');
const langDropdown = document.getElementById('langDropdown');
const tabButtons = document.querySelectorAll('.tab-btn');
const returnDateGroup = document.querySelector('.return-date');
const bookingForm = document.getElementById('bookingForm');
const backToTopButton = document.getElementById('backToTop');
const currentYearSpan = document.getElementById('currentYear');

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
  
  // Get the selected tab
  const selectedTab = event.target.dataset.tab;
  
  // Show/Hide Return Date based on selected tab
  if (selectedTab === 'oneWay') {
    returnDateGroup.style.display = 'none';
    document.getElementById('returnDate').removeAttribute('required');
  } else {
    returnDateGroup.style.display = 'block';
    document.getElementById('returnDate').setAttribute('required', 'required');
  }
}

// Limit return date to be after departure date
function updateReturnDateMin() {
  const departDate = document.getElementById('departureDate').value;
  if (departDate) {
    document.getElementById('returnDate').min = departDate;
  }
}

// Handle Form Submission
function handleFormSubmit(event) {
  event.preventDefault();
  
  // Get form values
  const departure = document.getElementById('departure').value;
  const arrival = document.getElementById('arrival').value;
  const departureDate = document.getElementById('departureDate').value;
  const returnDate = document.getElementById('returnDate').value;
  const passengers = document.getElementById('passengers').value;
  const cabinClass = document.getElementById('cabinClass').value;
  const promoCode = document.getElementById('promoCode').value;
  
  // Validation
  if (departure === arrival && departure !== '') {
    alert('لا يمكن أن تكون مدينة المغادرة والوصول نفسها');
    return;
  }
  
  // Create booking object
  const bookingData = {
    departure,
    arrival,
    departureDate,
    returnDate,
    passengers,
    cabinClass,
    promoCode
  };
  
  // Log booking data (would be sent to server in a real implementation)
  console.log('Booking Data:', bookingData);
  
  // Show success message to user
  alert('تم إرسال طلب الحجز بنجاح! سيتم تحويلك لصفحة الدفع.');
}

// Back to Top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Close dropdowns when clicking outside
function handleDocumentClick(event) {
  // Close language dropdown if clicking outside
  if (!langToggle.contains(event.target) && !langDropdown.contains(event.target)) {
    langDropdown.classList.remove('show');
  }
}

// Event Listeners
window.addEventListener('scroll', handleScroll);
menuToggle.addEventListener('click', toggleMobileMenu);
langToggle.addEventListener('click', toggleLangDropdown);
document.addEventListener('click', handleDocumentClick);
backToTopButton.addEventListener('click', scrollToTop);

tabButtons.forEach(button => {
  button.addEventListener('click', handleTabChange);
});

document.getElementById('departureDate').addEventListener('change', updateReturnDateMin);
bookingForm.addEventListener('submit', handleFormSubmit);

// Initialize
handleScroll(); // Run once on page load to set initial state
