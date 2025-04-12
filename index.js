// Cache DOM elements
const elements = {
  preloader: document.querySelector('.preloader'),
  mobileMenu: document.getElementById('mobile-menu'),
  navLinks: document.querySelector('.nav-links'),
  navbar: document.getElementById('navbar'),
  roleText: document.getElementById('role-text'),
  contactForm: document.getElementById('contact-form'),
  filterButtons: document.querySelectorAll('.project-filter button'),
  projectCards: document.querySelectorAll('.project-card'),
  themeToggle: document.getElementById('theme-toggle'),
  scrollTopButton: document.querySelector('.scroll-top')
};

// Initialize page
window.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setTimeout(typeEffect, 1000);
  document.getElementById('year').textContent = new Date().getFullYear();
  if (typeof AOS !== 'undefined') AOS.init({ duration: 1000, once: true });
});

// Preloader
window.addEventListener('load', () => {
  elements.preloader.classList.add('fade');
  setTimeout(() => elements.preloader.style.display = 'none', 500);
});

// Mobile menu and navigation
elements.mobileMenu.addEventListener('click', () => {
  elements.navLinks.classList.toggle('active');
  elements.mobileMenu.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    if (elements.navLinks.classList.contains('active')) {
      elements.navLinks.classList.remove('active');
      elements.mobileMenu.classList.remove('active');
    }
  });
});

// Scroll effects
window.addEventListener('scroll', () => {
  elements.navbar.classList.toggle('scrolled', window.scrollY > 100);
  elements.scrollTopButton.classList.toggle('active', window.scrollY > 500);
});

// Typewriter effect
const roles = ['Programmer', 'Designer', 'Game Developer', 'Problem Solver'];
let currentRoleIndex = 0, charIndex = 0, isDeleting = false;

function typeEffect() {
  const currentRole = roles[currentRoleIndex];
  const delay = isDeleting ? 50 : 
                charIndex === currentRole.length ? 2000 : 
                charIndex === 0 ? 500 : 150;

  elements.roleText.textContent = currentRole.substring(0, isDeleting ? charIndex - 1 : charIndex + 1);
  charIndex += isDeleting ? -1 : 1;

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentRoleIndex = (currentRoleIndex + 1) % roles.length;
  }

  setTimeout(typeEffect, delay);
}

// Contact form
elements.contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = {
    name: e.target.querySelector('input[type="text"]').value,
    email: e.target.querySelector('input[type="email"]').value,
    message: e.target.querySelector('textarea').value
  };

  if (!formData.name || !formData.email || !formData.message) {
    showAlert('Please fill all required fields', 'error');
    return;
  }

  showAlert('Your message has been sent successfully!', 'success');
  e.target.reset();
});

// Project filtering
elements.filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const filterValue = button.getAttribute('data-filter');
    
    // Update active button
    elements.filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter projects
    elements.projectCards.forEach(card => {
      const categories = card.getAttribute('data-categories').split(',');
      const shouldShow = filterValue === 'all' || categories.includes(filterValue);
      card.style.display = shouldShow ? 'block' : 'none';
    });
  });
});

// Theme toggle
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const icon = elements.themeToggle.querySelector('i');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    icon.classList.replace('fa-moon', 'fa-sun');
  }
}

elements.themeToggle.addEventListener('click', () => {
  const icon = elements.themeToggle.querySelector('i');
  document.body.classList.toggle('dark-mode');
  const isDark = document.body.classList.contains('dark-mode');
  icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Utility functions
function showAlert(message, type) {
  const alertBox = document.createElement('div');
  alertBox.className = `alert ${type}`;
  alertBox.textContent = message;
  document.body.appendChild(alertBox);
  
  setTimeout(() => alertBox.classList.add('show'), 10);
  setTimeout(() => {
    alertBox.classList.remove('show');
    setTimeout(() => alertBox.remove(), 300);
  }, 3000);
}

// Scroll to top
elements.scrollTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
