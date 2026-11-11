/* =========================================================
   ysamut.fr — script commun
   - en-tête et pied de page (une seule source pour tout le site)
   - thème clair / sombre
   - recherche dans les listes, onglets
   - visionneuse PDF (pdf.js), pages protégées
   Fonctionne aussi en ouvrant les fichiers directement (file://).
   ========================================================= */
(function () {
  "use strict";

  var script = document.currentScript;
  var ROOT = (script && script.getAttribute("data-root")) || "";

  /* ---------- Menu : à modifier ici pour tout le site ---------- */
  var NAV = [
    { id: "accueil", label: "Accueil", href: "index.html" },
    { id: "cpge", label: "Prépa PTSI", items: [
      { label: "Mathématiques", href: "cpge/mathematiques.html" },
      { label: "Informatique pour tous", href: "cpge/informatique.html" },
      { label: "Programmes de khôlles", href: "cpge/kholles.html" },
      { label: "Devoirs", href: "cpge/devoirs.html" }
    ]},
    { id: "episen", label: "EPISEN", items: [
      { label: "Outils mathématiques", href: "episen/outils-mathematiques.html" },
      { label: "Analyse numérique", href: "episen/analyse-numerique.html" }
    ]},
    { id: "divers", label: "Divers", items: [
      { label: "Formulaires", href: "divers/formulaires-mathematiques.html" },
      { label: "Papiers de mathématiques", href: "divers/papiers-mathematiques.html" },
      { label: "Soit ou soient ?", href: "divers/soit-ou-soient.html" }
    ]}
  ];
  var GA_ID = "G-450HGK36PQ";

  /* ---------- Documents protégés par mot de passe ----------
     Un lien <a href="…pdf" data-lock="recueil"> demande le mot de passe
     puis ouvre directement le PDF (empreinte SHA-256 du mot de passe). */
  var LOCKS = {
    recueil: { key: "pwGateOK_recueil_exercices", hash: "9d347712c8ecb172fcae9b90eb212f6849b6bfef525276355cebdcf6656ebd5f" }
  };

  /* ---------- Icônes ---------- */
  var ICON = {
    chevron: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    ext: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M9 2h5v5M14 2L7 9M12 9.5V14H2V4h4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    theme: '<svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M8 1.8a6.2 6.2 0 0 1 0 12.4z" fill="currentColor"/></svg>',
    lock: '<svg class="lock" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="7" width="9" height="7" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.4"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>',
    doc: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 2h7l3 3v9H3z M10 2v3h3" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>',
    close: '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>'
  };

  var page = document.body.getAttribute("data-page") || "";
  var section = document.body.getAttribute("data-section") || "";

  /* ---------- Thème ---------- */
  function setTheme(dark) {
    if (dark) document.documentElement.setAttribute("data-theme", "dark");
    else document.documentElement.removeAttribute("data-theme");
    try { localStorage.setItem("theme", dark ? "dark" : "light"); } catch (e) {}
  }

  /* ---------- En-tête ---------- */
  function buildHeader() {
    var html = '<div class="topbar-inner">' +
      '<a class="brand" href="' + ROOT + 'index.html"><span class="brand-name">Youri Samut</span><span class="brand-sub">Mathématiques en CPGE</span></a>' +
      '<div class="top-actions">' +
        '<nav class="nav" id="nav-principal" aria-label="Menu principal">';
    NAV.forEach(function (g) {
      if (!g.items) {
        html += '<a href="' + ROOT + g.href + '"' + (section === g.id ? ' class="active" aria-current="page"' : '') + '>' + g.label + '</a>';
        return;
      }
      html += '<div class="nav-group' + (section === g.id ? ' active' : '') + '">' +
        '<button type="button" aria-expanded="false">' + g.label + ICON.chevron + '</button>' +
        '<div class="nav-menu">';
      g.items.forEach(function (it) {
        var cur = it.href === page;
        html += '<a href="' + ROOT + it.href + '"' + (cur ? ' class="active" aria-current="page"' : '') +
          (it.lock ? ' data-lock="' + it.lock + '" title="Protégé par mot de passe"' : '') + '>' + it.label + (it.lock ? ICON.lock : '') + '</a>';
      });
      html += '</div></div>';
    });
    html += '</nav>' +
        '<button type="button" class="icon-btn theme-toggle" aria-label="Basculer le thème clair / sombre" title="Thème clair / sombre">' + ICON.theme + '</button>' +
        '<button type="button" class="icon-btn nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="nav-principal">' + ICON.menu + '</button>' +
      '</div></div>';

    var header = document.createElement("header");
    header.className = "topbar";
    header.innerHTML = html;
    document.body.insertBefore(header, document.body.firstChild);

    // Sous-menus
    var groups = header.querySelectorAll(".nav-group");
    function closeAll(except) {
      groups.forEach(function (g) {
        if (g !== except) { g.classList.remove("open"); g.querySelector("button").setAttribute("aria-expanded", "false"); }
      });
    }
    groups.forEach(function (g) {
      var btn = g.querySelector("button");
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = !g.classList.contains("open");
        closeAll(g);
        g.classList.toggle("open", open);
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    document.addEventListener("click", function (e) { if (!header.contains(e.target)) { closeAll(); closeMobile(); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeAll(); closeMobile(); } });

    // Menu mobile
    var toggle = header.querySelector(".nav-toggle");
    function closeMobile() { header.classList.remove("nav-open"); toggle.setAttribute("aria-expanded", "false"); }
    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !header.classList.contains("nav-open");
      header.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { // ouvre directement la rubrique courante
        var cur = header.querySelector(".nav-group.active");
        if (cur) { cur.classList.add("open"); cur.querySelector("button").setAttribute("aria-expanded", "true"); }
      }
    });

    header.querySelector(".theme-toggle").addEventListener("click", function () {
      setTheme(document.documentElement.getAttribute("data-theme") !== "dark");
    });
  }

  /* ---------- Pied de page ---------- */
  function buildFooter() {
    var f = document.createElement("footer");
    f.className = "site-footer";
    f.innerHTML = '<div class="site-footer-inner">' +
      '<span>© Youri Samut ' + new Date().getFullYear() + '</span>' +
      '<nav aria-label="Liens du pied de page"><a href="' + ROOT + 'divers/liens-utiles.html">Liens utiles</a>' +
      '<a href="mailto:samut.youri@hotmail.fr">Contact</a></nav></div>';
    document.body.appendChild(f);
  }

  /* ---------- Onglets ---------- */
  function setupTabs() {
    document.querySelectorAll(".tabs").forEach(function (bar) {
      var btns = bar.querySelectorAll("button[aria-controls]");
      function select(btn) {
        btns.forEach(function (b) {
          var on = b === btn;
          b.setAttribute("aria-selected", on ? "true" : "false");
          b.tabIndex = on ? 0 : -1;
          var p = document.getElementById(b.getAttribute("aria-controls"));
          if (p) p.hidden = !on;
        });
      }
      btns.forEach(function (b) { b.addEventListener("click", function () { select(b); }); });
      var initial = location.hash && bar.querySelector('button[aria-controls="' + location.hash.slice(1) + '"]');
      select(initial || btns[0]);
    });
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
  function setupGate() {
    var box = document.querySelector(".protected[data-hash]");
    if (!box) return;
    var key = box.getAttribute("data-key");
    var ok = false;
    try { ok = sessionStorage.getItem(key) === "1"; } catch (e) {}
    if (ok) { box.hidden = false; return; }
    var gate = document.createElement("div");
    gate.className = "gate";
    gate.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' +
      '<h3>Page protégée par mot de passe</h3>' +
      '<form><input type="password" placeholder="Mot de passe" autocomplete="off" aria-label="Mot de passe"><button type="submit">Valider</button></form>' +
      '<p class="gate-error" role="alert">Mot de passe incorrect</p>';
    box.parentNode.insertBefore(gate, box);
    var input = gate.querySelector("input");
    if (!window.crypto || !crypto.subtle) {
      gate.querySelector(".gate-error").textContent = "Ouvrez le site via https pour déverrouiller cette page.";
    }
    gate.querySelector("form").addEventListener("submit", function (e) {
      e.preventDefault();
      sha256Hex(input.value).then(function (h) {
        if (h === box.getAttribute("data-hash")) {
          try { sessionStorage.setItem(key, "1"); } catch (err) {}
          gate.remove(); box.hidden = false;
        } else {
          gate.querySelector(".gate-error").style.display = "block";
          input.value = ""; input.focus();
        }
      }).catch(function () { gate.querySelector(".gate-error").style.display = "block"; });
    });
    input.focus();
  }

  /* ---------- Filtres par thème (liste avec data-theme sur chaque ligne) ---------- */
  function setupFilters() {
    document.querySelectorAll(".filters[data-for]").forEach(function (bar) {
      var list = document.getElementById(bar.getAttribute("data-for"));
      if (!list) return;
      var rows = list.querySelectorAll(".row[data-theme]");
      var themes = ["Tout"];
      rows.forEach(function (r) { var t = r.getAttribute("data-theme"); if (themes.indexOf(t) < 0) themes.push(t); });
      bar.setAttribute("role", "group");
      bar.innerHTML = themes.map(function (t) { return '<button type="button" aria-pressed="false">' + t + '</button>'; }).join("");
      var btns = bar.querySelectorAll("button");
      function select(btn) {
        var t = btn.textContent;
        btns.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
        rows.forEach(function (r) { r.hidden = t !== "Tout" && r.getAttribute("data-theme") !== t; });
      }
      btns.forEach(function (b) { b.addEventListener("click", function () { select(b); }); });
      select(btns[0]);
    });
  }

  /* ---------- Chiffres clés calculés depuis la liste ---------- */
  function setupCounts() {
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var list = document.getElementById(el.getAttribute("data-list"));
      if (!list) return;
      var sel = el.getAttribute("data-count") === "td" ? ".doc-pair" : ".row";
      el.textContent = list.querySelectorAll(sel).length;
    });
  }

  /* ---------- Documents protégés : mot de passe puis ouverture directe ---------- */
  function setupLocks() {
    var dlg = null, pending = null;
    function unlocked(lock) { try { return sessionStorage.getItem(lock.key) === "1"; } catch (e) { return false; } }
    function hide() { if (dlg) dlg.classList.remove("open"); pending = null; }
    function ask(lock, url) {
      if (!dlg) {
        dlg = document.createElement("div");
        dlg.id = "pwDialog";
        dlg.innerHTML = '<div class="gate" role="dialog" aria-modal="true" aria-labelledby="pwTitle">' +
          '<button type="button" class="pw-close" aria-label="Fermer">' + ICON.close + '</button>' +
          '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M8 11V8a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>' +
          '<h3 id="pwTitle">Document protégé par mot de passe</h3>' +
          '<form><input type="password" placeholder="Mot de passe" autocomplete="off" aria-label="Mot de passe"><button type="submit">Ouvrir</button></form>' +
          '<p class="gate-error" role="alert">Mot de passe incorrect</p></div>';
        document.body.appendChild(dlg);
        dlg.addEventListener("click", function (e) { if (e.target === dlg) hide(); });
        dlg.querySelector(".pw-close").addEventListener("click", hide);
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") hide(); });
        dlg.querySelector("form").addEventListener("submit", function (e) {
          e.preventDefault();
          var input = dlg.querySelector("input"), err = dlg.querySelector(".gate-error");
          if (!pending) return;
          var p = pending;
          if (!window.crypto || !crypto.subtle) { err.textContent = "Ouvrez le site via https pour déverrouiller ce document."; err.style.display = "block"; return; }
          sha256Hex(input.value).then(function (h) {
            if (h === p.lock.hash) {
              try { sessionStorage.setItem(p.lock.key, "1"); } catch (x) {}
              hide(); openPdf(p.url);
            } else {
              err.textContent = "Mot de passe incorrect"; err.style.display = "block";
              input.value = ""; input.focus();
            }
          });
        });
      }
      pending = { lock: lock, url: url };
      dlg.querySelector(".gate-error").style.display = "none";
      dlg.querySelector("input").value = "";
      dlg.classList.add("open");
      dlg.querySelector("input").focus();
    }
    // capture : passe avant la liseuse PDF
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[data-lock]");
      if (!a) return;
      var lock = LOCKS[a.getAttribute("data-lock")];
      if (!lock) return;
      e.preventDefault(); e.stopPropagation();
      document.querySelectorAll(".nav-group.open").forEach(function (g) { g.classList.remove("open"); g.querySelector("button").setAttribute("aria-expanded", "false"); });
      if (a.closest(".topbar")) a.closest(".topbar").classList.remove("nav-open");
      var url = new URL(a.getAttribute("href"), location.href).href;
      if (unlocked(lock)) openPdf(url); else ask(lock, url);
    }, true);
  }

  /* ---------- Documents pas encore en ligne ----------
     Chaque lien vers un PDF du site est vérifié : si le fichier n'existe pas encore,
     le bouton passe en pointillés (« à venir ») et n'est plus cliquable.
     Dès que le PDF est déposé, le lien redevient actif tout seul. */
  function markMissingDocs() {
    if (location.protocol === "file:" || !window.fetch) return;
    document.querySelectorAll("a.doc[href]").forEach(function (a) {
      var url;
      try { url = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
      if (url.origin !== location.origin || !/\.pdf$/i.test(url.pathname)) return;
      fetch(url.href, { method: "HEAD", cache: "no-cache" }).then(function (r) {
        if (r.status !== 404) return;
        a.classList.add("disabled");
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("tabindex", "-1");
        a.setAttribute("title", "Bientôt disponible");
      }).catch(function () {});
    });
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
  setupTabs();
  setupFilters();
  setupCounts();
  setupPdf();
  setupLocks();
  setupGate();
  markMissingDocs();
  setupAnalytics();
})();
