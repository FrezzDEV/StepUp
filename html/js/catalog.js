/* Catalog + search: all filter/sort state lives in the URL query string (shareable links). */
SU.boot(() => {
  const { $, $$, t } = SU;
  const PAGE_SIZE = 12;
  const isSearch = document.body.dataset.mode === "search";
  const MULTI = ["cat", "brand", "size", "color", "gender"];
  let qs = new URLSearchParams(location.search);

  const state = () => {
    const g = k => (qs.get(k) ? qs.get(k).split(",").filter(Boolean) : []);
    return {
      q: (qs.get("q") || "").trim(), cat: g("cat"), brand: g("brand"), size: g("size"), color: g("color"), gender: g("gender"),
      min: +qs.get("min") || 0, max: +qs.get("max") || 0, stock: qs.get("stock") === "1", sale: qs.get("sale") === "1", isNew: qs.get("new") === "1",
      sort: qs.get("sort") || "pop", view: qs.get("view") === "list" ? "list" : "grid", pages: Math.max(1, +qs.get("page") || 1)
    };
  };
  function push(mut, resetPage = true) {
    mut(qs);
    if (resetPage) qs.delete("page");
    [...qs.keys()].forEach(k => { if (!qs.get(k)) qs.delete(k); });
    const s = qs.toString();
    history.replaceState(null, "", location.pathname + (s ? "?" + s : ""));
    render();
  }
  const toggleMulti = (key, val, on) => push(p => {
    const cur = (p.get(key) || "").split(",").filter(Boolean);
    const next = on ? [...new Set([...cur, val])] : cur.filter(x => x !== val);
    next.length ? p.set(key, next.join(",")) : p.delete(key);
  });

  const allBrands = [...new Set(SU.PRODUCTS.map(p => p.brand))].sort();
  const allSizes = [...new Set(SU.PRODUCTS.flatMap(p => Object.keys(p.sizes)))].sort((a, b) => a - b);
  const allColors = Object.keys(SU.COLORS);

  function filtered(s) {
    let list = SU.PRODUCTS.filter(p => {
      if (s.q) { const h = (p.name + " " + p.brand).toLowerCase(); if (!s.q.toLowerCase().split(/\s+/).every(w => h.includes(w))) return false; }
      if (s.cat.length && !s.cat.includes(p.cat)) return false;
      if (s.brand.length && !s.brand.includes(p.brand)) return false;
      if (s.gender.length && !(s.gender.includes(p.gender) || (p.gender === "unisex"))) return false;
      if (s.color.length && !p.colors.some(c => s.color.includes(c))) return false;
      if (s.size.length && !s.size.some(z => (p.sizes[z] || 0) > 0)) return false;
      if (s.min && p.price < s.min) return false;
      if (s.max && p.price > s.max) return false;
      if (s.stock && !SU.totalStock(p)) return false;
      if (s.sale && !p.old) return false;
      if (s.isNew && !p.isNew) return false;
      return true;
    });
    const sorts = {
      pop: (a, b) => b.pop - a.pop, new: (a, b) => b.created - a.created,
      pa: (a, b) => a.price - b.price, pd: (a, b) => b.price - a.price, rate: (a, b) => b.rating - a.rating || b.reviews - a.reviews
    };
    return list.sort(sorts[s.sort] || sorts.pop);
  }

  function title(s) {
    if (isSearch) return s.q ? `${t("search_res")}: «${s.q}»` : t("search_res");
    if (s.cat.length === 1) return SU.catName(s.cat[0]);
    if (s.isNew) return t("nav_new");
    if (s.sale) return t("nav_sale");
    if (s.gender.length === 1) return s.gender[0] === "men" ? t("nav_men") : t("nav_women");
    return t("catalog");
  }

  function renderFilters(s) {
    const chk = (key, val, label, on) => `<label class="check"><input type="checkbox" data-m="${key}" value="${SU.esc(val)}" ${on ? "checked" : ""}> ${label}</label>`;
    $("#filters-body").innerHTML = `
      <div class="fgroup"><h4>${t("gender")}</h4>${["men", "women", "unisex"].map(g => chk("gender", g, t("g_" + g), s.gender.includes(g))).join("")}</div>
      <div class="fgroup"><h4>${t("category")}</h4>${Object.keys(SU.CATEGORIES).map(c => chk("cat", c, SU.catName(c), s.cat.includes(c))).join("")}</div>
      <div class="fgroup"><h4>${t("brand")}</h4>${allBrands.map(b => chk("brand", b, SU.esc(b), s.brand.includes(b))).join("")}</div>
      <div class="fgroup"><h4>${t("size")}</h4><div class="size-grid">${allSizes.map(z => `<label><input type="checkbox" data-m="size" value="${z}" ${s.size.includes(z) ? "checked" : ""}><span>${z}</span></label>`).join("")}</div></div>
      <div class="fgroup"><h4>${t("color")}</h4><div class="swatches">${allColors.map(c => `<label title="${SU.colorName(c)}"><input type="checkbox" data-m="color" value="${c}" ${s.color.includes(c) ? "checked" : ""}><span style="background:${SU.COLORS[c]}"></span></label>`).join("")}</div></div>
      <div class="fgroup"><h4>${t("price")} (₴)</h4><div class="range"><input type="number" min="0" step="100" placeholder="${t("from")}" id="pmin" value="${s.min || ""}" aria-label="${t("from")}"><input type="number" min="0" step="100" placeholder="${t("to")}" id="pmax" value="${s.max || ""}" aria-label="${t("to")}"></div></div>
      <div class="fgroup"><h4>${t("availability")}</h4><label class="check"><input type="checkbox" id="f-stock" ${s.stock ? "checked" : ""}> ${t("in_stock_only")}</label><label class="check"><input type="checkbox" id="f-sale" ${s.sale ? "checked" : ""}> ${t("discounts")}</label><label class="check"><input type="checkbox" id="f-new" ${s.isNew ? "checked" : ""}> ${t("nav_new")}</label></div>`;
  }

  function activeTags(s) {
    const tags = [];
    s.gender.forEach(v => tags.push(["gender", v, t("g_" + v)]));
    s.cat.forEach(v => tags.push(["cat", v, SU.catName(v)]));
    s.brand.forEach(v => tags.push(["brand", v, v]));
    s.size.forEach(v => tags.push(["size", v, t("size") + " " + v]));
    s.color.forEach(v => tags.push(["color", v, SU.colorName(v)]));
    if (s.min || s.max) tags.push(["price", "", `${s.min ? SU.money(s.min) : "0"} – ${s.max ? SU.money(s.max) : "∞"}`]);
    if (s.stock) tags.push(["stock", "", t("in_stock_only")]);
    if (s.sale) tags.push(["sale", "", t("discounts")]);
    if (s.isNew) tags.push(["new", "", t("nav_new")]);
    return tags;
  }

  function render() {
    const s = state();
    const list = filtered(s);
    document.title = title(s) + " — STEPUP";
    $("#title").textContent = title(s);
    $("#count").textContent = `${list.length} ${t("products")}`;
    $("#sort").value = s.sort;
    $$("#view button").forEach(b => b.classList.toggle("on", b.dataset.v === s.view));
    renderFilters(s);

    const tags = activeTags(s);
    $("#tags").innerHTML = tags.length
      ? tags.map(([k, v, l]) => `<span class="tag-x">${SU.esc(l)}<button data-rm="${k}" data-v="${SU.esc(v)}" aria-label="${t("remove")}">${SU.icon.x}</button></span>`).join("") + `<button class="clear" id="clear">${t("clear")}</button>`
      : "";

    const shown = list.slice(0, s.pages * PAGE_SIZE);
    const grid = $("#grid");
    grid.className = "grid" + (s.view === "list" ? " list" : "");
    if (!list.length) {
      grid.className = "";
      grid.innerHTML = `<div class="empty"><div style="font-size:2.4rem">🔍</div><h3>${t("no_res")}</h3><p>${t("no_res_p")}</p><button class="btn btn-primary" id="clear2">${t("clear")}</button></div>`;
    } else grid.innerHTML = shown.map(SU.card).join("");
    $("#more").innerHTML = shown.length < list.length ? `<button class="btn btn-ghost" id="loadmore">${t("load_more")} (${list.length - shown.length})</button>` : "";
    $("#apply").textContent = `${t("apply")} (${list.length})`;
  }

  function loading() {
    $("#grid").className = "grid"; $("#grid").innerHTML = SU.skeletons(8);
  }

  // events
  document.addEventListener("change", e => {
    const m = e.target.closest("[data-m]");
    if (m) return toggleMulti(m.dataset.m, m.value, m.checked);
    if (e.target.id === "f-stock") push(p => e.target.checked ? p.set("stock", "1") : p.delete("stock"));
    if (e.target.id === "f-sale") push(p => e.target.checked ? p.set("sale", "1") : p.delete("sale"));
    if (e.target.id === "f-new") push(p => e.target.checked ? p.set("new", "1") : p.delete("new"));
    if (e.target.id === "pmin" || e.target.id === "pmax") push(p => { const a = +$("#pmin").value, b = +$("#pmax").value; a > 0 ? p.set("min", a) : p.delete("min"); b > 0 ? p.set("max", b) : p.delete("max"); });
    if (e.target.id === "sort") push(p => p.set("sort", e.target.value));
  });
  document.addEventListener("click", e => {
    const rm = e.target.closest("[data-rm]");
    if (rm) {
      const k = rm.dataset.rm, v = rm.dataset.v;
      if (["gender", "cat", "brand", "size", "color"].includes(k)) toggleMulti(k, v, false);
      else if (k === "price") push(p => { p.delete("min"); p.delete("max"); });
      else push(p => p.delete(k));
    }
    if (e.target.closest("#clear") || e.target.closest("#clear2")) push(p => { ["cat", "brand", "size", "color", "gender", "min", "max", "stock", "sale", "new"].forEach(k => p.delete(k)); if (!isSearch) p.delete("q"); });
    if (e.target.closest("#loadmore")) { const s = state(); push(p => p.set("page", s.pages + 1), false); }
    const v = e.target.closest("#view button"); if (v) push(p => p.set("view", v.dataset.v), false);
    if (e.target.closest("#open-f")) { $("#filters").classList.add("open"); $("#fmask").classList.add("open"); document.body.style.overflow = "hidden"; }
    if (e.target.closest("#close-f") || e.target.closest("#fmask") || e.target.closest("#apply")) { $("#filters").classList.remove("open"); $("#fmask").classList.remove("open"); document.body.style.overflow = ""; }
  });
  SU.onFavChange = () => { if (state().q === "" && false) render(); };

  // search box on the search page
  const sf = $("#search-form");
  if (sf) {
    $("input", sf).value = qs.get("q") || "";
    sf.addEventListener("submit", e => { e.preventDefault(); push(p => p.set("q", $("input", sf).value.trim())); });
  }

  $("#sort").innerHTML = [["pop", "s_pop"], ["new", "s_new"], ["pa", "s_pa"], ["pd", "s_pd"], ["rate", "s_rate"]].map(([v, k]) => `<option value="${v}">${t(k)}</option>`).join("");
  loading();
  setTimeout(render, 220);
});
