SU.boot(() => {
  const { $, t } = SU;
  const me = SU.users.me();
  const page = document.body.dataset.page;
  const root = $("#root");
  if (!me) {
    root.innerHTML = `<div class="auth"><h1>${t("account")}</h1><p class="muted" style="margin:10px 0 20px">${t("need_login")}</p><a class="btn btn-primary btn-block" href="login.html?next=${location.pathname.split("/").pop()}">${t("login")}</a><p style="text-align:center;margin-top:16px"><a href="register.html" style="text-decoration:underline;font-weight:700">${t("register")}</a></p></div>`;
    return;
  }
  const mine = () => SU.ls.get("su_orders", []).filter(o => o.userId === me.id);
  const nav = `<aside><a href="account.html" class="${page === "home" ? "on" : ""}">${t("account")}</a><a href="account-orders.html" class="${page === "orders" ? "on" : ""}">${t("my_orders")}</a><a href="account-profile.html" class="${page === "profile" ? "on" : ""}">${t("profile")}</a><a href="favorites.html">${t("favorites")}</a>${me.role === "admin" ? `<a href="admin.html">Admin</a>` : ""}<a href="#" id="logout">${t("logout")}</a></aside>`;
  const dn = { courier: "d_courier", post: "d_post", locker: "d_locker", pickup: "d_pickup" };

  const orderCard = o => `<div class="order-card"><div class="top"><div><b>${SU.esc(o.number)}</b><div class="muted" style="font-size:.88rem">${SU.date(o.created)}</div></div><span class="status ${o.status}">${t("st_" + o.status)}</span></div>
    ${o.items.map(i => `<div class="row"><span>${SU.esc(i.brand)} ${SU.esc(i.name)} · ${t("size")} ${i.size} × ${i.qty}</span><span>${SU.money(i.price * i.qty)}</span></div>`).join("")}
    <div class="row muted" style="font-size:.88rem"><span>${t(dn[o.delivery.method])} · ${SU.esc(o.delivery.city)}, ${SU.esc(o.delivery.addr)}</span></div>
    <div class="row total" style="font-size:1.05rem"><span>${t("total")}</span><span>${SU.money(o.total)}</span></div></div>`;

  let body = "";
  if (page === "home") {
    const os = mine();
    body = `<h1 style="font-size:2.4rem;margin-bottom:6px">${SU.esc(me.name)}</h1><p class="muted" style="margin-bottom:24px">${SU.esc(me.email)}</p>
      <div class="kpis" style="grid-template-columns:repeat(3,1fr)"><div class="kpi" style="background:var(--soft)"><small>${t("my_orders")}</small><b>${os.length}</b></div><div class="kpi" style="background:var(--soft)"><small>${t("favorites")}</small><b>${SU.favs.get().length}</b></div><div class="kpi" style="background:var(--soft)"><small>${t("cart")}</small><b>${SU.cart.count()}</b></div></div>
      <h2 style="font-size:1.4rem;margin:24px 0 12px">${t("my_orders")}</h2>${os.slice(0, 2).map(orderCard).join("") || `<p class="muted">${t("no_orders")}</p>`}`;
  } else if (page === "orders") {
    const os = mine();
    body = `<h1 style="font-size:2.4rem;margin-bottom:20px">${t("my_orders")}</h1>${os.map(orderCard).join("") || `<div class="empty"><h3>${t("no_orders")}</h3><p></p><a class="btn btn-primary" href="catalog.html">${t("back_shop")}</a></div>`}`;
  } else {
    body = `<h1 style="font-size:2.4rem;margin-bottom:20px">${t("profile")}</h1>
      <form class="form two" id="pf" novalidate style="max-width:640px"><div class="fld"><label for="nm">${t("name")}</label><input id="nm" value="${SU.esc(me.name)}"></div><div class="fld"><label for="em">${t("email")}</label><input id="em" value="${SU.esc(me.email)}" disabled></div>
        <div class="fld"><label for="ph">${t("phone")}</label><input id="ph" value="${SU.esc(me.phone || "")}" type="tel"></div><div class="fld"><label for="np">${t("pass_new")}</label><input id="np" type="password" autocomplete="new-password"><div class="field-err"></div></div>
        <div><button class="btn btn-primary">${t("save")}</button></div></form>
      <h2 style="font-size:1.4rem;margin:36px 0 12px">${t("addresses")}</h2><div id="addrs"></div>
      <form class="form two" id="af" style="max-width:640px;margin-top:12px" novalidate><div class="fld"><label for="ac">${t("city")}</label><input id="ac"></div><div class="fld"><label for="al">${t("addr")}</label><input id="al"></div><div><button class="btn btn-ghost">${t("add_addr")}</button></div></form>`;
  }
  root.innerHTML = `<div class="acc">${nav}<div>${body}</div></div>`;
  $("#logout").onclick = e => { e.preventDefault(); SU.users.logout(); location.href = "index.html"; };

  if (page === "profile") {
    const save = patch => { SU.users.save(SU.users.all().map(u => (u.id === me.id ? { ...u, ...patch } : u))); };
    const drawAddrs = () => {
      const a = SU.users.me().addresses || [];
      $("#addrs").innerHTML = a.length ? a.map((x, i) => `<div class="order-card" style="display:flex;justify-content:space-between;align-items:center;padding:14px 18px"><span>${SU.esc(x.city)}, ${SU.esc(x.addr)}</span><button class="rm muted" data-da="${i}" style="text-decoration:underline">${t("remove")}</button></div>`).join("") : `<p class="muted">—</p>`;
    };
    drawAddrs();
    $("#addrs").onclick = e => { const b = e.target.closest("[data-da]"); if (!b) return; const a = [...(SU.users.me().addresses || [])]; a.splice(+b.dataset.da, 1); save({ addresses: a }); drawAddrs(); };
    $("#pf").onsubmit = async e => {
      e.preventDefault();
      const nm = $("#nm").value.trim(); if (!nm) return;
      const patch = { name: nm, phone: $("#ph").value.trim() };
      const np = $("#np").value;
      if (np) { if (np.length < 8) { $(".field-err", $("#np").parentElement).textContent = t("pass_short"); return; } patch.hash = await SU.sha(np); }
      save(patch); $("#np").value = ""; SU.toast(t("saved_ok"));
    };
    $("#af").onsubmit = e => {
      e.preventDefault();
      const c = $("#ac").value.trim(), l = $("#al").value.trim(); if (!c || !l) return;
      save({ addresses: [...(SU.users.me().addresses || []), { city: c, addr: l }] }); $("#ac").value = $("#al").value = ""; drawAddrs(); SU.toast(t("saved_ok"));
    };
  }
});
