// All the content of the CostaSol Golf site lives here. Change a price, a town or a
// sentence in this file and run `node golf-site/build.mjs` to regenerate every page.

export const BRAND = {
  name: "CostaSol Golf",
  domain: "https://costasolgolf.com", // to confirm once the domain is bought
  whatsapp: "34622867810",
  phoneLabel: "+34 622 867 810",
  email: "david@costasolbeachequipment.com",
  base: "Estepona, Málaga",
  sister: { name: "CostaSol Beach & Baby Equipment", url: "https://costasolbeachequipment.com" },
};

// Event prices in EUR before VAT.
export const PRICE = { base: 790, baseHours: 4, extraHour: 150, maxHours: 10 };

// The enclosure we plan to buy (PopCaddie-size bay) and what the venue needs.
export const BAY = { depth: 4.6, width: 4.2, height: 3.3, spaceDepth: 6, spaceWidth: 5, clearHeight: 3.5 };

// West to east along the coast. km = approximate road distance from our base in Estepona.
export const TOWNS = [
  {
    slug: "sotogrande",
    name: "Sotogrande",
    km: 30,
    areas: ["San Roque", "Torreguadiaro", "La Alcaidesa", "Pueblo Nuevo de Guadiaro"],
    courses: ["Real Club de Golf Sotogrande", "La Reserva Club", "Almenara Golf", "San Roque Club"],
    es: {
      intro: "Sotogrande vive el golf todo el año. Llevamos el simulador a villas, clubes y eventos privados de Sotogrande, San Roque y La Alcaidesa.",
      venues: "Perfecto como plan B de lluvia en torneos, en fiestas de villa, en la temporada de polo y en celebraciones en la marina.",
    },
    en: {
      intro: "Sotogrande lives golf all year. We bring the simulator to villas, clubs and private events in Sotogrande, San Roque and La Alcaidesa.",
      venues: "Perfect as a rain plan for tournaments, for villa parties, during the polo season and for celebrations at the marina.",
    },
  },
  {
    slug: "estepona",
    name: "Estepona",
    km: 0,
    areas: ["Benahavís", "Casares", "Manilva", "Cancelada", "Puerto de la Duquesa"],
    courses: ["Atalaya Golf", "El Paraíso Golf", "Valle Romano Golf", "Estepona Golf", "La Duquesa Golf", "Finca Cortesín"],
    es: {
      intro: "Salimos de Estepona: llegamos rápido a hoteles, villas y urbanizaciones de Estepona, Benahavís, Casares y Manilva.",
      venues: "Ideal para fiestas privadas en villas de Benahavís, cumpleaños, comuniones y eventos en los hoteles de la costa.",
    },
    en: {
      intro: "We set off from Estepona, so we reach hotels, villas and resorts in Estepona, Benahavís, Casares and Manilva quickly.",
      venues: "Ideal for private parties in Benahavís villas, birthdays, family celebrations and events at the coastal hotels.",
    },
  },
  {
    slug: "marbella",
    name: "Marbella",
    km: 30,
    areas: ["Puerto Banús", "Nueva Andalucía", "San Pedro de Alcántara", "Milla de Oro", "Elviria"],
    courses: ["Los Naranjos", "Las Brisas", "Aloha Golf", "Río Real", "Guadalmina"],
    es: {
      intro: "Hoteles de la Milla de Oro, villas de Nueva Andalucía, beach clubs de Puerto Banús y oficinas de Marbella: montamos el simulador donde esté tu evento.",
      venues: "En Marbella lo piden para fiestas en villas, bodas, eventos de empresa en hoteles y activaciones de marca en Puerto Banús.",
    },
    en: {
      intro: "Golden Mile hotels, Nueva Andalucía villas, Puerto Banús beach clubs and Marbella offices: we set the simulator up wherever your event is.",
      venues: "In Marbella it suits villa parties, weddings, corporate events in hotels and brand activations in Puerto Banús.",
    },
  },
  {
    slug: "mijas",
    name: "Mijas",
    km: 50,
    areas: ["La Cala de Mijas", "Calahonda", "Riviera del Sol", "Mijas Pueblo", "Las Lagunas"],
    courses: ["La Cala Golf", "Mijas Golf", "Santana Golf", "Calanova Golf", "Miraflores Golf"],
    es: {
      intro: "Montamos el simulador en villas, hoteles y restaurantes de La Cala de Mijas, Calahonda, Riviera del Sol y Mijas Pueblo.",
      venues: "Muy pedido para despedidas, cumpleaños y grupos de amigos que vienen a jugar al golf al «Golf Valley».",
    },
    en: {
      intro: "We set the simulator up at villas, hotels and restaurants in La Cala de Mijas, Calahonda, Riviera del Sol and Mijas Pueblo.",
      venues: "Popular for stag and hen dos, birthdays and groups of friends visiting the \"Golf Valley\".",
    },
  },
  {
    slug: "fuengirola",
    name: "Fuengirola",
    km: 58,
    areas: ["Los Boliches", "Carvajal", "Torreblanca", "Los Pacos"],
    courses: ["Mijas Golf", "Santana Golf", "La Cala Golf"],
    es: {
      intro: "Hoteles, bares, terrazas y eventos de Fuengirola y Los Boliches, de día o de noche.",
      venues: "Funciona muy bien en terrazas de bares y hoteles, en fiestas de empresa y en eventos del paseo marítimo.",
    },
    en: {
      intro: "Hotels, bars, terraces and events in Fuengirola and Los Boliches, day or night.",
      venues: "It works really well on bar and hotel terraces, at company parties and at seafront events.",
    },
  },
  {
    slug: "benalmadena",
    name: "Benalmádena",
    km: 68,
    areas: ["Arroyo de la Miel", "Puerto Marina", "Benalmádena Pueblo", "Torrequebrada"],
    courses: ["Torrequebrada Golf", "Mijas Golf"],
    es: {
      intro: "Hoteles, Puerto Marina y villas de Benalmádena y Arroyo de la Miel.",
      venues: "Ideal para animación en hoteles, eventos en el puerto deportivo, cumpleaños y fiestas de empresa.",
    },
    en: {
      intro: "Hotels, Puerto Marina and villas in Benalmádena and Arroyo de la Miel.",
      venues: "Ideal for hotel entertainment, marina events, birthdays and company parties.",
    },
  },
  {
    slug: "torremolinos",
    name: "Torremolinos",
    km: 75,
    areas: ["La Carihuela", "Playamar", "Montemar", "El Pinillo"],
    courses: ["Parador de Málaga Golf", "Lauro Golf", "Guadalhorce Golf"],
    es: {
      intro: "Hoteles, chiringuitos y eventos de Torremolinos, de La Carihuela a Playamar, a minutos del aeropuerto.",
      venues: "Pensado para congresos y convenciones en hoteles, fiestas de grupo y eventos en la playa.",
    },
    en: {
      intro: "Hotels, beach bars and events in Torremolinos, from La Carihuela to Playamar, minutes from the airport.",
      venues: "Made for conferences and conventions in hotels, group parties and beach events.",
    },
  },
  {
    slug: "malaga",
    name: "Málaga",
    km: 85,
    areas: ["Centro", "Soho", "Pedregalejo", "El Palo", "Teatinos", "Parque Tecnológico"],
    courses: ["Parador de Málaga Golf", "Guadalhorce Golf", "El Candado Golf"],
    es: {
      intro: "Empresas, hoteles, ferias y eventos de Málaga capital, del centro al Parque Tecnológico.",
      venues: "Muy útil para team building de empresas tecnológicas, stands en ferias del FYCMA y eventos en hoteles del centro.",
    },
    en: {
      intro: "Companies, hotels, trade fairs and events in Málaga city, from the centre to the Technology Park.",
      venues: "Great for tech company team building, stands at FYCMA trade fairs and events in city-centre hotels.",
    },
  },
];

