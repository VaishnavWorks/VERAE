// Currency setup
const currencyRates = { USD:{symbol:"$",rate:1}, AED:{symbol:"د.إ",rate:3.67}, SAR:{symbol:"ر.س",rate:3.75}, QAR:{symbol:"ر.ق",rate:3.64}, BHD:{symbol:"ب.د",rate:0.38}, OMR:{symbol:"ر.ع",rate:0.38}, KWD:{symbol:"د.ك",rate:0.31}, INR:{symbol:"₹",rate:83.5}, EUR:{symbol:"€",rate:0.93} };
let currentCurrency = localStorage.getItem("currency") || "USD";

function convert(price){ return (price * currencyRates[currentCurrency].rate).toFixed(2); }
function currSym(){ return currencyRates[currentCurrency].symbol; }

function changeCurrency(c){
  currentCurrency = c;
  localStorage.setItem("currency", c);
  populateCurrencySelector();
  renderProducts();
}

function populateCurrencySelector(){
  const sel = document.getElementById("currencySelector");
  if(!sel) return;
  sel.innerHTML = "";
  for(let code in currencyRates){
    const opt = document.createElement("option");
    opt.value = code;
    opt.textContent = `${currencyRates[code].symbol} ${code}`;
    if(code === currentCurrency) opt.selected = true;
    sel.appendChild(opt);
  }
}

function createCard(product){
  const div = document.createElement("div");
  div.className = "product-card";
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${currSym()}${convert(product.price)}</p>
    <div class="btn-group">
      <a href="product${product.id}.html" class="btn btn-view">View Details</a>
      <button class="btn btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
  return div;
}

function renderProductList(arr, containerId){
  const cont = document.getElementById(containerId);
  if(!cont) return;
  cont.innerHTML = "";
  arr.forEach(p=>cont.appendChild(createCard(p)));
}

// For homepage sections:
function renderProducts(){
  renderProductList(allProducts.slice(0,4), "hot-products");
  renderProductList(allProducts.slice(4,8), "best-products");
  renderProductList(allProducts, "all-products");
}

// Generic function for categories
function renderCategory(cat, containerId){
  const filtered = allProducts.filter(p=>p.category === cat);
  renderProductList(filtered, containerId);
}

function searchProducts(){
  const q = document.getElementById("searchInput")?.value.toLowerCase()||"";
  const filtered = allProducts.filter(p=>p.name.toLowerCase().includes(q));
  renderProductList(filtered, "all-products");
}

function addToCart(id){
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const found = cart.find(i=>i.id===id);
  if(found) found.qty++;
  else cart.push({id, qty:1});
  localStorage.setItem("cart", JSON.stringify(cart));
  window.location.href = "cart.html";
}

document.addEventListener("DOMContentLoaded", ()=>{
  populateCurrencySelector();
  renderProducts();
  // If on category page – check container IDs
  renderCategory("Men", "mens-products");
  renderCategory("Women", "womens-products");
  renderCategory("Girls", "girls-products");
  renderCategory("Boys", "boys-products");
});
