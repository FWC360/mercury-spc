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

            .nav-links a.nav-cta {
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

    // === Hero Reference Slide Carousel ===
    const card      = document.getElementById('heroRefSlide');
    const heroPrev  = document.getElementById('heroRefPrev');
    const heroNext  = document.getElementById('heroRefNext');
    const heroDots  = document.querySelectorAll('#heroRefDots .hrd');

        if (card) {
        const slides = [
            {
                banner: true,
                title: 'Mercury',
                titleAccent: 'SPC',
                subtitle: 'Mercury - Strategy & Planning Council'
            },
            {
                href:  'refrences.html',
                quote: '\u201cThe quality of strategic thinking available to an organization should not be a function of its size. The hard questions \u2014 about how leaders think, how organizations adapt, and how strategy connects to the reality of execution \u2014 deserve focused, unencumbered attention. Mercury SPC appears to be asking those questions seriously. In my observation, that is uncommon. And it is worth noting.\u201d',
                name:  'Mukhraj Saberwal',
                role:  'Accenture \u00b7 Global Technology & Advisory Industry, Assoc. Director \u00b7 Princeton, NJ, USA'
            },
            {
                href:  'refrences.html#ref-jessie',
                quote: '\u201cMr. de Sousa\u2019s facilitation style combines depth of thought, clarity of articulation, and strong audience engagement. He demonstrated a rare ability to challenge existing mindsets while creating a shared sense of direction and ownership among participants.\u201d',
                name:  'Jessie Kaur',
                role:  'Fmr. CEO, Work with Dignity Foundation @ GPTW (Great Places To Work) \u00b7 GMI Great Managers Institute'
            },
            {
                href:  'refrences.html#ref-shawn',
                quote: '\u201cWhat truly distinguishes TC is his profound understanding of the business and the evolving consumer psyche. He possesses an intuitive grasp of what moves the modern consumer, allowing him to craft narratives that are not only aesthetically compelling but also strategically sound.\u201d',
                name:  'S Chandy',
                role:  'Group CMO \u00b7 Paragon Industries / Paragon Footwear'
            },
            {
                href:  'refrences.html#ref-balakrishnan',
                quote: '\u201cIn his short stint, he has exhibited more understanding of the consumer he\u2019s talking to, than most professionals I\u2019ve met.\u201d',
                name:  'R. \u2018Balki\u2019 Balakrishnan',
                role:  'Fmr. Chairman & NCD \u00b7 Lowe Lintas IPG'
            }
            ,
            {
                href: 'refrences.html',
                quote: '\u201cBe prepared to be (softly) told like it is. If that is what is required in the moment, his energy and experience will be rendered indispensable.\u201d',
                name: 'S. Sadarangani',
                role: 'Sahil International \u00b7 Exclusive India Partner to Harman International - JBL, AKG, harman/kardon 1999-2018'
            }
        ];
        const total = slides.length;
        let current = -1;   // no slide shown yet
        let visible = false;
        let busy    = false;
        let autoTimer;

        // Fill card DOM with a slide's data
        function loadSlide(idx) {
            const s = slides[idx];
            const heroEl = document.getElementById('home');
            if (s && s.banner) {
                document.getElementById('hrsQuote').textContent = '';
                document.getElementById('hrsName').textContent  = '';
                document.getElementById('hrsRole').textContent  = '';
                // ensure hero content is visible and card hidden
                if (heroEl) heroEl.classList.remove('hero--ref-active');
                resetPosition(true);
                visible = false;
            } else {
                document.getElementById('hrsQuote').textContent = s.quote || '';
                document.getElementById('hrsName').textContent  = s.name || '';
                document.getElementById('hrsRole').textContent  = s.role || '';
            }
            heroDots.forEach((d, i) => d.classList.toggle('active', i === idx));
            current = idx;
        }

        // Instantly reposition card off-screen (no animation)
        function resetPosition(fromRight) {
            card.style.transition = 'none';
            card.style.transform  = fromRight ? 'translateX(115%)' : 'translateX(-115%)';
            card.style.opacity    = '0';
            card.classList.remove('hrs-in', 'hrs-out-left', 'hrs-out-right');
        }

        // Slide the card onto screen
        function slideIn(idx, fromRight) {
            const s = slides[idx];
            // If this is the banner slide, show hero content and do not animate the card
            if (s && s.banner) {
                loadSlide(idx);
                // ensure hero title visible
                const heroEl = document.getElementById('home');
                if (heroEl) heroEl.classList.remove('hero--ref-active');
                // keep card reset/offscreen
                resetPosition(true);
                visible = false;
                setTimeout(() => { busy = false; }, 200);
                return;
            }
            loadSlide(idx);
            resetPosition(fromRight);
            // Fade out the hero title when first slide appears
            const heroEl = document.getElementById('home');
            if (heroEl) heroEl.classList.add('hero--ref-active');
            // Force reflow so the instant reposition registers before we re-enable transition
            void card.offsetWidth;
            card.style.transition = '';
            card.style.transform  = '';
            card.style.opacity    = '';
            card.classList.add('hrs-in');
            visible = true;
            setTimeout(() => { busy = false; }, 700);
        }

        // Slide the visible card off-screen, then call callback
        function slideOut(toLeft, nextIsBanner, callback) {
            busy = true;
            // Fade the hero title back in as the card exits ONLY if the next slide is the banner
            const heroEl = document.getElementById('home');
            if (heroEl && nextIsBanner) heroEl.classList.remove('hero--ref-active');
            card.classList.remove('hrs-in');
            card.style.transition = '';
            card.style.transform  = '';
            card.style.opacity    = '';
            card.classList.add(toLeft ? 'hrs-out-left' : 'hrs-out-right');
            visible = false;
            setTimeout(callback, 520);
        }

        // Advance to a specific index, with direction
        function goTo(idx, forward) {
            if (busy) return;
            busy = true;
            if (visible) {
                const nextIsBanner = slides[idx] && slides[idx].banner;
                slideOut(forward, nextIsBanner, () => slideIn(idx, forward));
            } else {
                slideIn(idx, forward);
            }
        }

        function startAuto() {
            stopAuto();
            // Advance immediately to the next slide, then schedule the following advance
            const next = (current + 1 + total) % total;
            goTo(next, true);
            // Use the current slide's type to decide how long it should remain visible.
            // Banner slides display for 4s, others for 10s.
            const delay = (slides[current] && slides[current].banner) ? 4000 : 10000;
            autoTimer = setTimeout(startAuto, delay);
        }
        function stopAuto() { clearTimeout(autoTimer); }

        // Arrow buttons
        heroPrev && heroPrev.addEventListener('click', () => {
            stopAuto();
            goTo((current - 1 + total) % total, false);
            startAuto();
        });
        heroNext && heroNext.addEventListener('click', () => {
            stopAuto();
            goTo((current + 1) % total, true);
            startAuto();
        });

        // Dot buttons
        heroDots.forEach(d => {
            d.addEventListener('click', () => {
                const idx = Number(d.dataset.idx);
                if (idx === current) return;
                stopAuto();
                goTo(idx, idx > current);
                startAuto();
            });
        });

        // Keyboard arrows — only while hero is in view
        document.addEventListener('keydown', e => {
            const hero = document.getElementById('home');
            if (!hero) return;
            const r = hero.getBoundingClientRect();
            if (r.bottom < 0 || r.top > window.innerHeight) return;
            if (e.key === 'ArrowLeft')  { stopAuto(); goTo((current - 1 + total) % total, false); startAuto(); }
            if (e.key === 'ArrowRight') { stopAuto(); goTo((current + 1) % total, true);           startAuto(); }
        });

        // Pause auto-advance while hovering the card
        card.addEventListener('mouseenter', stopAuto);
        card.addEventListener('mouseleave', startAuto);

        // First slide appears after a 2.5s delay, then auto-advances every 5.5s
        setTimeout(() => {
            goTo(0, true);
            startAuto();
        }, 2500);
    }

});
