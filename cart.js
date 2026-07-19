const cartItems = document.getElementById("cartItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const checkoutBtn = document.getElementById("checkoutBtn");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ==========================
   SAVE CART
========================== */

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

}

/* ==========================
   CART BADGE
========================== */

function updateCartBadge() {

    const badge = document.getElementById("cartBadge");

    if (!badge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = 0;

    cart.forEach(item => {

        totalItems += item.quantity;

    });

    if (totalItems > 0) {

        badge.textContent = totalItems;
        badge.classList.add("show");

    } else {

        badge.textContent = "0";
        badge.classList.remove("show");

    }

}

/* ==========================
   RENDER CART
========================== */

function renderCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fa-solid fa-cart-shopping"></i>
                <h2>Your Cart is Empty</h2>
                <p>Add delicious meals to your cart.</p>
                <a href="menu.html">Browse Menu</a>
            </div>
        `;

        subtotal.textContent = "Rs. 0";
        total.textContent = "Rs. 200";

        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.style.opacity = ".6";
        }

        updateCartBadge();

        return;

    }

    if (checkoutBtn) {

        checkoutBtn.disabled = false;
        checkoutBtn.style.opacity = "1";

    }

    let sub = 0;

    cart.forEach((item, index) => {

        sub += item.price * item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div class="cart-info">

                    <h3>${item.name}</h3>

                    <p>${item.category}</p>

                    <div class="price">
                        Rs. ${item.price}
                    </div>

                    <div class="quantity-box">

                        <button onclick="changeQty(${index},-1)">−</button>

                        <span>${item.quantity}</span>

                        <button onclick="changeQty(${index},1)">+</button>

                    </div>

                </div>

                <button class="remove-btn" onclick="removeItem(${index})">
                    Remove
                </button>

            </div>
        `;

    });

    subtotal.textContent = "Rs. " + sub;
    total.textContent = "Rs. " + (sub + 200);

    updateCartBadge();

}

/* ==========================
   CHANGE QUANTITY
========================== */

function changeQty(index, value) {

    cart[index].quantity += value;

    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();

}

/* ==========================
   REMOVE ITEM
========================== */

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    renderCart();

}

/* ==========================
   CHECKOUT
========================== */

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", function () {

        window.location.href = "checkout.html";

    });

}

/* ==========================
   INITIAL LOAD
========================== */

renderCart();

updateCartBadge();

