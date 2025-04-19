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

// Debounce function for scroll events
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  try {
    initTheme();
    animateOnScroll();
    setTimeout(typeEffect, 1000);
    document.getElementById('year').textContent = new Date().getFullYear();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

// Preloader
window.addEventListener('load', () => {
  try {
    elements.preloader.classList.add('fade');
    setTimeout(() => elements.preloader.style.display = 'none', 500);
  } catch (error) {
    console.error('Preloader error:', error);
  }
});

// Mobile menu and navigation
elements.mobileMenu?.addEventListener('click', () => {
  try {
    elements.navLinks.classList.toggle('active');
    elements.mobileMenu.classList.toggle('active');
    document.body.style.overflow = elements.navLinks.classList.contains('active') ? 'hidden' : 'auto';
  } catch (error) {
    console.error('Mobile menu error:', error);
  }
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  try {
    if (elements.navLinks?.classList.contains('active') && 
        !elements.navLinks.contains(e.target) && 
        !elements.mobileMenu?.contains(e.target)) {
      elements.navLinks.classList.remove('active');
      elements.mobileMenu?.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  } catch (error) {
    console.error('Menu close error:', error);
  }
});

// Smooth scrolling with mobile menu handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    try {
      e.preventDefault();
      const targetId = e.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        if (elements.navLinks?.classList.contains('active')) {
          elements.navLinks.classList.remove('active');
          elements.mobileMenu?.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } catch (error) {
      console.error('Smooth scroll error:', error);
    }
  });
});

// Improved scroll handling with debounce
const handleScroll = debounce(() => {
  try {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const scrollThreshold = 100;
    
    elements.navbar?.classList.toggle('scrolled', currentScroll > scrollThreshold);
    elements.scrollTopButton?.classList.toggle('active', currentScroll > scrollThreshold);
    
    if (window.innerWidth <= 768) {
      if (currentScroll > lastScrollTop && currentScroll > scrollThreshold) {
        elements.navbar.style.transform = 'translateY(-100%)';
      } else {
        elements.navbar.style.transform = 'translateY(0)';
      }
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  } catch (error) {
    console.error('Scroll handling error:', error);
  }
}, 100);

window.addEventListener('scroll', handleScroll);

// Improved touch interactions
document.addEventListener('touchstart', (e) => {
  if (e.target.closest('.project-card')) {
    const card = e.target.closest('.project-card');
    card.classList.add('touched');
  }
});

document.addEventListener('touchend', (e) => {
  const touchedCard = document.querySelector('.project-card.touched');
  if (touchedCard) {
    touchedCard.classList.remove('touched');
  }
});

// Optimize animations for mobile
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (prefersReducedMotion.matches) {
  document.documentElement.style.setProperty('--transition', 'none');
  document.documentElement.style.setProperty('--shadow-hover', 'none');
}

// Initialize AOS with custom settings
try {
  AOS.init({
    duration: 800,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic',
    disable: window.innerWidth < 768
  });
} catch (error) {
  console.error('AOS initialization error:', error);
}

// Add intersection observer for animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  elements.forEach(element => {
    observer.observe(element);
  });
};

// Enhanced typewriter effect with error handling
const typeEffect = () => {
  try {
    const roles = ['Programmer', 'Designer', 'Game Developer', 'Problem Solver'];
    let currentRoleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    const type = () => {
      const currentRole = roles[currentRoleIndex];
      
      if (isDeleting) {
        elements.roleText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        elements.roleText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
      
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1000;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentRoleIndex = (currentRoleIndex + 1) % roles.length;
        typingSpeed = 500;
      }
      
      setTimeout(type, typingSpeed);
    };
    
    type();
  } catch (error) {
    console.error('Typewriter effect error:', error);
  }
};

