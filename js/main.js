/**
 * Portfolio Website - Interactive JavaScript
 * Handles navigation, animations, form validation, and dynamic content
 */

// ===================================
// DOM ELEMENTS
// ===================================

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ===================================
// NAVIGATION FUNCTIONALITY
// ===================================

/**
 * Toggle mobile navigation menu
 */
function toggleMobileMenu() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

/**
 * Close mobile menu when clicking on a link
 */
function closeMobileMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Handle navbar background on scroll
 */
function handleNavbarScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Event listeners for navigation
if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
}

navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

window.addEventListener('scroll', handleNavbarScroll);

// ===================================
// ANIMATED COUNTER
// ===================================

/**
 * Animate counter numbers
 */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let count = 0;
        
        const updateCounter = () => {
            if (count < target) {
                count += increment;
                counter.textContent = Math.floor(count);
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

/**
 * Intersection Observer for scroll animations
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
            
            // Trigger skill bar animations
            if (entry.target.classList.contains('progress-trigger')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll, .stats-section, .progress-trigger');
    animatedElements.forEach(el => observer.observe(el));
}

// ===================================
// SKILLS PAGE ANIMATIONS
// ===================================

/**
 * Animate skill progress bars
 */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-skill');
        if (targetWidth) {
            setTimeout(() => {
                bar.style.width = targetWidth + '%';
            }, 200);
        }
    });
}

// ===================================
// PROJECTS PAGE FILTERING
// ===================================

/**
 * Filter projects by category
 */
function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0) return;
    
    // Show all projects by default when page loads
    projectCards.forEach(card => {
        card.style.display = 'block';
        card.style.animation = 'fadeInUp 0.5s ease forwards';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category') || '';
                
                if (filter === 'all' || categories.includes(filter)) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Load more projects functionality
 */
function initLoadMoreProjects() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const hiddenProjects = document.querySelectorAll('.project-card.hidden');
    
    if (!loadMoreBtn || hiddenProjects.length === 0) return;
    
    loadMoreBtn.addEventListener('click', () => {
        // Show next 3 projects
        for (let i = 0; i < 3 && i < hiddenProjects.length; i++) {
            hiddenProjects[i].classList.remove('hidden');
            hiddenProjects[i].style.animation = 'fadeInUp 0.5s ease forwards';
        }
        
        // Hide button if no more projects
        const remainingProjects = document.querySelectorAll('.project-card.hidden');
        if (remainingProjects.length === 0) {
            loadMoreBtn.style.display = 'none';
        }
    });
}

// ===================================
// CONTACT FORM HANDLING
// ===================================

/**
 * Form validation functions
 */
const validators = {
    required: (value) => value.trim() !== '',
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    minLength: (value, min) => value.length >= min
};

/**
 * Validate single form field
 */
function validateField(field) {
    const value = field.value;
    const required = field.hasAttribute('required');
    const type = field.type;
    const errorElement = field.parentNode.querySelector('.error-message');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required validation
    if (required && !validators.required(value)) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (isValid && type === 'email' && value && !validators.email(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
    }
    
    // Message length validation
    if (isValid && field.name === 'message' && value && !validators.minLength(value, 10)) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
    }
    
    // Update field appearance
    if (isValid) {
        field.style.borderColor = '#ddd';
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    } else {
        field.style.borderColor = '#dc3545';
        if (errorElement) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        }
    }
    
    return isValid;
}

/**
 * Validate entire form
 */
