(function () {
  const SIDENAV_WIDTH = "min(280px, 82vw)";
  let overlay = null;

  function getSidenav() {
    return document.getElementById("mainSidenav");
  }

  function ensureOverlay() {
    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.className = "sidenav-overlay";
    overlay.setAttribute("aria-hidden", "true");
    overlay.addEventListener("click", closeNav);
    document.body.appendChild(overlay);

    return overlay;
  }

  function openNav() {
    const sidenav = getSidenav();
    if (!sidenav) return;

    sidenav.style.width = SIDENAV_WIDTH;
    sidenav.setAttribute("aria-hidden", "false");
    ensureOverlay().classList.add("is-visible");
  }

  function closeNav() {
    const sidenav = getSidenav();
    if (!sidenav) return;

    sidenav.style.width = "0";
    sidenav.setAttribute("aria-hidden", "true");

    if (overlay) {
      overlay.classList.remove("is-visible");
    }
  }

  // Keep the existing inline onclick handlers working on every dashboard page.
  window.openNav = openNav;
  window.closeNav = closeNav;

  document.addEventListener("DOMContentLoaded", function () {
    const sidenav = getSidenav();
    if (sidenav) {
      sidenav.setAttribute("aria-hidden", "true");
    }

    ensureOverlay();

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeNav();
      }
    });
  });
})();
