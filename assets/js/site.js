/* Golden Hour Golf website. Plain JavaScript, no build step. */

/* ------------------------------------------------------------------
   SITE SETTINGS: the only lines you normally change.
   store: "soon"  -> "Coming soon to the App Store" (not a link)
          "beta"  -> "Join the beta on TestFlight" (needs betaUrl)
          "live"  -> "Download on the App Store" (links to appStoreUrl)
   ------------------------------------------------------------------ */
var SITE = {
  store: "soon",
  appStoreUrl: "https://apps.apple.com/app/id6820908266",
  betaUrl: "" // public TestFlight link, e.g. "https://testflight.apple.com/join/XXXXXXXX"
};

(function () {
  "use strict";

  var doc = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- Dutch texts for the home page (English lives in the HTML) ---------- */
  var NL = {
    "skip": "Naar de inhoud",
    "nav.features": "Functies",
    "nav.shots": "Screenshots",
    "nav.support": "Support",
    "hero.eyebrow": "Autumn Ridge · 18 holes · iPhone",
    "hero.t1": "Golf in het",
    "hero.t2": "gouden uur",
    "hero.lead": "Tourgolf in herfstlicht. 18 holes in laag gouden licht, een lange carrière van clubgolfer tot tourprof en live leaderboards tegen een compleet, verzonnen veld.",
    "hero.more": "Bekijk wat erin zit",
    "hero.note": "Gratis download · Voor iPhone · Geen advertenties, geen tracking, geen account",
    "video.pause": "Achtergrondvideo pauzeren",
    "video.play": "Achtergrondvideo afspelen",
    "video.playclip": "Hoogtepunt afspelen",
    "video.pauseclip": "Hoogtepunt pauzeren",
    "f1.n": "18 holes",
    "f1.t": "Par 71 op Autumn Ridge",
    "f2.n": "4 niveaus",
    "f2.t": "Van Local Circuit tot de Golden Hour Tour",
    "f3.n": "Wekelijks",
    "f3.t": "Game Center-uitdaging, voor iedereen gelijk",
    "f4.n": "Reclamevrij",
    "f4.t": "Geen tracking, geen account, speelt offline",
    "feat.eyebrow": "Wat erin zit",
    "feat.t1": "Echt golf.",
    "feat.t2": "Lage zon.",
    "feat.lead": "Een golfgame die vanaf de grond is opgebouwd voor iPhone, met eerlijke balfysica, een baan die je wilt leren kennen en de presentatie van een zondagse tv-uitzending.",
    "c.eyebrow": "Autumn Ridge",
    "c.t1": "18 holes",
    "c.t2": "herfst",
    "c.lead": "Een verzonnen parkbaan, speciaal voor deze game gebouwd: par 71, met een flyover vóór elke nieuwe hole.",
    "c.l1": "Verhoogde tees, doglegs, een par 3 over een dal en vijvers in het spel",
    "c.l2": "Greens met plateaus, ruggen en valse voorkanten die goed lezen belonen",
    "c.l3": "Lage ochtend- of late middagzon, lange schaduwen en herfstbos op elke hole",
    "s.eyebrow": "Slaan met één swipe",
    "s.t1": "Ken elke",
    "s.t2": "swing",
    "s.lead": "Trek omlaag voor kracht en swipe omhoog door de lijn om te slaan. Je tempo en de stand van je clubface bepalen de slag.",
    "s.l1": "Balfysica met spin, wind, ligging en helling bepaalt de vlucht, de stuit en de rol",
    "s.l2": "Een shot tracer volgt elke bal",
    "s.l3": "Na elke slag: balsnelheid, launch, spin, carry, apex en wat je swipe deed",
    "sg.eyebrow": "Kort spel en putten",
    "sg.t1": "Laat hem landen.",
    "sg.t2": "Lees elke break.",
    "sg.lead": "Gevoel rond de green zoals op een console, gemaakt voor je duim.",
    "sg.l1": "Kies bump and run, chip, pitch, flop of splash en zie vóór je slaat de landingscirkel en de uitrol",
    "sg.l2": "Lees greens met een hellingskaart in kleur en een raster, van gehurkt lezen tot recht van boven",
    "sg.l3": "Een echte cup: ballen vallen, draaien uit en gaan rond de rand",
    "t.eyebrow": "Toernooien",
    "t.t1": "Win het op",
    "t.t2": "de 18e",
    "t.lead": "Speel toernooien van één tot vier ronden tegen een veld van verzonnen spelers. Het live leaderboard beweegt terwijl het veld om je heen speelt, met een cut, een play-off en prijzengeld. Tribunes, tv-torens en touwen vullen zich voor de slotronde.",
    "cr.eyebrow": "Carrière",
    "cr.t1": "Van clubgolfer",
    "cr.t2": "tot tourprof",
    "cr.lead": "Maak je golfer en begin op het Local Circuit. Elke stap omhoog verdien je zelf.",
    "cr.l1": "Klim door vier niveaus: Local Circuit, Regional Series, National Tour en de Golden Hour Tour",
    "cr.l2": "Verdien prijzengeld en train zeven vaardigheden, van kracht tot green lezen",
    "cr.l3": "Gemaakt voor de lange adem, met seizoenen, promotie en een wereldranglijst",
    "tv.eyebrow": "Presentatie zoals op tv",
    "tv.t1": "Elke hole-out",
    "tv.t2": "in beeld",
    "tv.lead": "Tv-camerastandpunten, een commentaarteam en publiek dat reageert op je slagen.",
    "tv.l1": "Een filmische flyover introduceert elke nieuwe hole; elke hole-out krijgt een eigen shot",
    "tv.l2": "Vier verzonnen stemmen becommentariëren de actie: commentator, analist, baanverslaggever en marshal (in het Engels)",
    "tv.l3": "Tik om de bal door te spoelen, dubbeltik om meteen naar het resultaat te gaan",
    "gc.card": "Weekuitdaging",
    "gc.week": "Week 42",
    "gc.format": "Formaat",
    "gc.front": "Eerste negen",
    "gc.wind": "Wind",
    "gc.light": "Licht",
    "gc.morning": "Ochtend",
    "gc.world": "Wereld",
    "gc.friends": "Vrienden",
    "gc.around": "Rond mij",
    "gc.you": "Jij",
    "gc.foot": "Illustratie. Scores en namen zijn voorbeelden.",
    "gc.eyebrow": "Game Center",
    "gc.t1": "Eén ronde.",
    "gc.t2": "De hele wereld.",
    "gc.lead": "Elke maandag een nieuwe weekuitdaging: dezelfde holes, wind en hetzelfde licht voor elke speler op aarde.",
    "gc.l1": "Eén officiële ronde per week telt vanaf de eerste tee; oefenen mag zo vaak als je wilt",
    "gc.l2": "Leaderboards voor de week, je beste eerste negen en je beste 18 holes, plus 21 achievements",
    "gc.l3": "Werkt offline: scores wachten op je iPhone en gaan naar Game Center zodra je weer online bent",
    "sh.eyebrow": "Deel je hoogtepunten",
    "sh.t1": "Hole-in-one?",
    "sh.t2": "Laat het zien.",
    "sh.lead": "Na een ace, een eagle, een chip-in of een lange putt tik je op Deel en maakt het spel een korte clip zoals op tv, gerenderd op je iPhone.",
    "sh.l1": "6 tot 10 seconden met tracer, greencamera, cupcamera en een lower third",
    "sh.l2": "Staand 9:16 voor Stories, Reels en Shorts, of liggend 16:9",
    "sh.l3": "Alleen gedeeld via het iOS-deelvenster, alleen als jij dat wilt",
    "g.eyebrow": "Screenshots",
    "g.t1": "Rechtstreeks uit",
    "g.t2": "het spel",
    "g.prev": "Vorige screenshot",
    "g.next": "Volgende screenshot",
    "sp.eyebrow": "Gemaakt voor iPhone",
    "sp.t1": "Eerlijk spel,",
    "sp.t2": "geen kleine lettertjes",
    "sp.a.h": "Geen reclame, geen tracking",
    "sp.a.p": "Geen advertenties, geen analytics, geen account. We verzamelen helemaal niets. Je voortgang blijft op je iPhone.",
    "sp.b.h": "Speelt offline",
    "sp.b.p": "Snel spelen, carrière en toernooien werken zonder verbinding. Game Center haalt in zodra je weer online bent.",
    "sp.c.h": "Zes talen",
    "sp.c.p": "English, Nederlands, Deutsch, Français, Español en 日本語. Het commentaar is in het Engels.",
    "sp.d.h": "Drie manieren om te spelen",
    "sp.d.p": "Carrière, toernooien van één tot vier ronden, of snel spelen: 18 holes, 9 holes of één hole.",
    "sp.e.h": "Afgestemd per iPhone",
    "sp.e.p": "iOS 17 of nieuwer. De kwaliteit wordt gekozen bij je chip; iPhone 13 of nieuwer aanbevolen.",
    "sp.f.h": "Voel elke slag",
    "sp.f.p": "Trillingen bovenaan de swing, bij het raken en in de cup, met geluid voor elk moment.",
    "end.eyebrow": "Golden Hour Golf",
    "end.t1": "Sla af in",
    "end.t2": "het gouden uur",
    "end.lead": "Een gratis download voor iPhone. Autumn Ridge wacht op je.",
    "ft.made": "Gemaakt in Nederland door AI Adviesbureau",
    "ft.fiction": "Alle spelers, toernooien en de baan in Golden Hour Golf zijn verzonnen.",
    "ft.help": "Hulp",
    "ft.support": "Support en veelgestelde vragen",
    "ft.privacy": "Privacyverklaring",
    "ft.game": "Spel",
    "ft.share": "Deel je hoogtepunten",
    "ft.tm": "Apple, iPhone, App Store, Game Center en TestFlight zijn handelsmerken van Apple Inc., geregistreerd in de VS en andere landen en regio's.",
    "close": "Sluiten"
  };

  var STORE_TEXT = {
    en: { soonSmall: "Coming soon to the", liveSmall: "Download on the", betaSmall: "Join the beta on", app: "App Store", tf: "TestFlight" },
    nl: { soonSmall: "Binnenkort in de", liveSmall: "Download in de", betaSmall: "Doe mee met de bèta via", app: "App Store", tf: "TestFlight" }
  };

  var ICONS = {
    sun: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 17h16M7 21h10M12 3v2M4.2 8.2l1.4 1.4M19.8 8.2l-1.4 1.4M7 17a5 5 0 0 1 10 0"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M12 3v12M6.5 10.5L12 16l5.5-5.5M5 21h14"/></svg>',
    beta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3M7.5 15h9"/></svg>'
  };

  function lang() { return doc.lang === "nl" ? "nl" : "en"; }

  function renderStore() {
    var t = STORE_TEXT[lang()];
    var html;
    if (SITE.store === "live") {
      html = '<a class="store-btn" href="' + SITE.appStoreUrl + '">' + ICONS.down +
        '<span><span class="small">' + t.liveSmall + '</span><span class="big">' + t.app + "</span></span></a>";
    } else if (SITE.store === "beta" && SITE.betaUrl) {
      html = '<a class="store-btn" href="' + SITE.betaUrl + '">' + ICONS.beta +
        '<span><span class="small">' + t.betaSmall + '</span><span class="big">' + t.tf + "</span></span></a>";
    } else {
      html = '<span class="store-btn is-soon">' + ICONS.sun +
        '<span><span class="small">' + t.soonSmall + '</span><span class="big">' + t.app + "</span></span></span>";
    }
    document.querySelectorAll("[data-store-cta]").forEach(function (el) { el.innerHTML = html; });
  }

  /* ---------- Language (home page only; other pages are separate files) ---------- */
  var i18nEls = document.querySelectorAll("[data-i18n]");
  var labelEls = document.querySelectorAll("[data-i18n-label]");
  var english = new Map();
  i18nEls.forEach(function (el) { english.set(el, el.textContent); });
  labelEls.forEach(function (el) { english.set(el, el.getAttribute("aria-label")); });
  var hrefEls = document.querySelectorAll("[data-href-nl]");
  hrefEls.forEach(function (el) { el.dataset.hrefEn = el.getAttribute("href"); });

  function labelFor(key, fallback) { return lang() === "nl" && NL[key] ? NL[key] : fallback; }

  function setLang(l, remember) {
    if (!i18nEls.length) return;
    doc.lang = l;
    i18nEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      el.textContent = l === "nl" && NL[key] ? NL[key] : english.get(el);
    });
    labelEls.forEach(function (el) {
      var key = el.getAttribute("data-i18n-label");
      el.setAttribute("aria-label", l === "nl" && NL[key] ? NL[key] : english.get(el));
    });
    hrefEls.forEach(function (el) { el.setAttribute("href", l === "nl" ? el.dataset.hrefNl : el.dataset.hrefEn); });
    document.querySelectorAll("img[data-shot]").forEach(function (img) {
      var from = l === "nl" ? "/en/" : "/nl/";
      var to = l === "nl" ? "/nl/" : "/en/";
      img.src = img.getAttribute("src").replace(from, to);
      if (img.getAttribute("srcset")) img.setAttribute("srcset", img.getAttribute("srcset").split(from).join(to));
    });
    document.querySelectorAll(".lang-switch [data-lang]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === l));
    });
    document.title = l === "nl" ? "Golden Hour Golf: tourgolf in herfstlicht voor iPhone" : "Golden Hour Golf: tour golf in autumn light for iPhone";
    renderStore();
    syncVideoButtons();
    if (remember) { try { localStorage.setItem("ghg-lang", l); } catch (e) { /* storage blocked */ } }
  }

  document.querySelectorAll(".lang-switch button[data-lang]").forEach(function (b) {
    b.addEventListener("click", function () { setLang(b.getAttribute("data-lang"), true); });
  });

  /* ---------- Header turns solid after the hero ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { if (header) header.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Videos: autoplay only without reduced motion; always pausable ---------- */
  var videos = [
    { v: document.getElementById("hero-video"), b: document.getElementById("hero-toggle"), play: "video.play", pause: "video.pause", en: ["Play background video", "Pause background video"] },
    { v: document.getElementById("clip-video"), b: document.getElementById("clip-toggle"), play: "video.playclip", pause: "video.pauseclip", en: ["Play highlight clip", "Pause highlight clip"] }
  ].filter(function (x) { return x.v; });

  function syncVideoButtons() {
    videos.forEach(function (x) {
      if (!x.b) return;
      var playing = !x.v.paused;
      x.b.querySelector(".i-pause").toggleAttribute("hidden", !playing);
      x.b.querySelector(".i-play").toggleAttribute("hidden", playing);
      x.b.setAttribute("aria-label", playing ? labelFor(x.pause, x.en[1]) : labelFor(x.play, x.en[0]));
    });
  }

  videos.forEach(function (x) {
    x.v.addEventListener("play", syncVideoButtons);
    x.v.addEventListener("pause", syncVideoButtons);
    if (x.b) {
      x.b.hidden = false;
      x.b.addEventListener("click", function () {
        if (x.v.paused) { x.v.play().catch(function () {}); x.v.dataset.userPaused = ""; }
        else { x.v.pause(); x.v.dataset.userPaused = "1"; }
      });
    }
  });

  function tryAutoplay(x) {
    if (reduceMotion.matches || x.v.dataset.userPaused === "1") return;
    if (x.v.preload !== "auto") x.v.preload = "auto";
    var p = x.v.play();
    if (p && p.catch) p.catch(function () { syncVideoButtons(); });
  }

  if ("IntersectionObserver" in window) {
    var vio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        var x = videos.filter(function (y) { return y.v === e.target; })[0];
        if (!x) return;
        if (e.isIntersecting) tryAutoplay(x); else if (!x.v.paused) x.v.pause();
      });
    }, { threshold: 0.25 });
    videos.forEach(function (x) { vio.observe(x.v); });
  } else {
    videos.forEach(tryAutoplay);
  }
  reduceMotion.addEventListener && reduceMotion.addEventListener("change", function () {
    if (reduceMotion.matches) videos.forEach(function (x) { x.v.pause(); });
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (doc.classList.contains("js-motion") && "IntersectionObserver" in window) {
    var rio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visible"); rio.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { rio.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Screenshot gallery ---------- */
  var track = document.getElementById("gallery");
  if (track) {
    document.querySelectorAll("[data-gallery]").forEach(function (b) {
      b.addEventListener("click", function () {
        var item = track.querySelector("li");
        var step = item ? item.getBoundingClientRect().width + 18 : track.clientWidth * 0.8;
        track.scrollBy({ left: b.getAttribute("data-gallery") === "next" ? step : -step, behavior: reduceMotion.matches ? "auto" : "smooth" });
      });
    });
    var box = document.getElementById("lightbox");
    if (box && typeof box.showModal === "function") {
      var big = box.querySelector("img");
      track.querySelectorAll("button").forEach(function (b) {
        b.addEventListener("click", function () {
          var img = b.querySelector("img");
          big.src = img.getAttribute("src").replace("-800.webp", ".webp");
          big.alt = img.alt;
          box.showModal();
        });
      });
      box.addEventListener("click", function (e) { if (e.target === box) box.close(); });
    }
  }

  /* ---------- Start ---------- */
  var start = "en";
  var q = new URLSearchParams(location.search).get("lang");
  var saved = null;
  try { saved = localStorage.getItem("ghg-lang"); } catch (e) { /* storage blocked */ }
  if (q === "nl" || q === "en") start = q;
  else if (saved === "nl" || saved === "en") start = saved;
  else if ((navigator.language || "").toLowerCase().indexOf("nl") === 0) start = "nl";
  if (i18nEls.length) setLang(start, false); else renderStore();
})();
