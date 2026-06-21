# Product

## Register

brand

## Users

Clientes potenciales de una cervecería artesanal (consumidores curiosos sobre los estilos y dónde comprarlos), bares/locales que evalúan distribuir la marca, y potenciales clientes de Workana evaluando el trabajo del desarrollador. Navegan principalmente desde mobile, casualmente, buscando confianza visual rápida antes de decidir si vale la pena seguir leyendo o contactar.

## Product Purpose

Sitio de presentación de marca para una cervecería artesanal ficticia/de portafolio ("Forja"). Comunica los 4 estilos de cerveza, la historia de la marca, puntos de venta y un canal de contacto. Funciona como pieza de portafolio para conseguir clientes reales en Workana, así que también debe leerse como "trabajo profesional, mantenible, sin frameworks pesados".

## Brand Personality

Artesanal y robusta: tono rústico-industrial inspirado en el oficio de forjar (fuego, paciencia, proceso lento), no en lo "craft beer cute" (sin acuarelas, sin etiquetas ilustradas, sin tipografía manuscrita). Referencia tomada de marcas grandes de cerveza con tipografía condensada y fotografía en escala de grises (ej. Tecate) más que de microcervecerías boutique. Seria, confiada, con calidez de fuego/ámbar como único acento de color sobre una base oscura.

## Anti-references

Evitar lo genérico de plantilla IA: gradientes en texto, glassmorphism decorativo, grids de tarjetas idénticas, eyebrows minúsculos en mayúsculas sobre cada sección, numeración 01/02/03 como scaffolding por defecto, bordes laterales de color como acento. También evitar la estética "craft beer artesanal cute" (ilustraciones tipo etiqueta, acuarelas, fuentes manuscritas) — el tono es industrial/editorial, no boutique.

## Design Principles

- Mostrar, no decorar: cada elemento visual (insignia circular, sello lateral, fotografía) debe comunicar algo de la marca (proceso, herencia, producto), no ser relleno.
- Restricción tecnológica como ventaja: HTML/CSS/JS plano, sin build tools — el código debe quedar legible para un desarrollador junior que lo mantenga.
- Un acento, no una paleta: ámbar sobre negro carbón es la única nota de color; todo lo demás vive en escala de grises/sepia.
- Tipografía condensada en mayúsculas para títulos (Oswald) + texto neutral legible (Inter) — contraste de familias, no dos sans-serif similares.
- Accesible por defecto: el contenido nunca debe depender de JS para ser visible o navegable (gate, scroll-reveal, menú) — siempre hay una vía de fallback.

## Accessibility & Inclusion

Sin requisito formal de WCAG nivel específico, pero ya se aplicaron: roles ARIA en el diálogo de verificación de edad, foco gestionado al abrir modales, aria-live en validación de formulario, objetivos táctiles ≥44px, soporte `prefers-reduced-motion` (incluyendo el video del hero), fallback de contenido visible sin JS y en impresión.
