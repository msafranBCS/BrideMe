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

    // ===== WhatsApp Integration Functions =====
    const WHATSAPP_NUMBER = '+94757710217'; // BrideMe WhatsApp number

    /**
     * Format booking form data as WhatsApp message
     */
    function formatBookingWhatsAppMessage() {
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const preferredDate = document.getElementById('preferredDate')?.value || '';
        const preferredTime = document.getElementById('preferredTime')?.value || '';
        const serviceType = document.getElementById('serviceType')?.value || '';
        const specialRequests = document.getElementById('specialRequests')?.value || '';
        const fileInput = document.getElementById('bookingFile');
        const hasFiles = fileInput && fileInput.files && fileInput.files.length > 0;

        let message = `*New Booking Request - BrideMe*\n\n`;
        message += `*Name:* ${firstName} ${lastName}\n`;
        message += `*Email:* ${email}\n`;
        message += `*Phone:* ${phone}\n`;
        message += `*Preferred Date:* ${preferredDate}\n`;
        message += `*Preferred Time:* ${preferredTime}\n`;
        message += `*Service Type:* ${serviceType}\n`;
        
        if (specialRequests) {
            message += `*Special Requests:*\n${specialRequests}\n`;
        }
        
        if (hasFiles) {
            message += `\n*Attached Files:* ${fileInput.files.length} file(s)\n`;
            for (let i = 0; i < fileInput.files.length; i++) {
                message += `- ${fileInput.files[i].name}\n`;
            }
            message += `\n_Note: Please check files separately as they cannot be sent via WhatsApp URL._`;
        }
        
        message += `\n---\n_This message was sent from the BrideMe website._`;
        
        return encodeURIComponent(message);
    }

    /**
     * Format contact form data as WhatsApp message
     */
    function formatContactWhatsAppMessage() {
        const name = document.getElementById('contactName')?.value || '';
        const email = document.getElementById('contactEmail')?.value || '';
        const subject = document.getElementById('contactSubject')?.value || '';
        const message = document.getElementById('contactMessage')?.value || '';
        const fileInput = document.getElementById('contactFile');
        const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

        let whatsappMessage = `*New Contact Form Submission - BrideMe*\n\n`;
        whatsappMessage += `*Name:* ${name}\n`;
        whatsappMessage += `*Email:* ${email}\n`;
        
        if (subject) {
            whatsappMessage += `*Subject:* ${subject}\n`;
        }
        
        whatsappMessage += `*Message:*\n${message}\n`;
        
        if (hasFile) {
            whatsappMessage += `\n*Attached File:* ${fileInput.files[0].name}\n`;
            whatsappMessage += `_Note: Please check file separately as it cannot be sent via WhatsApp URL._`;
        }
        
        whatsappMessage += `\n---\n_This message was sent from the BrideMe website._`;
        
        return encodeURIComponent(whatsappMessage);
    }

    /**
     * Open WhatsApp with formatted message
     */
    function openWhatsApp(message) {
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    }

    /**
     * Generate PDF from booking form data
     */
    function generateBookingPDF() {
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF library not loaded');
            return null;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const firstName = document.getElementById('firstName')?.value || '';
        const lastName = document.getElementById('lastName')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const preferredDate = document.getElementById('preferredDate')?.value || '';
        const preferredTime = document.getElementById('preferredTime')?.value || '';
        const serviceType = document.getElementById('serviceType')?.value || '';
        const specialRequests = document.getElementById('specialRequests')?.value || '';
        const fileInput = document.getElementById('bookingFile');
        const hasFiles = fileInput && fileInput.files && fileInput.files.length > 0;

        // Title
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('Booking Request - BrideMe', 14, 20);
        
        // Line
        doc.setLineWidth(0.5);
        doc.line(14, 25, 196, 25);
        
        // Form data
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        let yPos = 35;
        
        doc.setFont(undefined, 'bold');
        doc.text('Name:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(`${firstName} ${lastName}`, 50, yPos);
        yPos += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text('Email:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(email, 50, yPos);
        yPos += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text('Phone:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(phone, 50, yPos);
        yPos += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text('Preferred Date:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(preferredDate, 50, yPos);
        yPos += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text('Preferred Time:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(preferredTime, 50, yPos);
        yPos += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text('Service Type:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(serviceType, 50, yPos);
        yPos += 10;
        
        if (specialRequests) {
            yPos += 5;
            doc.setFont(undefined, 'bold');
            doc.text('Special Requests:', 14, yPos);
            yPos += 7;
            doc.setFont(undefined, 'normal');
            const splitRequests = doc.splitTextToSize(specialRequests, 170);
            doc.text(splitRequests, 14, yPos);
            yPos += (splitRequests.length * 6);
        }
        
        if (hasFiles) {
            yPos += 5;
            doc.setFont(undefined, 'bold');
            doc.text('Attached Files:', 14, yPos);
            yPos += 7;
            doc.setFont(undefined, 'normal');
            for (let i = 0; i < fileInput.files.length; i++) {
                doc.text(`- ${fileInput.files[i].name}`, 14, yPos);
                yPos += 6;
            }
        }
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        const pageHeight = doc.internal.pageSize.height;
        doc.text('Generated from BrideMe website', 14, pageHeight - 10);
        doc.text(new Date().toLocaleString(), 14, pageHeight - 5);
        
        return doc;
    }

    /**
     * Generate PDF from contact form data
     */
    function generateContactPDF() {
        if (typeof window.jspdf === 'undefined') {
            console.error('jsPDF library not loaded');
            return null;
        }

        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        const name = document.getElementById('contactName')?.value || '';
        const email = document.getElementById('contactEmail')?.value || '';
        const subject = document.getElementById('contactSubject')?.value || '';
        const message = document.getElementById('contactMessage')?.value || '';
        const fileInput = document.getElementById('contactFile');
        const hasFile = fileInput && fileInput.files && fileInput.files.length > 0;

        // Title
        doc.setFontSize(18);
        doc.setFont(undefined, 'bold');
        doc.text('Contact Form Submission - BrideMe', 14, 20);
        
        // Line
        doc.setLineWidth(0.5);
        doc.line(14, 25, 196, 25);
        
        // Form data
        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        let yPos = 35;
        
        doc.setFont(undefined, 'bold');
        doc.text('Name:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(name, 50, yPos);
        yPos += 10;
        
        doc.setFont(undefined, 'bold');
        doc.text('Email:', 14, yPos);
        doc.setFont(undefined, 'normal');
        doc.text(email, 50, yPos);
        yPos += 10;
        
        if (subject) {
            doc.setFont(undefined, 'bold');
            doc.text('Subject:', 14, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(subject, 50, yPos);
            yPos += 10;
        }
        
        yPos += 5;
        doc.setFont(undefined, 'bold');
        doc.text('Message:', 14, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        const splitMessage = doc.splitTextToSize(message, 170);
        doc.text(splitMessage, 14, yPos);
        yPos += (splitMessage.length * 6);
        
        if (hasFile) {
            yPos += 5;
            doc.setFont(undefined, 'bold');
            doc.text('Attached File:', 14, yPos);
            doc.setFont(undefined, 'normal');
            doc.text(fileInput.files[0].name, 14, yPos + 7);
        }
        
        // Footer
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        const pageHeight = doc.internal.pageSize.height;
        doc.text('Generated from BrideMe website', 14, pageHeight - 10);
        doc.text(new Date().toLocaleString(), 14, pageHeight - 5);
        
        return doc;
    }

    /**
     * Download PDF
     */
    function downloadPDF(pdf, filename) {
        if (pdf) {
            pdf.save(filename);
        }
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

                // Format message for WhatsApp
                const whatsappMessage = formatBookingWhatsAppMessage();
                
                // Generate PDF
                const pdfDoc = generateBookingPDF();
                
                // Store form data for PDF download after reset
                const formData = {
                    firstName: document.getElementById('firstName')?.value || '',
                    lastName: document.getElementById('lastName')?.value || '',
                    email: document.getElementById('email')?.value || '',
                    phone: document.getElementById('phone')?.value || '',
                    preferredDate: document.getElementById('preferredDate')?.value || '',
                    preferredTime: document.getElementById('preferredTime')?.value || '',
                    serviceType: document.getElementById('serviceType')?.value || '',
                    specialRequests: document.getElementById('specialRequests')?.value || ''
                };

                // Show success message
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    // Update success message to include PDF download button
                    let messageContent = successMessage.innerHTML;
                    if (!messageContent.includes('Download PDF')) {
                        messageContent += `
                            <hr>
                            <div class="d-flex gap-2 justify-content-center flex-wrap">
                                <button onclick="window.downloadBookingPDF()" class="btn btn-outline-primary">
                                    <i class="fas fa-download me-2"></i>Download PDF Summary
                                </button>
                            </div>
                        `;
                        successMessage.innerHTML = messageContent;
                    }
                    
                    successMessage.classList.remove('d-none');
                    bookingForm.classList.remove('was-validated');
                    
                    // Store PDF for later download
                    window.bookingPDFDoc = pdfDoc;
                    window.bookingFormData = formData;
                    
                    // Reset form
                    bookingForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide form
                    bookingForm.style.display = 'none';
                    
                    // Open WhatsApp with formatted message
                    setTimeout(() => {
                        openWhatsApp(whatsappMessage);
                    }, 500);
                }
            } else {
                bookingForm.classList.add('was-validated');
            }
        });
        
        // Global function to download booking PDF
        window.downloadBookingPDF = function() {
            if (window.bookingPDFDoc) {
                const firstName = window.bookingFormData?.firstName || 'Booking';
                const lastName = window.bookingFormData?.lastName || '';
                const filename = `BrideMe_Booking_${firstName}_${lastName}_${new Date().getTime()}.pdf`;
                downloadPDF(window.bookingPDFDoc, filename);
            } else {
                // Generate PDF again if not stored
                const pdfDoc = generateBookingPDF();
                if (pdfDoc) {
                    const firstName = document.getElementById('firstName')?.value || 'Booking';
                    const lastName = document.getElementById('lastName')?.value || '';
                    const filename = `BrideMe_Booking_${firstName}_${lastName}_${new Date().getTime()}.pdf`;
                    downloadPDF(pdfDoc, filename);
                }
            }
        };

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
                // Format message for WhatsApp
                const whatsappMessage = formatContactWhatsAppMessage();
                
                // Generate PDF
                const pdfDoc = generateContactPDF();
                
                // Store form data for PDF download after reset
                const formData = {
                    name: document.getElementById('contactName')?.value || '',
                    email: document.getElementById('contactEmail')?.value || '',
                    subject: document.getElementById('contactSubject')?.value || '',
                    message: document.getElementById('contactMessage')?.value || ''
                };

                // Show success message
                const successMessage = document.getElementById('contactSuccessMessage');
                if (successMessage) {
                    // Update success message to include PDF download button
                    let messageContent = successMessage.innerHTML;
                    if (!messageContent.includes('Download PDF')) {
                        messageContent += `
                            <hr>
                            <div class="d-flex gap-2 justify-content-center flex-wrap">
                                <button onclick="window.downloadContactPDF()" class="btn btn-outline-primary">
                                    <i class="fas fa-download me-2"></i>Download PDF Summary
                                </button>
                            </div>
                        `;
                        successMessage.innerHTML = messageContent;
                    }
                    
                    successMessage.classList.remove('d-none');
                    contactForm.classList.remove('was-validated');
                    
                    // Store PDF for later download
                    window.contactPDFDoc = pdfDoc;
                    window.contactFormData = formData;
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    
                    // Hide form
                    contactForm.style.display = 'none';
                    
                    // Open WhatsApp with formatted message
                    setTimeout(() => {
                        openWhatsApp(whatsappMessage);
                    }, 500);
                }
            } else {
                contactForm.classList.add('was-validated');
            }
        });
        
        // Global function to download contact PDF
        window.downloadContactPDF = function() {
            if (window.contactPDFDoc) {
                const name = window.contactFormData?.name || 'Contact';
                const filename = `BrideMe_Contact_${name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
                downloadPDF(window.contactPDFDoc, filename);
            } else {
                // Generate PDF again if not stored
                const pdfDoc = generateContactPDF();
                if (pdfDoc) {
                    const name = document.getElementById('contactName')?.value || 'Contact';
                    const filename = `BrideMe_Contact_${name.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
                    downloadPDF(pdfDoc, filename);
                }
            }
        };
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

