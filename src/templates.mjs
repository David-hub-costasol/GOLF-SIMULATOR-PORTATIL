import { BRAND, PRICE, BAY, TOWNS, EVENTS, FAQ } from "./data.mjs";

// ---------------------------------------------------------------- helpers

export const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const L = (lang, es, en) => (lang === "es" ? es : en);
const group = (n, sep) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
export const euro = (lang, n) => (lang === "es" ? `${group(n, ".")} €` : `€${group(n, ",")}`);
const km = (lang, n) => (n === 0 ? L(lang, "Nuestra base", "Our base") : `${n} km`);

export const paths = {
  home: (lang) => (lang === "es" ? "/" : "/en/"),
  town: (lang, slug) => (lang === "es" ? `/zonas/${slug}/` : `/en/areas/${slug}/`),
  event: (lang, ev) => (lang === "es" ? `/eventos/${ev.slug.es}/` : `/en/events/${ev.slug.en}/`),
  prices: (lang) => (lang === "es" ? "/precios/" : "/en/prices/"),
  faq: (lang) => (lang === "es" ? "/preguntas/" : "/en/faq/"),
  dossier: (lang) => (lang === "es" ? "/dossier/" : "/en/dossier/"),
  legal: (lang) => (lang === "es" ? "/legal/" : "/en/legal/"),
};

const wa = (text) => `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
const waGeneric = (lang) =>
  wa(L(lang, "Hola CostaSol Golf, quiero el simulador para un evento. Fecha, lugar e invitados:", "Hi CostaSol Golf, I'd like the simulator for an event. Date, venue and guests:"));

export const IMAGES = {
  hero: {
    src: "/assets/img/hero.jpg",
    es: "Simulador de golf hinchable en la terraza de un hotel de la Costa del Sol al atardecer",
    en: "Inflatable golf simulator on a Costa del Sol hotel terrace at sunset",
  },
  corporate: {
    src: "/assets/img/corporate.jpg",
    es: "Evento de empresa con el simulador de golf en el salón de un hotel",
    en: "Corporate event with the golf simulator in a hotel ballroom",
  },
  wedding: {
    src: "/assets/img/wedding.jpg",
    es: "Boda en una villa andaluza con el simulador de golf iluminado de noche",
    en: "Wedding at an Andalusian villa with the golf simulator lit up at night",
  },
  swing: {
    src: "/assets/img/swing.jpg",
    es: "Jugador golpeando dentro del simulador de golf hinchable",
    en: "Player hitting a shot inside the inflatable golf simulator",
  },
};

function img(lang, key, cls = "", eager = false) {
  const i = IMAGES[key];
  return `<figure class="pic ${cls}"><img src="${i.src}" alt="${esc(i[lang])}" ${
    eager ? 'fetchpriority="high"' : 'loading="lazy"'
  } onerror="this.parentNode.classList.add('pic--missing')">${flagMark()}</figure>`;
}

// The pin flag: the brand's one motif, drawn where a photo is still missing.
const flagMark = () =>
  `<svg class="pic__flag" viewBox="0 0 120 160" aria-hidden="true"><rect x="22" y="10" width="6" height="140" fill="currentColor"/><path d="M28 12h70l-18 22 18 22H28z" fill="var(--flag)"/><ellipse cx="25" cy="150" rx="22" ry="6" fill="currentColor" opacity=".35"/></svg>`;

// ---------------------------------------------------------------- layout

export function layout({ lang, path, alt, title, desc, body, schema = [] }) {
  const other = lang === "es" ? "en" : "es";
  const url = BRAND.domain + path;
  const nav = [
    [L(lang, "Eventos", "Events"), `${paths.home(lang)}#eventos`],
    [L(lang, "Zonas", "Areas"), `${paths.home(lang)}#zonas`],
    [L(lang, "Precios", "Prices"), paths.prices(lang)],
    [L(lang, "Preguntas", "FAQ"), paths.faq(lang)],
  ];
  return `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="${lang}" href="${url}">
${alt ? `<link rel="alternate" hreflang="${other}" href="${BRAND.domain + alt}">` : ""}
<link rel="alternate" hreflang="x-default" href="${BRAND.domain + (lang === "es" ? path : alt || path)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${BRAND.domain}${IMAGES.hero.src}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#0f3d2e">
<link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css">
${schema.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join("\n")}
</head>
<body>
<a class="skip" href="#main">${L(lang, "Saltar al contenido", "Skip to content")}</a>
<header class="bar">
  <a class="bar__mark" href="${paths.home(lang)}" aria-label="${BRAND.name}">${wordmark()}</a>
  <nav class="bar__nav" aria-label="${L(lang, "Principal", "Main")}">
    ${nav.map(([t, h]) => `<a href="${h}">${t}</a>`).join("")}
    ${alt ? `<a class="bar__lang" href="${alt}" hreflang="${other}" lang="${other}">${other.toUpperCase()}</a>` : ""}
  </nav>
  <a class="btn btn--flag bar__cta" href="#reservar">${L(lang, "Reservar fecha", "Book a date")}</a>
</header>
<main id="main">
${body}
</main>
${footer(lang)}
<a class="wa-float" href="${waGeneric(lang)}" target="_blank" rel="noopener" aria-label="WhatsApp">${waIcon()}</a>
<script src="/assets/main.js" defer></script>
</body>
</html>
`;
}

