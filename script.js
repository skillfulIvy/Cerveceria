/* =========================================
   0. ACTIVAR ANIMACIONES DE SCROLL
   Solo si JS corre se ocultan los [data-reveal]
   (ver regla .js-activo en style.css). Así, si el
   script falla, el contenido nunca queda invisible.
========================================= */
document.documentElement.classList.add('js-activo');

/* =========================================
   1. VERIFICACIÓN DE EDAD
   Se muestra una sola vez por sesión: si ya
   confirmó, no se vuelve a interrumpir mientras
   navega por la web. Al abrirse, mueve el foco
   dentro del diálogo (patrón de modal accesible).
========================================= */
const gate = document.getElementById('gate');
const gateSi = document.getElementById('gateSi');

if (sessionStorage.getItem('edadConfirmada') === 'true') {
    gate.classList.add('oculto');
} else {
    gateSi.focus();
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

// La animación de apertura vive en CSS (grid-template-rows en .acordeon__respuesta);
// acá solo togglear la clase, sin medir scrollHeight.
preguntas.forEach((boton) => {
    boton.addEventListener('click', () => {
        boton.closest('.acordeon__item').classList.toggle('abierto');
    });
});

/* =========================================
   4. REVEAL AL HACER SCROLL
   rootMargin negativo en el borde inferior: revela un poco
   antes de que el elemento toque el borde del viewport, así
   se siente inmediato y no en seco.

   Red de seguridad: cualquier capturador de pantalla, lector
   de PDF o bot que no haga scroll real (algunos crawlers de
   buscadores incluidos) nunca dispara el IntersectionObserver,
   y el contenido se quedaría invisible para siempre. Por eso,
   a los 2.5s se fuerza la revelación de lo que quede oculto:
   para un usuario real ya pasó de sobra, y para esos casos
   evita que secciones completas desaparezcan.
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
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
);

elementosReveal.forEach((el) => observador.observe(el));

setTimeout(() => {
    elementosReveal.forEach((el) => el.classList.add('en-vista'));
    observador.disconnect();
}, 2500);

/* =========================================
   5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
   Validación simple en el cliente. El envío real
   a un servidor/email se conecta después (backend
   o un servicio como Formspree/EmailJS).
========================================= */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');

const reglasCampos = {
    nombre: { esValido: (valor) => valor.trim().length >= 2, error: 'Ingresa tu nombre (mínimo 2 caracteres).' },
    email: { esValido: (valor) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor), error: 'Ingresa un email válido.' },
    mensaje: { esValido: (valor) => valor.trim().length >= 10, error: 'Cuéntanos un poco más (mínimo 10 caracteres).' },
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let primerCampoInvalido = null;
    let esValido = true;

    Object.keys(reglasCampos).forEach((id) => {
        const valido = validarCampo(id);
        esValido = esValido && valido;
        if (!valido && !primerCampoInvalido) primerCampoInvalido = id;
    });

    if (esValido) {
        successMsg.classList.add('visible');
        form.reset();
        setTimeout(() => successMsg.classList.remove('visible'), 5000);
    } else {
        document.getElementById(primerCampoInvalido).focus();
    }
});

// Limpia el error en cuanto el campo vuelve a ser válido — no espera al próximo submit
Object.keys(reglasCampos).forEach((id) => {
    document.getElementById(id).addEventListener('input', () => {
        const errorEl = document.getElementById('error-' + id);
        if (errorEl.textContent && reglasCampos[id].esValido(document.getElementById(id).value)) {
            errorEl.textContent = '';
        }
    });
});

function validarCampo(id) {
    const campo = document.getElementById(id);
    const errorEl = document.getElementById('error-' + id);
    const valido = reglasCampos[id].esValido(campo.value);
    errorEl.textContent = valido ? '' : reglasCampos[id].error;
    return valido;
}

/* =========================================
   6. AÑO DINÁMICO EN EL FOOTER
========================================= */
document.getElementById('year').textContent = new Date().getFullYear();
