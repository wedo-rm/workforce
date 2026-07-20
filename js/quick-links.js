(function () {
  const closeTimers = new WeakMap();

  function clearCloseTimer(container) {
    const timer = closeTimers.get(container);
    if (timer) {
      window.clearTimeout(timer);
      closeTimers.delete(container);
    }
  }

  function closeQuickLinks(container, returnFocus) {
    if (!container) return;

    clearCloseTimer(container);

    const trigger = container.querySelector(".quick-links-trigger");
    const menu = container.querySelector(".quick-links-menu");
    if (!trigger || !menu) return;

    container.classList.remove("is-open");
    trigger.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-hidden", "true");

    if (returnFocus) trigger.focus();
  }

  function openQuickLinks(container) {
    clearCloseTimer(container);

    const trigger = container.querySelector(".quick-links-trigger");
    const menu = container.querySelector(".quick-links-menu");
    if (!trigger || !menu) return;

    container.classList.add("is-open");
    trigger.setAttribute("aria-expanded", "true");
    menu.setAttribute("aria-hidden", "false");
  }

  function scheduleCloseQuickLinks(container) {
    clearCloseTimer(container);
    closeTimers.set(container, window.setTimeout(function () {
      closeQuickLinks(container, false);
    }, 180));
  }

  document.addEventListener("DOMContentLoaded", function () {
    const containers = Array.from(document.querySelectorAll("[data-quick-links]"));

    containers.forEach(function (container) {
      const trigger = container.querySelector(".quick-links-trigger");
      const links = container.querySelectorAll(".quick-links-menu a");
      if (!trigger) return;

      trigger.addEventListener("click", function () {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        containers.forEach(function (item) {
          if (item !== container) closeQuickLinks(item, false);
        });

        if (isOpen) {
          closeQuickLinks(container, false);
        } else {
          openQuickLinks(container);
        }
      });

      // Desktop users can preview the local links by hovering. Click/tap
      // remains available for touch screens and keyboard users.
      if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        container.addEventListener("mouseenter", function () {
          clearCloseTimer(container);
          containers.forEach(function (item) {
            if (item !== container) closeQuickLinks(item, false);
          });
          openQuickLinks(container);
        });

        container.addEventListener("mouseleave", function () {
          scheduleCloseQuickLinks(container);
        });
      }

      links.forEach(function (link) {
        link.addEventListener("click", function () {
          closeQuickLinks(container, false);
        });
      });
    });

    document.addEventListener("click", function (event) {
      containers.forEach(function (container) {
        if (!container.contains(event.target)) {
          closeQuickLinks(container, false);
        }
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;

      containers.forEach(function (container) {
        if (container.classList.contains("is-open")) {
          closeQuickLinks(container, true);
        }
      });
    });
  });
})();