// Event types, each with its own page.
export const EVENTS = [
  {
    slug: { es: "empresas", en: "corporate" },
    img: "corporate",
    es: {
      name: "Eventos de empresa",
      title: "Golf para tu evento de empresa",
      lead: "Team building, convenciones, incentivos y cenas de Navidad con un reto que une a todo el equipo, juegue o no al golf.",
      points: [
        "Ranking por equipos en pantalla durante todo el evento",
        "Bola más cerca y drive más largo con premio",
        "Carpa y pantalla con el logo de tu empresa (opcional)",
        "En el hotel, en la oficina, en una nave o en una terraza",
        "Factura con IVA para la empresa",
      ],
    },
    en: {
      name: "Corporate events",
      title: "Golf for your company event",
      lead: "Team building, conferences, incentives and Christmas parties with a challenge that brings the whole team together, golfers or not.",
      points: [
        "Team leaderboard on screen for the whole event",
        "Nearest the pin and longest drive with prizes",
        "Bay and screen branded with your company logo (optional)",
        "At the hotel, the office, a warehouse or a terrace",
        "VAT invoice for the company",
      ],
    },
  },
  {
    slug: { es: "bodas", en: "weddings" },
    img: "wedding",
    es: {
      name: "Bodas",
      title: "Un simulador de golf en tu boda",
      lead: "Durante el cóctel o la fiesta, los invitados se turnan para tirar al green mientras suena la música. Funciona igual de bien de noche.",
      points: [
        "Concurso de bola más cerca con premio para el ganador",
        "Funciona de noche: la pantalla se ve mejor con poca luz",
        "Técnico que organiza los turnos para que no haya colas",
        "Encaja con wedding planners y fincas de toda la costa",
        "Montaje antes de que lleguen los invitados",
      ],
    },
    en: {
      name: "Weddings",
      title: "A golf simulator at your wedding",
      lead: "During drinks or the party, guests take turns hitting at the green while the music plays. It works just as well at night.",
      points: [
        "Nearest-the-pin contest with a prize for the winner",
        "Works at night: the screen looks better in low light",
        "A technician runs the turns so there are no queues",
        "Fits with wedding planners and venues along the coast",
        "Set up before the guests arrive",
      ],
    },
  },
  {
    slug: { es: "villas-y-fiestas", en: "villas-and-parties" },
    img: "hero",
    es: {
      name: "Villas y fiestas",
      title: "Golf en tu villa o en tu fiesta",
      lead: "Cumpleaños, despedidas, reuniones de amigos y vacaciones en villa: el simulador se monta en el jardín o en la terraza y juega todo el mundo.",
      points: [
        "En el jardín, la terraza o junto a la piscina",
        "Para niños y adultos, sepan jugar o no",
        "Palos de diestro y zurdo incluidos",
        "Combínalo con hamacas, sombrillas y equipo de bebé de CostaSol",
        "Solo necesitamos un enchufe y un espacio llano",
      ],
    },
    en: {
      name: "Villas and parties",
      title: "Golf at your villa or party",
      lead: "Birthdays, stag and hen dos, friends' reunions and villa holidays: the simulator goes up in the garden or on the terrace and everyone plays.",
      points: [
        "In the garden, on the terrace or by the pool",
        "For children and adults, golfers or not",
        "Right- and left-handed clubs included",
        "Combine it with CostaSol loungers, parasols and baby equipment",
        "All we need is a socket and a flat space",
      ],
    },
  },
  {
    slug: { es: "torneos-y-marcas", en: "tournaments-and-brands" },
    img: "swing",
    es: {
      name: "Torneos y marcas",
      title: "Torneos, ferias y activaciones de marca",
      lead: "Un reto de golf con ranking atrae público a tu stand, alarga la estancia en tu hotel o salva el torneo cuando llueve.",
      points: [
        "Carpa con tu marca y pantalla con tus patrocinadores",
        "Ranking del día y premio al final",
        "Recogida de contactos de los participantes (opcional)",
        "Varios días seguidos con precio especial",
        "Plan B de lluvia para torneos en campos de la costa",
      ],
    },
    en: {
      name: "Tournaments and brands",
      title: "Tournaments, fairs and brand activations",
      lead: "A golf challenge with a leaderboard draws people to your stand, keeps guests at your hotel longer or saves the tournament when it rains.",
      points: [
        "Bay with your brand and screen with your sponsors",
        "Daily leaderboard and a prize at the end",
        "Collect participants' contact details (optional)",
        "Several days in a row at a special price",
        "Rain plan for tournaments at coastal courses",
      ],
    },
  },
];

