/* ─────────────────────────────────────────────
   PRIMUS SOLUTIONS — script.js
───────────────────────────────────────────── */

// ── Header scroll effect ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ── Mobile nav toggle ──
const burger     = document.getElementById('burger');
const mobileNav  = document.getElementById('mobileNav');
const navLinks   = document.querySelectorAll('.nav-link');

if (burger && mobileNav) {
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        mobileNav.classList.toggle('open');
        document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        burger && burger.classList.remove('active');
        mobileNav && mobileNav.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ── Active nav on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && (href === '#' + current || href.endsWith('#' + current))) {
            link.classList.add('active');
        }
    });
}, { passive: true });

// ── Scroll reveal animation ──
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            // stagger siblings slightly
            const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
            const idx = siblings.indexOf(entry.target);
            entry.target.style.transitionDelay = Math.min(idx * 80, 400) + 'ms';
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach(el => revealObserver.observe(el));

// ── Back to top button ──
const backTop = document.getElementById('backTop');
if (backTop) {
    window.addEventListener('scroll', () => {
        backTop.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    backTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ── Contact form: AJAX submit with Formspree ──
const contactForm  = document.getElementById('contactForm');
const formSuccess  = document.getElementById('formSuccess');
const formError    = document.getElementById('formError');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending…';
        submitBtn.disabled = true;

        formSuccess && (formSuccess.style.display = 'none');
        formError   && (formError.style.display = 'none');

        const data = new FormData(contactForm);

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                formSuccess && (formSuccess.style.display = 'block');
                contactForm.reset();
                setTimeout(() => {
                    formSuccess && (formSuccess.style.display = 'none');
                }, 6000);
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            formError && (formError.style.display = 'block');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ── WhatsApp fab tooltip on mobile (tap) ──
const waFab = document.querySelector('.wa-fab');
if (waFab && 'ontouchstart' in window) {
    let tapped = false;
    waFab.addEventListener('click', (e) => {
        if (!tapped) {
            e.preventDefault();
            tapped = true;
            setTimeout(() => { tapped = false; }, 1400);
        }
    });
}

// ── Sticky Note ──
const stickyNote  = document.getElementById('stickyNote');
const stickyTab   = document.getElementById('stickyTab');
const stickyClose = document.getElementById('stickyClose');
 
if (stickyNote && stickyTab) {
    stickyTab.addEventListener('click', () => {
        stickyNote.classList.add('open');
    });
}
 
if (stickyNote && stickyClose) {
    stickyClose.addEventListener('click', () => {
        stickyNote.classList.remove('open');
    });
}