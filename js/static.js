/* Informational pages in uk / ru / en. Replace placeholder contact details before launch. */
SU.boot(() => {
  const { $, t } = SU;
  const L = SU.lang;
  const C = {
    about: {
      uk: ["Про магазин", "STEPUP — онлайн-магазин взуття для людей, які цінують комфорт, якість та власний стиль.", [["Наш підхід", "Ми підбираємо моделі, які однаково добре виглядають і носяться щодня: від кросівок до класичних туфель."], ["Демо-проєкт", "Це демонстраційна версія магазину. Товари, бренди та відгуки — тестові дані й не є реальними пропозиціями."]]],
      ru: ["О магазине", "STEPUP — интернет-магазин обуви для тех, кто ценит комфорт, качество и собственный стиль.", [["Наш подход", "Мы подбираем модели, которые одинаково хорошо выглядят и носятся каждый день: от кроссовок до классических туфель."], ["Демо-проект", "Это демонстрационная версия магазина. Товары, бренды и отзывы — тестовые данные и не являются реальными предложениями."]]],
      en: ["About", "STEPUP is an online shoe store for people who value comfort, quality and individual style.", [["Our approach", "We pick styles that look great and wear well every day, from sneakers to classic dress shoes."], ["Demo project", "This is a demonstration version of the store. Products, brands and reviews are sample data, not real offers."]]]
    },
    delivery: {
      uk: ["Доставка", "Обирайте зручний спосіб на кроці оформлення замовлення.", [["Способи", "Кур'єр — 120 ₴; відділення пошти — 80 ₴; поштомат — 60 ₴; самовивіз — безкоштовно."], ["Безкоштовна доставка", "Для замовлень від 3 000 ₴ (після знижки) доставка безкоштовна."], ["Перевізники", "Інтеграція з Nova Poshta та іншими службами підключається через API-ключ. У демо-версії відправлення не бронюються."]]],
      ru: ["Доставка", "Выберите удобный способ на шаге оформления заказа.", [["Способы", "Курьер — 120 ₴; отделение почты — 80 ₴; постамат — 60 ₴; самовывоз — бесплатно."], ["Бесплатная доставка", "Для заказов от 3 000 ₴ (после скидки) доставка бесплатна."], ["Перевозчики", "Интеграция с Nova Poshta и другими службами подключается через API-ключ. В демо-версии отправления не бронируются."]]],
      en: ["Delivery", "Choose the method that suits you at checkout.", [["Methods", "Courier — 120 ₴; post office branch — 80 ₴; parcel locker — 60 ₴; store pickup — free."], ["Free delivery", "Orders from 3,000 ₴ (after discounts) ship free."], ["Carriers", "Nova Poshta and other carriers connect through an API key. In this demo no shipments are booked."]]]
    },
    payment: {
      uk: ["Оплата", "Два способи оплати на вибір.", [["Онлайн", "Оплата карткою через платіжного провайдера. Ми ніколи не зберігаємо дані карток. У демо-режимі реальні платежі не проводяться."], ["При отриманні", "Оплата готівкою або карткою у відділенні чи кур'єру."]]],
      ru: ["Оплата", "Два способа оплаты на выбор.", [["Онлайн", "Оплата картой через платёжного провайдера. Мы никогда не храним данные карт. В демо-режиме реальные платежи не проводятся."], ["При получении", "Оплата наличными или картой в отделении или курьеру."]]],
      en: ["Payment", "Two ways to pay.", [["Online", "Card payment through a payment provider. We never store card data. In demo mode no real payments are taken."], ["On delivery", "Pay by cash or card at the branch or to the courier."]]]
    },
    returns: {
      uk: ["Повернення й обмін", "14 днів на повернення або обмін.", [["Умови", "Взуття має бути без слідів носіння, у повній комплектації та оригінальній коробці."], ["Як оформити", "Зв'яжіться з нами через сторінку контактів із номером замовлення."]]],
      ru: ["Возврат и обмен", "14 дней на возврат или обмен.", [["Условия", "Обувь должна быть без следов носки, в полной комплектации и оригинальной коробке."], ["Как оформить", "Свяжитесь с нами через страницу контактов, указав номер заказа."]]],
      en: ["Returns & exchanges", "14 days to return or exchange.", [["Conditions", "Shoes must be unworn, complete and in the original box."], ["How to start", "Contact us via the contacts page with your order number."]]]
    },
    contacts: {
      uk: ["Контакти", "Ми на зв'язку щодня.", [["Зв'язок", "Email: hello@stepup.example · Телефон: +380 00 000 00 00 (приклад — замініть перед запуском) · Пн–Нд, 9:00–20:00"], ["Соцмережі", "Instagram · Telegram · Facebook (посилання додаються під час запуску)"]]],
      ru: ["Контакты", "Мы на связи каждый день.", [["Связь", "Email: hello@stepup.example · Телефон: +380 00 000 00 00 (пример — замените перед запуском) · Пн–Вс, 9:00–20:00"], ["Соцсети", "Instagram · Telegram · Facebook (ссылки добавляются при запуске)"]]],
      en: ["Contacts", "We're here every day.", [["Get in touch", "Email: hello@stepup.example · Phone: +380 00 000 00 00 (placeholder — replace before launch) · Daily, 9:00–20:00"], ["Social", "Instagram · Telegram · Facebook (links are added at launch)"]]]
    }
  };
  const key = document.body.dataset.page, [title, lead, secs] = C[key][L];
  document.title = title + " — STEPUP";
  $("#root").innerHTML = `<div class="crumbs"><a href="index.html">${t("home")}</a> / ${title}</div><div class="static"><h1 style="font-size:clamp(2rem,4vw,3.2rem)">${title}</h1><p class="muted" style="font-size:1.1rem;margin-top:10px">${lead}</p>${secs.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join("")}</div>`;
});
