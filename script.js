// Create floating bubbles
function createBubble() {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    
    const size = Math.random() * 60 + 20;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    
    const startX = Math.random() * window.innerWidth;
    bubble.style.left = startX + 'px';
    bubble.style.bottom = '-100px';
    
    const colors = [
        'rgba(255, 215, 0, 0.6)',
        'rgba(0, 26, 77, 0.4)',
        'rgba(0, 61, 153, 0.5)',
        'rgba(255, 237, 74, 0.5)',
        'rgba(138, 43, 226, 0.4)'
    ];
    const bgColor = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.background = `radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), ${bgColor})`;
    
    const duration = Math.random() * 4 + 6;
    bubble.style.animationDuration = duration + 's';
    
    bubble.addEventListener('click', (e) => {
        popBubble(e, bubble);
    });
    
    container.appendChild(bubble);
    
    setTimeout(() => {
        if (bubble.parentNode) {
            bubble.remove();
        }
    }, duration * 1000);
}

function popBubble(event, bubble) {
    event.stopPropagation();
    
    const rect = bubble.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    createPopParticles(x, y);
    
    bubble.classList.add('bubble-pop');
    
    setTimeout(() => {
        bubble.remove();
    }, 600);
}

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

function createRipple(event) {
    const button = event.currentTarget;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const ripple = document.createElement('span');
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'radial-gradient(circle, rgba(255, 215, 0, 0.8), transparent)';
    ripple.style.pointerEvents = 'none';
    ripple.style.left = (event.clientX - rect.left) + 'px';
    ripple.style.top = (event.clientY - rect.top) + 'px';
    ripple.style.animation = 'ripple-animation 0.6s ease-out forwards';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
    });
});

document.querySelectorAll('.btn, .submit-btn, .service-card, .gallery-item, .info-box').forEach(el => {
    el.addEventListener('click', createRipple);
});

const bookingForm = document.querySelector('.booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const serviceType = this.querySelectorAll('select')[0].value;
        const cleaningType = this.querySelectorAll('select')[1].value;
        const details = this.querySelector('textarea').value;
        
        const subject = `Cleaning Service Booking Request from ${name}`;
        const body = `
Name: ${name}
Email: ${email}
Phone: ${phone}
Service Type: ${serviceType}
Cleaning Type: ${cleaningType}
Additional Details: ${details}
        `.trim();
        
        window.location.href = `mailto:sparkle3shinecleaningservices@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        alert('Thank you for your booking request! Our team will contact you soon.');
        
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createBubble();
            }, i * 100);
        }
        
        this.reset();
    });
}

setInterval(createBubble, 2000);

for (let i = 0; i < 3; i++) {
    setTimeout(() => {
        createBubble();
    }, i * 500);
}

window.addEventListener('load', () => {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createBubble();
        }, i * 300);
    }
});

console.log('🦆 Squeaky Clean Dusters website loaded!');