const wordmark = () =>
  `<svg viewBox="0 0 34 40" aria-hidden="true" class="mark"><rect x="6" y="2" width="3" height="36" fill="currentColor"/><path d="M9 3h22l-6 7 6 7H9z" fill="var(--flag)"/><circle cx="24" cy="34" r="4" fill="currentColor"/></svg><span>CostaSol <b>Golf</b></span>`;

const waIcon = () =>
  `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.8 2.8 0 0 0 1.8-1.3 2.3 2.3 0 0 0 .2-1.3c-.1-.1-.2-.2-.5-.3z"/></svg>`;

function footer(lang) {
  return `<footer class="foot">
  <div class="foot__grid">
    <div>
      <p class="foot__lead">${L(lang, "Golf en tu evento, de Málaga a Sotogrande.", "Golf at your event, from Málaga to Sotogrande.")}</p>
      <p><a href="${waGeneric(lang)}" target="_blank" rel="noopener">WhatsApp ${BRAND.phoneLabel}</a><br>
      <a href="mailto:${BRAND.email}">${BRAND.email}</a><br>${BRAND.base}</p>
    </div>
    <nav aria-label="${L(lang, "Zonas", "Areas")}">
      <p class="foot__h">${L(lang, "Zonas", "Areas")}</p>
      ${TOWNS.map((t) => `<a href="${paths.town(lang, t.slug)}">${t.name}</a>`).join("")}
    </nav>
    <nav aria-label="${L(lang, "Eventos", "Events")}">
      <p class="foot__h">${L(lang, "Eventos", "Events")}</p>
      ${EVENTS.map((e) => `<a href="${paths.event(lang, e)}">${e[lang].name}</a>`).join("")}
      <a href="${paths.dossier(lang)}">${L(lang, "Dossier para hoteles y agencias", "Brochure for hotels and agencies")}</a>
    </nav>
    <div>
      <p class="foot__h">${L(lang, "De la familia CostaSol", "Part of the CostaSol family")}</p>
      <p>${L(
        lang,
        `¿Vienes de vacaciones? Hamacas, sombrillas, equipo de bebé y palos de golf a domicilio en <a href="${BRAND.sister.url}/es">${BRAND.sister.name}</a>.`,
        `On holiday? Loungers, parasols, baby equipment and golf clubs delivered by <a href="${BRAND.sister.url}">${BRAND.sister.name}</a>.`,
      )}</p>
      <p><a href="${paths.legal(lang)}">${L(lang, "Aviso legal y privacidad", "Legal notice and privacy")}</a></p>
    </div>
  </div>
  <p class="foot__name" aria-hidden="true">CostaSol Golf</p>
  <p class="foot__note">${L(lang, "Imágenes ilustrativas hasta que tengamos las fotos de nuestros eventos.", "Illustrative images until we have photos from our own events.")}</p>
</footer>`;
}

// ---------------------------------------------------------------- sections

