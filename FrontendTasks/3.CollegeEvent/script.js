// College Event Management System - JavaScript
// Handles form validation, event filtering, and interactivity

// ==================== Registration Form ====================
document.addEventListener('DOMContentLoaded', function() {
    
    // Handle Registration Form Submission
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const studentName = document.getElementById('studentName').value.trim();
            const rollNumber = document.getElementById('rollNumber').value.trim();
            const branch = document.getElementById('branch').value;
            const email = document.getElementById('email').value.trim();
            const mobileNumber = document.getElementById('mobileNumber').value.trim();
            
            // Get selected events
            const eventCheckboxes = document.querySelectorAll('input[name="events"]:checked');
            const selectedEvents = Array.from(eventCheckboxes).map(cb => cb.value);
            
            // Validation
            if (!studentName || !rollNumber || !branch || !email || !mobileNumber) {
                showError('regError', 'Please fill in all required fields');
                return;
            }
            
            // Email validation
            if (!isValidEmail(email)) {
                showError('regError', 'Please enter a valid email address');
                return;
            }
            
            // Mobile validation
            if (!isValidPhone(mobileNumber)) {
                showError('regError', 'Please enter a valid 10-digit mobile number');
                return;
            }
            
            // Event selection validation
            if (selectedEvents.length === 0) {
                showError('regError', 'Please select at least one event');
                return;
            }
            
            // If validation passes
            showSuccess('registration', studentName, selectedEvents);
            registrationForm.reset();
        });
    }
    
    // ==================== Contact Form ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const contactName = document.getElementById('contactName').value.trim();
            const contactEmail = document.getElementById('contactEmail').value.trim();
            const contactPhone = document.getElementById('contactPhone').value.trim();
            const contactSubject = document.getElementById('contactSubject').value;
            const contactMessage = document.getElementById('contactMessage').value.trim();
            const contactCheckbox = document.getElementById('contactCheckbox').checked;
            
            // Validation
            if (!contactName || !contactEmail || !contactPhone || !contactSubject || !contactMessage) {
                showContactError('Please fill in all required fields');
                return;
            }
            
            // Email validation
            if (!isValidEmail(contactEmail)) {
                showContactError('Please enter a valid email address');
                return;
            }
            
            // Phone validation
            if (!isValidPhone(contactPhone)) {
                showContactError('Please enter a valid mobile number');
                return;
            }
            
            // Checkbox validation
            if (!contactCheckbox) {
                showContactError('Please agree to the terms and conditions');
                return;
            }
            
            // If validation passes
            showContactSuccess(contactName);
            contactForm.reset();
        });
    }
    
    // ==================== Event Filter ====================
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter events
            const eventItems = document.querySelectorAll('.event-item');
            eventItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('fade-in'), 100);
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('fade-in'), 100);
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
    // ==================== Gallery Filter ====================
    const galleryFilters = document.querySelectorAll('.gallery-filter');
    galleryFilters.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            galleryFilters.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            const galleryItems = document.querySelectorAll('.gallery-item');
            galleryItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => item.classList.add('fade-in'), 100);
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => item.classList.add('fade-in'), 100);
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
    
});

// ==================== Helper Functions ====================

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Phone validation (10 digits)
function isValidPhone(phone) {
    const phoneRegex = /^\d{10}$/;
    const digitsOnly = phone.replace(/\D/g, '');
    return phoneRegex.test(digitsOnly);
}

// Show registration success message
function showSuccess(type, name, events) {
    const successAlert = document.getElementById('successAlert');
    const successMessage = document.getElementById('successMessage');
    
    if (successAlert && successMessage) {
        successMessage.innerHTML = `
            <strong>Congratulations, ${name}!</strong> You have successfully registered for ${events.length} event(s):<br>
            <ul class="mt-2">
                ${events.map(event => `<li>${event}</li>`).join('')}
            </ul>
            Registration confirmation has been sent to your email.
        `;
        successAlert.style.display = 'block';
        
        // Scroll to success message
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show error message
function showError(elementId, message) {
    const errorAlert = document.getElementById('errorAlert');
    const errorMessage = document.getElementById('errorMessage');
    
    if (errorAlert && errorMessage) {
        errorMessage.textContent = message;
        errorAlert.style.display = 'block';
        
        // Scroll to error message
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show contact form success message
function showContactSuccess(name) {
    const successAlert = document.getElementById('contactSuccessAlert');
    const successMessage = document.getElementById('contactSuccessMessage');
    
    if (successAlert && successMessage) {
        successMessage.innerHTML = `
            Thank you, <strong>${name}</strong>! Your message has been sent successfully. 
            Our team will get back to you within 24 hours.
        `;
        successAlert.style.display = 'block';
        
        // Scroll to success message
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Show contact form error message
function showContactError(message) {
    const errorAlert = document.getElementById('contactErrorAlert');
    const errorMessage = document.getElementById('contactErrorMessage');
    
    if (errorAlert && errorMessage) {
        errorMessage.textContent = message;
        errorAlert.style.display = 'block';
        
        // Scroll to error message
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Set modal image data
function setImageData(title, description) {
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modalTitle && modalDescription) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
    }
}

// ==================== Additional Features ====================

// Add active class to current nav link
document.addEventListener('DOMContentLoaded', function() {
    const currentLocation = location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation || 
            link.getAttribute('href') === currentLocation + '.html' ||
            link.getAttribute('href').endsWith(currentLocation)) {
            link.classList.add('active');
        }
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Form input character limit
document.addEventListener('DOMContentLoaded', function() {
    const messageTextarea = document.getElementById('contactMessage');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            if (this.value.length > 500) {
                this.value = this.value.substring(0, 500);
            }
        });
    }
});

// Real-time form validation
document.addEventListener('DOMContentLoaded', function() {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    // Email validation on blur
    emailInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value && !isValidEmail(this.value)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (this.value) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            }
        });
    });
    
    // Phone validation on blur
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function() {
            const digitsOnly = this.value.replace(/\D/g, '');
            if (this.value && !isValidPhone(this.value)) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            } else if (this.value) {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            }
        });
    });
});

// Log page load (for debugging - student might add this)
console.log('College Event Management System Loaded');
