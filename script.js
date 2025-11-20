// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll to top when clicking the scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
        heroScroll.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const offsetTop = aboutSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // Active navigation highlighting based on scroll position
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current section's nav link
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Scroll event listener
    window.addEventListener('scroll', function() {
        updateActiveNav();
        handleNavbarBackground();
        handleScrollAnimations();
    });

    // Navbar background opacity based on scroll
    function handleNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Scroll animations - fade in elements when they come into view
    function handleScrollAnimations() {
        const animatedElements = document.querySelectorAll('.about-card, .skill-item, .project-card, .experience-card, .contact-item');
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
                element.classList.add('visible');
            }
        });
    }

    // Initialize scroll animations
    handleScrollAnimations();
    updateActiveNav();

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('Thank you for your message! I will get back to you soon.', 'success');
            this.reset();
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        `;

        // Add notification styles
        notification.style.cssText = `
            position: fixed;
            top: 90px;
            right: 20px;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        // Add close button styles
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            margin-left: 10px;
        `;

        // Add notification to DOM
        document.body.appendChild(notification);

        // Close notification on click
        closeButton.addEventListener('click', function() {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Add notification animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Typing animation for hero description (optional enhancement)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill items hover effect
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.boxShadow = '0 15px 40px rgba(37, 99, 235, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
        });
    });

    // About cards hover effect
    const aboutCards = document.querySelectorAll('.about-card');
    aboutCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 20px 50px rgba(37, 99, 235, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
    });

    // Parallax effect for hero background
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Add parallax to scroll event (only on desktop for performance)
    if (window.innerWidth > 768) {
        window.addEventListener('scroll', handleParallax);
    }

    // Loading animation on page load
    function animateOnLoad() {
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        const heroDescription = document.querySelector('.hero-description');
        const heroButtons = document.querySelector('.hero-buttons');
        const heroImage = document.querySelector('.hero-image');

        if (heroName) {
            setTimeout(() => heroName.classList.add('animate__animated', 'animate__fadeInUp'), 100);
        }
        if (heroTitle) {
            setTimeout(() => heroTitle.classList.add('animate__animated', 'animate__fadeInUp'), 300);
        }
        if (heroDescription) {
            setTimeout(() => heroDescription.classList.add('animate__animated', 'animate__fadeInUp'), 500);
        }
        if (heroButtons) {
            setTimeout(() => heroButtons.classList.add('animate__animated', 'animate__fadeInUp'), 700);
        }
        if (heroImage) {
            setTimeout(() => heroImage.classList.add('animate__animated', 'animate__fadeInRight'), 900);
        }
    }

    // Initialize page load animation
    animateOnLoad();

    // Utility function to throttle scroll events for performance
    function throttle(func, wait) {
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

    // Apply throttling to scroll events
    const throttledUpdateActiveNav = throttle(updateActiveNav, 100);
    const throttledHandleNavbarBackground = throttle(handleNavbarBackground, 100);
    const throttledHandleScrollAnimations = throttle(handleScrollAnimations, 200);
    const throttledHandleParallax = throttle(handleParallax, 100);

    // Replace original event listeners with throttled versions
    window.removeEventListener('scroll', updateActiveNav);
    window.removeEventListener('scroll', handleNavbarBackground);
    window.removeEventListener('scroll', handleScrollAnimations);
    
    window.addEventListener('scroll', throttledUpdateActiveNav);
    window.addEventListener('scroll', throttledHandleNavbarBackground);
    window.addEventListener('scroll', throttledHandleScrollAnimations);
    
    if (window.innerWidth > 768) {
        window.removeEventListener('scroll', handleParallax);
        window.addEventListener('scroll', throttledHandleParallax);
    }

    // Initialize image carousels
    initializeCarousels();

    console.log('Portfolio website loaded successfully!');
});

// Image Carousel Functionality
let currentSlides = [0, 0]; // Track current slide for each carousel

function initializeCarousels() {
    const carousels = document.querySelectorAll('.image-carousel');
    
    carousels.forEach((carousel, index) => {
        const images = carousel.querySelectorAll('.carousel-image');
        const dotsContainer = carousel.querySelector('.carousel-dots');
        
        // Create dots for navigation
        images.forEach((_, dotIndex) => {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot';
            if (dotIndex === 0) dot.classList.add('active');
            dot.onclick = () => goToSlide(index, dotIndex);
            dotsContainer.appendChild(dot);
        });
    });
}

function changeSlide(carouselIndex, direction) {
    const carousel = document.querySelectorAll('.image-carousel')[carouselIndex];
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    // Remove active class from current slide
    images[currentSlides[carouselIndex]].classList.remove('active');
    dots[currentSlides[carouselIndex]].classList.remove('active');
    
    // Calculate new slide index
    currentSlides[carouselIndex] += direction;
    
    // Wrap around if needed
    if (currentSlides[carouselIndex] >= images.length) {
        currentSlides[carouselIndex] = 0;
    } else if (currentSlides[carouselIndex] < 0) {
        currentSlides[carouselIndex] = images.length - 1;
    }
    
    // Add active class to new slide
    images[currentSlides[carouselIndex]].classList.add('active');
    dots[currentSlides[carouselIndex]].classList.add('active');
}

function goToSlide(carouselIndex, slideIndex) {
    const carousel = document.querySelectorAll('.image-carousel')[carouselIndex];
    const images = carousel.querySelectorAll('.carousel-image');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    // Remove active class from current slide
    images[currentSlides[carouselIndex]].classList.remove('active');
    dots[currentSlides[carouselIndex]].classList.remove('active');
    
    // Set new slide
    currentSlides[carouselIndex] = slideIndex;
    
    // Add active class to new slide
    images[currentSlides[carouselIndex]].classList.add('active');
    dots[currentSlides[carouselIndex]].classList.add('active');
}

// Optional: Auto-play carousel (uncomment to enable)
// setInterval(() => {
//     changeSlide(0, 1); // Auto-advance first carousel
//     changeSlide(1, 1); // Auto-advance second carousel
// }, 5000); // Change slide every 5 seconds

// Handle window resize
window.addEventListener('resize', function() {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 768) {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});
