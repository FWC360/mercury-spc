// ============================================
// Mercury SPC — Home 2 Redesign Interactions
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // === Mobile Navigation Toggle ===
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    function closeMenu() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    }

    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close when clicking outside the menu
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !navToggle.contains(e.target)) {
                closeMenu();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeMenu();
        });
    }

    // === Smooth Scroll ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                const offset = 80;
                const top = targetEl.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });

                if (navLinks && navLinks.classList.contains('active')) {
                    closeMenu();
                }
            }
        });
    });

    // === Thermometer Scroll Progress Bar ===
    const thermometerFill = document.getElementById('thermometerFill');

    function updateThermometer() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min((scrollTop / docHeight) * 100, 100);
        if (thermometerFill) {
            thermometerFill.style.height = scrollPercent + '%';
        }
    }

    window.addEventListener('scroll', updateThermometer, { passive: true });
    updateThermometer();

    // === Section 6: Thermometer fill animation ===
    const thermoMercury = document.getElementById('thermoMercury');
    let thermoAnimated = false;

    const thermoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !thermoAnimated) {
                thermoAnimated = true;
                if (thermoMercury) {
                    // Animate from 20% to 75% (just before the 99% red line)
                    thermoMercury.style.height = '75%';
                }
                thermoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const thermoSection = document.getElementById('thermoMercury');
    if (thermoSection) {
        thermoObserver.observe(thermoSection.closest('.section-thermometer'));
    }

    // === Scroll Reveal Animations ===
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Fade-in elements
    const fadeElements = document.querySelectorAll(
        '.section-header, .section-tag, .section-title, .section-desc, ' +
        '.hero-title, .hero-subtitle, ' +
        '.problem-statement, .cta-content, ' +
        '.highlight-block, .thermometer-text, .thermometer-visual'
    );

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Staggered grid animations
    const staggerElements = document.querySelectorAll(
        '.pointers-grid, .expansion-grid, .execution-grid, ' +
        '.services-grid, .objectives-grid, .hidden-costs-grid, ' +
        '.advocacy-grid, .contact-details, .letoffs-grid'
    );

    staggerElements.forEach(el => {
        el.classList.add('stagger-children');
        observer.observe(el);
    });

    // === Card Hover Effects ===
    const cards = document.querySelectorAll(
        '.pointer-card, .expansion-card, .execution-card, ' +
        '.service-card, .objective-card, .cost-card'
    );

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // === Navigation Scroll Effect ===
    const nav = document.querySelector('.nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // === Contact Form Handling ===
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;

            btn.textContent = 'Sending...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(() => {
                btn.textContent = 'Partnership Initiated!';
                btn.style.background = '#367589';
                btn.style.opacity = '1';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 2500);
            }, 1500);
        });
    }

    // === Typewriter Effect for Hero Title ===
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const lines = heroTitle.querySelectorAll('.title-line');
        lines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(20px)';
            line.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            line.style.transitionDelay = `${index * 0.15}s`;

            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 100);
        });
    }

    // === Cursor Glow Effect (Desktop) ===
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(54, 117, 137, 0.06) 0%, rgba(212, 168, 67, 0.02) 40%, transparent 70%);
            pointer-events: none;
            z-index: 0;
            transform: translate(-50%, -50%);
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
    }

    // === Mobile Menu Styles ===
    const style = document.createElement('style');

    // === TS Consumer Sketch — draw lines on scroll ===
    const sketchWrap = document.querySelector('.ts-consumer-sketch-wrap');
    if (sketchWrap) {
        const sketchObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelector('.ts-consumer-sketch')?.classList.add('ts-sketch-animated');
                    sketchObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        sketchObserver.observe(sketchWrap);
    }

    // === TS Stats — count-up animation on scroll ===
    const tsStatNumbers = document.querySelectorAll('.ts-stat-number');
    if (tsStatNumbers.length) {
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const raw = el.getAttribute('data-count');
                if (!raw) return;
                const target = parseFloat(raw);
                const prefix = el.getAttribute('data-prefix') || '';
                const suffix = el.querySelector('.ts-stat-unit')?.outerHTML || '';
                const isDecimal = raw.includes('.');
                const duration = 1600;
                const start = performance.now();
                const animate = (now) => {
                    const progress = Math.min((now - start) / duration, 1);
                    const ease = 1 - Math.pow(1 - progress, 3);
                    const current = isDecimal ? (target * ease).toFixed(1) : Math.round(target * ease);
                    el.innerHTML = prefix + current + suffix;
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                countObserver.unobserve(el);
            });
        }, { threshold: 0.4 });

        tsStatNumbers.forEach(el => {
            // Extract numeric value from text, store as data-count
            const text = el.textContent.trim();
            const numMatch = text.match(/[\d.]+/);
            if (numMatch) {
                el.setAttribute('data-count', numMatch[0]);
                const prefix = text.match(/^[^\d]*/)[0];
                if (prefix) el.setAttribute('data-prefix', prefix);
            }
            countObserver.observe(el);
        });
    }

    style.textContent = `
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1.5rem 2rem;
                gap: 1rem;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            }

            .nav-links.active {
                display: flex;
            }

            .nav-links a {
                padding: 0.75rem 0;
                border-bottom: 1px solid #f0f0f0;
                color: #2c2c30 !important;
            }

            .nav-cta {
                margin-top: 0.5rem;
                text-align: center;
                color: white !important;
            }
        }
    `;
    document.head.appendChild(style);

    // === Team page: sync Ryan ↔ Netto bio cards + add horizontal row class ===
    document.querySelectorAll('.tt-details').forEach(det => {
        det.addEventListener('toggle', () => {
            const row = det.closest('.tt-row');
            if (row) row.classList.toggle('tt-row--bio-open', !!row.querySelector('.tt-details[open]'));
        });
    });

    const detRyan  = document.getElementById('details-ryan');
    const detNetto = document.getElementById('details-netto');
    if (detRyan && detNetto) {
        let syncing = false;
        detRyan.addEventListener('toggle', () => {
            if (syncing) return;
            syncing = true;
            detNetto.open = detRyan.open;
            syncing = false;
        });
        detNetto.addEventListener('toggle', () => {
            if (syncing) return;
            syncing = true;
            detRyan.open = detNetto.open;
            syncing = false;
        });
    }

    console.log('Mercury SPC — Home 2 Redesign Loaded');

});
