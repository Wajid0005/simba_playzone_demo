
// --- PREMIUM ENHANCEMENTS SCRIPT ---
// 5. Preloader
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 600);
        }, 1200);
    }
});

const premiumEnhancements = () => {
    /* 1. Custom Cursor & Sparkles */
    const cursor = document.getElementById('custom-cursor');
    let lastSparkleTime = 0;

    window.addEventListener('mousemove', (e) => {
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }

        const now = Date.now();
        if (now - lastSparkleTime > 40) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');
            sparkle.style.left = e.clientX + 'px';
            sparkle.style.top = e.clientY + 'px';
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
            lastSparkleTime = now;
        }
    });

    /* 2. Infinite Marquee */
    const marqueeTrack = document.getElementById('gallery-track');
    if (marqueeTrack) {
        marqueeTrack.innerHTML += marqueeTrack.innerHTML;
    }

    /* 3. True Depth Parallax Scrolling */
    window.addEventListener('scroll', () => {
        document.documentElement.style.setProperty('--scroll', window.scrollY);
    });

    /* 4. Mascot Easter Eggs */
    const mascots = document.querySelectorAll('.clickable-mascot');
    mascots.forEach(mascot => {
        mascot.addEventListener('click', (e) => {
            mascot.classList.add('spin-anim');
            setTimeout(() => mascot.classList.remove('spin-anim'), 600);
            for (let i = 0; i < 15; i++) createSparkleBurst(e.clientX, e.clientY);
        });
    });

    function createSparkleBurst(x, y) {
        const colors = ['#FFD700', '#4FC3F7', '#FF6B6B', '#A8E063', '#C9B1FF'];
        const confetti = document.createElement('div');
        const size = Math.random() * 8 + 5 + 'px';
        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.position = 'fixed';
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';

        document.body.appendChild(confetti);

        const tx = (Math.random() - 0.5) * 150;
        const ty = (Math.random() - 0.5) * 150;
        const rot = Math.random() * 360;

        const anim = confetti.animate([
            { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) rotate(${rot}deg)`, opacity: 0 }
        ], { duration: Math.random() * 500 + 500, easing: 'cubic-bezier(.37,0,.63,1)' });
        anim.onfinish = () => confetti.remove();
    }

    /* 6. Night Mode Toggle */
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeToggle.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }
};


document.addEventListener('DOMContentLoaded', () => {

    /* =====================================
       1. Mobile Menu Toggle
       ===================================== */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Transform hamburger to X
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    /* =====================================
       2. Sticky Navbar Effect
       ===================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =====================================
       3. Intersection Observer for Scroll Animations
       ===================================== */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    /* =====================================
       4. Countdown Timer Logic
       ===================================== */
    // Set date to 30 days from now
    const countDownDate = new Date();
    countDownDate.setDate(countDownDate.getDate() + 30);
    const targetTime = countDownDate.getTime();

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('minutes');
    const secsEl = document.getElementById('seconds');

    if (daysEl && hoursEl && minsEl && secsEl) {
        const updateTimer = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetTime - now;

            if (distance < 0) {
                clearInterval(updateTimer);
                daysEl.innerText = "00";
                hoursEl.innerText = "00";
                minsEl.innerText = "00";
                secsEl.innerText = "00";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Bouncing animate effect on text change
            updateNumberWithAnimation(daysEl, formatTime(days));
            updateNumberWithAnimation(hoursEl, formatTime(hours));
            updateNumberWithAnimation(minsEl, formatTime(minutes));
            updateNumberWithAnimation(secsEl, formatTime(seconds));

        }, 1000);
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    function updateNumberWithAnimation(element, newValue) {
        if (element.innerText !== newValue.toString()) {
            element.innerText = newValue;
            // Trigger simple rapid scale effect
            element.style.transform = 'scale(1.2)';
            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 150);
        }
    }

    /* =====================================
       5. FAQ Accordion
       ===================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    /* =====================================
       6. Mock Confetti Function (For Loyalty Button)
       ===================================== */
    const notifyBtn = document.getElementById('notify-btn');
    const loyaltyForm = document.getElementById('loyalty-form');

    if (loyaltyForm) {
        loyaltyForm.addEventListener('submit', (e) => {
            e.preventDefault(); // prevent reload

            const btnRect = notifyBtn.getBoundingClientRect();

            // Create mini confetti elements rapidly
            for (let i = 0; i < 30; i++) {
                createConfettiParticle();
            }

            notifyBtn.innerText = "You're In! 🥳";
            notifyBtn.style.backgroundColor = 'var(--primary-green)';

            setTimeout(() => {
                notifyBtn.innerText = "Notify Me! ✨";
                notifyBtn.style.backgroundColor = 'var(--text-dark)';
                loyaltyForm.reset();
            }, 3000);
        });
    }

    function createConfettiParticle() {
        const colors = ['#FFD700', '#4FC3F7', '#FF6B6B', '#A8E063', '#C9B1FF'];
        const confetti = document.createElement('div');

        // Random style setup
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 8 + 5 + 'px'; // 5 to 13px

        confetti.style.width = size;
        confetti.style.height = size;
        confetti.style.backgroundColor = color;
        confetti.style.position = 'absolute';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0'; // circles or squares

        // Starting position relative to button container
        const container = document.getElementById('btn-confetti');
        if (!container) return;

        container.appendChild(confetti);

        // Animation path
        const tx = (Math.random() - 0.5) * 200; // x spread
        const ty = (Math.random() - 0.5) * 200 - 50; // y spread (mostly up)
        const rot = Math.random() * 360;

        // Animate using Web Animations API
        const anim = confetti.animate([
            { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1000 + 500,
            easing: 'cubic-bezier(.37,0,.63,1)'
        });

        anim.onfinish = () => confetti.remove();
    }

    /* =====================================
       7. Hero Background Confetti Rain Loop
       ===================================== */
    function createHeroConfetti() {
        const container = document.querySelector('.confetti-container');
        if (!container) return;

        const colors = ['#FFD700', '#4FC3F7', '#FF6B6B', '#A8E063', '#C9B1FF'];
        const piece = document.createElement('div');

        piece.classList.add('confetti-piece');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 3 + 2) + 's'; // 2-5s

        container.appendChild(piece);

        // Remove after animation finishes
        setTimeout(() => {
            piece.remove();
        }, 5000);
    }

    // Create new confetti every 300ms
    setInterval(createHeroConfetti, 300);

    premiumEnhancements();
});
