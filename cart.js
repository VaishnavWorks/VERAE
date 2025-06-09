function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const container = document.getElementById("cart-items");
  container.innerHTML = "";

  let total = 0;
  cart.forEach((item, i) => {
    const subtotal = item.price * item.quantity;
    total += subtotal;
    container.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}" />
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <label>Qty:
          <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${i}, this.value)" />
        </label>
        <p>Subtotal: $${subtotal.toFixed(2)}</p>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
      <hr>`;
  });

  container.innerHTML += `<h2>Total: $${total.toFixed(2)}</h2>`;
}

function updateQuantity(i, val) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[i].quantity = parseInt(val) || 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(i) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;