function validateForm(form) {
    const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
    let isFormValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

/**
 * Handle form submission
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const successMessage = contactForm.querySelector('.success-message');
    const errorMessage = contactForm.querySelector('.error-general');
    
    // Real-time validation
    const formFields = contactForm.querySelectorAll('input, select, textarea');
    formFields.forEach(field => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => {
            if (field.style.borderColor === 'rgb(220, 53, 69)') {
                validateField(field);
            }
        });
    });
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate form
        if (!validateForm(contactForm)) {
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Collect form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Simulate API call (replace with actual endpoint)
            await simulateFormSubmission(data);
            
            // Show success message
            successMessage.style.display = 'flex';
            errorMessage.style.display = 'none';
            contactForm.reset();
            
            // Reset form styles
            formFields.forEach(field => {
                field.style.borderColor = '#ddd';
            });
            
        } catch (error) {
            // Show error message
            errorMessage.style.display = 'flex';
            successMessage.style.display = 'none';
            console.error('Form submission error:', error);
        } finally {
            // Remove loading state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    });
}

/**
 * Simulate form submission (replace with actual API call)
 */
function simulateFormSubmission(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success (90% of the time)
            if (Math.random() > 0.1) {
                console.log('Form submitted successfully:', data);
                resolve(data);
            } else {
                reject(new Error('Submission failed'));
            }
        }, 2000);
    });
}

// ===================================
// FAQ FUNCTIONALITY
// ===================================

/**
 * Initialize FAQ accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ===================================
// SMOOTH SCROLLING
// ===================================

/**
 * Smooth scroll for anchor links
 */
function initSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// TYPING ANIMATION
// ===================================

/**
 * Typing animation for hero subtitle
 */
function initTypingAnimation() {
    const typingElement = document.querySelector('.hero-subtitle');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    const words = text.split(' & ');
    let currentWordIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentWord = words[currentWordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typingElement.textContent = currentWord.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentWordIndex = (currentWordIndex + 1) % words.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typing animation after page load
    setTimeout(typeWriter, 1000);
}

// ===================================
// THEME TOGGLE (BONUS FEATURE)
// ===================================

/**
 * Dark/Light theme toggle
 */
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===================================
// PERFORMANCE OPTIMIZATIONS
// ===================================

/**
 * Lazy load images
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(handleNavbarScroll, 10);
window.addEventListener('scroll', debouncedScrollHandler);

// ===================================
// INITIALIZATION
// ===================================

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website initialized');
    
    // Initialize all features
    initScrollAnimations();
    initProjectFiltering();
    initLoadMoreProjects();
    initContactForm();
    initFAQ();
    initSmoothScrolling();
    initTypingAnimation();
    initThemeToggle();
    initLazyLoading();
    
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('.project-card, .skill-item, .value-item, .timeline-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
    });
    
    // Initialize GitHub commit graph (for projects page)
    initGitHubGraph();
});

/**
 * Initialize GitHub-style commit graph
 */
function initGitHubGraph() {
    const commitGraph = document.querySelector('.commit-graph');
    if (!commitGraph) return;
    
    // Clear existing content
    commitGraph.innerHTML = '';
    
    // Generate 52 weeks of data
    for (let week = 0; week < 52; week++) {
        const commitRow = document.createElement('div');
        commitRow.className = 'commit-row';
        
        for (let day = 0; day < 7; day++) {
            const commitDay = document.createElement('div');
            commitDay.className = 'commit-day';
            
            // Random activity level
            const activity = Math.random();
            if (activity > 0.7) {
                commitDay.classList.add('active');
            }
            
            commitRow.appendChild(commitDay);
        }
        
        commitGraph.appendChild(commitRow);
    }
}

// ===================================
// ERROR HANDLING
// ===================================

/**
 * Global error handler
 */
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
    
    // You could send errors to a logging service here
    // logError(e.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault(); // Prevent the default browser error handling
});

// ===================================
// UTILITY FUNCTIONS
// ===================================

/**
 * Format date for display
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date);
}

/**
 * Get user's preferred language
 */
function getUserLanguage() {
    return navigator.language || navigator.userLanguage || 'en-US';
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
}

/**
 * Check if user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// ===================================
// EXPORT FOR TESTING
// ===================================

// If running in a test environment, export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateField,
        validateForm,
        formatDate,
        copyToClipboard,
        debounce
    };
}