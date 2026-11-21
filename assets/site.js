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
      '<nav aria-label="Liens du pied de page"><a class="foot-icon" href="' + ROOT + 'index.html#liens-utiles" title="Liens utiles" aria-label="Liens utiles"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M6.8 9.2a3 3 0 0 0 4.3 0l2.3-2.3a3 3 0 0 0-4.3-4.3l-1 1M9.2 6.8a3 3 0 0 0-4.3 0L2.6 9.1a3 3 0 0 0 4.3 4.3l1-1" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>' +
      '<a class="foot-icon" href="mailto:samut.youri@hotmail.fr" title="M\'écrire" aria-label="E-mail"><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M1.5 3.5h13v9h-13z M1.5 3.5L8 9l6.5-5.5" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg></a>' +
      '<a class="foot-icon" href="https://www.linkedin.com/in/youri-samut-8949b3149/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M1 1.8C1 1.4 1.4 1 1.8 1h12.4c.4 0 .8.4.8.8v12.4c0 .4-.4.8-.8.8H1.8c-.4 0-.8-.4-.8-.8zm3.3 11V6.3H2.2v6.5zM3.2 5.4c.7 0 1.2-.5 1.2-1.1 0-.7-.5-1.2-1.2-1.2S2 3.6 2 4.3c0 .6.5 1.1 1.2 1.1zm4.1 7.4V9.2c0-.2 0-.4.1-.5.2-.4.5-.8 1.1-.8.8 0 1.1.6 1.1 1.5v3.4h2.1V9.1c0-2-1-2.9-2.4-2.9-1.1 0-1.6.6-1.9 1.1V6.3H5.3c0 .6 0 6.5 0 6.5z"/></svg></a>' +
      '<a class="foot-icon" href="https://github.com/10ysamut" target="_blank" rel="noopener" title="GitHub" aria-label="GitHub"><svg viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 .2a8 8 0 0 0-2.5 15.6c.4 0 .5-.2.5-.4v-1.5c-2.2.5-2.7-1-2.7-1-.4-.9-.9-1.2-.9-1.2-.7-.5.1-.5.1-.5.8.1 1.2.8 1.2.8.7 1.3 1.9.9 2.4.7 0-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.1-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8a7.5 7.5 0 0 1 4 0c1.5-1 2.2-.8 2.2-.8.4 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.1 0 3.1-1.9 3.8-3.7 4 .3.3.6.8.6 1.5v2.2c0 .2.1.5.6.4A8 8 0 0 0 8 .2z"/></svg></a></nav></div>';
    document.body.appendChild(f);
  }

  /* ---------- Onglets ----------
     L'adresse garde l'onglet ouvert (#ptsi, #episen…). Une ancre vers une rubrique
     (#devoirs, #formulaires…) ouvre le bon onglet puis descend jusqu'à elle. */
  function setupTabs() {
    document.querySelectorAll(".tabs, .menu").forEach(function (bar) {
      var btns = bar.querySelectorAll("button[aria-controls]");
      // Sous-titre sous le nom, propre à chaque onglet (attribut data-sous-titre du panneau)
      function setSubtitle(p) {
        var st = document.getElementById("sous-titre");
        if (st && p.hasAttribute("data-sous-titre")) st.textContent = p.getAttribute("data-sous-titre");
      }
      // Panneaux sans onglet (ex. Liens utiles), ouverts seulement depuis le pied de page
      var extras = document.querySelectorAll(".tab-panel[data-hors-menu]");
      function showExtra(p) {
        btns.forEach(function (b) {
          b.setAttribute("aria-selected", "false");
          var q = document.getElementById(b.getAttribute("aria-controls"));
          if (q) q.hidden = true;
        });
        extras.forEach(function (x) { x.hidden = x !== p; });
        setSubtitle(p);
        var top = menuTop();
        if (window.scrollY > top) window.scrollTo(0, top);
      }
      function select(btn, keepHash) {
        extras.forEach(function (x) { x.hidden = true; });
        btns.forEach(function (b) {
          var on = b === btn;
          b.setAttribute("aria-selected", on ? "true" : "false");
          b.tabIndex = on ? 0 : -1;
          var p = document.getElementById(b.getAttribute("aria-controls"));
          if (p) p.hidden = !on;
          if (on && p) setSubtitle(p);
        });
        if (!keepHash && history.replaceState) history.replaceState(null, "", "#" + btn.getAttribute("aria-controls"));
      }
      function fromHash() {
        var id = decodeURIComponent(location.hash.slice(1));
        if (!id) return false;
        var extra = document.getElementById(id);
        if (extra && extra.hasAttribute("data-hors-menu")) { showExtra(extra); return true; }
        var direct = bar.querySelector('button[aria-controls="' + id + '"]');
        if (direct) { select(direct, true); return true; }
        var target = document.getElementById(id);
        var panel = target && target.closest(".tab-panel");
        var b = panel && bar.querySelector('button[aria-controls="' + panel.id + '"]');
        if (!b) return false;
        select(b, true);
        setTimeout(function () { target.scrollIntoView(); }, 0);
        return true;
      }
      // Menu de l'accueil : un onglet dont le panneau porte data-sous-menu ouvre la liste de ses rubriques
      var isMenu = bar.classList.contains("menu");
      // Hauteur où le menu se colle en haut (mesurée sur l'élément qui le précède, le menu étant « sticky »)
      function menuTop() {
        var prev = (bar.closest(".menu-bar") || bar).previousElementSibling;
        return prev ? prev.getBoundingClientRect().bottom + window.scrollY : 0;
      }
      function closeDrops(except) {
        bar.querySelectorAll(".menu-item.open").forEach(function (m) {
          if (m === except) return;
          m.classList.remove("open"); m.querySelector("button").setAttribute("aria-expanded", "false");
        });
      }
      function goTo(id) {
        if (history.replaceState) history.replaceState(null, "", "#" + id);
        fromHash();
      }
      btns.forEach(function (b) {
        var panel = document.getElementById(b.getAttribute("aria-controls"));
        var secs = isMenu && panel && panel.hasAttribute("data-sous-menu") ? panel.querySelectorAll("section[id]") : [];
        if (secs.length) {
          var wrap = document.createElement("div");
          wrap.className = "menu-item";
          b.parentNode.insertBefore(wrap, b);
          wrap.appendChild(b);
          b.setAttribute("aria-haspopup", "true");
          b.setAttribute("aria-expanded", "false");
          b.insertAdjacentHTML("beforeend", ICON.chevron);
          var drop = document.createElement("div");
          drop.className = "menu-drop";
          drop.innerHTML = Array.prototype.map.call(secs, function (s) {
            var h = s.querySelector("h2");
            return '<a href="#' + s.id + '">' + (h ? h.textContent.trim() : s.id) + (s.querySelector(".protected") ? ICON.lock : "") + '</a>';
          }).join("");
          wrap.appendChild(drop);
          drop.addEventListener("click", function (e) {
            var a = e.target.closest("a"); if (!a) return;
            e.preventDefault();
            closeDrops();
            goTo(a.getAttribute("href").slice(1));
          });
        }
        b.addEventListener("click", function (e) {
          e.stopPropagation();
          select(b);
          var top = menuTop();
          if (isMenu && window.scrollY > top) window.scrollTo(0, top);
          var m = b.closest(".menu-item");
          if (m) {
            var open = !m.classList.contains("open");
            closeDrops(m);
            m.classList.toggle("open", open);
            b.setAttribute("aria-expanded", open ? "true" : "false");
          }
        });
      });
      if (isMenu) {
        document.addEventListener("click", function (e) { if (!bar.contains(e.target)) closeDrops(); });
        document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrops(); });
      }
      bar.addEventListener("keydown", function (e) {
        if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
        var list = Array.prototype.slice.call(btns), i = list.indexOf(document.activeElement);
        if (i < 0) return;
        var n = list[(i + (e.key === "ArrowRight" ? 1 : list.length - 1)) % list.length];
        n.focus(); select(n);
      });
      if (!fromHash()) select(btns[0], true);
      window.addEventListener("hashchange", fromHash);
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
    document.querySelectorAll(".protected[data-hash]").forEach(function (box) {
      var key = box.getAttribute("data-key");
      var ok = false;
      try { ok = sessionStorage.getItem(key) === "1"; } catch (e) {}
      if (ok) { box.hidden = false; return; }
      var gate = document.createElement("div");
      gate.className = "gate";
      gate.innerHTML = '<h3>Réservé à la classe</h3>' +
        '<form><input type="password" placeholder="Mot de passe" autocomplete="off" aria-label="Mot de passe"><button type="submit">Valider</button></form>' +
        '<p class="gate-error" role="alert">Mot de passe incorrect</p>';
      box.parentNode.insertBefore(gate, box);
      var input = gate.querySelector("input");
      if (!window.crypto || !crypto.subtle) {
        gate.querySelector(".gate-error").textContent = "Ouvrez le site via https pour déverrouiller cette rubrique.";
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
    });
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
    if (location.protocol === "file:" || !window.fetch) return Promise.resolve();
    var checks = [];
    document.querySelectorAll("a.doc[href]").forEach(function (a) {
      var url;
      try { url = new URL(a.getAttribute("href"), location.href); } catch (e) { return; }
      if (url.origin !== location.origin || !/\.pdf$/i.test(url.pathname)) return;
      checks.push(fetch(url.href, { method: "HEAD", cache: "no-cache" }).then(function (r) {
        if (r.status !== 404) return;
        a.classList.add("disabled");
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("tabindex", "-1");
        a.setAttribute("title", "Bientôt disponible");
      }).catch(function () {}));
    });
    return Promise.all(checks);
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
    var rows = Array.prototype.filter.call(list.children, function (li) { return li.querySelector(".ty"); });
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

  /* ---------- Bouton « retour en haut » ---------- */
  function setupToTop() {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "to-top";
    b.setAttribute("aria-label", "Retour en haut de la page");
    b.innerHTML = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M3.5 7.5L8 3l4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    b.addEventListener("click", function () { window.scrollTo(0, 0); });
    document.body.appendChild(b);
    function check() { b.classList.toggle("on", window.scrollY > 900); }
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
  setupTabs();
  setupFilters();
  setupCounts();
  setupPdf();
  setupLocks();
  setupGate();
  setupToTop();
  markMissingDocs().then(function () { setupFold(); setupKholles(); });
  setupAnalytics();
})();
