/* STEPUP demo catalog. All products below are DEMONSTRATION DATA (invented brands, drawn illustrations). */
window.SU = window.SU || {};

SU.COLORS = {
  black: "#1c1c1c", white: "#f4f4f2", grey: "#9a9a96", navy: "#22304f", red: "#c93a3a",
  lime: "#D8FF3E", brown: "#7b5238", beige: "#d8c4a4", green: "#3f6b4f", blue: "#3c6fd1", pink: "#e8a3b8"
};
SU.COLOR_NAMES = {
  uk: { black: "Чорний", white: "Білий", grey: "Сірий", navy: "Темно-синій", red: "Червоний", lime: "Лаймовий", brown: "Коричневий", beige: "Бежевий", green: "Зелений", blue: "Синій", pink: "Рожевий" },
  ru: { black: "Чёрный", white: "Белый", grey: "Серый", navy: "Тёмно-синий", red: "Красный", lime: "Лаймовый", brown: "Коричневый", beige: "Бежевый", green: "Зелёный", blue: "Синий", pink: "Розовый" },
  en: { black: "Black", white: "White", grey: "Grey", navy: "Navy", red: "Red", lime: "Lime", brown: "Brown", beige: "Beige", green: "Green", blue: "Blue", pink: "Pink" }
};

SU.CATEGORIES = {
  sneakers: { shape: "sneaker", name: { uk: "Кросівки", ru: "Кроссовки", en: "Sneakers" }, desc: { uk: "Щоденний комфорт і міський стиль", ru: "Ежедневный комфорт и городской стиль", en: "Everyday comfort, city style" } },
  sport: { shape: "runner", name: { uk: "Спортивне взуття", ru: "Спортивная обувь", en: "Sport" }, desc: { uk: "Для бігу, залу й тренувань", ru: "Для бега, зала и тренировок", en: "For running, gym and training" } },
  casual: { shape: "casual", name: { uk: "Повсякденне", ru: "Повседневная", en: "Casual" }, desc: { uk: "Легкі моделі на кожен день", ru: "Лёгкие модели на каждый день", en: "Easy styles for every day" } },
  classic: { shape: "classic", name: { uk: "Класичне", ru: "Классическая", en: "Classic" }, desc: { uk: "Елегантні моделі для офісу та подій", ru: "Элегантные модели для офиса и событий", en: "Refined styles for office and events" } },
  boots: { shape: "boot", name: { uk: "Черевики", ru: "Ботинки", en: "Boots" }, desc: { uk: "Тепло й надійність в усі сезони", ru: "Тепло и надёжность в любой сезон", en: "Warm, durable, all-season" } }
};