export function hero(lang, { title, statement, imgKey = "hero", extra = "" }) {
  return `<section class="hero">
  ${img(lang, imgKey, "hero__pic", true)}
  <div class="hero__text">
    <h1 class="display">${title}</h1>
    <p class="statement">${statement}</p>
    <p class="hero__price"><span>${L(lang, "Desde", "From")}</span> <strong>${euro(lang, PRICE.base)}</strong> <span>${L(
      lang,
      `+ IVA · ${PRICE.baseHours} horas con técnico`,
      `+ VAT · ${PRICE.baseHours} hours with a technician`,
    )}</span></p>
    <p class="hero__actions"><a class="btn btn--flag" href="#reservar">${L(lang, "Reservar fecha", "Book a date")}</a>
    <a class="btn btn--line" href="${waGeneric(lang)}" target="_blank" rel="noopener">WhatsApp</a></p>
    ${extra}
  </div>
</section>`;
}

// Technical side view of the bay with its real measurements.
export function baySection(lang) {
  const n = (v) => (lang === "es" ? String(v).replace(".", ",") : String(v));
  const parts = L(
    lang,
    [
      ["Carpa hinchable", "Se infla en minutos con su turbina y se cierra por arriba y por los lados."],
      ["Proyector", "Colgado del techo, fuera de la línea de golpe."],
      ["Pantalla de impacto", "Recibe la bola real y muestra el vuelo, la distancia y el campo."],
      ["Monitor de lanzamiento", "Lee velocidad, ángulo y efecto de cada golpe."],
      ["Tapete y palos", "Césped de golpeo, palos de diestro y zurdo, bolas y tees."],
    ],
    [
      ["Inflatable bay", "Inflates in minutes with its blower and is closed on the top and sides."],
      ["Projector", "Hung from the roof, out of the line of the shot."],
      ["Impact screen", "Takes the real ball and shows its flight, distance and the course."],
      ["Launch monitor", "Reads the speed, angle and spin of every shot."],
      ["Mat and clubs", "Hitting turf, right- and left-handed clubs, balls and tees."],
    ],
  );
  return `<section class="bay" id="simulador">
  <div class="bay__head">
    <h2 class="h2">${L(lang, "Un campo que cabe en una furgoneta", "A course that fits in a van")}</h2>
    <p class="lede">${L(
      lang,
      `Mide ${n(BAY.depth)} × ${n(BAY.width)} m y ${n(BAY.height)} m de alto. Lo montamos en un jardín, una terraza o un salón, y lo atiende un técnico de principio a fin.`,
      `It measures ${BAY.depth} × ${BAY.width} m and ${BAY.height} m high. We set it up in a garden, on a terrace or in a hall, and a technician runs it from start to finish.`,
    )}</p>
  </div>
  <div class="bay__draw">${baySvg(lang, n)}</div>
  <dl class="bay__parts">${parts.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("")}</dl>
</section>`;
}

function baySvg(lang, n) {
  return `<svg viewBox="0 0 900 470" role="img" aria-label="${L(lang, "Vista lateral del simulador de golf hinchable con sus medidas", "Side view of the inflatable golf simulator with its measurements")}">
  <rect x="0" y="400" width="900" height="70" fill="var(--turf)"/>
  <g class="bay-tent">
    <path d="M120 400 V110 Q120 70 160 70 H700 Q740 70 740 110 V400" fill="var(--tent)"/>
    <path d="M150 400 V125 Q150 100 175 100 H685 Q710 100 710 125 V400" fill="var(--tent-in)"/>
  </g>
  <rect x="680" y="135" width="22" height="250" fill="var(--screen)"/>
  <g class="bay-sky"><rect x="684" y="139" width="14" height="242" fill="var(--sky)"/></g>
  <rect x="380" y="100" width="70" height="26" fill="var(--ink)"/>
  <path class="bay-beam" d="M450 118 L682 150 L682 370 L450 126z" fill="var(--light)" opacity=".18"/>
  <rect x="240" y="385" width="260" height="15" fill="var(--turf-dark)"/>
  <g class="bay-player" fill="var(--ink)">
    <circle cx="300" cy="225" r="16"/>
    <path d="M288 243 h24 l8 80 h-12 l-4 62 h-10 l-2-62 -4 62 h-10 l-2-62 h-6z"/>
    <path class="bay-club" d="M312 255 L360 300 L366 384 L374 386 L368 298 L318 248z"/>
  </g>
  <circle class="bay-ball" cx="384" cy="381" r="6" fill="#fff"/>
  <rect x="250" y="372" width="26" height="13" fill="var(--ink)"/>
  <g class="dims" fill="var(--ink)" font-size="22" font-weight="700">
    <path d="M120 440 H740" stroke="var(--ink)" stroke-width="3"/><path d="M120 432 v16 M740 432 v16" stroke="var(--ink)" stroke-width="3"/>
    <text x="430" y="432" text-anchor="middle">${n(BAY.depth)} m</text>
    <path d="M790 70 V400" stroke="var(--ink)" stroke-width="3"/><path d="M782 70 h16 M782 400 h16" stroke="var(--ink)" stroke-width="3"/>
    <text x="808" y="242">${n(BAY.height)} m</text>
  </g>
</svg>`;
}

