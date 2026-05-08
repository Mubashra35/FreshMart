/* =========================================================
   FRESHMART — GLOBAL JS FUNCTIONS
   File: jsFile/jsFunctions.js
========================================================= */

/* =========================================================
   NAVBAR — HAMBURGER TOGGLE
========================================================= */
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  menu.classList.toggle("open");
}

/* =========================================================
   DARK MODE TOGGLE
========================================================= */
function toggleDarkMode() {
  const html = document.documentElement;
  if (html.getAttribute("data-theme") === "dark") {
    html.removeAttribute("data-theme");
    localStorage.setItem("theme", "light");
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
}

/* =========================================================
   CART — ADD ITEM
========================================================= */
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("freshmart-cart")) || [];

  const existing = cart.find(function (item) { return item.name === name; });
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: name, price: price, image: image, qty: 1 });
  }

  localStorage.setItem("freshmart-cart", JSON.stringify(cart));
  showAlert("✅ " + name + " added to cart!", "success");
  updateCartCount();
}

/* =========================================================
   CART — UPDATE CART COUNT IN NAVBAR
========================================================= */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("freshmart-cart")) || [];
  const total = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = total;
}

/* =========================================================
   ALERT — SHOW NOTIFICATION
========================================================= */
function showAlert(message, type) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert alert-" + (type || "success");
  alertBox.textContent = message;
  alertBox.style.position = "fixed";
  alertBox.style.top = "80px";
  alertBox.style.right = "20px";
  alertBox.style.zIndex = "9999";
  alertBox.style.minWidth = "220px";
  alertBox.style.boxShadow = "0 4px 16px rgba(0,0,0,0.15)";
  document.body.appendChild(alertBox);
  setTimeout(function () { alertBox.remove(); }, 3000);
}

/* =========================================================
   FORM — BASIC VALIDATION
========================================================= */
function validateForm(fields) {
  for (let i = 0; i < fields.length; i++) {
    const el = document.getElementById(fields[i]);
    if (el && el.value.trim() === "") {
      showAlert("⚠️ Please fill in all required fields.", "error");
      el.focus();
      return false;
    }
  }
  return true;
}

/* =========================================================
   SEARCH — FILTER BY NAME
========================================================= */
function filterProducts(query) {
  const cards = document.querySelectorAll(".product-card");
  const q = query.toLowerCase();
  cards.forEach(function (card) {
    const name = card.dataset.name ? card.dataset.name.toLowerCase() : "";
    card.style.display = name.includes(q) ? "flex" : "none";
  });
}

/* =========================================================
   SEARCH — FILTER BY PRICE RANGE
========================================================= */
function filterByPrice(min, max) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(function (card) {
    const price = parseFloat(card.dataset.price) || 0;
    card.style.display = (price >= min && price <= max) ? "flex" : "none";
  });
}

/* =========================================================
   SEARCH — FILTER BY CATEGORY
========================================================= */
function filterByCategory(category) {
  const cards = document.querySelectorAll(".product-card");
  cards.forEach(function (card) {
    const cat = card.dataset.category ? card.dataset.category.toLowerCase() : "";
    card.style.display = (category === "all" || cat === category.toLowerCase()) ? "flex" : "none";
  });
}




/* =========================================================
   RUN ON PAGE LOAD
========================================================= */
document.addEventListener("DOMContentLoaded", function () {

  updateCartCount();

  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  const navLinks = document.querySelectorAll("#nav-menu a");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      document.getElementById("nav-menu").classList.remove("open");
    });
  });

});
