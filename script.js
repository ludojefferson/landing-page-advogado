document.addEventListener('DOMContentLoaded', () => {
    // --- Navegação Responsiva (Menu Burger) ---
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            navLinks.forEach(item => {
                item.style.animation = ''; // Reset animation on close
            });
        });
    });

    // --- Efeito de Scroll na Navegação ---
    const headerNav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Adiciona a classe 'scrolled' após 50px de rolagem
            headerNav.classList.add('scrolled');
        } else {
            headerNav.classList.remove('scrolled');
        }
    });

    // --- Scroll Suave para Ancoras ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Simples Lógica para Depoimentos (se for um slider simples sem libs externas) ---
    // Você pode usar uma biblioteca como Swiper.js ou Slick Carousel para um slider mais robusto.
    // Este é um exemplo básico de scroll horizontal.

    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let isDown = false;
        let startX;
        let scrollLeft;

        testimonialSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            testimonialSlider.classList.add('active');
            startX = e.pageX - testimonialSlider.offsetLeft;
            scrollLeft = testimonialSlider.scrollLeft;
        });

        testimonialSlider.addEventListener('mouseleave', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mouseup', () => {
            isDown = false;
            testimonialSlider.classList.remove('active');
        });

        testimonialSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - testimonialSlider.offsetLeft;
            const walk = (x - startX) * 2; // Velocidade do scroll
            testimonialSlider.scrollLeft = scrollLeft - walk;
        });
    }

    // --- Animações ao Scroll (Exemplo com Intersection Observer) ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% da seção visível
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in'); // Adiciona uma classe para animar
                observer.unobserve(entry.target); // Opcional: para animar apenas uma vez
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        section.classList.add('section-hidden'); // Classe inicial para esconder/animar
        sectionObserver.observe(section);
    });
});

/* Keyframes para animação do menu burger */
@keyframes navLinkFade {
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0px);
    }
}
