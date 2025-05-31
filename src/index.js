// Modern Interactive Features for BarangayNav Landing Page

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeModernFeatures();
    createParticleSystem();
    setupScrollAnimations();
    initializeInteractiveElements();
    setupThemeToggle();
});

// Initialize modern features
function initializeModernFeatures() {
    // Add loading screen
    showLoadingScreen();
    
    // Create floating background elements
    createFloatingElements();
    
    // Initialize typing animation for hero text
    initializeTypingAnimation();
    
    // Setup parallax effects
    setupParallaxEffects();
    
    // Add hover effects to cards
    setupCardHoverEffects();
    
    // Initialize counter animations
    initializeCounterAnimations();
}

// Loading screen
function showLoadingScreen() {
    const loader = document.createElement('div');
    loader.id = 'modernLoader';
    loader.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease;
        ">
            <div style="text-align: center; color: white;">
                <div class="loading mb-4" style="width: 60px; height: 60px; border: 4px solid rgba(255,255,255,0.3); border-top: 4px solid white; margin: 0 auto;"></div>
                <h3 style="margin-bottom: 1rem; font-weight: 300;">BarangayNav</h3>
                <p style="opacity: 0.8;">Loading transparent governance...</p>
            </div>
        </div>
    `;
    document.body.appendChild(loader);
    
    // Remove loader after 2 seconds
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 500);
    }, 2000);
}

// Create floating background elements
function createFloatingElements() {
    const container = document.createElement('div');
    container.className = 'floating-elements';
    
    for (let i = 0; i < 6; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.cssText = `
            width: ${Math.random() * 100 + 40}px;
            height: ${Math.random() * 100 + 40}px;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 20}s;
            opacity: ${Math.random() * 0.3 + 0.1};
        `;
        container.appendChild(element);
    }
    
    document.body.appendChild(container);
}

// Particle system
function createParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.body.appendChild(particleContainer);
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            left: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 10 + 10}s;
            opacity: ${Math.random() * 0.6 + 0.2};
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 20000);
    }
    
    // Create particles periodically
    setInterval(createParticle, 300);
}

// Typing animation for hero text
function initializeTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderRight = 'none';
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger counter animation if it's a counter element
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .glass-card, .service-card').forEach(el => {
        observer.observe(el);
    });
}

// Parallax effects
function setupParallaxEffects() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Move floating elements
        document.querySelectorAll('.floating-element').forEach((element, index) => {
            const speed = (index + 1) * 0.2;
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Parallax for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Card hover effects
function setupCardHoverEffects() {
    document.querySelectorAll('.glass-card, .service-card').forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(31, 38, 135, 0.5)';
            
            // Add glow effect
            this.style.borderColor = 'rgba(255, 255, 255, 0.4)';
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
            this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        });
        
        // Mouse move effect
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `translateY(-10px) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
    });
}

// Counter animations
function initializeCounterAnimations() {
    document.querySelectorAll('[data-counter]').forEach(counter => {
        counter.classList.add('counter');
    });
}

function animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// Interactive elements
function initializeInteractiveElements() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn-modern, .btn-outline-modern, .btn-glass').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Theme toggle (for future implementation)
function setupThemeToggle() {
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'btn-glass theme-toggle';
    themeToggle.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        padding: 10px;
        border-radius: 50%;
        width: 50px;
        height: 50px;
    `;
    
    document.body.appendChild(themeToggle);
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        this.innerHTML = document.body.classList.contains('dark-theme') 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';
    });
}

// Smooth scrolling for navigation links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Performance optimization: Throttle scroll events
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

// Export functions for use in Angular components
window.BarangayNavInteractive = {
    initializeModernFeatures,
    createParticleSystem,
    setupScrollAnimations,
    animateCounter
};