// The coast as a scorecard: each town is a hole, west to east.
export function scorecard(lang, current) {
  return `<section class="card" id="zonas">
  <div class="card__head">
    <h2 class="h2">${L(lang, "La Costa del Golf, hoyo a hoyo", "The Costa del Golf, hole by hole")}</h2>
    <p class="lede">${L(
      lang,
      "A la Costa del Sol la llaman la Costa del Golf. Salimos de Estepona y llegamos a cualquier punto entre Sotogrande y Málaga con la carpa, el técnico y todo lo demás.",
      "They call the Costa del Sol the Costa del Golf. We set off from Estepona and reach anywhere between Sotogrande and Málaga with the bay, the technician and everything else.",
    )}</p>
  </div>
  <div class="card__scroll">
  <table class="score">
    <caption class="sr">${L(lang, "Zonas donde montamos el simulador", "Areas where we set up the simulator")}</caption>
    <thead><tr><th scope="col">${L(lang, "Hoyo", "Hole")}</th><th scope="col">${L(lang, "Zona", "Area")}</th><th scope="col">${L(lang, "Desde Estepona", "From Estepona")}</th><th scope="col">${L(lang, "Campos cercanos", "Nearby courses")}</th></tr></thead>
    <tbody>
    ${TOWNS.map(
      (t, i) => `<tr${t.slug === current ? ' class="is-here" aria-current="page"' : ""}>
      <td class="score__hole">${i + 1}</td>
      <th scope="row"><a href="${paths.town(lang, t.slug)}">${t.name}</a></th>
      <td>${km(lang, t.km)}</td>
      <td>${t.courses.slice(0, 3).join(", ")}</td>
    </tr>`,
    ).join("")}
    </tbody>
  </table>
  </div>
  <p class="note">${L(lang, "Distancias por carretera aproximadas. Fuera de esta zona, consúltanos el desplazamiento.", "Approximate road distances. Outside this area, ask us about travel.")}</p>
</section>`;
}

export function eventsSection(lang) {
  return `<section class="events" id="eventos">
  <h2 class="h2">${L(lang, "Para qué eventos", "Which events")}</h2>
  ${EVENTS.map(
    (e, i) => `<article class="ev ${i % 2 ? "ev--flip" : ""}">
    ${img(lang, e.img, "ev__pic")}
    <div class="ev__text">
      <h3 class="h3"><a href="${paths.event(lang, e)}">${e[lang].name}</a></h3>
      <p>${e[lang].lead}</p>
      <a class="more" href="${paths.event(lang, e)}">${L(lang, "Ver cómo funciona", "See how it works")} →</a>
    </div>
  </article>`,
  ).join("")}
</section>`;
}

