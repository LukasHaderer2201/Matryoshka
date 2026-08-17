/* MATRYOSHKA — kleine Interaktionen (Kopfzeile, Einblenden) */
(function () {
  "use strict";

  /* Kopfzeile abdunkeln, sobald gescrollt wird */
  var topbar = document.querySelector(".topbar");
  if (topbar) {
    var setzeStatus = function () {
      topbar.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    setzeStatus();
    window.addEventListener("scroll", setzeStatus, { passive: true });
  }

  /* Inhalte beim Scrollen einblenden */
  var elemente = document.querySelectorAll(".reveal");
  var sparsam = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!("IntersectionObserver" in window) || sparsam) {
    elemente.forEach(function (el) { el.classList.add("is-sichtbar"); });
    return;
  }

  var beobachter = new IntersectionObserver(function (eintraege) {
    eintraege.forEach(function (eintrag) {
      if (eintrag.isIntersecting) {
        eintrag.target.classList.add("is-sichtbar");
        beobachter.unobserve(eintrag.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

  elemente.forEach(function (el) { beobachter.observe(el); });
})();
