const fs = require('fs');
const path = require('path');

const cssPath = path.join(__dirname, 'style.css');
const jsPath = path.join(__dirname, 'script.js');

let cssContent = fs.readFileSync(cssPath, 'utf8');

// Modify CSS
cssContent = cssContent.replace(
    '--text-light: #FFFFFF;',
    '--text-light: #FFFFFF;\n  --card-bg: #FFFFFF;'
);

cssContent = cssContent.split('background-color: var(--text-light)').join('background-color: var(--card-bg)');
cssContent = cssContent.split('background: var(--text-light)').join('background: var(--card-bg)');

const premiumCss = `
/* =========================================
   PREMIUM ENHANCEMENTS & DARK THEME
   ========================================= */

body { transition: background-color 0.5s ease, color 0.5s ease; }
.zone-card, .pricing-card, .faq-item, .stat-card, .countdown-card, .hours-card {
  transition: transform 0.3s ease, background-color 0.5s ease;
}

body.dark-theme {
  --bg-cream: #121220;
  --bg-pastel-yellow: #2A2A15;
  --bg-pastel-blue: #152233;
  --bg-pastel-green: #152A1B;
  --bg-pastel-pink: #2A1522;
  --bg-pastel-violet: #201533;
  --bg-pastel-coral: #2A1A1A;
  --bg-navy: #0A0A12;
  
  --text-dark: #F0F0FF;
  --text-grey: #A0A0B0;
  --card-bg: #1E1E2E;
}

body.dark-theme .navbar.scrolled {
  background: rgba(42, 42, 21, 0.95);
}

body.dark-theme .faq-item {
  background-color: var(--card-bg);
}

/* 1. Custom Cursor */
* { cursor: none; }
.custom-cursor {
  position: fixed;
  top: 0; left: 0;
  width: 20px; height: 20px;
  background: var(--primary-yellow);
  border-radius: 50%;
  pointer-events: none;
  z-index: 10000;
  transform: translate(-50%, -50%);
  mix-blend-mode: difference;
  transition: width 0.2s, height 0.2s;
}
a:hover ~ .custom-cursor, button:hover ~ .custom-cursor {
  width: 40px; height: 40px;
}
.sparkle {
  position: fixed;
  width: 10px; height: 10px;
  background: var(--primary-blue);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  animation: sparkle-fade 0.8s linear forwards;
}
@keyframes sparkle-fade {
  0% { transform: scale(1) translate(-50%, -50%); opacity: 1; }
  100% { transform: scale(0) translate(-50%, 50px); opacity: 0; }
}

/* 2. Marquee */
.marquee-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 20px 0;
}
.marquee-track {
  display: flex;
  gap: 15px;
  width: max-content;
  animation: scroll-marquee 30s linear infinite;
}
.marquee-track:hover {
  animation-play-state: paused;
}
@keyframes scroll-marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 7.5px)); }
}

/* 3. Parallax */
.parallax-bg, .parallax-obj {
  transform: translateY(calc(var(--scroll, 0) * var(--parallax-speed, 0.1) * 1px));
  will-change: transform;
}

/* 4. Easter Eggs */
.clickable-mascot {
  transition: transform 0.3s ease;
  transform-origin: center;
}
.clickable-mascot.spin-anim {
  animation: egg-spin 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
@keyframes egg-spin {
  0% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.3); }
  100% { transform: rotate(360deg) scale(1); }
}

/* 5. Preloader */
.preloader {
  position: fixed;
  top: 0; left: 0; width: 100vw; height: 100vh;
  background: var(--bg-cream);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.6s ease, visibility 0.6s ease;
}
.preloader.fade-out {
  opacity: 0;
  visibility: hidden;
}
.preloader-content { text-align: center; }
.preloader-mascot {
  font-size: 8rem;
  animation: loader-bounce 0.8s infinite alternate cubic-bezier(0.5, 0.05, 1, 0.5);
}
.preloader-text {
  font-family: var(--font-heading);
  color: var(--primary-red);
  margin-top: 20px;
}
@keyframes loader-bounce {
  from { transform: translateY(0); }
  to { transform: translateY(-50px); }
}

/* 6. Theme Toggle */
.theme-toggle {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  padding: 0.5rem;
  line-height: 1;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.theme-toggle:hover {
  transform: scale(1.2);
}
`;

fs.writeFileSync(cssPath, cssContent + '\\n' + premiumCss, 'utf8');


let jsContent = fs.readFileSync(jsPath, 'utf8');

const premiumJs = `
// --- PREMIUM ENHANCEMENTS SCRIPT ---
// 5. Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => preloader.remove(), 600);
        }, 800);
    }
});

const premiumEnhancements = () => {
    /* 1. Custom Cursor & Sparkles */
    const cursor = document.getElementById('custom-cursor');
    let lastSparkleTime = 0;

    window.addEventListener('mousemove', (e) => {
        if(cursor) {
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
            for(let i=0; i<15; i++) createSparkleBurst(e.clientX, e.clientY);
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
            { transform: \`translate(calc(-50% + \${tx}px), calc(-50% + \${ty}px)) rotate(\${rot}deg)\`, opacity: 0 }
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
`;

jsContent = jsContent.replace('});', '    premiumEnhancements();\\n});');

fs.writeFileSync(jsPath, premiumJs + "\\n\\n" + jsContent, 'utf8');

console.log("Successfully injected premium features using NodeJS!");