// A real-looking leaderboard fragment of the game screen (sample names).
export function gamesSection(lang) {
  const rows = [
    ["Laura M.", "1,2 m"],
    ["Equipo Ventas", "2,8 m"],
    ["Javi", "3,1 m"],
    ["Sophie", "4,6 m"],
    ["Tom & Rob", "5,0 m"],
  ];
  const games = L(
    lang,
    [
      ["Bola más cerca", "Un golpe al green. Gana quien deja la bola más cerca de la bandera. El juego estrella de bodas y cócteles."],
      ["Drive más largo", "Todos sacan con el driver y la pantalla mide la distancia exacta. Ranking en directo."],
      ["Hoyos famosos", "Juega hoyos virtuales de campos conocidos de todo el mundo, solo o por equipos."],
      ["Torneo por equipos", "Varias rondas, puntos por equipo y premio final. Ideal para empresas."],
    ],
    [
      ["Nearest the pin", "One shot to the green. Closest to the flag wins. The favourite at weddings and drinks receptions."],
      ["Longest drive", "Everyone hits a driver and the screen measures the exact distance. Live leaderboard."],
      ["Famous holes", "Play virtual holes from well-known courses around the world, solo or in teams."],
      ["Team tournament", "Several rounds, team points and a final prize. Ideal for companies."],
    ],
  );
  return `<section class="games">
  <div class="games__text">
    <h2 class="h2">${L(lang, "Juegos que enganchan", "Games people queue for")}</h2>
    <dl class="games__list">${games.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join("")}</dl>
  </div>
  <div class="board" data-ui aria-label="${L(lang, "Ejemplo de ranking en pantalla", "Example on-screen leaderboard")}">
    <p class="board__title">${L(lang, "Bola más cerca", "Nearest the pin")} · 140 m</p>
    <ol class="board__rows">${rows.map(([n, d]) => `<li><span>${n}</span><b>${lang === "en" ? d.replace(",", ".") : d}</b></li>`).join("")}</ol>
    <p class="board__note">${L(lang, "Ejemplo de pantalla", "Example screen")}</p>
  </div>
</section>`;
}

export function dayline(lang) {
  const steps = L(
    lang,
    [
      ["−90 min", "Llegamos, inflamos la carpa y lo dejamos todo listo antes que los invitados."],
      ["Empieza", "El técnico explica cómo golpear y arranca el primer juego."],
      [`${PRICE.baseHours} h`, "Juego sin límite, rankings y premios. Puedes alargar por horas."],
      ["+45 min", "Desmontamos y nos vamos. Sin dejar rastro."],
    ],
    [
      ["−90 min", "We arrive, inflate the bay and get everything ready before your guests."],
      ["Start", "The technician shows how to hit and starts the first game."],
      [`${PRICE.baseHours} h`, "Unlimited play, leaderboards and prizes. Extend by the hour."],
      ["+45 min", "We pack down and leave. Not a trace."],
    ],
  );
  return `<section class="day">
  <h2 class="h2">${L(lang, "Tu evento, minuto a minuto", "Your event, minute by minute")}</h2>
  <ol class="day__line">${steps.map(([t, d]) => `<li><b>${t}</b><p>${d}</p></li>`).join("")}</ol>
</section>`;
}

export function needs(lang) {
  const n = (v) => (lang === "es" ? String(v).replace(".", ",") : String(v));
  const items = L(
    lang,
    [
      [`${BAY.spaceDepth} × ${BAY.spaceWidth} m`, "de espacio llano, en interior o exterior"],
      [`${n(BAY.clearHeight)} m`, "de altura libre para el swing"],
      ["230 V", "un enchufe normal a menos de 25 m"],
      ["50 m", "como máximo desde donde descargamos"],
    ],
    [
      [`${BAY.spaceDepth} × ${BAY.spaceWidth} m`, "of flat space, indoors or outdoors"],
      [`${BAY.clearHeight} m`, "of clear height for the swing"],
      ["230 V", "a standard socket within 25 m"],
      ["50 m", "at most from where we unload"],
    ],
  );
  return `<section class="needs">
  <h2 class="h2">${L(lang, "Lo único que necesitamos", "All we need from you")}</h2>
  <ul class="needs__list">${items.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join("")}</ul>
</section>`;
}

