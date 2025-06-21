// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 800);
            
            // Add analytics tracking if needed for WhatsApp buttons
            if (button.classList.contains('whatsapp-btn') || 
                button.closest('.contact-item') && typeof gtag === 'function') {
                gtag('event', 'whatsapp_contact', {
                    'event_category': 'Contact',
                    'event_label': 'WhatsApp Button Click'
                });
            }
        });
    });

    // Add animation for cards using IntersectionObserver
    const animateElements = document.querySelectorAll('.service-card, .price-card, .contact-item');
    
    // Staggered reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a small delay for each element to create staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 120);
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add parallax effect on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        
        // Parallax for hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroSpeed = 0.5;
            hero.style.backgroundPositionY = `${scrollPosition * heroSpeed}px`;
        }
    });
});