/* id, name, brand, cat, gender, price, oldPrice, colors[main, accent?], new, best, rating, reviews, popularity, daysAgo, sizes "size:stock,..." */
const RAW = [
  ["Cloudrun 2", "Aeroform", "sport", "men", 3890, 4590, ["white", "lime"], 0, 1, 4.7, 128, 98, 120, "40:4,41:6,42:8,43:5,44:3,45:0"],
  ["Pulse Trainer", "Kinetic", "sport", "women", 3290, 0, ["pink", "white"], 1, 0, 4.6, 54, 70, 6, "36:3,37:5,38:6,39:4,40:2,41:0"],
  ["Stride Pro", "Northstride", "sport", "men", 4490, 0, ["black", "lime"], 1, 1, 4.8, 201, 120, 4, "41:2,42:5,43:7,44:4,45:2,46:1"],
  ["Tempo Lite", "Aeroform", "sport", "women", 2790, 3490, ["blue", "white"], 0, 0, 4.4, 37, 44, 200, "36:2,37:4,38:5,39:3,40:0"],
  ["Sprint X", "Kinetic", "sport", "unisex", 3590, 0, ["red", "black"], 0, 1, 4.5, 89, 85, 95, "38:3,39:4,40:6,41:6,42:5,43:2,44:0"],
  ["Trailblazer GT", "Stormtrail", "sport", "men", 4190, 4990, ["green", "black"], 0, 0, 4.6, 66, 60, 150, "41:3,42:4,43:4,44:2,45:1"],
  ["Court Classic", "Urbanlane", "sneakers", "unisex", 2490, 0, ["white", "navy"], 0, 1, 4.8, 340, 150, 300, "36:3,37:5,38:6,39:7,40:8,41:8,42:6,43:5,44:3,45:0"],
  ["Street 90", "Urbanlane", "sneakers", "men", 2990, 3590, ["grey", "red"], 0, 0, 4.3, 72, 55, 180, "40:3,41:5,42:6,43:4,44:2"],
  ["Aero Low", "Northstride", "sneakers", "women", 2690, 0, ["white", "pink"], 1, 0, 4.7, 41, 66, 8, "36:4,37:6,38:7,39:5,40:3,41:1"],
  ["Mono Platform", "Kinetic", "sneakers", "women", 3190, 0, ["black", "white"], 1, 1, 4.6, 58, 90, 12, "36:2,37:4,38:5,39:5,40:3,41:0"],
  ["Retro Wave", "Aeroform", "sneakers", "men", 3390, 3990, ["beige", "green"], 0, 0, 4.5, 63, 58, 130, "40:2,41:4,42:6,43:5,44:3,45:2"],
  ["Hi-Top Nine", "Urbanlane", "sneakers", "unisex", 3090, 0, ["black", "red"], 0, 0, 4.4, 29, 40, 220, "37:1,38:3,39:4,40:5,41:5,42:4,43:2"],
  ["Daily Slip", "Northstride", "casual", "unisex", 1890, 0, ["grey", "white"], 0, 1, 4.5, 112, 80, 260, "36:3,37:5,38:6,39:6,40:7,41:6,42:4,43:3,44:1"],
  ["Canvas Easy", "Urbanlane", "casual", "women", 1590, 1990, ["beige", "navy"], 0, 0, 4.3, 48, 42, 240, "36:4,37:5,38:6,39:5,40:3,41:0"],
  ["Loafer Soft", "Heritage & Co", "casual", "men", 3490, 0, ["brown", "beige"], 1, 0, 4.6, 33, 52, 9, "40:2,41:3,42:5,43:4,44:2,45:1"],
  ["Sandal Walk", "Northstride", "casual", "women", 1990, 0, ["beige", "brown"], 0, 0, 4.2, 25, 30, 280, "36:3,37:4,38:5,39:4,40:2"],
  ["Weekend Mesh", "Aeroform", "casual", "men", 2290, 2790, ["navy", "lime"], 0, 0, 4.4, 57, 47, 160, "40:3,41:4,42:6,43:5,44:3,45:0"],
  ["Oxford No.1", "Heritage & Co", "classic", "men", 5290, 0, ["brown", "black"], 0, 1, 4.8, 94, 88, 210, "40:2,41:3,42:5,43:5,44:3,45:2"],
  ["Derby Black", "Heritage & Co", "classic", "men", 4890, 5790, ["black", "grey"], 0, 0, 4.7, 71, 62, 170, "40:2,41:4,42:5,43:4,44:2,45:1"],
  ["Pump Elegance", "Maison Pas", "classic", "women", 3990, 0, ["red", "black"], 1, 0, 4.5, 36, 56, 7, "36:2,37:4,38:5,39:4,40:2,41:0"],
  ["Ballet Flat", "Maison Pas", "classic", "women", 2590, 0, ["pink", "beige"], 0, 0, 4.4, 46, 49, 190, "36:3,37:5,38:6,39:5,40:2,41:1"],
  ["Monk Strap", "Heritage & Co", "classic", "men", 5490, 6290, ["brown", "black"], 0, 0, 4.6, 28, 38, 230, "41:2,42:3,43:4,44:3,45:1"],
  ["Chelsea Original", "Heritage & Co", "boots", "men", 5990, 0, ["black", "brown"], 0, 1, 4.9, 156, 110, 140, "40:2,41:4,42:6,43:6,44:4,45:2,46:1"],
  ["Winter Trek", "Stormtrail", "boots", "men", 6290, 7490, ["brown", "green"], 0, 1, 4.7, 83, 76, 100, "41:3,42:5,43:5,44:3,45:2"],
  ["Ankle Chic", "Maison Pas", "boots", "women", 4590, 0, ["black", "beige"], 1, 1, 4.7, 61, 82, 5, "36:2,37:4,38:6,39:5,40:3,41:1"],
  ["Combat Lace", "Stormtrail", "boots", "unisex", 4990, 0, ["black", "red"], 0, 0, 4.5, 74, 64, 110, "37:1,38:3,39:5,40:6,41:6,42:5,43:3,44:2"],
  ["Rain Walker", "Northstride", "boots", "women", 3790, 4490, ["navy", "pink"], 0, 0, 4.3, 22, 36, 250, "36:2,37:3,38:4,39:4,40:2,41:0"],
  ["Desert Suede", "Heritage & Co", "boots", "men", 4390, 0, ["beige", "brown"], 1, 0, 4.6, 19, 48, 3, "40:2,41:3,42:5,43:4,44:2,45:1"]
];

