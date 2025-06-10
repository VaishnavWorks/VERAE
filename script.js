// Currency setup
const currencyRates = {
  USD: { symbol: "$", rate: 1 },
  AED: { symbol: "د.إ", rate: 3.67 },
  SAR: { symbol: "ر.س", rate: 3.75 },
  QAR: { symbol: "ر.ق", rate: 3.64 },
  BHD: { symbol: "ب.د", rate: 0.38 },
  OMR: { symbol: "ر.ع", rate: 0.38 },
  KWD: { symbol: "د.ك", rate: 0.31 },
  INR: { symbol: "₹", rate: 83.5 },
  EUR: { symbol: "€", rate: 0.93 }
};

let currentCurrency = localStorage.getItem("currency") || "USD";

// Convert price according to selected currency
function convert(price) {
  return (price * currencyRates[currentCurrency].rate).toFixed(2);
}

function currSym() {
  return currencyRates[currentCurrency].symbol;
}

function changeCurrency(c) {
  currentCurrency = c;
  localStorage.setItem("currency", c);
  populateCurrencySelector();
  renderProducts();
  // Also re-render category pages if they exist
  if (document.getElementById("mens-products")) renderCategory("Men", "mens-products");
  if (document.getElementById("womens-products")) renderCategory("Women", "womens-products");
  if (document.getElementById("girls-products")) renderCategory("Girls", "girls-products");
  if (document.getElementById("boys-products")) renderCategory("Boys", "boys-products");
}

// Populate currency dropdown
function populateCurrencySelector() {
  const sel = document.getElementById("currencySelector");
  if (!sel) return;
  sel.innerHTML = "";
  for (let code in currencyRates) {
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = `${currencyRates[code].symbol} ${code}`;
    if (code === currentCurrency) opt.selected = true;
    sel.appendChild(opt);
  }
}

// Create product card element
function createCard(product) {
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}" />
    <h3>${product.name}</h3>
    <p class="price">${currSym()}${convert(product.price)}</p>
    <div class="btn-group">
      <a href="product${product.id}.html" class="btn btn-view">View Details</a>
      <button class="btn btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
  return div;
}

// Render a list of products into container
function renderProductList(arr, containerId) {
  const cont = document.getElementById(containerId);
  if (!cont) return;
  cont.innerHTML = "";
  arr.forEach(p => cont.appendChild(createCard(p)));
}

// Render homepage product sections
function renderProducts() {
  if (document.getElementById("hot-products")) {
    renderProductList(products.slice(0, 4), "hot-products");
  }
  if (document.getElementById("best-products")) {
    renderProductList(products.slice(4, 8), "best-products");
  }
  if (document.getElementById("all-products")) {
    renderProductList(products, "all-products");
  }
}

// Render category products
function renderCategory(cat, containerId) {
  const filtered = products.filter(p => p.category === cat);
  renderProductList(filtered, containerId);
}

// Search products by name
function searchProducts() {
  const q = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const filtered = products.filter(p => p.name.toLowerCase().includes(q));
  renderProductList(filtered, "all-products");
}

// Add to Cart with localStorage and alert
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === id);
  const found = cart.find(i => i.id === id);

  if (found) {
    found.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

// On page load, initialize UI
document.addEventListener("DOMContentLoaded", () => {
  populateCurrencySelector();
  renderProducts();

  if (document.getElementById("mens-products")) renderCategory("Men", "mens-products");
  if (document.getElementById("womens-products")) renderCategory("Women", "womens-products");
  if (document.getElementById("girls-products")) renderCategory("Girls", "girls-products");
  if (document.getElementById("boys-products")) renderCategory("Boys", "boys-products");
});
