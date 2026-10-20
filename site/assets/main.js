// CostaSol Golf: entrances, the tee-time ticket and the dossier print button.
document.documentElement.classList.add("js");

// Entrances: the parts of each section rise in turn as the section enters.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const groups = document.querySelectorAll("main > section:not(.hero)");
groups.forEach((section) => {
  const parts = section.querySelectorAll(
    ".h2, .lede, .statement, .gallery__grid li, .bay__draw, .bay__parts > div, .ev, .games__list > div, .board, tbody tr, .pack, .day__line li, .needs__list li, .tix, details, .points__list li, .local__cols > div, .dossier__grid > div",
  );
  parts.forEach((el, i) => {
    el.setAttribute("data-rise", "");
    el.style.setProperty("--d", `${Math.min(i, 8) * 75}ms`);
  });
});
if (!reduce && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      }),
    { rootMargin: "0px 0px -8% 0px" },
  );
  document.querySelectorAll("[data-rise]").forEach((el) => io.observe(el));
} else {
  document.querySelectorAll("[data-rise]").forEach((el) => el.classList.add("in"));
}

// The tee-time ticket: live price and a prefilled WhatsApp / email message.
document.querySelectorAll("[data-tix]").forEach((form) => {
  const d = form.dataset;
  const es = d.lang === "es";
  const base = Number(d.base);
  const baseHours = Number(d.hours);
  const extra = Number(d.extra);
  const group = (n, sep) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep);
  const euro = (n) => (es ? `${group(n, ".")} €` : `€${group(n, ",")}`);
  const total = form.querySelector('output[name="total"]');
  const hoursOut = form.querySelector('output[name="hoursOut"]');
  const wa = form.querySelector('[data-send="wa"]');
  const mail = form.querySelector('[data-send="mail"]');

  function update() {
    const f = new FormData(form);
    const hours = Number(f.get("hours")) || baseHours;
    const price = base + Math.max(0, hours - baseHours) * extra;
    hoursOut.textContent = hours;
    if (total.textContent !== euro(price)) {
      total.textContent = euro(price);
      total.classList.remove("bump");
      void total.offsetWidth;
      total.classList.add("bump");
    }
    const date = f.get("date");
    const lines = es
      ? [
          "Hola CostaSol Golf, quiero reservar el simulador de golf:",
          `Zona: ${f.get("town")}`,
          `Evento: ${f.get("event")}`,
          `Fecha: ${date || "por decidir"}`,
          `Invitados: ${f.get("guests") || "por decidir"}`,
          `Horas: ${hours} (${euro(price)} + IVA)`,
          f.get("name") ? `Nombre: ${f.get("name")}` : "",
        ]
      : [
          "Hi CostaSol Golf, I'd like to book the golf simulator:",
          `Area: ${f.get("town")}`,
          `Event: ${f.get("event")}`,
          `Date: ${date || "to be decided"}`,
          `Guests: ${f.get("guests") || "to be decided"}`,
          `Hours: ${hours} (${euro(price)} + VAT)`,
          f.get("name") ? `Name: ${f.get("name")}` : "",
        ];
    const text = lines.filter(Boolean).join("\n");
    wa.href = `https://wa.me/${d.wa}?text=${encodeURIComponent(text)}`;
    const subject = es ? `Simulador de golf · ${f.get("town")} · ${date || "fecha por decidir"}` : `Golf simulator · ${f.get("town")} · ${date || "date tbc"}`;
    mail.href = `mailto:${d.mail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
  }

  form.addEventListener("input", update);
  form.addEventListener("submit", (e) => e.preventDefault());
  const today = new Date().toISOString().slice(0, 10);
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) dateInput.min = today;
  // Count each send as a lead in analytics, when a tag is installed.
  [wa, mail].forEach((a) =>
    a.addEventListener("click", () => {
      if (typeof window.gtag === "function") window.gtag("event", "generate_lead", { method: a.dataset.send, page: location.pathname });
    }),
  );
  update();
});

// Gallery lightbox: tap a photo to see it large; arrows, swipe-free buttons and Esc.
document.querySelectorAll(".gallery").forEach((gallery) => {
  const dialog = gallery.querySelector(".lightbox");
  if (!dialog || typeof dialog.showModal !== "function") return;
  const links = [...gallery.querySelectorAll("[data-lightbox]")];
  const big = dialog.querySelector("img");
  const cap = dialog.querySelector(".lightbox__cap");
  let index = 0;
  const show = (i) => {
    index = (i + links.length) % links.length;
    const thumb = links[index].querySelector("img");
    big.src = links[index].href;
    big.alt = thumb.alt;
    cap.textContent = thumb.alt;
  };
  links.forEach((a, i) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      show(i);
      dialog.showModal();
    }),
  );
  dialog.querySelector(".lightbox__prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".lightbox__next").addEventListener("click", () => show(index + 1));
  dialog.querySelector(".lightbox__close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });
});

document.querySelectorAll("[data-print]").forEach((b) => b.addEventListener("click", () => window.print()));

// The bar sits on the dark hero; on pages without a hero it switches to ink.
if (!document.querySelector(".hero")) document.body.classList.add("page-light");