const DAY = 86400000;
SU.PRODUCTS = RAW.map((r, i) => {
  const [name, brand, cat, gender, price, old, cols, isNew, best, rating, reviews, pop, days, sz] = r;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + (i + 1);
  const sizes = {};
  sz.split(",").forEach(p => { const [s, q] = p.split(":"); sizes[s] = +q; });
  return {
    id: i + 1, slug, name, brand, cat, gender, price, old: old || null, colors: cols, main: cols[0],
    isNew: !!isNew, best: !!best, rating, reviews, pop, created: Date.now() - days * DAY, sizes, demo: true
  };
});

SU.PROMOS = { STEPUP10: { type: "percent", value: 10 }, WELCOME200: { type: "fixed", value: 200 } };

SU.DELIVERY = {
  courier: { price: 120, free: 3000 }, post: { price: 80, free: 3000 },
  locker: { price: 60, free: 3000 }, pickup: { price: 0, free: 0 }
};

/* Illustrations: honest placeholders drawn in SVG (not photographs). */
SU.shoe = function (p, view) {
  const shape = SU.CATEGORIES[p.cat].shape;
  const c1 = SU.COLORS[p.colors[0]], c2 = SU.COLORS[p.colors[1] || p.colors[0]];
  const light = ["white", "beige", "lime", "pink"].includes(p.colors[0]);
  const stroke = light ? "#171717" : "rgba(255,255,255,.55)";
  const sole = p.colors[0] === "white" ? "#e4e4e0" : "#f4f4f2";
  const flip = view === "b" ? ' transform="translate(400 0) scale(-1 1)"' : "";
  const id = "g" + p.id + (view || "a");
  let body = "";
  if (shape === "boot") {
    body = `<path d="M40 235 L40 20 Q40 8 56 8 L150 8 Q158 8 158 20 L160 110 Q215 125 290 128 Q360 132 382 170 Q392 188 388 205 L388 235 Q388 252 365 252 L65 252 Q40 252 40 235Z" fill="${c1}"/>
      <rect x="36" y="214" width="356" height="44" rx="14" fill="${c2}"/>
      <path d="M62 60h86M62 92h86M80 124h72" stroke="${stroke}" stroke-width="5" stroke-linecap="round"/>
      <path d="M44 214 H392" stroke="rgba(0,0,0,.25)" stroke-width="3"/>`;
  } else if (shape === "classic") {
    body = `<path d="M34 205 L34 150 Q34 128 60 124 L150 112 Q205 108 250 128 Q330 134 372 168 Q392 184 388 205Z" fill="${c1}"/>
      <path d="M250 128 Q300 150 372 168" fill="none" stroke="rgba(0,0,0,.28)" stroke-width="3"/>
      <path d="M150 112 L200 150 M170 118 L215 148 M190 122 L232 146" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      <path d="M300 160 Q345 168 380 190" fill="none" stroke="${c2}" stroke-width="6" stroke-linecap="round"/>
      <rect x="30" y="203" width="362" height="24" rx="8" fill="${c2}"/>
      <rect x="40" y="224" width="86" height="22" rx="6" fill="${c2}"/>`;
  } else if (shape === "casual") {
    body = `<path d="M36 205 L36 140 Q36 118 62 114 L130 104 Q175 98 215 124 Q300 126 360 158 Q392 176 388 205Z" fill="${c1}"/>
      <path d="M130 104 Q165 112 190 132" fill="none" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      <path d="M215 124 Q250 150 300 154" fill="none" stroke="${c2}" stroke-width="7" stroke-linecap="round"/>
      <rect x="30" y="198" width="362" height="34" rx="14" fill="${sole}" stroke="rgba(0,0,0,.12)"/>
      <path d="M52 215H370" stroke="${c2}" stroke-width="5" stroke-dasharray="2 12" stroke-linecap="round"/>`;
  } else if (shape === "runner") {
    body = `<path d="M32 196 L32 128 Q32 104 58 100 L118 90 Q160 70 188 84 Q214 124 262 124 Q344 130 384 168 Q396 184 388 196Z" fill="${c1}"/>
      <path d="M96 192 Q150 120 238 134 Q300 144 330 192Z" fill="${c2}" opacity=".9"/>
      <path d="M126 96 L172 120 M144 92 L188 114 M162 88 L204 110" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      <path d="M26 192 H396 Q396 238 350 242 L84 242 Q26 242 26 200Z" fill="${sole}" stroke="rgba(0,0,0,.14)"/>
      <path d="M26 214 H396" stroke="${c2}" stroke-width="7"/>
      <path d="M40 232h60M130 232h60M220 232h60" stroke="rgba(0,0,0,.18)" stroke-width="4" stroke-linecap="round"/>`;
  } else {
    body = `<path d="M38 196 L38 124 Q38 102 62 98 L120 86 Q152 66 178 76 Q204 114 252 118 Q336 124 378 164 Q394 180 388 196Z" fill="${c1}"/>
      <path d="M262 118 Q330 126 372 160 L300 190 Q270 150 262 118Z" fill="${c2}" opacity=".85"/>
      <path d="M118 90 L166 116 M136 86 L180 108 M154 82 L196 102" stroke="${stroke}" stroke-width="4" stroke-linecap="round"/>
      <path d="M58 150 Q92 126 126 150" fill="none" stroke="${c2}" stroke-width="8" stroke-linecap="round"/>
      <path d="M30 192 H394 Q396 236 352 240 L76 240 Q30 240 30 198Z" fill="${sole}" stroke="rgba(0,0,0,.14)"/>
      <path d="M30 214 H396" stroke="${c2}" stroke-width="5"/>`;
  }
  return `<svg viewBox="0 0 420 270" role="img" aria-label="${p.brand} ${p.name}" xmlns="http://www.w3.org/2000/svg"><g${flip}><ellipse cx="210" cy="258" rx="170" ry="7" fill="rgba(0,0,0,.1)"/>${body}</g></svg>`;
};
SU.byId = id => SU.PRODUCTS.find(p => p.id === +id);
SU.bySlug = s => SU.PRODUCTS.find(p => p.slug === s);

SU.REVIEWS = [
  { name: "Олена К.", rating: 5, date: "2026-09-14", text: { uk: "Дуже зручні, вже тиждень не знімаю. Розмір відповідає таблиці.", ru: "Очень удобные, уже неделю не снимаю. Размер соответствует таблице.", en: "Very comfortable, haven't taken them off for a week. True to size." }, pid: 1 },
  { name: "Максим Д.", rating: 4, date: "2026-10-02", text: { uk: "Якісні матеріали та швидка доставка. Колір трохи світліший за фото.", ru: "Качественные материалы и быстрая доставка. Цвет чуть светлее, чем на фото.", en: "Quality materials and fast delivery. Colour is slightly lighter than pictured." }, pid: 23 },
  { name: "Ірина С.", rating: 5, date: "2026-10-21", text: { uk: "Обмін пройшов без проблем, підтримка допомогла з розміром.", ru: "Обмен прошёл без проблем, поддержка помогла с размером.", en: "Exchange was painless, support helped me pick the right size." }, pid: 25 }
];
