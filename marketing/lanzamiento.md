# CostaSol Golf: plan de lanzamiento

Objetivo: conseguir peticiones reales de eventos **antes de comprar el equipo** (prueba de 6 semanas)
y que, cuando haya demanda, la web y los perfiles ya traigan clientes solos.

Regla de decisión: si en 6 semanas llegan **5 o más peticiones con fecha y lugar**, o **2 clientes
dispuestos a pagar señal**, se compra todo (carpa, monitor, proyector, pantalla, tapete).

## Lo que tiene que hacer David (solo tú puedes)

| Paso | Qué | Tiempo | Coste |
|---|---|---|---|
| Dominio | Comprar `costasolgolf.com` (o el que elijas) en Cloudflare, Namecheap o IONOS | 10 min | 10–15 €/año |
| Alojamiento | Crear cuenta gratis en Cloudflare Pages o Netlify | 10 min | 0 € |
| Repositorio | Crear un repositorio nuevo en GitHub `costasol-golf` y darme acceso | 5 min | 0 € |
| Imágenes | Descargar las 4 imágenes de Canva y mandármelas (enlaces en el chat) | 5 min | 0 € |
| Email | Crear `hola@costasolgolf.com` (con el dominio, o Gmail aparte) | 10 min | 0–6 €/mes |
| Google Business | Crear el perfil con los textos de `google-business.md` | 20 min | 0 € |
| Instagram | Crear `@costasolgolf` con los textos de `instagram.md` | 15 min | 0 € |
| Precios | Confirmar 790 € / 4 h y 150 € la hora extra (o cambiarlos) | 1 min | — |

## Lo que hago yo en cuanto tenga acceso

1. Poner las imágenes y el dominio real en `golf-site/src/data.mjs` y regenerar la web.
2. Subir la web al repositorio nuevo y conectarla a Cloudflare Pages o Netlify con el dominio.
3. Dar de alta el sitemap en Google Search Console.
4. Añadir Google Analytics (evento `generate_lead` ya preparado en el botón de reservar).
5. Enlazar desde la web de playa (pie de página y página de palos de golf) a CostaSol Golf.

## Semana a semana

**Semana 1: publicar**
- Web publicada con dominio propio, Search Console y Analytics.
- Google Business Profile verificado.
- Instagram con 6 publicaciones (ver `instagram.md`).

**Semanas 1–2: contacto directo (lo que más rinde)**
- 30 mensajes: 10 hoteles, 8 wedding planners y fincas, 6 agencias de eventos, 6 clubes de golf.
  Plantillas en `outreach.md`. Adjuntar el dossier: `/dossier/` (botón "Imprimir o guardar PDF").
- Apuntar cada respuesta en una hoja: nombre, tipo, zona, interés, fecha posible.

**Semanas 2–6: contenido y seguimiento**
- 2 reels por semana (guiones en `instagram.md`).
- 1 publicación por semana en Google Business.
- Seguimiento a los 7 días de cada mensaje sin respuesta.
- Alta en directorios de bodas y eventos (ver `seo.md`).

**Semana 6: decidir**
- Contar peticiones serias y señales. Si se cumple la regla, pedir presupuestos de carpa (email
  listo en `docs/simulador-golf-movil.md`) y comprar.

## Si alguien quiere reservar antes de tener el equipo

- La carpa tarda unos 20–25 días laborables en fabricarse en España.
- Aceptar solo fechas a **5 semanas o más**. Para antes, ofrecer prerreserva sin pago.
- Nada está confirmado hasta cobrar la señal. No prometer fechas que no se pueden cumplir.