export function packs(lang) {
  const full = PRICE.base + 4 * PRICE.extraHour;
  const list = L(
    lang,
    [
      ["Tee Time", `${PRICE.baseHours} horas`, euro(lang, PRICE.base), ["Juego ilimitado 4 horas", "Técnico todo el evento", "Montaje y desmontaje", "Palos, bolas y juegos"]],
      ["Día completo", `${PRICE.baseHours + 4} horas`, euro(lang, full), ["Para hoteles, ferias y jornadas", "Ranking por equipos y premios", "Técnico todo el evento", "Montaje y desmontaje"]],
      ["Torneo o varios días", "Marca y torneos", "A medida", ["Carpa y pantalla con tu logo", "Varios días seguidos", "Concursos con patrocinadores", "Presupuesto cerrado"]],
    ],
    [
      ["Tee Time", `${PRICE.baseHours} hours`, euro(lang, PRICE.base), ["Unlimited play for 4 hours", "Technician for the whole event", "Set-up and pack-down", "Clubs, balls and games"]],
      ["Full day", `${PRICE.baseHours + 4} hours`, euro(lang, full), ["For hotels, fairs and corporate days", "Team leaderboard and prizes", "Technician for the whole event", "Set-up and pack-down"]],
      ["Tournament or several days", "Brands and tournaments", "Custom quote", ["Bay and screen with your logo", "Several days in a row", "Contests with sponsors", "Fixed quote"]],
    ],
  );
  return `<section class="packs" id="precios">
  <h2 class="h2">${L(lang, "Precios claros", "Clear prices")}</h2>
  <div class="packs__row">
  ${list
    .map(
      ([t, d, p, items], i) => `<div class="pack${i === 0 ? " pack--main" : ""}">
    <h3 class="h3">${t}</h3><p class="pack__d">${d}</p><p class="pack__p">${p}</p>
    <ul>${items.map((x) => `<li>${x}</li>`).join("")}</ul>
  </div>`,
    )
    .join("")}
  </div>
  <p class="note">${L(
    lang,
    `Precios + IVA. Hora extra: ${euro(lang, PRICE.extraHour)}. Transporte incluido de Málaga a Sotogrande.`,
    `Prices + VAT. Extra hour: ${euro(lang, PRICE.extraHour)}. Travel included between Málaga and Sotogrande.`,
  )}</p>
</section>`;
}

// The live thing: a tee-time ticket that prices the event and sends it.
export function ticket(lang, { town = "", event = "" } = {}) {
  const evOpts = EVENTS.map((e) => `<option value="${esc(e[lang].name)}"${e.slug.es === event ? " selected" : ""}>${e[lang].name}</option>`).join("");
  const townOpts = TOWNS.map((t) => `<option${t.slug === town ? " selected" : ""}>${t.name}</option>`).join("");
  return `<section class="book" id="reservar">
  <div class="book__text">
    <h2 class="h2">${L(lang, "Reserva tu tee time", "Book your tee time")}</h2>
    <p class="lede">${L(
      lang,
      "Elige zona, fecha y horas: ves el precio al momento y nos lo mandas por WhatsApp o email. Te confirmamos disponibilidad en el día.",
      "Choose the area, date and hours: you see the price straight away and send it to us by WhatsApp or email. We confirm availability the same day.",
    )}</p>
    <p class="note">${L(lang, "La fecha queda reservada al pagar la señal.", "The date is held once the deposit is paid.")}</p>
  </div>
  <form class="tix" data-tix data-lang="${lang}" data-base="${PRICE.base}" data-hours="${PRICE.baseHours}" data-extra="${PRICE.extraHour}" data-wa="${BRAND.whatsapp}" data-mail="${BRAND.email}">
    <div class="tix__stub" aria-hidden="true"><span>CostaSol Golf</span><span>Tee time</span></div>
    <div class="tix__body">
      <label>${L(lang, "Zona", "Area")}<select name="town">${townOpts}<option>${L(lang, "Otra zona", "Other area")}</option></select></label>
      <label>${L(lang, "Tipo de evento", "Type of event")}<select name="event">${evOpts}</select></label>
      <label>${L(lang, "Fecha", "Date")}<input type="date" name="date"></label>
      <label>${L(lang, "Invitados (aprox.)", "Guests (approx.)")}<input type="number" name="guests" min="1" max="2000" inputmode="numeric" placeholder="60"></label>
      <label class="tix__wide">${L(lang, "Horas de juego", "Hours of play")} <output name="hoursOut">${PRICE.baseHours}</output>
        <input type="range" name="hours" min="${PRICE.baseHours}" max="${PRICE.maxHours}" value="${PRICE.baseHours}" step="1"></label>
      <label class="tix__wide">${L(lang, "Tu nombre", "Your name")}<input name="name" autocomplete="name"></label>
      <p class="tix__total"><span>${L(lang, "Total", "Total")}</span> <output name="total">${euro(lang, PRICE.base)}</output> <span>${L(lang, "+ IVA", "+ VAT")}</span></p>
      <p class="tix__actions">
        <a class="btn btn--flag" data-send="wa" href="${waGeneric(lang)}" target="_blank" rel="noopener">${L(lang, "Enviar por WhatsApp", "Send on WhatsApp")}</a>
        <a class="btn btn--line" data-send="mail" href="mailto:${BRAND.email}?subject=${encodeURIComponent(L(lang, "Simulador de golf para un evento", "Golf simulator for an event"))}">${L(lang, "Enviar por email", "Send by email")}</a>
      </p>
    </div>
  </form>
</section>`;
}

