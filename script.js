/* =========================================
   1. MENÚ MÓVIL
========================================= */
const navToggle = document.getElementById('navToggle');
const navMovil = document.getElementById('navMovil');

navToggle.addEventListener('click', () => {
    const estaAbierto = navMovil.classList.toggle('abierto');
    navToggle.setAttribute('aria-expanded', estaAbierto);
});

navMovil.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        navMovil.classList.remove('abierto');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

/* =========================================
   2. REVEAL AL HACER SCROLL
   IntersectionObserver: eficiente, nativo,
   no necesita librerías externas.
========================================= */
const elementosReveal = document.querySelectorAll('[data-reveal]');

const observador = new IntersectionObserver(
    (entradas) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('en-vista');
                observador.unobserve(entrada.target);
            }
        });
    },
    { threshold: 0.15 }
);

elementosReveal.forEach((el) => observador.observe(el));