// Add this at the beginning of the file
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  preloader.classList.add('fade');
  setTimeout(() => {
    preloader.style.display = 'none';
  }, 500);
});

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenu.classList.remove('active');
    }
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Typewriter effect
const roleText = document.getElementById('role-text');
const roles = ['Web Developer', 'UI/UX Designer', 'Game Developer', 'Problem Solver'];
let currentRoleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
  const currentRole = roles[currentRoleIndex];
  
  if (isDeleting) {
    // Deleting text
    roleText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50; // Faster when deleting
  } else {
    // Typing text
    roleText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100; // Normal speed when typing
  }
  
  // If completed typing
  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 1000; // Pause before deleting
  } 
  // If completed deleting
  else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing new word
  }
  
  setTimeout(typeEffect, typingSpeed);
}

// Start the typewriter effect
window.addEventListener('load', typeEffect);

// Contact form submission
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = this.querySelector('input[type="text"]').value;
  const email = this.querySelector('input[type="email"]').value;
  const subject = this.querySelectorAll('input[type="text"]')[1].value;
  const message = this.querySelector('textarea').value;
  
  // Simple validation
  if (!name || !email || !message) {
    showAlert('Please fill all required fields', 'error');
    return;
  }
  
  // Simulate form submission
  showAlert('Your message has been sent successfully!', 'success');
  this.reset();
});

// Alert notification function
function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  
  document.body.appendChild(alertBox);
  
  // Show animation
  setTimeout(() => {
    alertBox.classList.add('show');
  }, 10);
  
  // Remove after 3 seconds
  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(alertBox);
    }, 300);
  }, 3000);
}

// Project filtering
const filterButtons = document.querySelectorAll('.project-filter button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    const filterValue = button.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      if (filterValue === 'all') {
        card.style.display = 'block';
      } else if (card.classList.contains(filterValue)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Dark/Light mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Update icon
  const icon = themeToggle.querySelector('i');
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
    localStorage.setItem('theme', 'light');
  }
});

// Check for saved theme preference
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const icon = themeToggle.querySelector('i');
  
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }
  
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Initialize AOS animation library
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
});

// Skills progress animation
const skillBars = document.querySelectorAll('.skill-progress');

function animateSkills() {
  skillBars.forEach(bar => {
    const percentage = bar.getAttribute('data-percentage');
    const progressBar = bar.querySelector('.progress-bar');
    
    progressBar.style.width = percentage + '%';
  });
}

// Trigger skill animation when in viewport
const skillsSection = document.querySelector('.skills-container');

window.addEventListener('scroll', () => {
  if (isInViewport(skillsSection)) {
    animateSkills();
  }
});

// Helper function to check if element is in viewport
function isInViewport(element) {
  if (!element) return false;
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add scroll to top functionality
const scrollTopButton = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    scrollTopButton.classList.add('active');
  } else {
    scrollTopButton.classList.remove('active');
  }
});

scrollTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add testimonial slider functionality
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const testimonialDots = document.querySelectorAll('.testimonial-dot');
let currentSlide = 0;

function showSlide(index) {
  testimonialSlides.forEach(slide => slide.classList.remove('active'));
  testimonialDots.forEach(dot => dot.classList.remove('active'));
  
  testimonialSlides[index].classList.add('active');
  testimonialDots[index].classList.add('active');
}

testimonialDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    currentSlide = index;
    showSlide(currentSlide);
  });
});

// Auto advance testimonials
setInterval(() => {
  currentSlide = (currentSlide + 1) % testimonialSlides.length;
  showSlide(currentSlide);
}, 5000);