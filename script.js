// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

// Listen for the scroll event and log the event data
lenis.on("scroll", (e) => {
  console.log(e);
});

const searchInput = document.getElementById("searchInput");
const products = document.querySelectorAll(".product");

let activeCategory = "all";

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();

  products.forEach((product) => {
    const name = product.dataset.name || "";
    const category = (product.dataset.category || "").toLowerCase();

    const matchesSearch = name.includes(searchValue);
    const matchesCategory =
      activeCategory === "all" || category === activeCategory;

    if (matchesSearch && matchesCategory) {
      product.style.display = "flex";
    } else {
      product.style.display = "none";
    }
  });
}

if (searchInput) {
  searchInput.addEventListener("input", () => {
    applyFilters();
  });
}

// Category navigation logic
const categoryNav = document.querySelector(".category-nav");

if (categoryNav) {
  const allItem = categoryNav.querySelector(".category-nav__item");
  if (allItem) {
    allItem.classList.add("category-nav__item--expanded");
  }

  const allButton = categoryNav.querySelector(
    ".category-nav__item--active .category-nav__link",
  );
  const subLinks = categoryNav.querySelectorAll(".category-nav__sublink");

  function setActiveCategory(newCategory) {
    activeCategory = newCategory;
    applyFilters();
  }

  if (allButton) {
    allButton.addEventListener("click", () => {
      const item = allButton.closest(".category-nav__item");
      if (!item) return;

      const isExpanded = item.classList.contains(
        "category-nav__item--expanded",
      );
      item.classList.toggle("category-nav__item--expanded", !isExpanded);
      item.classList.toggle("category-nav__item--collapsed", isExpanded);

      // Reset to show all products when clicking on "All Product"
      setActiveCategory("all");
    });
  }

  subLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const text = link.textContent.trim().toLowerCase();

      let categoryKey = "all";
      if (text.includes("home")) {
        categoryKey = "home";
      } else if (text.includes("music")) {
        categoryKey = "music";
      } else if (text.includes("phone")) {
        categoryKey = "phone";
      } else if (text.includes("storage")) {
        categoryKey = "storage";
      }

      setActiveCategory(categoryKey);
    });
  });

  // Main items (New Arrival, Best Seller, On Discount) – here they just reset filters
  const mainItems = categoryNav.querySelectorAll(
    ".category-nav__item:not(.category-nav__item--active) .category-nav__link",
  );

  mainItems.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveCategory("all");
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".carrosselProdutos");
  const leftBtn = document.getElementById("carousel-left");
  const rightBtn = document.getElementById("carousel-right");
  const product = carousel.querySelector(".product");
  const scrollAmount = product ? product.offsetWidth + 32 : 350; // margin

  leftBtn?.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });

  rightBtn?.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });
});

// Header responsive nav
(function () {
  const btn = document.getElementById("header-mobile-menu-btn");
  const nav = document.getElementById("header-nav-list");
  const openIcon = document.getElementById("header-mobile-menu-icon-open");
  const closeIcon = document.getElementById("header-mobile-menu-icon-close");
  const extraCloseBtn = document.getElementById("header-mobile-menu-close");

  function setClosed() {
    nav.classList.remove("open");
    nav.classList.add("closed");
    openIcon.classList.remove("hidden");
    closeIcon.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
  }
  function setOpen() {
    nav.classList.remove("closed");
    nav.classList.add("open");
    openIcon.classList.add("hidden");
    closeIcon.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenuOnResize() {
    if (window.innerWidth >= 769) {
      setClosed();
      nav.classList.remove("closed", "open");
      openIcon.classList.remove("hidden");
      closeIcon.classList.add("hidden");
      document.body.classList.remove("overflow-hidden");
    }
  }

  // Default state on load
  if (window.innerWidth < 769) setClosed();

  btn.addEventListener("click", function () {
    if (nav.classList.contains("open")) setClosed();
    else setOpen();
  });
  // Extra close (X) btn inside mobile menu
  if (extraCloseBtn) {
    extraCloseBtn.addEventListener("click", setClosed);
  }
  // Hide menu if screen resizes to desktop
  window.addEventListener("resize", closeMenuOnResize);

  // Optional: Clicking a nav link on mobile closes the menu
  Array.from(nav.querySelectorAll("li")).forEach((li) => {
    // do not close if it's the close button
    if (!li.querySelector("#header-mobile-menu-close"))
      li.addEventListener("click", () => {
        if (window.innerWidth < 769) {
          setClosed();
        }
      });
  });
})();

function filterProducts(category, el) {
  // Remove active class from all category-nav items/links/sublinks
  document
    .querySelectorAll(".category-nav__item, .category-nav__sublink")
    .forEach((item) => {
      item.classList.remove("category-nav__item--active");
      item.classList.remove("bg-[#e8e8e8]");
      item.classList.remove("font-bold");
    });
  // Highlight the selected filter
  if (el) {
    if (el.closest(".category-nav__item")) {
      el.closest(".category-nav__item").classList.add(
        "category-nav__item--active",
      );
    }
    el.classList.add("font-bold");
    if (el.classList.contains("category-nav__link")) {
      el.classList.add("bg-[#e8e8e8]");
    } else if (el.classList.contains("category-nav__sublink")) {
      el.classList.add("bg-[#e8e8e8]");
    }
  }
  // Filter product cards
  document.querySelectorAll(".product").forEach((prod) => {
    let prodCat = (prod.getAttribute("data-category") || "").toLowerCase();
    // Categorias mapeadas
    if (category === "all") {
      prod.style.display = "";
    } else if (category === "home") {
      prod.style.display = prodCat === "home" ? "" : "none";
    } else if (category === "music") {
      prod.style.display = prodCat === "music" ? "" : "none";
    } else if (category === "phone") {
      prod.style.display = prodCat === "phone" ? "" : "none";
    } else if (category === "storage") {
      prod.style.display = prodCat === "storage" ? "" : "none";
    } else if (category === "new") {
      prod.style.display =
        prod.getAttribute("data-new") === "true" ? "" : "none";
    } else if (category === "best") {
      prod.style.display =
        prod.getAttribute("data-best") === "true" ? "" : "none";
    } else if (category === "discount") {
      prod.style.display =
        prod.getAttribute("data-discount") === "true" ? "" : "none";
    }
  });
}
// Ativar filtro inicial (All Product)
document.addEventListener("DOMContentLoaded", function () {
  filterProducts("all", document.querySelector('[data-category="all"]'));
});

// Mobile category nav: use same filter logic as desktop and close sheet
(function () {
  const sheet = document.getElementById("mobileCategorySheet");
  if (!sheet) return;

  const filters = sheet.querySelectorAll(".mobile-category-filter");
  filters.forEach((el) => {
    el.setAttribute("tabindex", "0");
    el.addEventListener("click", function (e) {
      if (el.getAttribute("href") === "#") e.preventDefault();
      const category = el.getAttribute("data-filter") || "all";
      activeCategory = category;
      applyFilters();
      sheet.classList.add("hidden");
    });
  });
})();