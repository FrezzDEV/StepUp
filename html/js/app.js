/* STEPUP shared UI: i18n, storage, header/footer, cards, toasts, modals.
   DEMO MODE: all data lives in this browser (localStorage). No real orders or payments. */
(function () {
  const SU = window.SU;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  SU.$ = $; SU.$$ = $$;

  /* ---------- storage ---------- */
  const ls = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage full/blocked */ } }
  };
  SU.ls = ls;

  // catalog is editable from the admin demo, so persist it
  const saved = ls.get("su_products", null);
  if (saved) SU.PRODUCTS = saved;
  SU.saveProducts = () => ls.set("su_products", SU.PRODUCTS);
  Object.assign(SU.PROMOS, ls.get("su_promos", {})); // promo codes added in the admin demo

  /* ---------- i18n ---------- */
  const D = {
    nav_women: ["Жіноче взуття", "Женская обувь", "Women"], nav_men: ["Чоловіче взуття", "Мужская обувь", "Men"],
    nav_sport: ["Спортивне", "Спортивная", "Sport"], nav_sneakers: ["Кросівки", "Кроссовки", "Sneakers"],
    nav_new: ["Новинки", "Новинки", "New arrivals"], nav_sale: ["Розпродаж", "Распродажа", "Sale"],
    menu: ["Меню", "Меню", "Menu"], close: ["Закрити", "Закрыть", "Close"],
    search: ["Пошук", "Поиск", "Search"], search_ph: ["Назва або бренд…", "Название или бренд…", "Name or brand…"],
    favorites: ["Обране", "Избранное", "Favorites"], account: ["Кабінет", "Кабинет", "Account"], cart: ["Кошик", "Корзина", "Cart"],
    topbar: ["Безкоштовна доставка від 3 000 ₴ · Демонстраційний магазин", "Бесплатная доставка от 3 000 ₴ · Демонстрационный магазин", "Free delivery over 3,000 ₴ · Demo store"],
    slogan: ["Твій стиль. Твій крок.", "Твой стиль. Твой шаг.", "Your style. Your step."],
    mega_shop: ["Купувати", "Купить", "Shop"], mega_by: ["За типом", "По типу", "By type"], mega_brand: ["Бренди", "Бренды", "Brands"],
    mega_all: ["Весь каталог", "Весь каталог", "All products"],
    mega_promo: ["Нова колекція осінь–зима", "Новая коллекция осень–зима", "New autumn–winter collection"],
    hero_tag: ["Колекція 2026", "Коллекция 2026", "Collection 2026"],
    hero_h1a: ["ЗНАЙДИ СВІЙ РИТМ.", "НАЙДИ СВОЙ РИТМ.", "FIND YOUR RHYTHM."],
    hero_h1b: ["ОБЕРИ СВІЙ СТИЛЬ.", "ВЫБЕРИ СВОЙ СТИЛЬ.", "CHOOSE YOUR STYLE."],
    hero_sub: ["Взуття, що відображає тебе. Комфорт і стиль у кожному кроці.", "Обувь, которая отражает тебя. Комфорт и стиль в каждом шаге.", "Shoes that reflect you. Comfort and style in every step."],
    hero_c1: ["Дивитись колекцію", "Смотреть коллекцию", "Shop the collection"], hero_c2: ["Нові надходження", "Новые поступления", "New arrivals"],
    cats_t: ["Обери свій напрямок", "Выбери своё направление", "Pick your direction"],
    cat_men: ["Чоловіче взуття", "Мужская обувь", "Men's shoes"], cat_women: ["Жіноче взуття", "Женская обувь", "Women's shoes"],
    cat_men_d: ["Від міських до класичних моделей", "От городских до классических моделей", "From city to classic styles"],
    cat_women_d: ["Легкість, форма та впевненість", "Лёгкость, форма и уверенность", "Lightness, shape and confidence"],
    see: ["Дивитись", "Смотреть", "Explore"],
    best_t: ["Бестселери", "Бестселлеры", "Bestsellers"], all: ["Усі товари", "Все товары", "View all"],
    newcol_t: ["Нова колекція", "Новая коллекция", "New collection"],
    newcol_h: ["Осінь–зима. Нові форми.", "Осень–зима. Новые формы.", "Autumn–winter. New shapes."],
    newcol_p: ["Свіжі моделі вже в каталозі — оберіть свою пару першими.", "Свежие модели уже в каталоге — выберите свою пару первыми.", "Fresh models are in the catalog — pick your pair first."],
    sale_t: ["Спеціальні пропозиції", "Специальные предложения", "Special offers"],
    ben_t: ["Чому STEPUP", "Почему STEPUP", "Why STEPUP"],
    b1: ["Перевірені товари", "Проверенные товары", "Verified products"], b1d: ["Кожну пару перевіряємо перед відправкою.", "Каждую пару проверяем перед отправкой.", "We check every pair before shipping."],
    b2: ["Зручна доставка", "Удобная доставка", "Convenient delivery"], b2d: ["Кур'єр, відділення, поштомат або самовивіз.", "Курьер, отделение, постамат или самовывоз.", "Courier, branch, locker or pickup."],
    b3: ["Безпечна оплата", "Безопасная оплата", "Secure payments"], b3d: ["Ми не зберігаємо дані карток.", "Мы не храним данные карт.", "We never store card data."],
    b4: ["Підтримка", "Поддержка", "Customer support"], b4d: ["Допоможемо з розміром і замовленням.", "Поможем с размером и заказом.", "Help with sizing and orders."],
    b5: ["Повернення й обмін", "Возврат и обмен", "Returns & exchanges"], b5d: ["14 днів на повернення або обмін.", "14 дней на возврат или обмен.", "14 days to return or exchange."],
    rev_t: ["Відгуки покупців", "Отзывы покупателей", "Customer reviews"],
    demo_rev: ["ДЕМО-ВІДГУК · не справжній покупець", "ДЕМО-ОТЗЫВ · не настоящий покупатель", "DEMO REVIEW · not a real customer"],
    news_t: ["Будь першим, хто дізнається про новинки", "Будь первым, кто узнает о новинках", "Be the first to know about new arrivals"],
    news_p: ["Лише новинки та акції. Без спаму.", "Только новинки и акции. Без спама.", "New drops and offers only. No spam."],
    email: ["Електронна пошта", "Электронная почта", "Email"], subscribe: ["Підписатися", "Подписаться", "Subscribe"],
    email_bad: ["Введіть коректний email", "Введите корректный email", "Enter a valid email"],
    sub_ok: ["Дякуємо! Ви підписані.", "Спасибо! Вы подписаны.", "Thanks! You're subscribed."],
    sub_dup: ["Цей email вже підписаний.", "Этот email уже подписан.", "This email is already subscribed."],
    f_about: ["Про магазин", "О магазине", "About"], f_catalog: ["Каталог", "Каталог", "Catalog"], f_cust: ["Покупцям", "Покупателям", "Customers"],
    f_dp: ["Доставка й оплата", "Доставка и оплата", "Delivery & payment"], f_ret: ["Повернення й обмін", "Возврат и обмен", "Returns & exchanges"],
    f_con: ["Контакти", "Контакты", "Contacts"], f_soc: ["Соцмережі", "Соцсети", "Social"],
    f_blurb: ["Сучасний магазин взуття для тих, хто цінує комфорт, якість та власний стиль.", "Современный магазин обуви для тех, кто ценит комфорт, качество и собственный стиль.", "A modern shoe store for people who value comfort, quality and individual style."],
    delivery: ["Доставка", "Доставка", "Delivery"], payment: ["Оплата", "Оплата", "Payment"], returns: ["Повернення", "Возврат", "Returns"],
    rights: ["Усі права захищено.", "Все права защищены.", "All rights reserved."],
    demo_foot: ["Це демонстраційний проєкт: товари та відгуки — тестові дані.", "Это демонстрационный проект: товары и отзывы — тестовые данные.", "This is a demonstration project: products and reviews are sample data."],
    brand: ["Бренд", "Бренд", "Brand"], category: ["Категорія", "Категория", "Category"], size: ["Розмір", "Размер", "Size"],
    color: ["Колір", "Цвет", "Color"], price: ["Ціна", "Цена", "Price"], availability: ["Наявність", "Наличие", "Availability"],
    in_stock_only: ["Лише в наявності", "Только в наличии", "In stock only"], discounts: ["Зі знижкою", "Со скидкой", "On sale"],
    gender: ["Для кого", "Для кого", "For"], g_men: ["Чоловіки", "Мужчины", "Men"], g_women: ["Жінки", "Женщины", "Women"], g_unisex: ["Унісекс", "Унисекс", "Unisex"],
    from: ["від", "от", "from"], to: ["до", "до", "to"],
    sort: ["Сортування", "Сортировка", "Sort"], s_pop: ["За популярністю", "По популярности", "Popularity"],
    s_new: ["Спочатку новинки", "Сначала новинки", "Newest"], s_pa: ["Ціна: від низької", "Цена: по возрастанию", "Price: low to high"],
    s_pd: ["Ціна: від високої", "Цена: по убыванию", "Price: high to low"], s_rate: ["За рейтингом", "По рейтингу", "Top rated"],
    products: ["товарів", "товаров", "products"], filters: ["Фільтри", "Фильтры", "Filters"], clear: ["Очистити фільтри", "Сбросить фильтры", "Clear filters"],
    apply: ["Показати", "Показать", "Show results"], load_more: ["Показати ще", "Показать ещё", "Load more"],
    grid: ["Сітка", "Сетка", "Grid"], list: ["Список", "Список", "List"],
    no_res: ["Нічого не знайдено", "Ничего не найдено", "Nothing found"],
    no_res_p: ["Спробуйте змінити фільтри або пошуковий запит.", "Попробуйте изменить фильтры или поисковый запрос.", "Try changing your filters or search query."],
    catalog: ["Каталог", "Каталог", "Catalog"], home: ["Головна", "Главная", "Home"], search_res: ["Результати пошуку", "Результаты поиска", "Search results"],
    for_q: ["за запитом", "по запросу", "for"],
    new: ["NEW", "NEW", "NEW"], best: ["ХІТ", "ХИТ", "BESTSELLER"], sale_b: ["SALE", "SALE", "SALE"],
    quick: ["Швидкий перегляд", "Быстрый просмотр", "Quick view"], add: ["Додати в кошик", "Добавить в корзину", "Add to cart"],
    buy_now: ["Купити зараз", "Купить сейчас", "Buy now"], to_fav: ["В обране", "В избранное", "Add to favorites"],
    pick_size: ["Оберіть розмір", "Выберите размер", "Select a size"],
    added: ["Додано в кошик", "Добавлено в корзину", "Added to cart"], go_cart: ["Перейти", "Перейти", "View"],
    fav_add: ["Додано в обране", "Добавлено в избранное", "Saved to favorites"], fav_rm: ["Видалено з обраного", "Удалено из избранного", "Removed from favorites"],
    in_stock: ["В наявності", "В наличии", "In stock"], out_stock: ["Немає в наявності", "Нет в наличии", "Out of stock"],
    only_left: ["Залишилось мало", "Осталось мало", "Only a few left"],
    size_guide: ["Таблиця розмірів", "Таблица размеров", "Size guide"], size_unavail: ["Недоступні розміри перекреслені.", "Недоступные размеры зачёркнуты.", "Unavailable sizes are crossed out."],
    desc: ["Опис", "Описание", "Description"], specs: ["Матеріали та характеристики", "Материалы и характеристики", "Materials & specs"],
    ship_ret: ["Доставка й повернення", "Доставка и возврат", "Shipping & returns"], reviews: ["Відгуки", "Отзывы", "Reviews"],
    similar: ["Схожі товари", "Похожие товары", "Similar products"], recent: ["Нещодавно переглянуті", "Недавно просмотренные", "Recently viewed"],
    not_found: ["Товар не знайдено", "Товар не найден", "Product not found"],
    cm: ["Довжина стопи, см", "Длина стопы, см", "Foot length, cm"], eu: ["Розмір EU", "Размер EU", "EU size"],
    cart_t: ["Кошик", "Корзина", "Your cart"], cart_empty: ["Ваш кошик порожній", "Ваша корзина пуста", "Your cart is empty"],
    cart_empty_p: ["Додайте щось із каталогу — і ми все підготуємо.", "Добавьте что-нибудь из каталога — и мы всё подготовим.", "Add something from the catalog and we'll take it from there."],
    back_shop: ["Повернутися до покупок", "Вернуться к покупкам", "Continue shopping"],
    remove: ["Видалити", "Удалить", "Remove"], rm_confirm: ["Видалити товар з кошика?", "Удалить товар из корзины?", "Remove this item from your cart?"],
    cancel: ["Скасувати", "Отмена", "Cancel"], yes: ["Так, видалити", "Да, удалить", "Yes, remove"],
    summary: ["Разом", "Итого", "Summary"], subtotal: ["Товари", "Товары", "Subtotal"], discount: ["Знижка", "Скидка", "Discount"],
    delivery_cost: ["Доставка", "Доставка", "Delivery"], free: ["Безкоштовно", "Бесплатно", "Free"], total: ["До сплати", "К оплате", "Total"],
    promo: ["Промокод", "Промокод", "Promo code"], apply_p: ["Застосувати", "Применить", "Apply"],
    promo_ok: ["Промокод застосовано", "Промокод применён", "Promo applied"], promo_bad: ["Промокод недійсний", "Промокод недействителен", "Invalid promo code"],
    promo_hint: ["Спробуйте STEPUP10", "Попробуйте STEPUP10", "Try STEPUP10"],
    checkout: ["Оформити замовлення", "Оформить заказ", "Checkout"], recommended: ["Вам також сподобається", "Вам также понравится", "You may also like"],
    stock_warn: ["Недостатньо товару в наявності", "Недостаточно товара в наличии", "Not enough stock"], pcs: ["шт.", "шт.", "pcs"],
    st_contact: ["Контакти", "Контакты", "Contact"], st_delivery: ["Доставка", "Доставка", "Delivery"], st_payment: ["Оплата", "Оплата", "Payment"], st_confirm: ["Підтвердження", "Подтверждение", "Confirm"],
    fn: ["Ім'я", "Имя", "First name"], ln: ["Прізвище", "Фамилия", "Last name"], phone: ["Телефон", "Телефон", "Phone"],
    req: ["Обов'язкове поле", "Обязательное поле", "Required field"], phone_bad: ["Некоректний номер", "Некорректный номер", "Invalid phone number"],
    d_courier: ["Кур'єр", "Курьер", "Courier"], d_post: ["Відділення пошти", "Отделение почты", "Post office branch"],
    d_locker: ["Поштомат", "Постамат", "Parcel locker"], d_pickup: ["Самовивіз з магазину", "Самовывоз из магазина", "Store pickup"],
    city: ["Місто", "Город", "City"], addr: ["Адреса / відділення", "Адрес / отделение", "Address / branch"],
    deliv_note: ["Інтеграція з перевізником (напр. Nova Poshta) підключається через API-ключ. У демо доставка не бронюється.", "Интеграция с перевозчиком (напр. Nova Poshta) подключается через API-ключ. В демо доставка не бронируется.", "Carrier integration (e.g. Nova Poshta) connects through an API key. In this demo no shipment is booked."],
    pay_online: ["Онлайн-оплата карткою", "Онлайн-оплата картой", "Pay online by card"], pay_cod: ["Оплата при отриманні", "Оплата при получении", "Cash on delivery"],
    pay_note: ["Демо-режим: реальна оплата не проводиться, дані картки не збираються й не зберігаються.", "Демо-режим: реальная оплата не проводится, данные карты не собираются и не хранятся.", "Demo mode: no real payment is taken, and no card data is collected or stored."],
    terms: ["Я погоджуюсь з умовами покупки та політикою обробки даних", "Я согласен с условиями покупки и политикой обработки данных", "I agree to the purchase terms and data processing policy"],
    terms_req: ["Потрібна згода з умовами", "Нужно согласие с условиями", "You must accept the terms"],
    back: ["Назад", "Назад", "Back"], next: ["Далі", "Далее", "Continue"], place: ["Підтвердити замовлення", "Подтвердить заказ", "Place order"],
    placing: ["Оформлюємо…", "Оформляем…", "Placing order…"],
    order_fail: ["Не вдалося оформити замовлення. Спробуйте ще раз.", "Не удалось оформить заказ. Попробуйте ещё раз.", "We couldn't place your order. Please try again."],
    ok_t: ["Дякуємо за замовлення!", "Спасибо за заказ!", "Thank you for your order!"],
    ok_p: ["Ми зв'яжемося з вами для підтвердження.", "Мы свяжемся с вами для подтверждения.", "We'll contact you to confirm."],
    ok_demo: ["Демо: замовлення збережено лише у вашому браузері.", "Демо: заказ сохранён только в вашем браузере.", "Demo: this order is saved only in your browser."],
    order_no: ["Номер замовлення", "Номер заказа", "Order number"], date: ["Дата", "Дата", "Date"], status: ["Статус", "Статус", "Status"],
    st_new: ["Нове", "Новый", "New"], st_confirmed: ["Підтверджено", "Подтверждён", "Confirmed"], st_preparing: ["Готується", "Готовится", "Preparing"],
    st_shipped: ["Відправлено", "Отправлен", "Shipped"], st_delivered: ["Доставлено", "Доставлен", "Delivered"], st_cancelled: ["Скасовано", "Отменён", "Cancelled"],
    no_order: ["Замовлення не знайдено", "Заказ не найден", "Order not found"],
    my_orders: ["Мої замовлення", "Мои заказы", "My orders"], profile: ["Профіль", "Профиль", "Profile"], logout: ["Вийти", "Выйти", "Log out"],
    login: ["Увійти", "Войти", "Log in"], register: ["Реєстрація", "Регистрация", "Create account"], name: ["Ім'я", "Имя", "Name"],
    pass: ["Пароль", "Пароль", "Password"], pass_new: ["Новий пароль", "Новый пароль", "New password"], pass_short: ["Мінімум 8 символів", "Минимум 8 символов", "At least 8 characters"],
    bad_cred: ["Невірний email або пароль", "Неверный email или пароль", "Wrong email or password"],
    email_taken: ["Цей email вже зареєстровано", "Этот email уже зарегистрирован", "This email is already registered"],
    forgot: ["Забули пароль?", "Забыли пароль?", "Forgot password?"],
    forgot_msg: ["У демо відновлення пароля недоступне. У робочій версії лист надсилає провайдер автентифікації.", "В демо восстановление пароля недоступно. В рабочей версии письмо отправляет провайдер аутентификации.", "Password recovery is unavailable in the demo. In production the auth provider sends the email."],
    no_acc: ["Немає акаунта?", "Нет аккаунта?", "No account yet?"], have_acc: ["Вже є акаунт?", "Уже есть аккаунт?", "Already have an account?"],
    save: ["Зберегти", "Сохранить", "Save"], saved_ok: ["Збережено", "Сохранено", "Saved"],
    need_login: ["Увійдіть, щоб продовжити", "Войдите, чтобы продолжить", "Log in to continue"],
    addresses: ["Адреси доставки", "Адреса доставки", "Delivery addresses"], add_addr: ["Додати адресу", "Добавить адрес", "Add address"],
    no_orders: ["Замовлень ще немає", "Заказов пока нет", "No orders yet"], items: ["Товари", "Товары", "Items"],
    fav_t: ["Обране", "Избранное", "Favorites"], fav_empty: ["В обраному поки порожньо", "В избранном пока пусто", "No favorites yet"],
    fav_empty_p: ["Натискайте ♡ на товарах, щоб зберегти їх тут.", "Нажимайте ♡ на товарах, чтобы сохранить их здесь.", "Tap ♡ on products to save them here."],
    to_cart: ["В кошик", "В корзину", "Move to cart"],
    lang: ["Мова", "Язык", "Language"], currency: ["Валюта", "Валюта", "Currency"], cur_note: ["Курси демонстраційні", "Курсы демонстрационные", "Demo exchange rates"]
  };
  const LANGS = ["uk", "ru", "en"];
  SU.lang = LANGS.includes(ls.get("su_lang", "uk")) ? ls.get("su_lang", "uk") : "uk";
  SU.cur = ["UAH", "USD", "EUR"].includes(ls.get("su_cur", "UAH")) ? ls.get("su_cur", "UAH") : "UAH";
  const LOC = { uk: "uk-UA", ru: "ru-UA", en: "en-GB" };
  const RATE = { UAH: 1, USD: 1 / 41, EUR: 1 / 44 };
  SU.t = k => (D[k] ? D[k][LANGS.indexOf(SU.lang)] : k);
  SU.money = n => new Intl.NumberFormat(LOC[SU.lang], { style: "currency", currency: SU.cur, currencyDisplay: "narrowSymbol", maximumFractionDigits: SU.cur === "UAH" ? 0 : 2 }).format(n * RATE[SU.cur]);
  SU.date = d => new Intl.DateTimeFormat(LOC[SU.lang], { dateStyle: "medium" }).format(new Date(d));
  SU.catName = c => SU.CATEGORIES[c].name[SU.lang];
  SU.colorName = c => SU.COLOR_NAMES[SU.lang][c];
  SU.pdesc = p => {
    const c = SU.CATEGORIES[p.cat].name[SU.lang].toLowerCase();
    const tpl = {
      uk: `${p.brand} ${p.name} — ${c} для щоденного носіння. Легка конструкція, надійна підошва та акуратний силует. (Демо-опис)`,
      ru: `${p.brand} ${p.name} — ${c} для ежедневной носки. Лёгкая конструкция, надёжная подошва и аккуратный силуэт. (Демо-описание)`,
      en: `${p.brand} ${p.name} — ${c} for everyday wear. Lightweight build, a dependable outsole and a clean silhouette. (Demo description)`
    };
    return tpl[SU.lang];
  };
  SU.applyI18n = (root = document) => {
    $$("[data-i18n]", root).forEach(e => (e.textContent = SU.t(e.dataset.i18n)));
    $$("[data-i18n-ph]", root).forEach(e => (e.placeholder = SU.t(e.dataset.i18nPh)));
    $$("[data-i18n-aria]", root).forEach(e => e.setAttribute("aria-label", SU.t(e.dataset.i18nAria)));
    document.documentElement.lang = SU.lang;
  };
  SU.esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- icons ---------- */
  const ic = (d, w = 22) => `<svg width="${w}" height="${w}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  SU.icon = {
    search: ic('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    heart: ic('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.9 0-3 .5-4.5 2-1.5-1.5-2.6-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/>'),
    user: ic('<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-7 8-7s8 3 8 7"/>'),
    bag: ic('<path d="M6 7h12l1 14H5L6 7Z"/><path d="M9 7a3 3 0 0 1 6 0"/>'),
    menu: ic('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    x: ic('<path d="M6 6l12 12M18 6 6 18"/>', 18),
    check: ic('<path d="m5 12 5 5L20 7"/>', 18),
    arrow: ic('<path d="M5 12h14M13 6l6 6-6 6"/>', 18),
    grid: ic('<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>', 18),
    list: ic('<path d="M4 6h16M4 12h16M4 18h16"/>', 18),
    filter: ic('<path d="M4 5h16M7 12h10M10 19h4"/>', 18),
    shield: ic('<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z"/><path d="m9 12 2 2 4-4"/>'),
    truck: ic('<path d="M3 6h11v10H3zM14 9h4l3 3v4h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>'),
    lock: ic('<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>'),
    chat: ic('<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-5.5A8 8 0 1 1 21 12Z"/>'),
    swap: ic('<path d="M4 8h13l-3-3M20 16H7l3 3"/>')
  };
  SU.starsHTML = r => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));

  /* ---------- cart / favorites ---------- */
  const cartKey = () => "su_cart";
  SU.cart = {
    get() { return ls.get(cartKey(), []); },
    set(v) { ls.set(cartKey(), v); SU.updateBadges(); },
    stock(p, size) { return (p.sizes[size] ?? 0); },
    add(id, size, qty = 1) {
      const p = SU.byId(id);
      if (!p) return { ok: false, err: "nf" };
      if (!size) return { ok: false, err: "size" };
      const items = this.get();
      const line = items.find(i => i.id === id && i.size === String(size));
      const have = line ? line.qty : 0;
      if (have + qty > this.stock(p, size)) return { ok: false, err: "stock" };
      if (line) line.qty += qty; else items.push({ id, size: String(size), qty });
      this.set(items);
      return { ok: true };
    },
    setQty(id, size, qty) {
      let items = this.get();
      const l = items.find(i => i.id === id && i.size === size);
      if (!l) return;
      const p = SU.byId(id);
      l.qty = Math.max(1, Math.min(qty, p ? this.stock(p, size) : qty));
      this.set(items);
    },
    changeSize(id, from, to) {
      let items = this.get();
      const l = items.find(i => i.id === id && i.size === from);
      if (!l) return;
      const other = items.find(i => i.id === id && i.size === to);
      const p = SU.byId(id);
      const max = p ? this.stock(p, to) : 0;
      if (other) { other.qty = Math.min(other.qty + l.qty, max); items = items.filter(i => i !== l); }
      else { l.size = to; l.qty = Math.min(l.qty, max) || 1; }
      this.set(items);
    },
    remove(id, size) { this.set(this.get().filter(i => !(i.id === id && i.size === size))); },
    clear() { this.set([]); },
    count() { return this.get().reduce((s, i) => s + i.qty, 0); }
  };
  SU.favs = {
    get() { return ls.get("su_favs", []); },
    has(id) { return this.get().includes(id); },
    toggle(id) {
      let f = this.get(); const on = f.includes(id);
      f = on ? f.filter(x => x !== id) : [...f, id];
      ls.set("su_favs", f); SU.updateBadges(); return !on;
    }
  };
  /** Prices always come from the catalog, never from the stored cart line. */
  SU.totals = (promoCode, deliveryMethod) => {
    const lines = SU.cart.get().map(i => ({ ...i, p: SU.byId(i.id) })).filter(l => l.p);
    const subtotal = lines.reduce((s, l) => s + l.p.price * l.qty, 0);
    let discount = 0, promo = null;
    const pr = promoCode && SU.PROMOS[promoCode.toUpperCase()];
    if (pr) { promo = promoCode.toUpperCase(); discount = pr.type === "percent" ? Math.floor(subtotal * pr.value / 100) : Math.min(pr.value, subtotal); }
    let delivery = 0;
    if (deliveryMethod) { const d = SU.DELIVERY[deliveryMethod]; delivery = d.free && subtotal - discount >= d.free ? 0 : d.price; }
    return { lines, subtotal, discount, promo, delivery, total: subtotal - discount + delivery };
  };
  SU.updateBadges = () => {
    const set = (sel, n) => $$(sel).forEach(e => { e.textContent = n || ""; e.dataset.n = n; });
    set("[data-cart-count]", SU.cart.count());
    set("[data-fav-count]", SU.favs.get().length);
  };

  /* ---------- user (DEMO auth: client side only) ---------- */
  const sha = async s => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode("stepup-demo:" + s)))].map(b => b.toString(16).padStart(2, "0")).join("");
  SU.sha = sha;
  SU.users = {
    all() { return ls.get("su_users", []); },
    save(u) { ls.set("su_users", u); },
    me() { const id = ls.get("su_session", null); return id ? this.all().find(u => u.id === id) || null : null; },
    async ensureSeed() {
      if (this.all().length) return;
      this.save([{ id: "u-admin", name: "Demo Admin", email: "admin@stepup.demo", phone: "", role: "admin", hash: await sha("admin12345"), created: Date.now() - 90 * 864e5, addresses: [] }]);
    },
    login(id) { ls.set("su_session", id); },
    logout() { localStorage.removeItem("su_session"); }
  };

  /* ---------- toasts / modal ---------- */
  SU.toast = (msg, type = "ok", link) => {
    let box = $("#toasts"); if (!box) { box = document.createElement("div"); box.id = "toasts"; box.setAttribute("aria-live", "polite"); document.body.appendChild(box); }
    const el = document.createElement("div");
    el.className = "toast " + type;
    el.innerHTML = `<i>${type === "err" ? "!" : SU.icon.check}</i><span>${SU.esc(msg)}${link ? ` <a href="${link.href}">${SU.esc(link.text)}</a>` : ""}</span>`;
    box.appendChild(el);
    setTimeout(() => { el.style.transition = ".3s"; el.style.opacity = 0; setTimeout(() => el.remove(), 300); }, 3800);
  };
  SU.modal = (html, cls = "") => {
    let mask = $("#modal"); if (mask) mask.remove();
    mask = document.createElement("div"); mask.id = "modal"; mask.className = "modal-mask open";
    mask.innerHTML = `<div class="modal ${cls}" role="dialog" aria-modal="true"><button class="icon-btn x" aria-label="${SU.t("close")}">${SU.icon.x}</button>${html}</div>`;
    document.body.appendChild(mask);
    const close = () => mask.remove();
    mask.addEventListener("click", e => { if (e.target === mask || e.target.closest(".x")) close(); });
    document.addEventListener("keydown", function k(e) { if (e.key === "Escape") { close(); document.removeEventListener("keydown", k); } });
    SU.applyI18n(mask);
    return { el: mask, close };
  };
  SU.confirm = (text, yesLabel) => new Promise(res => {
    const m = SU.modal(`<h3 style="margin-bottom:18px">${SU.esc(text)}</h3><div style="display:flex;gap:10px"><button class="btn btn-ghost" data-n>${SU.t("cancel")}</button><button class="btn btn-primary" data-y>${yesLabel || SU.t("yes")}</button></div>`, "sm");
    m.el.querySelector("[data-n]").onclick = () => { m.close(); res(false); };
    m.el.querySelector("[data-y]").onclick = () => { m.close(); res(true); };
  });

  /* ---------- product card ---------- */
  SU.discountPct = p => (p.old ? Math.round((1 - p.price / p.old) * 100) : 0);
  SU.availSizes = p => Object.entries(p.sizes).filter(([, q]) => q > 0).map(([s]) => s);
  SU.totalStock = p => Object.values(p.sizes).reduce((a, b) => a + b, 0);
  SU.card = p => {
    const pct = SU.discountPct(p), sizes = SU.availSizes(p), fav = SU.favs.has(p.id);
    const out = !sizes.length;
    return `<article class="card" data-id="${p.id}">
      <div class="mw">
      <a class="media" href="product.html?slug=${p.slug}" aria-label="${SU.esc(p.brand + " " + p.name)}">
        <div class="badges">${p.isNew ? `<span class="pill new">${SU.t("new")}</span>` : ""}${p.best ? `<span class="pill best">${SU.t("best")}</span>` : ""}${pct ? `<span class="pill sale">−${pct}%</span>` : ""}</div>
        <span class="main">${SU.shoe(p)}</span><span class="alt">${SU.shoe(p, "b")}</span>
      </a>
      <button class="fav ${fav ? "on" : ""}" data-fav="${p.id}" aria-pressed="${fav}" aria-label="${SU.t("to_fav")}">${SU.icon.heart}</button>
      ${out ? "" : `<button class="quick" data-qv="${p.id}">${SU.t("quick")}</button>`}
      </div>
      <div class="info">
        <div class="brand">${SU.esc(p.brand)}</div>
        <a class="name" href="product.html?slug=${p.slug}">${SU.esc(p.name)}</a>
        <div class="price">${SU.money(p.price)}${p.old ? `<s>${SU.money(p.old)}</s><em>−${pct}%</em>` : ""}</div>
        <div class="sizes-mini">${out ? SU.t("out_stock") : SU.t("size") + ": " + sizes.slice(0, 6).join(" · ") + (sizes.length > 6 ? " …" : "")}</div>
      </div></article>`;
  };
  SU.quickView = id => {
    const p = SU.byId(id); if (!p) return;
    let chosen = null;
    const m = SU.modal(`<div class="qv"><div class="pic">${SU.shoe(p)}</div><div class="body">
      <div class="muted" style="font-weight:700;text-transform:uppercase;font-size:.8rem">${SU.esc(p.brand)}</div>
      <h2 style="font-size:1.9rem;margin:4px 0 8px">${SU.esc(p.name)}</h2>
      <div class="price" style="font-size:1.4rem">${SU.money(p.price)}${p.old ? `<s>${SU.money(p.old)}</s>` : ""}</div>
      <p class="muted" style="margin:12px 0">${SU.esc(SU.pdesc(p))}</p>
      <div class="size-head"><span>${SU.t("size")}</span></div>
      <div class="sizes">${Object.entries(p.sizes).map(([s, q]) => `<button data-s="${s}" ${q ? "" : "disabled"}>${s}</button>`).join("")}</div>
      <div class="err" data-err></div>
      <button class="btn btn-primary btn-block" data-add>${SU.t("add")}</button>
      <a class="link-arrow" style="display:inline-block;margin-top:16px" href="product.html?slug=${p.slug}">${SU.t("see")} →</a></div></div>`);
    m.el.addEventListener("click", e => {
      const b = e.target.closest("[data-s]");
      if (b && !b.disabled) { chosen = b.dataset.s; $$("[data-s]", m.el).forEach(x => x.classList.toggle("on", x === b)); $("[data-err]", m.el).textContent = ""; }
      if (e.target.closest("[data-add]")) {
        const r = SU.cart.add(p.id, chosen);
        if (!r.ok) { $("[data-err]", m.el).textContent = r.err === "size" ? SU.t("pick_size") : SU.t("stock_warn"); return; }
        m.close(); SU.toast(SU.t("added"), "ok", { href: "cart.html", text: SU.t("go_cart") }); bumpCart();
      }
    });
  };
  function bumpCart() { $$("[data-cart-count]").forEach(e => { e.classList.remove("bump"); void e.offsetWidth; e.classList.add("bump"); }); }
  SU.bumpCart = bumpCart;

  document.addEventListener("click", e => {
    const f = e.target.closest("[data-fav]");
    if (f) {
      e.preventDefault();
      const id = +f.dataset.fav, on = SU.favs.toggle(id);
      $$(`[data-fav="${id}"]`).forEach(b => { b.classList.toggle("on", on); b.setAttribute("aria-pressed", on); });
      SU.toast(on ? SU.t("fav_add") : SU.t("fav_rm"));
      if (SU.onFavChange) SU.onFavChange();
    }
    const q = e.target.closest("[data-qv]");
    if (q) { e.preventDefault(); SU.quickView(+q.dataset.qv); }
  });

  /* ---------- layout: header / footer ---------- */
  const PAGE = location.pathname.split("/").pop() || "index.html";
  const brands = [...new Set(SU.PRODUCTS.map(p => p.brand))].sort();
  function megaPromo(cat) { const p = SU.PRODUCTS.find(x => x.cat === cat) || SU.PRODUCTS[0]; return `<a class="promo" href="catalog.html?cat=${cat}">${SU.shoe(p)}<b>${SU.t("mega_promo")}</b></a>`; }
  function mega(label, href, cls, params, promoCat) {
    return `<div><a class="top ${cls}" href="${href}">${label}</a><div class="mega"><div class="wrap">
      <div><h4>${SU.t("mega_shop")}</h4><ul><li><a href="${href}">${SU.t("mega_all")}</a></li><li><a href="catalog.html?${params}&new=1">${SU.t("nav_new")}</a></li><li><a href="catalog.html?${params}&sale=1">${SU.t("nav_sale")}</a></li></ul></div>
      <div><h4>${SU.t("mega_by")}</h4><ul>${Object.keys(SU.CATEGORIES).map(c => `<li><a href="catalog.html?${params}&cat=${c}">${SU.catName(c)}</a></li>`).join("")}</ul></div>
      <div><h4>${SU.t("mega_brand")}</h4><ul>${brands.map(b => `<li><a href="catalog.html?${params}&brand=${encodeURIComponent(b)}">${SU.esc(b)}</a></li>`).join("")}</ul></div>
      ${megaPromo(promoCat)}</div></div></div>`;
  }
  function renderHeader() {
    const host = $("#site-header"); if (!host) return;
    const me = SU.users.me();
    const navLinks = [
      [SU.t("nav_women"), "catalog.html?gender=women"], [SU.t("nav_men"), "catalog.html?gender=men"],
      [SU.t("nav_sport"), "catalog.html?cat=sport"], [SU.t("nav_sneakers"), "catalog.html?cat=sneakers"],
      [SU.t("nav_new"), "catalog.html?new=1"], [SU.t("nav_sale"), "catalog.html?sale=1"]
    ];
    host.innerHTML = `<div class="topbar">${SU.t("topbar")}</div>
    <header class="site"><div class="wrap head">
      <button class="icon-btn burger" data-open-drawer aria-label="${SU.t("menu")}">${SU.icon.menu}</button>
      <a class="logo" href="index.html" aria-label="STEPUP"><i><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#171717" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19 12 5l7 14M8.5 13h7"/></svg></i>STEPUP</a>
      <nav class="main" aria-label="Main">
        ${mega(navLinks[0][0], navLinks[0][1], "", "gender=women", "sneakers")}
        ${mega(navLinks[1][0], navLinks[1][1], "", "gender=men", "classic")}
        ${mega(navLinks[2][0], navLinks[2][1], "", "x=1", "sport")}
        <div><a class="top" href="${navLinks[3][1]}">${navLinks[3][0]}</a></div>
        <div><a class="top" href="${navLinks[4][1]}">${navLinks[4][0]}</a></div>
        <div><a class="top sale" href="${navLinks[5][1]}">${navLinks[5][0]}</a></div>
      </nav>
      <div class="head-actions">
        <form class="search-box" id="hs" role="search"><input type="search" placeholder="${SU.t("search_ph")}" aria-label="${SU.t("search")}"></form>
        <button class="icon-btn" id="hs-toggle" aria-label="${SU.t("search")}">${SU.icon.search}</button>
        <select class="lang" id="lang-sel" aria-label="${SU.t("lang")}">${LANGS.map(l => `<option value="${l}" ${l === SU.lang ? "selected" : ""}>${l.toUpperCase()}</option>`).join("")}</select>
        <a class="icon-btn" href="favorites.html" aria-label="${SU.t("favorites")}">${SU.icon.heart}<span class="badge-count" data-fav-count></span></a>
        <a class="icon-btn" href="${me ? "account.html" : "login.html"}" aria-label="${SU.t("account")}">${SU.icon.user}</a>
        <a class="icon-btn" href="cart.html" aria-label="${SU.t("cart")}">${SU.icon.bag}<span class="badge-count" data-cart-count></span></a>
      </div></div></header>
    <div class="drawer-mask" id="dmask"></div>
    <aside class="drawer" id="drawer" aria-label="${SU.t("menu")}"><div class="drawer-head"><a class="logo" href="index.html">STEPUP</a><button class="icon-btn" data-close-drawer aria-label="${SU.t("close")}">${SU.icon.x}</button></div>
      ${navLinks.map(l => `<a href="${l[1]}" ${l[1].includes("sale") ? 'style="color:var(--danger)"' : ""}>${l[0]}</a>`).join("")}
      <a href="favorites.html">${SU.t("favorites")}</a><a href="${me ? "account.html" : "login.html"}">${SU.t("account")}</a>
      <div style="margin-top:20px;display:flex;gap:8px">${LANGS.map(l => `<button class="btn ${l === SU.lang ? "btn-primary" : "btn-ghost"}" data-lang="${l}" style="min-height:40px;padding:0 16px">${l.toUpperCase()}</button>`).join("")}</div></aside>`;

    const dr = $("#drawer"), mk = $("#dmask");
    const setD = o => { dr.classList.toggle("open", o); mk.classList.toggle("open", o); document.body.style.overflow = o ? "hidden" : ""; };
    $("[data-open-drawer]").onclick = () => setD(true); $("[data-close-drawer]").onclick = () => setD(false); mk.onclick = () => setD(false);
    $$("[data-lang]").forEach(b => b.onclick = () => setLang(b.dataset.lang));
    $("#lang-sel").onchange = e => setLang(e.target.value);
    const hs = $("#hs"), tg = $("#hs-toggle");
    tg.onclick = () => { hs.classList.toggle("open"); if (hs.classList.contains("open")) $("input", hs).focus(); };
    hs.onsubmit = e => { e.preventDefault(); const v = $("input", hs).value.trim(); if (v) location.href = "search.html?q=" + encodeURIComponent(v); };
  }
  function setLang(l) { ls.set("su_lang", l); location.reload(); }
  function renderFooter() {
    const host = $("#site-footer"); if (!host) return;
    host.innerHTML = `<footer class="site"><div class="wrap"><div class="foot">
      <div><a class="logo" href="index.html" style="color:#fff">STEPUP</a><p style="margin-top:12px;font-size:.92rem;color:#999">${SU.t("f_blurb")}</p><p style="margin-top:12px;font-weight:700;color:var(--accent)">${SU.t("slogan")}</p></div>
      <div><h4>${SU.t("f_about")}</h4><a href="about.html">${SU.t("f_about")}</a><a href="contacts.html">${SU.t("f_con")}</a></div>
      <div><h4>${SU.t("f_catalog")}</h4>${Object.keys(SU.CATEGORIES).map(c => `<a href="catalog.html?cat=${c}">${SU.catName(c)}</a>`).join("")}</div>
      <div><h4>${SU.t("f_cust")}</h4><a href="account.html">${SU.t("account")}</a><a href="favorites.html">${SU.t("favorites")}</a><a href="cart.html">${SU.t("cart")}</a></div>
      <div><h4>${SU.t("f_dp")}</h4><a href="delivery.html">${SU.t("delivery")}</a><a href="payment.html">${SU.t("payment")}</a><a href="returns.html">${SU.t("f_ret")}</a></div>
      <div><h4>${SU.t("f_soc")}</h4><a href="contacts.html">Instagram</a><a href="contacts.html">Telegram</a><a href="contacts.html">Facebook</a>
        <h4 style="margin-top:16px">${SU.t("currency")}</h4><select class="lang" id="cur-sel" aria-label="${SU.t("currency")}">${["UAH", "USD", "EUR"].map(c => `<option ${c === SU.cur ? "selected" : ""}>${c}</option>`).join("")}</select><small style="display:block;color:#777;margin-top:6px">${SU.t("cur_note")}</small></div>
    </div><div class="foot-bottom"><span>© ${new Date().getFullYear()} STEPUP. ${SU.t("rights")}</span><span>${SU.t("demo_foot")}</span>
      <span class="pay-chips"><span>Visa</span><span>Mastercard</span><span>Apple Pay</span><span>Google Pay</span><span>COD</span></span></div></div></footer>`;
    $("#cur-sel").onchange = e => { ls.set("su_cur", e.target.value); location.reload(); };
  }

  SU.mountNewsletter = form => {
    if (!form) return;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const inp = $("input", form), err = $(".field-err", form.parentElement) || $(".field-err");
      const v = inp.value.trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { err.textContent = SU.t("email_bad"); inp.focus(); return; }
      const list = ls.get("su_news", []);
      if (list.includes(v)) { err.textContent = SU.t("sub_dup"); return; }
      list.push(v); ls.set("su_news", list); err.textContent = ""; inp.value = "";
      SU.toast(SU.t("sub_ok"));
    });
  };

  SU.recent = {
    add(id) { let r = ls.get("su_recent", []).filter(x => x !== id); r.unshift(id); ls.set("su_recent", r.slice(0, 8)); },
    get() { return ls.get("su_recent", []); }
  };

  SU.skeletons = n => Array.from({ length: n }, () => `<div class="skel"></div>`).join("");

  /* ---------- boot ---------- */
  SU.boot = async fn => {
    await SU.users.ensureSeed();
    renderHeader(); renderFooter();
    SU.applyI18n(); SU.updateBadges();
    if (fn) fn();
    document.body.classList.add("ready");
  };
})();
