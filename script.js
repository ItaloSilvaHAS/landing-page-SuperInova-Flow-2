// Flow Landing Page JavaScript - Clean and Functional

document.addEventListener('DOMContentLoaded', function() {
    console.log('Flow Landing Page initialized successfully! 🚀');
    const startTime = performance.now();
    
    // DOM Elements
    const htmlElement = document.documentElement;
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const mobileDarkModeToggle = document.getElementById('mobile-dark-mode-toggle');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // Initialize theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        htmlElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        // Default to system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        htmlElement.classList.toggle('dark', prefersDark);
        localStorage.setItem('theme', prefersDark ? 'dark' : 'light');
    }
    
    // Dark mode toggle functionality
    function toggleDarkMode() {
        htmlElement.classList.toggle('dark');
        const theme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    }
    
    // Event listeners for dark mode
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            toggleDarkMode();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }
    
    if (mobileDarkModeToggle) {
        mobileDarkModeToggle.addEventListener('click', function() {
            toggleDarkMode();
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('show');
        });
    }
    
    // FAQ Accordion functionality
    const faqButtons = document.querySelectorAll('.faq-button');
    faqButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.faq-icon');
            
            // Close all other FAQ items
            faqButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherContent = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('.faq-icon');
                    otherContent.classList.remove('active');
                    otherIcon.classList.remove('rotate');
                    otherContent.style.display = 'none';
                }
            });
            
            // Toggle current FAQ item
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                icon.classList.remove('rotate');
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            } else {
                content.style.display = 'block';
                setTimeout(() => {
                    content.classList.add('active');
                    icon.classList.add('rotate');
                }, 10);
            }
        });
    });
    
    // Hardware Accordion functionality (diferentes classes)
    const accordionButtons = document.querySelectorAll('.accordion-button');
    accordionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('.accordion-icon');
            
            // Close all other accordion items
            accordionButtons.forEach(otherButton => {
                if (otherButton !== this) {
                    const otherContent = otherButton.nextElementSibling;
                    const otherIcon = otherButton.querySelector('.accordion-icon');
                    otherContent.classList.add('hidden');
                    otherIcon.style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current accordion item
            if (content.classList.contains('hidden')) {
                content.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                content.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('show');
                }
                
                // Update active navigation link
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));
    
    // Update active navigation based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinksArray = Array.from(navLinks);
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinksArray.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Throttled scroll listener
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNav();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Button click animations
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Performance logging
    window.addEventListener('load', () => {
        const loadTime = performance.now() - startTime;
        console.log('Page load time:', Math.round(loadTime) + 'ms');
    });
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            htmlElement.classList.toggle('dark', e.matches);
        }
    });
    
    // Counter animations
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }
    
    // Trigger counter animation when sections are in view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                animateCountersInSection(counters);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all sections with counters
    const sectionsWithCounters = document.querySelectorAll('#home, footer, section');
    sectionsWithCounters.forEach(section => {
        if (section.querySelectorAll('.counter').length > 0) {
            counterObserver.observe(section);
        }
    });
    
    // Improved counter animation function
    function animateCountersInSection(counters) {
        counters.forEach((counter, index) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            // Stagger the animations
            setTimeout(() => {
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        if (target > 1000) {
                            counter.textContent = Math.ceil(current).toLocaleString();
                        } else {
                            counter.textContent = Math.ceil(current);
                        }
                        requestAnimationFrame(updateCounter);
                    } else {
                        if (target > 1000) {
                            counter.textContent = target.toLocaleString();
                        } else {
                            counter.textContent = target;
                        }
                    }
                };
                updateCounter();
            }, index * 200); // Stagger by 200ms
        });
    }
    
    // Particle system for dynamic background
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'absolute w-2 h-2 bg-blue-400 rounded-full opacity-30 animate-float';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
        
        const heroBackground = document.querySelector('#home .absolute.inset-0');
        if (heroBackground) {
            heroBackground.appendChild(particle);
            
            // Remove particle after animation
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 5000);
        }
    }
    
    // Create particles periodically
    setInterval(createParticle, 3000);
    
    // Enhanced button interactions
    const animatedButtons = document.querySelectorAll('button[class*="animate"]');
    animatedButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 10px 25px rgba(37, 99, 235, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.1)';
        });
    });
    
    // Keyboard accessibility
    document.addEventListener('keydown', function(e) {
        // Close mobile menu with Escape key
        if (e.key === 'Escape' && mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('show');
        }
        
        // Toggle dark mode with Ctrl/Cmd + D
        if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
});