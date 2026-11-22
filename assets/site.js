/* =========================================================
   ysamut.fr — script commun
   - bouton thème et pied de page
   - thème clair / sombre
   - onglets (menu horizontal de l'accueil)
   - visionneuse PDF (pdf.js), pages protégées
   Fonctionne aussi en ouvrant les fichiers directement (file://).
   ========================================================= */
(function () {
  "use strict";

  var script = document.currentScript;
  var ROOT = (script && script.getAttribute("data-root")) || "";

  var GA_ID = "G-450HGK36PQ";

  /* ---------- Icônes ---------- */
  var ICON = {
    chevron: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    ext: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 2h5v5M14 2L7 9M12 9.5V14H2V4h4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    theme: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor"/></svg>',
    lock: '<svg class="lock" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
  };


  /* ---------- Thème ---------- */
  function setTheme(dark) {
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  }

  /* ---------- En-tête : bouton thème clair / sombre ---------- */
  function buildHeader() {
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.innerHTML = ICON.theme;
      b.addEventListener("click", function () {
        setTheme(document.documentElement.getAttribute("data-theme") !== "dark");
      });
    });
  }

  /* ---------- Pied de page ---------- */
  function buildFooter() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML = '<div class="site-footer-inner">' +
      '<span>© <span class="foot-long">Youri Samut</span><span class="foot-short">YSA</span> ' + new Date().getFullYear() + '</span>' +
      '<nav aria-label="Liens du pied de page"><a class="foot-icon" href="' + ROOT + 'liens-utiles.html" title="Liens utiles" aria-label="Liens utiles"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.8 9.2a3 3 0 0 0 4.3 0l2.3-2.3a3 3 0 0 0-4.3-4.3l-1 1M9.2 6.8a3 3 0 0 0-4.3 0L2.6 9.1a3 3 0 0 0 4.3 4.3l1-1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>' +
      '<a class="foot-icon" href="mailto:samut.youri@hotmail.fr" title="M\'écrire" aria-label="E-mail"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 3.5h13v9h-13z M1.5 3.5L8 9l6.5-5.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg></a>' +
      '<a class="foot-icon" href="https://www.linkedin.com/in/youri-samut-8949b3149/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M1 1.8C1 1.4 1.4 1 1.8 1h12.4c.4 0 .8.4.8.8v12.4c0 .4-.4.8-.8.8H1.8c-.4 0-.8-.4-.8-.8zm3.3 11V6.3H2.2v6.5zM3.2 5.4c.7 0 1.2-.5 1.2-1.1 0-.7-.5-1.2-1.2-1.2S2 3.6 2 4.3c0 .6.5 1.1 1.2 1.1zm4.1 7.4V9.2c0-.2 0-.4.1-.5.2-.4.5-.8 1.1-.8.8 0 1.1.6 1.1 1.5v3.4h2.1V9.1c0-2-1-2.9-2.4-2.9-1.1 0-1.6.6-1.9 1.1V6.3H5.3c0 .6 0 6.5 0 6.5z"/></svg></a>' +
      '<a class="foot-icon" href="https://github.com/10ysamut" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 .2a8 8 0 0 0-2.5 15.6c.4 0 .5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7 0-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 .2z"/></svg></a></nav></div>';
    document.body.appendChild(f);
  }

  /* ---------- Menu (une page par rubrique) ----------
     « Prépa PTSI » ouvre une liste de ses rubriques ; les anciennes adresses
     de la page unique (#episen, #formulaires…) renvoient vers la bonne page. */
  function setupMenu() {
    var MOVED = {
      episen: "episen.html", "outils-mathematiques": "episen.html#outils-mathematiques", "analyse-numerique": "episen.html#analyse-numerique",
      ressources: "ressources.html", formulaires: "ressources.html#formulaires", papiers: "ressources.html#papiers",
      "liens-utiles": "liens-utiles.html"
    };
    var page = document.body.getAttribute("data-page");
    var h = decodeURIComponent(location.hash.slice(1));
    if (page === "index.html" && MOVED[h]) { location.replace(ROOT + MOVED[h]); return; }
    if (page === "index.html" && h === "ptsi" && history.replaceState) history.replaceState(null, "", location.pathname);

    var items = document.querySelectorAll(".menu .menu-item");
    function closeAll() {
      items.forEach(function (m) { m.classList.remove("open"); var b = m.querySelector("button"); if (b) b.setAttribute("aria-expanded", "false"); });
    }
    items.forEach(function (m) {
      var b = m.querySelector("button");
      if (!b) return;
      b.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !m.classList.contains("open");
        closeAll();
        m.classList.toggle("open", open);
        b.setAttribute("aria-expanded", open ? "true" : "false");
      });
      m.querySelectorAll(".menu-drop a").forEach(function (a) { a.addEventListener("click", closeAll); });
    });
    document.addEventListener("click", function (e) { if (!e.target.closest || !e.target.closest(".menu-item")) closeAll(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeAll(); });
  }

  /* ---------- Liseuse PDF : fenêtre sur la page (comme l'ancien site) ---------- */
  var openPdf = function (url) { location.href = url; };
  function setupPdf() {
    var overlay = document.createElement("div");
    overlay.id = "pdfModalOverlay";
    overlay.innerHTML = '<div id="pdfModalBox" role="dialog" aria-modal="true" aria-label="Aperçu PDF">' +
      '<div id="pdfModalHeader">' +
        '<a id="pdfModalOpenNewTab" href="#" target="_blank" rel="noopener">' + ICON.ext + ' <span class="label-full">Ouvrir dans un nouvel onglet</span></a>' +
        '<button type="button" id="pdfModalClose">' + ICON.close + ' Fermer</button>' +
      '</div>' +
      '<iframe id="pdfModalFrame" src="about:blank" title="Aperçu PDF"></iframe>' +
    '</div>';
    document.body.appendChild(overlay);
    var frame = overlay.querySelector("#pdfModalFrame");
    var box = overlay.querySelector("#pdfModalBox");
    var scrollY = 0;
    // La liseuse pdf.js du site (assets/pdfjs) ne fonctionne qu'avec un serveur (http/https).
    // Si on ouvre les fichiers directement (file://), on affiche le PDF avec le lecteur du navigateur,
    // toujours dans la même fenêtre sur la page.
    var useViewer = location.protocol !== "file:";
    var viewerBase = new URL(ROOT + "assets/pdfjs/web/viewer.html", location.href).href;

    // Accorde la liseuse pdf.js (même origine) aux couleurs et au thème jour/nuit du site
    function themeViewer() {
      var doc;
      try { doc = frame.contentDocument; } catch (e) { return; }
      if (!doc || !doc.documentElement || !useViewer) return;
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      var c = dark
        ? { bg: "#10141C", bar: "#171C26", border: "#262E3D", text: "#E3E7EF", field: "#1F2735" }
        : { bg: "#E7EBF2", bar: "#FFFFFF", border: "#E1E6EF", text: "#1B1F27", field: "#F5F7FB" };
      doc.documentElement.style.setProperty("color-scheme", dark ? "dark" : "light");
      var st = doc.getElementById("ysa-theme");
      if (!st) { st = doc.createElement("style"); st.id = "ysa-theme"; (doc.head || doc.documentElement).appendChild(st); }
      st.textContent = ":root{" +
        "--body-bg-color:" + c.bg + ";" +
        "--toolbar-bg-color:" + c.bar + ";" +
        "--sidebar-toolbar-bg-color:" + c.bar + ";" +
        "--toolbar-border-color:" + c.border + ";" +
        "--toolbar-box-shadow:0 1px 0 " + c.border + ";" +
        "--doorhanger-bg-color:" + c.bar + ";" +
        "--main-color:" + c.text + ";" +
        "--field-bg-color:" + c.field + ";" +
        "--field-border-color:" + c.border + ";" +
        "--dropdown-btn-bg-color:" + c.field + ";" +
        "--sidebar-narrow-bg-color:" + c.bg + ";" +
      "}";
    }
    frame.addEventListener("load", themeViewer);
    new MutationObserver(themeViewer).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function open(url) {
      var src = useViewer ? viewerBase + "?file=" + encodeURIComponent(url) : url;
      scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      frame.src = src;
      overlay.querySelector("#pdfModalOpenNewTab").href = src;
      overlay.classList.add("open");
      var st = document.body.style;
      st.position = "fixed"; st.top = "-" + scrollY + "px"; st.left = "0"; st.right = "0"; st.overflow = "hidden";
    }
    function close() {
      if (!overlay.classList.contains("open")) return;
      overlay.classList.remove("open");
      frame.src = "about:blank";
      var st = document.body.style;
      st.position = st.top = st.left = st.right = st.overflow = "";
      window.scrollTo(0, scrollY);
    }
    openPdf = open;
    overlay.addEventListener("click", function (e) { if (!box.contains(e.target)) close(); });
    overlay.querySelector("#pdfModalClose").addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    // Tout lien vers un PDF du site s'ouvre dans la liseuse
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[href]");
      if (!a || overlay.contains(a) || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      if (a.hasAttribute("data-no-viewer")) return;
      var url;
      try { url = new URL(a.getAttribute("href"), location.href); } catch (err) { return; }
      if (url.origin !== location.origin || !/\.pdf$/i.test(url.pathname)) return;
      e.preventDefault();
      if (a.closest(".topbar")) a.closest(".topbar").classList.remove("nav-open");
      open(url.href);
    });
  }

  /* ---------- Pages protégées ---------- */
  function sha256Hex(str) {
    return crypto.subtle.digest("SHA-256", new TextEncoder().encode(str)).then(function (buf) {
      return Array.prototype.map.call(new Uint8Array(buf), function (b) { return b.toString(16).padStart(2, "0"); }).join("");
    });
  }
  // Rubrique protégée : un bouton « cadenas » dans le titre ; un clic fait apparaître
  // le champ du mot de passe juste à côté. Une fois déverrouillée, le cadenas disparaît.
  function setupGate() {
    var LOCKSVG = '<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';
    var ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    document.querySelectorAll(".protected[data-hash]").forEach(function (box) {
      var key = box.getAttribute("data-key");
      var sec = box.closest("section");
      var title = sec && sec.querySelector(".sec-title");
      var oldLock = title && title.querySelector(".lock");
      var ok = false;
      try { ok = sessionStorage.getItem(key) === "1"; } catch (e) {}
      if (ok) { box.hidden = false; if (oldLock) oldLock.remove(); return; }

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "lock-btn";
      btn.title = "Entrer le mot de passe";
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = LOCKSVG + '<span>Déverrouiller</span>';
      var form = document.createElement("form");
      form.className = "lock-form";
      form.hidden = true;
      form.innerHTML = '<input type="password" placeholder="Mot de passe" autocomplete="off" aria-label="Mot de passe">' +
        '<button type="submit" aria-label="Valider" title="Valider">' + ARROW + '</button>';
      var err = document.createElement("p");
      err.className = "gate-error";
      err.setAttribute("role", "alert");
      err.textContent = (!window.crypto || !crypto.subtle) ? "Ouvrez le site via https pour déverrouiller cette rubrique." : "Mot de passe incorrect";
      if (oldLock) oldLock.replaceWith(btn); else if (title) title.appendChild(btn);
      btn.after(form);
      box.parentNode.insertBefore(err, box);
      var input = form.querySelector("input");

      function open() { btn.hidden = true; form.hidden = false; btn.setAttribute("aria-expanded", "true"); input.focus(); }
      function close() { if (input.value) return; form.hidden = true; btn.hidden = false; err.style.display = "none"; btn.setAttribute("aria-expanded", "false"); }
      btn.addEventListener("click", open);
      input.addEventListener("keydown", function (e) { if (e.key === "Escape") { input.value = ""; close(); btn.focus(); } });
      document.addEventListener("click", function (e) { if (!form.hidden && !form.contains(e.target) && e.target !== btn && !btn.contains(e.target)) close(); });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        sha256Hex(input.value).then(function (h) {
          if (h === box.getAttribute("data-hash")) {
            try { sessionStorage.setItem(key, "1"); } catch (x) {}
            form.remove(); btn.remove(); err.remove(); box.hidden = false;
          } else {
            err.style.display = "block";
            input.value = ""; input.focus();
          }
        }).catch(function () { err.style.display = "block"; });
      });
    });
  }


  /* ---------- Documents pas encore en ligne ----------
     Chaque lien vers un PDF du site est vérifié : si le fichier n'existe pas encore,
     le bouton passe en pointillés (« à venir ») et n'est plus cliquable.
     Dès que le PDF est déposé, le lien redevient actif tout seul. */
  function markMissingDocs() {
    if (location.protocol === "file:" || !window.fetch) return Promise.resolve();
    var links = Array.prototype.filter.call(document.querySelectorAll("a.doc[href]"), function (a) {
      try { var u = new URL(a.getAttribute("href"), location.href); return u.origin === location.origin && /\.pdf$/i.test(u.pathname); }
      catch (e) { return false; }
    });
    function mark(a) {
      a.classList.add("disabled");
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("tabindex", "-1");
      a.setAttribute("title", "Bientôt disponible");
    }
    // Vérifie un PDF ; en cas d'échec réseau on réessaie, et sans réponse fiable on le considère absent
    function check(a, essai) {
      var url = new URL(a.getAttribute("href"), location.href).href;
      return fetch(url, { method: "HEAD", cache: "no-cache" }).then(function (r) {
        if (!r.ok) mark(a);
      }).catch(function () {
        if (essai < 2) return new Promise(function (ok) { setTimeout(ok, 400 * (essai + 1)); }).then(function () { return check(a, essai + 1); });
        mark(a);
      });
    }
    // Pas plus de 6 vérifications à la fois (au-delà, certaines requêtes échouaient)
    var i = 0;
    function worker() {
      if (i >= links.length) return Promise.resolve();
      var a = links[i++];
      return check(a, 0).then(worker);
    }
    var pool = [];
    for (var k = 0; k < 6; k++) pool.push(worker());
    return Promise.all(pool);
  }

  /* ---------- Cours de PTSI : chapitres pas encore en ligne repliés ---------- */
  function setupFold() {
    var list = document.querySelector("#mathematiques .items");
    if (!list) return;
    var soon = Array.prototype.filter.call(list.children, function (li) {
      var c = li.querySelector(".doc-main");
      return c && c.classList.contains("disabled");
    });
    if (!soon.length) return;
    soon.forEach(function (li) { li.classList.add("soon"); });
    var n = soon.length;
    var t = document.createElement("li");
    t.className = "soon-toggle";
    t.innerHTML = '<button type="button" aria-expanded="false"></button>';
    var btn = t.firstChild;
    function label(open) { btn.textContent = open ? "Masquer les chapitres à venir ▴" : "Voir les " + n + " chapitres à venir ▾"; }
    label(false);
    soon[0].parentNode.insertBefore(t, soon[0]);
    btn.addEventListener("click", function () {
      var open = list.classList.toggle("show-soon");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      label(open);
    });
  }

  /* ---------- Khôlles : « Je prépare ma khôlle », le dernier programme, puis un bouton
     qui déplie les programmes précédents du plus récent au plus ancien ---------- */
  function setupKholles() {
    var list = document.querySelector("#kholles .items");
    if (!list) return;
    var rows = Array.prototype.filter.call(list.children, function (li) { return li.querySelector(".ty") && !li.classList.contains("prep"); });
    var online = rows.filter(function (li) { var d = li.querySelector(".ds .doc"); return d && !d.classList.contains("disabled"); });
    var last = online[online.length - 1];
    if (!last) return;
    var before = rows.slice(0, rows.indexOf(last)).reverse();
    var after = rows.slice(rows.indexOf(last) + 1);
    // ordre : (Je prépare ma khôlle) · dernier programme · bouton · précédents (n-1, n-2, …, 1)
    var anchor = rows[0];
    list.insertBefore(last, anchor);
    function fold(group, cls, more, less) {
      if (!group.length) return;
      var t = document.createElement("li");
      t.className = "soon-toggle";
      t.innerHTML = '<button type="button" aria-expanded="false"></button>';
      var btn = t.firstChild, n = group.length;
      function label(open) { btn.textContent = open ? less : more.replace("%n", n); }
      label(false);
      list.appendChild(t);
      group.forEach(function (li) { li.classList.add(cls); list.appendChild(li); });
      btn.addEventListener("click", function () {
        var open = list.classList.toggle("show-" + cls);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        label(open);
      });
    }
    fold(before, "old", before.length === 1 ? "Voir le programme précédent ▾" : "Voir les %n programmes précédents ▾", "Masquer les programmes précédents ▴");
    fold(after, "soon", "Voir les %n programmes à venir ▾", "Masquer les programmes à venir ▴");
  }

  /* ---------- Date de mise à jour = date du dernier commit sur GitHub (automatique) ---------- */
  function setupUpdated() {
    var span = document.querySelector(".site-footer-inner > span");
    if (!span || !window.fetch) return;
    function show(iso) {
      var d = new Date(iso);
      if (isNaN(d)) return;
      var long = d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
      var court = d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "2-digit" });
      span.insertAdjacentHTML("beforeend", '<span class="maj"> · <span class="foot-long">mis à jour le ' + long + '</span><span class="foot-short">màj ' + court + '</span></span>');
    }
    var KEY = "ysa-derniere-maj";
    try { var c = sessionStorage.getItem(KEY); if (c) { show(c); return; } } catch (e) {}
    fetch("https://api.github.com/repos/10ysamut/10ysamut.github.io/commits?per_page=1", { headers: { Accept: "application/vnd.github+json" } })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (j) {
        var iso = j && j[0] && j[0].commit && j[0].commit.committer && j[0].commit.committer.date;
        if (!iso) return;
        try { sessionStorage.setItem(KEY, iso); } catch (e) {}
        show(iso);
      })
      .catch(function () {});
  }

  /* ---------- Sous-titres des listes : nombre de documents à droite ---------- */
  function setupSepCounts() {
    var MOTS = { "Ch.": ["chapitre", "chapitres"], DST: ["devoir", "devoirs"], IE: ["interrogation", "interrogations"], TP: ["TP", "TP"] };
    document.querySelectorAll(".items li.sep").forEach(function (sep) {
      var n = 0, type = "", li = sep.nextElementSibling;
      while (li && !li.classList.contains("sep")) {
        var ty = li.querySelector(".ty");
        if (ty) { n++; if (!type) type = (ty.firstChild && ty.firstChild.textContent || "").trim(); }
        li = li.nextElementSibling;
      }
      var mots = MOTS[type];
      if (!n || !mots) return;
      var em = document.createElement("em");
      em.className = "sep-n";
      em.textContent = n + " " + (n > 1 ? mots[1] : mots[0]);
      sep.appendChild(em);
    });
  }

  /* ---------- Bouton « retour en haut » ---------- */
  function setupToTop() {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "to-top";
    b.setAttribute("aria-label", "Retour en haut de la page");
    b.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.addEventListener("click", function () { window.scrollTo(0, 0); });
    document.body.appendChild(b);
    // caché tant qu'on est en haut, et quand le pied de page est visible (pour ne rien masquer)
    function check() {
      var f = document.querySelector(".site-footer");
      var footVisible = f && f.getBoundingClientRect().top < window.innerHeight;
      b.classList.toggle("on", window.scrollY > 900 && !footVisible);
    }
    window.addEventListener("scroll", check, { passive: true });
    check();
  }

  /* ---------- Mesure d'audience (Google Analytics) ---------- */
  function setupAnalytics() {
    if (location.protocol === "file:" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
    var s = document.createElement("script");
    s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID);
  }

  buildHeader();
  buildFooter();
  setupMenu();
  setupPdf();
  setupGate();
  setupToTop();
  setupSepCounts();
  setupUpdated();
  markMissingDocs().then(function () {
    setupFold(); setupKholles();
    // les listes viennent de se replier : on se recale sur la rubrique visée (#kholles, #devoirs…)
    var cible = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (cible) cible.scrollIntoView();
  });
  setupAnalytics();
})();
