/* =========================================================
   Arafat Onimisi Suleiman / Portfolio interactions
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Theme ---------- */
  var THEME_KEY = "aos-theme";
  var toggle = document.getElementById("theme-toggle");
  var THEME_COLORS = { light: "#f5f2ec", dark: "#0f0e0c" };

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) toggle.setAttribute("aria-pressed", String(theme === "dark"));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", THEME_COLORS[theme] || THEME_COLORS.light);
  }

  try {
    var saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") applyTheme(saved);
  } catch (e) { /* storage blocked, keep default */ }

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------- Mobile nav ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenu(menuBtn.getAttribute("aria-expanded") !== "true");
    });
  }

  if (nav) {
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMenu(false);
  });

  /* ---------- Header stuck state ---------- */
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var siblings = el.parentElement ? Array.prototype.slice.call(el.parentElement.children) : [];
        var index = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = Math.min(index * 60, 320) + "ms";
        el.classList.add("in");
        revealObserver.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Active nav link ---------- */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = nav ? Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]')) : [];

  if ("IntersectionObserver" in window && sections.length && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (link) {
      linkFor[link.getAttribute("href").slice(1)] = link;
    });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("is-active"); });
          link.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (s) { sectionObserver.observe(s); });
  }

  /* ---------- Count-up stats ---------- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var start = performance.now();
        var duration = 1000;

        function tick(now) {
          var p = Math.min((now - start) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(target * eased));
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countObserver.unobserve(el);
      });
    }, { threshold: 0.6 });

    counters.forEach(function (el) { countObserver.observe(el); });
  }

  /* ---------- Lazy ambient video ---------- */
  var videos = Array.prototype.slice.call(document.querySelectorAll(".g-video"));

  if (videos.length) {
    if (reduceMotion) {
      // Respect the preference: show the poster, load and play only on demand.
      videos.forEach(function (v) {
        v.controls = true;
        v.addEventListener("click", function () {
          if (!v.src && v.dataset.src) v.src = v.dataset.src;
          if (v.paused) {
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            v.pause();
          }
        });
      });
    } else if ("IntersectionObserver" in window) {
      var videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var v = entry.target;
          if (entry.isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { threshold: 0.3 });

      videos.forEach(function (v) { videoObserver.observe(v); });
    } else {
      videos.forEach(function (v) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
      });
    }
  }

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();
