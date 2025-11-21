// BrideMe Custom JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Smooth Scrolling for Navigation Links =====
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===== Gallery Filter Functionality =====
    const filterButtons = document.querySelectorAll('.btn-filter');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                        item.style.display = 'block';
                    } else {
                        item.classList.add('hidden');
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Check for category in URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        if (category) {
            const categoryButton = document.querySelector(`[data-filter="${category}"]`);
            if (categoryButton) {
                categoryButton.click();
            }
        }
    }

    // ===== Lightbox Functionality =====
    const viewImageButtons = document.querySelectorAll('.view-image');
    const lightboxModal = document.getElementById('imageLightbox');
    const lightboxImage = document.getElementById('lightboxImage');

    if (viewImageButtons.length > 0 && lightboxModal) {
        viewImageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const imageUrl = this.getAttribute('data-image');
                if (imageUrl && lightboxImage) {
                    lightboxImage.src = imageUrl;
                    const bsModal = new bootstrap.Modal(lightboxModal);
                    bsModal.show();
                }
            });
        });
    }

    // ===== Booking Form Validation =====
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Check form validity
            if (bookingForm.checkValidity()) {
                // Set minimum date to today
                const dateInput = document.getElementById('preferredDate');
                if (dateInput) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInput.setAttribute('min', today);
                }

                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('d-none');
                    bookingForm.reset();
                    bookingForm.classList.remove('was-validated');
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide form
                    bookingForm.style.display = 'none';
                    
                    // In a real application, you would send the form data to a server here
                    // Example: fetch('/api/booking', { method: 'POST', body: formData })
                }
            } else {
                bookingForm.classList.add('was-validated');
            }
        });

        // Set minimum date for date input
        const dateInput = document.getElementById('preferredDate');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.setAttribute('min', today);
        }
    }

    // ===== Contact Form Validation =====
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Check form validity
            if (contactForm.checkValidity()) {
                // Show success message
                const successMessage = document.getElementById('contactSuccessMessage');
                if (successMessage) {
                    successMessage.classList.remove('d-none');
                    contactForm.reset();
                    contactForm.classList.remove('was-validated');
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide form
                    contactForm.style.display = 'none';
                    
                    // In a real application, you would send the form data to a server here
                    // Example: fetch('/api/contact', { method: 'POST', body: formData })
                }
            } else {
                contactForm.classList.add('was-validated');
            }
        });
    }

    // ===== Navbar Scroll Effect =====
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScroll = 0;
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // ===== Animate on Scroll =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.collection-card, .testimonial-card, .gallery-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // ===== Mobile Menu Close on Link Click =====
    const navLinksMobile = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinksMobile.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // ===== Phone Number Formatting =====
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    }

    // ===== Form Input Focus Effects =====
    const formInputs = document.querySelectorAll('.form-control, .form-select');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // ===== Prevent Form Resubmission on Refresh =====
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href);
    }

    // ===== Lazy Loading Images =====
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ===== Back to Top Button (Optional Enhancement) =====
    // Uncomment to add a back-to-top button
    /*
    const backToTopButton = document.createElement('button');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.className = 'back-to-top btn btn-primary';
    backToTopButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%; display: none; z-index: 1000;';
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    */

    console.log('BrideMe website initialized successfully!');
});

