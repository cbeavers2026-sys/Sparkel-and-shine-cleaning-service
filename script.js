// Create floating bubbles
function createBubble() {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    // Random size between 20px and 80px
    const size = Math.random() * 60 + 20;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    
    // Random position
    const startX = Math.random() * window.innerWidth;
    bubble.style.left = startX + 'px';
    bubble.style.bottom = '-100px';
    
    // Random colors (blues, golds, purples)
    const colors = [
        'rgba(255, 215, 0, 0.6)',      // Gold
        'rgba(0, 26, 77, 0.4)',        // Dark blue
        'rgba(0, 61, 153, 0.5)',       // Secondary blue
        'rgba(255, 237, 74, 0.5)',     // Light gold
        'rgba(138, 43, 226, 0.4)'      // Purple
    ];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${bgColor})`;
    
    // Random animation duration
    const duration = Math.random() * 4 + 6;
    bubble.style.animationDuration = duration + 's';
    
    // Add click event to pop bubble
    bubble.addEventListener('click', (e) => {
        popBubble(e, bubble);
    });
    
    container.appendChild(bubble);
    
    // Remove bubble after animation ends
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.remove();
        }
    }, duration * 1000);
}

// Pop bubble on click
function popBubble(event, bubble) {
    event.stopPropagation();
    
    const rect = bubble.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    // Create pop particles
    createPopParticles(x, y);
    
    // Add pop animation
    bubble.classList.add('bubble-pop');
    
    // Remove bubble after pop animation
    setTimeout(() => {
        bubble.remove();
    }, 600);
}

// Create particles when bubble pops
function createPopParticles(x, y) {
    const container = document.getElementById('bubble-container');
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.background = `hsl(${Math.random() * 60 + 30}, 100%, 60%)`;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.boxShadow = '0 0 10px rgba(255, 215, 0, 0.8)';
        
        const angle = (i / particleCount) * Math.PI * 2;
        const velocity = Math.random() * 5 + 3;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        
        const animate = () => {
            posX += vx;
            posY += vy;
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = particle.style.opacity - 0.02;
            
            if (parseFloat(particle.style.opacity) > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        particle.style.opacity = '1';
        container.appendChild(particle);
        animate();
    }
}

// Create ripple effect on button clicks
function createRipple(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    ripple.classList.add('ripple');
    ripple.style.left = (event.clientX - rect.left) + 'px';
    ripple.style.top = (event.clientY - rect.top) + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add click ripple effect to interactive elements
document.querySelectorAll('.cta-button, .submit-button, .service-card, .gallery-item, .info-item').forEach(el => {
    el.addEventListener('click', createRipple);
});

// Add click ripple to table rows
document.querySelectorAll('table tbody tr').forEach(row => {
    row.addEventListener('click', function(e) {
        createRipple({
            currentTarget: this,
            clientX: e.clientX,
            clientY: e.clientY
        });
    });
});

// Add click ripple to logo
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', createRipple);
}

// Handle booking form submission
const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const serviceType = this.querySelectorAll('select')[0].value;
        const cleaningType = this.querySelectorAll('select')[1].value;
        const details = this.querySelector('textarea').value;
        
        // Create mailto link with form data
        const subject = `Cleaning Service Booking Request from ${name}`;
        const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service Type: ${serviceType}
Cleaning Type: ${cleaningType}
Additional Details: ${details}
        `.trim();
        
        // Open email client
        window.location.href = `mailto:sparkle3shinecleaningservices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Show success message with bubbles
        alert('Thank you for your booking request! Our team will contact you soon.');
        
        // Create celebration bubbles
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createBubble();
            }, i * 100);
        }
        
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('.service-card, .gallery-item, .info-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Create bubbles continuously
setInterval(createBubble, 2000);

// Create initial batch of bubbles
for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        createBubble();
    }, i * 500);
}

// Create bubbles on page load
window.addEventListener('load', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBubble();
        }, i * 300);
    }
});

// Add hover effects to nav links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
        for (let i = 0; i < 2; i++) {
            setTimeout(() => {
                createBubble();
            }, i * 100);
        }
    });
});

console.log('🫧 Sparkle and Shine Cleaning Service website loaded with bubble effects!');
