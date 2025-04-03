document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });

    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (currentTheme === 'dark') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    mobileThemeToggle.addEventListener('click', toggleTheme);
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        if (newTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
        } else {
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
        }
    }

    // Portfolio Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category').includes(filter)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active navigation link on scroll
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a, .mobile-menu a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-content, .skill-item, .portfolio-item, .contact-content, .education-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.about-content, .skill-item, .portfolio-item, .contact-content, .education-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Lightbox functionality
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
    
    if (lightboxTriggers.length > 0) {
        lightboxTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                lightboxModal.style.display = "block";
                lightboxImg.src = this.href;
                lightboxCaption.innerHTML = this.title;
                document.body.classList.add('no-scroll');
            });
        });
        
        document.querySelector('.lightbox-close').addEventListener('click', function() {
            lightboxModal.style.display = "none";
            document.body.classList.remove('no-scroll');
        });
        
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                lightboxModal.style.display = "none";
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            // For demo purposes, we'll just log it and show an alert
            console.log({name, email, subject, message});
            
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Update copyright year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Lazy loading images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        
        const lazyLoad = function() {
            lazyImages.forEach(img => {
                if (img.getBoundingClientRect().top < window.innerHeight + 100 && 
                    img.getBoundingClientRect().bottom > 0 && 
                    getComputedStyle(img).display !== 'none') {
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                }
            });
        };
        
        // Initial check
        lazyLoad();
        
        // Listen to scroll events
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationchange', lazyLoad);
    }
});

// Make navbar transparent when at top of page
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});