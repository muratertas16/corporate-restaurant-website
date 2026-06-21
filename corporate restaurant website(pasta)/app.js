document.addEventListener('DOMContentLoaded', () => {
    
    // --- Node Cache Strategy ---
    const uiElements = {
        navigation: document.getElementById('mainNav'),
        sections: document.querySelectorAll('section, header'),
        navAnchors: document.querySelectorAll('.nav-anchor'),
        filterButtons: document.querySelectorAll('.filter-node'),
        catalogCards: document.querySelectorAll('.catalog-card'),
        animatedSections: document.querySelectorAll('.scroll-trigger-view')
    };

    /**
     * 1. Smart Scroll Monitor (Navbar & Active States)
     */
    const handleScrollMetrics = () => {
        const scrollY = window.scrollY;

        // Navbar state mutation
        if (scrollY > 60) {
            uiElements.navigation.classList.add('opaque-state');
        } else {
            uiElements.navigation.classList.remove('opaque-state');
        }

        // Active section tracker
        let activeId = '';
        uiElements.sections.forEach(zone => {
            const topBoundary = zone.offsetTop - 240;
            if (scrollY >= topBoundary) {
                activeId = zone.getAttribute('id');
            }
        });

        uiElements.navAnchors.forEach(anchor => {
            anchor.classList.remove('active-route');
            if (anchor.getAttribute('href') === `#${activeId}`) {
                anchor.classList.add('active-route');
            }
        });
    };

    /**
     * 2. Catalog Dynamic Filter Module
     */
    const initCatalogFilter = () => {
        uiElements.filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Focus transition
                uiElements.filterButtons.forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');

                const criteria = e.target.getAttribute('data-target');

                // Card state layout recalculation
                uiElements.catalogCards.forEach(card => {
                    const group = card.getAttribute('data-group');
                    if (criteria === 'all' || group === criteria) {
                        card.classList.remove('collapse-state');
                    } else {
                        card.classList.add('collapse-state');
                    }
                });
            });
        });
    };

    const initScrollAnimations = () => {
        const observerConfig = {
            root: null,
            threshold: 0.12,
            rootMargin: '0px 0px -50px 0px'
        };

        const appearanceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Animasyon bir kez tetiklensin
                }
            });
        }, observerConfig);

        uiElements.animatedSections.forEach(target => appearanceObserver.observe(target));
    };

    // --- System Bootstrapping ---
    window.addEventListener('scroll', handleScrollMetrics, { passive: true });
    initCatalogFilter();
    initScrollAnimations();
    handleScrollMetrics(); 
});