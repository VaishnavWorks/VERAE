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

function convert(price) {
  return (price * currencyRates[currentCurrency].rate).toFixed(2);
}

function currSym() {
  return currencyRates[currentCurrency].symbol;
}

function updateQuantity(id, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;
  if (item.quantity < 1) item.quantity = 1;

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  let total = 0;

  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-image" />
      <div class="cart-details">
        <h3>${item.name}</h3>
        <p>Price: ${currSym()}${convert(item.price)}</p>
        <div class="qty-control">
          <button onclick="updateQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
        <p>Subtotal: ${currSym()}${convert(subtotal)}</p>
        <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  const totalElement = document.createElement("h3");
  totalElement.textContent = `Total: ${currSym()}${convert(total)}`;
  totalElement.className = "cart-total";
  cartItemsContainer.appendChild(totalElement);
}


document.addEventListener("DOMContentLoaded", () => {
  renderCart();
});
