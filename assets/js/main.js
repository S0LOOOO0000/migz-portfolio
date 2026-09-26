document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // 2. Navbar Active State & Intersection Observer
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px',
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('data-target') === id) {
                        link.classList.add('text-white', 'font-bold');
                        link.classList.remove('text-slate-400');
                    } else {
                        link.classList.remove('text-white', 'font-bold');
                        link.classList.add('text-slate-400');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // 3. Project Filter Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-gradient-to-r', 'from-accentCyan', 'to-accentViolet', 'text-white', 'shadow-md');
                b.classList.add('bg-darkCard', 'text-slate-300', 'border', 'border-slate-700');
            });
            btn.classList.remove('bg-darkCard', 'text-slate-300', 'border', 'border-slate-700');
            btn.classList.add('bg-gradient-to-r', 'from-accentCyan', 'to-accentViolet', 'text-white', 'shadow-md');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    projectCards.forEach(card => {
        card.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });

    // 4. MG Hub Cafe Image Carousel
    const carouselTrack = document.getElementById('mg-hub-carousel');
    const carouselPrev = document.querySelector('.carousel-prev');
    const carouselNext = document.querySelector('.carousel-next');
    const carouselCurrent = document.getElementById('carousel-current');
    
    if (carouselTrack && carouselPrev && carouselNext && carouselCurrent) {
        const totalSlides = carouselTrack.children.length;
        let currentSlide = 0;

        function updateCarousel() {
            const slideWidth = carouselTrack.clientWidth;
            carouselTrack.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
            carouselCurrent.textContent = currentSlide + 1;
        }

        carouselPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });

        carouselNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });

        window.addEventListener('resize', updateCarousel);
    }

    // 5. Graphic Design Multi-Image Carousels
    const graphicCards = document.querySelectorAll('.project-card[data-category="graphic"]');
    
    graphicCards.forEach(card => {
        const track = card.querySelector('.graphic-carousel-track');
        const prevBtn = card.querySelector('.graphic-prev');
        const nextBtn = card.querySelector('.graphic-next');
        const currentCounter = card.querySelector('.graphic-current');

        if (track && prevBtn && nextBtn && currentCounter) {
            const totalSlides = track.children.length;
            let currentSlide = 0;

            function updateGraphicCarousel() {
                const slideWidth = track.clientWidth;
                track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                currentCounter.textContent = currentSlide + 1;
            }

            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateGraphicCarousel();
            });

            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                currentSlide = (currentSlide + 1) % totalSlides;
                updateGraphicCarousel();
            });

            window.addEventListener('resize', updateGraphicCarousel);
        }
    });
});