// Generates the static CostaSol Golf site into golf-site/site/.
// Usage: node golf-site/build.mjs   (Node 18+, no dependencies)
import { mkdirSync, writeFileSync, cpSync, rmSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BRAND, PRICE, BAY, TOWNS, EVENTS } from "./src/data.mjs";
import {
  layout,
  paths,
  hero,
  baySection,
  scorecard,
  eventsSection,
  gamesSection,
  dayline,
  needs,
  packs,
  ticket,
  faqSection,
  faqSchema,
  serviceSchema,
  euro,
  IMAGES,
  TEAM_PHOTOS,
  teamSection,
} from "./src/templates.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "site");
const L = (lang, es, en) => (lang === "es" ? es : en);
const pages = [];

function write(path, html) {
  const file = join(OUT, path, path.endsWith(".html") ? "" : "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  if (!path.endsWith(".html")) pages.push(path);
}

rmSync(OUT, { recursive: true, force: true });
cpSync(join(ROOT, "assets"), join(OUT, "assets"), { recursive: true });

// Each picture slot uses its own photo (assets/img/<key>.jpg). Until we have photos
// of our events, it borrows one of our own photos on Costa del Sol courses, with that
// photo's own description; with neither, it shows the plain green field with the flag.
mkdirSync(join(OUT, "assets/img"), { recursive: true });
const team = TEAM_PHOTOS.filter((p) => existsSync(join(ROOT, "assets/img", p.file)));
const STAND_IN = { hero: "team-range.jpg", corporate: "team-tee.jpg", wedding: "team-together.jpg", swing: "team-green.jpg" };
for (const [key, image] of Object.entries(IMAGES)) {
  if (existsSync(join(ROOT, "assets/img", `${key}.jpg`))) continue;
  const p = team.find((t) => t.file === STAND_IN[key]);
  if (!p) continue;
  Object.assign(image, { src: `/assets/img/${p.file}`, es: p.es, en: p.en });
}

for (const lang of ["es", "en"]) {
  const other = lang === "es" ? "en" : "es";

  // ------------------------------------------------------------ home
  {
    const title = L(lang, "Alquiler de simulador de golf para eventos | Costa del Sol", "Golf Simulator Hire for Events | Costa del Sol");
    const desc = L(
      lang,
      `Simulador de golf hinchable con técnico para eventos de empresa, bodas, villas y torneos de Málaga a Sotogrande. Desde ${PRICE.base} € + IVA las ${PRICE.baseHours} horas.`,
      `Inflatable golf simulator with a technician for corporate events, weddings, villas and tournaments from Málaga to Sotogrande. From €${PRICE.base} + VAT for ${PRICE.baseHours} hours.`,
    );
    const body = [
      hero(lang, {
        title: L(lang, "Golf en tu evento", "Golf at your event"),
        statement: L(
          lang,
          "Un simulador de golf hinchable, con técnico, en cualquier punto de la Costa del Sol. Juega todo el mundo, sepa o no.",
          "An inflatable golf simulator with a technician, anywhere on the Costa del Sol. Everyone plays, golfer or not.",
        ),
      }),
      baySection(lang),
      eventsSection(lang),
      gamesSection(lang),
      scorecard(lang),
      teamSection(lang, team),
      packs(lang),
      dayline(lang),
      needs(lang),
      ticket(lang),
      faqSection(lang, 5),
    ].join("\n");
    write(paths.home(lang), layout({ lang, path: paths.home(lang), alt: paths.home(other), title, desc, body, schema: [serviceSchema(lang, { name: title, desc }), faqSchema(lang, 5)] }));
  }

  // ------------------------------------------------------------ towns
  for (const t of TOWNS) {
    const c = t[lang];
    const title = L(lang, `Alquiler simulador de golf en ${t.name} | Eventos`, `Golf Simulator Hire ${t.name} | Events`);
    const desc = L(
      lang,
      `Simulador de golf hinchable con técnico para eventos en ${t.name}: ${t.areas.slice(0, 3).join(", ")}. Desde ${PRICE.base} € + IVA las ${PRICE.baseHours} horas.`,
      `Inflatable golf simulator with a technician for events in ${t.name}: ${t.areas.slice(0, 3).join(", ")}. From €${PRICE.base} + VAT for ${PRICE.baseHours} hours.`,
    );
    const local = `<section class="local">
  <div class="local__main">
    <h2 class="h2">${L(lang, `Dónde lo montamos en ${t.name}`, `Where we set up in ${t.name}`)}</h2>
    <p class="lede">${c.venues}</p>
    <p class="local__km">${t.km === 0 ? L(lang, "Aquí está nuestra base: llegamos en minutos.", "Our base is here: we arrive in minutes.") : L(lang, `A unos ${t.km} km de nuestra base en Estepona. Transporte incluido.`, `About ${t.km} km from our base in Estepona. Travel included.`)}</p>
  </div>
  <div class="local__cols">
    <div><h3 class="h3">${L(lang, "Zonas", "Areas")}</h3><ul>${[t.name, ...t.areas].map((a) => `<li>${a}</li>`).join("")}</ul></div>
    <div><h3 class="h3">${L(lang, "Campos cercanos", "Nearby courses")}</h3><ul>${t.courses.map((a) => `<li>${a}</li>`).join("")}</ul>
    <p class="note">${L(lang, "¿Un torneo en un campo cercano? Lo montamos en la terraza o en la casa club.", "A tournament at a nearby course? We set up on the terrace or at the clubhouse.")}</p></div>
  </div>
</section>`;
    const body = [
      hero(lang, { title: L(lang, `Golf en ${t.name}`, `Golf in ${t.name}`), statement: c.intro }),
      local,
      teamSection(lang, team),
      baySection(lang),
      eventsSection(lang),
      packs(lang),
      ticket(lang, { town: t.slug }),
      scorecard(lang, t.slug),
      faqSection(lang, 4),
    ].join("\n");
    write(
      paths.town(lang, t.slug),
      layout({ lang, path: paths.town(lang, t.slug), alt: paths.town(other, t.slug), title, desc, body, schema: [serviceSchema(lang, { name: title, desc, area: t.name }), faqSchema(lang, 4)] }),
    );
  }

  // ------------------------------------------------------------ events
  for (const e of EVENTS) {
    const c = e[lang];
    const title = L(lang, `${c.title} | Costa del Sol`, `${c.title} | Costa del Sol`);
    const body = [
      hero(lang, { title: c.name, statement: c.lead, imgKey: e.img }),
      `<section class="points">
  <h2 class="h2">${c.title}</h2>
  <ul class="points__list">${c.points.map((p) => `<li>${p}</li>`).join("")}</ul>
</section>`,
      gamesSection(lang),
      dayline(lang),
      packs(lang),
      ticket(lang, { event: e.slug.es }),
      scorecard(lang),
      faqSection(lang, 4),
    ].join("\n");
    write(paths.event(lang, e), layout({ lang, path: paths.event(lang, e), alt: paths.event(other, e), title, desc: c.lead, body, schema: [serviceSchema(lang, { name: title, desc: c.lead })] }));
  }

  // ------------------------------------------------------------ prices
  {
    const title = L(lang, "Precios del simulador de golf para eventos | CostaSol Golf", "Golf simulator event prices | CostaSol Golf");
    const desc = L(
      lang,
      `${PRICE.baseHours} horas de simulador de golf con técnico por ${PRICE.base} € + IVA. Hora extra ${PRICE.extraHour} €. Transporte de Málaga a Sotogrande incluido.`,
      `${PRICE.baseHours} hours of golf simulator with a technician for €${PRICE.base} + VAT. Extra hour €${PRICE.extraHour}. Travel between Málaga and Sotogrande included.`,
    );
    const included = L(
      lang,
      ["Carpa hinchable con pantalla y proyector", "Monitor de lanzamiento y software de campos", "Técnico durante todo el evento", "Palos de diestro y zurdo, bolas y tees", "Juegos y rankings en pantalla", "Transporte, montaje y desmontaje"],
      ["Inflatable bay with screen and projector", "Launch monitor and course software", "Technician for the whole event", "Right- and left-handed clubs, balls and tees", "On-screen games and leaderboards", "Travel, set-up and pack-down"],
    );
    const extras = L(
      lang,
      [["Hora extra", euro(lang, PRICE.extraHour)], ["Logo en carpa y pantalla", "Consultar"], ["Fuera de Málaga–Sotogrande", "Consultar"], ["Varios días seguidos", "Precio especial"]],
      [["Extra hour", euro(lang, PRICE.extraHour)], ["Logo on bay and screen", "Ask us"], ["Outside Málaga–Sotogrande", "Ask us"], ["Several days in a row", "Special price"]],
    );
    const body = [
      `<section class="pagehead"><h1 class="display">${L(lang, "Precios", "Prices")}</h1><p class="statement">${desc}</p></section>`,
      packs(lang),
      `<section class="incl">
  <div><h2 class="h2">${L(lang, "Siempre incluido", "Always included")}</h2><ul class="points__list">${included.map((x) => `<li>${x}</li>`).join("")}</ul></div>
  <div><h2 class="h2">${L(lang, "Extras", "Extras")}</h2><table class="extras"><tbody>${extras.map(([a, b]) => `<tr><th scope="row">${a}</th><td>${b}</td></tr>`).join("")}</tbody></table></div>
</section>`,
      ticket(lang),
      faqSection(lang),
    ].join("\n");
    write(paths.prices(lang), layout({ lang, path: paths.prices(lang), alt: paths.prices(other), title, desc, body, schema: [serviceSchema(lang, { name: title, desc })] }));
  }

  // ------------------------------------------------------------ faq
  {
    const title = L(lang, "Preguntas frecuentes | CostaSol Golf", "Frequently asked questions | CostaSol Golf");
    const desc = L(lang, "Espacio, montaje, lluvia, precios y reservas del simulador de golf para eventos en la Costa del Sol.", "Space, set-up, rain, prices and bookings for the event golf simulator on the Costa del Sol.");
    const body = [`<section class="pagehead"><h1 class="display">${L(lang, "Preguntas", "Questions")}</h1><p class="statement">${desc}</p></section>`, faqSection(lang), needs(lang), ticket(lang)].join("\n");
    write(paths.faq(lang), layout({ lang, path: paths.faq(lang), alt: paths.faq(other), title, desc, body, schema: [faqSchema(lang)] }));
  }

  // ------------------------------------------------------------ dossier (printable, for hotels and agencies)
  {
    const title = L(lang, "Dossier para hoteles, wedding planners y agencias | CostaSol Golf", "Brochure for hotels, wedding planners and agencies | CostaSol Golf");
    const desc = L(lang, "Toda la información del simulador de golf para eventos en una página, lista para imprimir o guardar en PDF.", "Everything about the event golf simulator on one page, ready to print or save as PDF.");
    const body = `<section class="dossier">
  <h1 class="display">${L(lang, "Golf en tus eventos", "Golf at your events")}</h1>
  <p class="statement">${L(lang, "Para hoteles, wedding planners, agencias y clubes de la Costa del Sol.", "For hotels, wedding planners, agencies and clubs on the Costa del Sol.")}</p>
  <p><button class="btn btn--flag" type="button" data-print>${L(lang, "Imprimir o guardar PDF", "Print or save as PDF")}</button></p>
  <div class="dossier__grid">
    <div><h2 class="h3">${L(lang, "Qué es", "What it is")}</h2><p>${L(lang, `Una carpa de golf hinchable de ${BAY.depth.toString().replace(".", ",")} × ${BAY.width.toString().replace(".", ",")} m con pantalla de impacto, proyector y monitor de lanzamiento. Los invitados golpean bolas reales y ven el vuelo en un campo virtual.`, `An inflatable golf bay of ${BAY.depth} × ${BAY.width} m with an impact screen, projector and launch monitor. Guests hit real balls and watch the flight on a virtual course.`)}</p></div>
    <div><h2 class="h3">${L(lang, "Precio", "Price")}</h2><p>${L(lang, `${PRICE.base} € + IVA las ${PRICE.baseHours} horas, con técnico, transporte, montaje y desmontaje. Hora extra ${PRICE.extraHour} €. Condiciones para colaboradores bajo petición.`, `€${PRICE.base} + VAT for ${PRICE.baseHours} hours, with technician, travel, set-up and pack-down. Extra hour €${PRICE.extraHour}. Partner terms on request.`)}</p></div>
    <div><h2 class="h3">${L(lang, "Espacio", "Space")}</h2><p>${L(lang, `${BAY.spaceDepth} × ${BAY.spaceWidth} m llanos, ${BAY.clearHeight.toString().replace(".", ",")} m de altura libre y un enchufe de 230 V. Interior o exterior.`, `${BAY.spaceDepth} × ${BAY.spaceWidth} m flat, ${BAY.clearHeight} m clear height and a 230 V socket. Indoors or outdoors.`)}</p></div>
    <div><h2 class="h3">${L(lang, "Zona", "Area")}</h2><p>${TOWNS.map((t) => t.name).join(" · ")}</p></div>
    <div><h2 class="h3">${L(lang, "Eventos", "Events")}</h2><p>${EVENTS.map((e) => e[lang].name).join(" · ")}</p></div>
    <div><h2 class="h3">${L(lang, "Contacto", "Contact")}</h2><p>WhatsApp ${BRAND.phoneLabel}<br>${BRAND.email}<br>${BRAND.domain.replace("https://", "")}</p></div>
  </div>
</section>`;
    write(paths.dossier(lang), layout({ lang, path: paths.dossier(lang), alt: paths.dossier(other), title, desc, body }));
  }

  // ------------------------------------------------------------ legal
  {
    const title = L(lang, "Aviso legal y privacidad | CostaSol Golf", "Legal notice and privacy | CostaSol Golf");
    const body = `<section class="pagehead prose">
  <h1 class="display">${L(lang, "Aviso legal", "Legal notice")}</h1>
  <p>${L(lang, `${BRAND.name} es un servicio de ${BRAND.sister.name}, con base en ${BRAND.base}. Contacto: ${BRAND.email}.`, `${BRAND.name} is a service of ${BRAND.sister.name}, based in ${BRAND.base}. Contact: ${BRAND.email}.`)}</p>
  <h2 class="h3">${L(lang, "Privacidad", "Privacy")}</h2>
  <p>${L(lang, "Esta web no guarda datos personales. Cuando nos escribes por WhatsApp o email, usamos tus datos solo para responder a tu consulta y preparar tu evento, y no los compartimos con nadie. Puedes pedirnos que los borremos escribiendo a nuestro email.", "This website stores no personal data. When you message us on WhatsApp or by email, we use your details only to answer and prepare your event, and we don't share them. You can ask us to delete them by email.")}</p>
  <h2 class="h3">${L(lang, "Imágenes", "Images")}</h2>
  <p>${L(lang, "Las fotografías de esta web son ilustrativas hasta que publiquemos las de nuestros propios eventos.", "The photographs on this site are illustrative until we publish photos of our own events.")}</p>
</section>`;
    write(paths.legal(lang), layout({ lang, path: paths.legal(lang), alt: paths.legal(other), title, desc: title, body }));
  }
}

// ------------------------------------------------------------ 404, sitemap, robots
write(
  "404.html",
  layout({
    lang: "es",
    path: "/404.html",
    title: "Fuera de límites | CostaSol Golf",
    desc: "Página no encontrada",
    body: `<section class="pagehead"><h1 class="display">Fuera de límites</h1><p class="statement">Esta página no existe. Vuelve al <a href="/">tee de salida</a> o escríbenos por WhatsApp.</p></section>`,
  }),
);
writeFileSync(
  join(OUT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages
    .map((p) => `  <url><loc>${BRAND.domain}${p}</loc></url>`)
    .join("\n")}\n</urlset>\n`,
);
writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${BRAND.domain}/sitemap.xml\n`);

console.log(`Built ${pages.length} pages into ${OUT}`);
console.log("Pictures:", Object.values(IMAGES).map((i) => i.src).join(", "));