export function faqSection(lang, limit) {
  const list = limit ? FAQ[lang].slice(0, limit) : FAQ[lang];
  return `<section class="faq" id="preguntas">
  <h2 class="h2">${L(lang, "Preguntas", "Questions")}</h2>
  <div class="faq__list">${list.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</div>
  ${limit ? `<p><a class="more" href="${paths.faq(lang)}">${L(lang, "Todas las preguntas", "All questions")} →</a></p>` : ""}
</section>`;
}

export function faqSchema(lang, limit) {
  const list = limit ? FAQ[lang].slice(0, limit) : FAQ[lang];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: list.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  };
}

export function serviceSchema(lang, { name, desc, area }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description: desc,
    serviceType: L(lang, "Alquiler de simulador de golf para eventos", "Golf simulator hire for events"),
    areaServed: area ? { "@type": "City", name: area } : TOWNS.map((t) => ({ "@type": "City", name: t.name })),
    offers: { "@type": "Offer", price: PRICE.base, priceCurrency: "EUR", description: L(lang, `${PRICE.baseHours} horas, + IVA`, `${PRICE.baseHours} hours, + VAT`) },
    provider: {
      "@type": "LocalBusiness",
      name: BRAND.name,
      url: BRAND.domain,
      telephone: `+${BRAND.whatsapp}`,
      email: BRAND.email,
      address: { "@type": "PostalAddress", addressLocality: "Estepona", addressRegion: "Málaga", addressCountry: "ES" },
    },
  };
}

// Our own photos on the Costa del Sol courses. Shown only when the files exist.
export const TEAM_PHOTOS = [
  { file: "team-range.jpg", es: "David en el campo de prácticas de la Costa del Sol", en: "David on a Costa del Sol driving range" },
  { file: "team-tee.jpg", es: "David en el tee de un campo de la Costa del Sol", en: "David on the tee of a Costa del Sol course" },
  { file: "team-green.jpg", es: "Putting green entre palmeras en la Costa del Sol", en: "Putting green among palm trees on the Costa del Sol" },
  { file: "team-together.jpg", es: "El equipo de CostaSol jugando al golf", en: "The CostaSol team playing golf" },
];

export function teamSection(lang, photos) {
  if (!photos.length) return "";
  return `<section class="team">
  <div class="team__text">
    <h2 class="h2">${L(lang, "Jugamos aquí", "We play here")}</h2>
    <p class="lede">${L(
      lang,
      "Somos de Estepona y jugamos en estos campos. Por eso sabemos qué funciona en un evento: que juegue todo el mundo, que haya ranking y que nadie espere.",
      "We live in Estepona and play these courses. That's why we know what works at an event: everyone plays, there's a leaderboard and nobody waits.",
    )}</p>
  </div>
  <div class="team__pics">${photos
    .map((p) => `<figure class="pic"><img src="/assets/img/${p.file}" alt="${esc(p[lang])}" loading="lazy"></figure>`)
    .join("")}</div>
</section>`;
}
