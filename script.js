const products = [
  { id: 1, name: "Wireless Mouse", price: 499, image: "images/mouse.jpg" },
  { id: 2, name: "Keyboard", price: 899, image: "images/keyboard.jpg" },
  { id: 3, name: "Headphones", price: 1299, image: "images/headphones.jpg" },
  { id: 4, name: "Smart Watch", price: 1999, image: "images/watch.jpg" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display products
function showProducts() {
  const container = document.getElementById("product-list");
  if (!container) return;

  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  updateCartCount();
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart`);
  updateCartCount();
}

function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (countSpan) {
    countSpan.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
  }
}

// Display Cart Items
function showCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) return;

  container.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    container.innerHTML += `
      <div>
        <h3>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</h3>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
      <hr>
    `;
  });

  document.getElementById("cart-total").textContent = total;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  showCartItems();
  updateCartCount();
}

function checkout() {
  alert("Order Placed Successfully!");
  cart = [];
  localStorage.removeItem("cart");
  showCartItems();
  updateCartCount();
}

window.onload = function () {
  showProducts();
  showCartItems();
  updateCartCount();
};