export const FAQ = {
  es: [
    ["¿Hace falta saber jugar al golf?", "No. El técnico enseña a golpear en un minuto y adapta los juegos a principiantes, niños y jugadores con hándicap."],
    ["¿Qué espacio necesitáis?", `Un espacio llano de unos ${BAY.spaceDepth} × ${BAY.spaceWidth} m y ${BAY.clearHeight.toLocaleString("es")} m de altura libre, un enchufe normal de 230 V a menos de 25 m y acceso para descargar a menos de 50 m.`],
    ["¿Se puede montar en interior?", "Sí: salones de hotel, carpas, naves y oficinas con altura suficiente. En exterior lo montamos en césped, terraza o pista."],
    ["¿Y si hace viento o llueve?", "En exterior no montamos con viento fuerte o lluvia. Si el día del evento no se puede, buscamos juntos un espacio cubierto o una nueva fecha."],
    ["¿Es seguro?", "Los golpes van contra una pantalla de impacto dentro de una estructura cerrada, y el técnico controla los turnos en todo momento."],
    ["¿Puedo usar mis palos?", "Sí. También llevamos palos de diestro y zurdo para todos."],
    ["¿Cuánto se tarda en montar?", "Llegamos unos 90 minutos antes del evento y desmontamos en unos 45 minutos al terminar. El tiempo de montaje no cuenta en tus horas."],
    ["¿Qué incluye el precio?", `${PRICE.baseHours} horas de juego, técnico, transporte de Málaga a Sotogrande, montaje, desmontaje, palos, bolas y juegos. Cada hora extra son ${PRICE.extraHour} € + IVA.`],
    ["¿Cómo se reserva?", "Pides presupuesto, te confirmamos disponibilidad y la fecha queda reservada con una señal. Sin pago no hay reserva."],
    ["¿Podéis poner mi logo?", "Sí, en la carpa y en la pantalla. Pídelo con al menos 4 semanas de antelación."],
  ],
  en: [
    ["Do guests need to play golf?", "No. The technician shows everyone how to hit in a minute and adapts the games for beginners, children and handicap golfers."],
    ["How much space do you need?", `A flat area of about ${BAY.spaceDepth} × ${BAY.spaceWidth} m with ${BAY.clearHeight} m clear height, a standard 230 V socket within 25 m and unloading access within 50 m.`],
    ["Can it go indoors?", "Yes: hotel halls, marquees, warehouses and offices with enough height. Outdoors we set up on grass, terraces or courts."],
    ["What about wind or rain?", "Outdoors we don't set up in strong wind or rain. If the day doesn't allow it, we find a covered space or a new date together."],
    ["Is it safe?", "Shots go into an impact screen inside an enclosed bay, and the technician manages turns at all times."],
    ["Can I bring my own clubs?", "Yes. We also bring right- and left-handed clubs for everyone."],
    ["How long does set-up take?", "We arrive about 90 minutes before the event and pack down in about 45 minutes afterwards. Set-up time doesn't count towards your hours."],
    ["What does the price include?", `${PRICE.baseHours} hours of play, a technician, travel between Málaga and Sotogrande, set-up, pack-down, clubs, balls and games. Each extra hour is €${PRICE.extraHour} + VAT.`],
    ["How do I book?", "Ask for a quote, we confirm availability and the date is held with a deposit. No payment, no booking."],
    ["Can you add my logo?", "Yes, on the bay and on the screen. Ask at least 4 weeks ahead."],
  ],
};
