/* =========================================
   1. VERIFICACIÓN DE EDAD
   Se muestra una sola vez por sesión: si ya
   confirmó, no se vuelve a interrumpir mientras
   navega por la web.
========================================= */
const gate = document.getElementById('gate');
const gateSi = document.getElementById('gateSi');

if (sessionStorage.getItem('edadConfirmada') === 'true') {
    gate.classList.add('oculto');
}

gateSi.addEventListener('click', () => {
    sessionStorage.setItem('edadConfirmada', 'true');
    gate.classList.add('oculto');
});

/* =========================================
   2. MENÚ MÓVIL
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
   3. ACORDEÓN DE PREGUNTAS FRECUENTES
========================================= */
const preguntas = document.querySelectorAll('.acordeon__pregunta');

preguntas.forEach((boton) => {
    boton.addEventListener('click', () => {
        const item = boton.closest('.acordeon__item');
        const respuesta = item.querySelector('.acordeon__respuesta');
        const estaAbierto = item.classList.contains('abierto');

        if (estaAbierto) {
            item.classList.remove('abierto');
            respuesta.style.maxHeight = null;
        } else {
            item.classList.add('abierto');
            respuesta.style.maxHeight = respuesta.scrollHeight + 'px';
        }
    });
});

/* =========================================
   4. REVEAL AL HACER SCROLL
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

/* =========================================
   5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   Validación simple en el cliente. El envío real
   a un servidor/email se conecta después (backend
   o un servicio como Formspree/EmailJS).
========================================= */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let esValido = true;

    esValido = validarCampo('nombre', (valor) => valor.trim().length >= 2,
        'Ingresa tu nombre (mínimo 2 caracteres).') && esValido;

    esValido = validarCampo('email', (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor),
        'Ingresa un email válido.') && esValido;

    esValido = validarCampo('mensaje', (valor) => valor.trim().length >= 10,
        'Cuéntanos un poco más (mínimo 10 caracteres).') && esValido;

    if (esValido) {
        successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
    }
});

function validarCampo(id, esValidoFn, textoError) {
    const campo = document.getElementById(id);
    const errorEl = document.getElementById('error-' + id);
    const valido = esValidoFn(campo.value);
    errorEl.textContent = valido ? '' : textoError;
    return valido;
}

/* =========================================
   6. AÑO DINÁMICO EN EL FOOTER
========================================= */
document.getElementById('year').textContent = new Date().getFullYear();