// Contact form with improved validation
elements.contactForm?.addEventListener('submit', e => {
  try {
    e.preventDefault();
    const formData = {
      name: e.target.querySelector('input[type="text"]').value.trim(),
      email: e.target.querySelector('input[type="email"]').value.trim(),
      message: e.target.querySelector('textarea').value.trim()
    };

    if (!formData.name || !formData.email || !formData.message) {
      showAlert('Please fill all required fields', 'error');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      showAlert('Please enter a valid email address', 'error');
      return;
    }

    showAlert('Your message has been sent successfully!', 'success');
    e.target.reset();
  } catch (error) {
    console.error('Form submission error:', error);
    showAlert('An error occurred. Please try again.', 'error');
  }
});

// Project filtering with animation optimization
elements.filterButtons?.forEach(button => {
  button.addEventListener('click', () => {
    try {
      const filterValue = button.getAttribute('data-filter');
      
      elements.filterButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.style.transform = 'scale(1)';
      });
      button.classList.add('active');
      button.style.transform = 'scale(1.1)';
      
      elements.projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories').split(',');
        const shouldShow = filterValue === 'all' || categories.includes(filterValue);
        
        requestAnimationFrame(() => {
          if (shouldShow) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'block';
              requestAnimationFrame(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              });
            }, 200);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    } catch (error) {
      console.error('Project filtering error:', error);
    }
  });
});

// Theme toggle with localStorage
function initTheme() {
  try {
    const savedTheme = localStorage.getItem('theme');
    const icon = elements.themeToggle?.querySelector('i');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      icon?.classList.replace('fa-moon', 'fa-sun');
    }
  } catch (error) {
    console.error('Theme initialization error:', error);
  }
}

elements.themeToggle?.addEventListener('click', () => {
  try {
    const icon = elements.themeToggle.querySelector('i');
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    icon.classList.replace(isDark ? 'fa-moon' : 'fa-sun', isDark ? 'fa-sun' : 'fa-moon');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  } catch (error) {
    console.error('Theme toggle error:', error);
  }
});

// Utility functions with error handling
function showAlert(message, type) {
  try {
    const alertBox = document.createElement('div');
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);
    
    requestAnimationFrame(() => alertBox.classList.add('show'));
    setTimeout(() => {
      alertBox.classList.remove('show');
      setTimeout(() => alertBox.remove(), 300);
    }, 3000);
  } catch (error) {
    console.error('Alert error:', error);
  }
}

// Scroll to top with smooth behavior
elements.scrollTopButton?.addEventListener('click', () => {
  try {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    console.error('Scroll to top error:', error);
  }
});


// downlaoding resume
// Track resume downloads
document.addEventListener('DOMContentLoaded', function() {
  // Get all resume download buttons
  const resumeButtons = document.querySelectorAll('a[download]');
  
  resumeButtons.forEach(button => {
    button.addEventListener('click', function() {
      console.log('Resume downloaded');
      
      // Optional: Add visual feedback when downloaded
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
      
      // Reset after 2 seconds
      setTimeout(() => {
        this.innerHTML = originalText;
      }, 2000);
      
      // Optional: You could implement analytics tracking here
      // if you're using something like Google Analytics
    });
  });
});

// Cross-browser resume download function
function setupResumeDownload() {
  const resumeButtons = document.querySelectorAll('.hero-buttons a[download], .resume-download a[download]');
  
  resumeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      const filePath = this.getAttribute('href');
      const fileName = filePath.split('/').pop();
      
      // Check if download attribute is supported
      const isDownloadSupported = 'download' in document.createElement('a');
      
      if (!isDownloadSupported) {
        e.preventDefault();
        
        // Create an iframe to force download (works in IE)
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = filePath;
        document.body.appendChild(iframe);
        
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
        
        // Show feedback to user
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
        
        setTimeout(() => {
          this.innerHTML = originalText;
        }, 2000);
      }
      
      console.log('Resume download initiated');
    });
  });
}

// Call this function when the DOM is loaded
document.addEventListener('DOMContentLoaded', setupResumeDownload);