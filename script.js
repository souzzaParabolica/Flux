
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

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    products.forEach((product) => {
      const name = product.dataset.name;

      if (name.includes(value)) {
        product.style.display = "flex";
      } else {
        product.style.display = "none";
      }
    });
  });
