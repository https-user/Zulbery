const products = [

{
id:1,
name:"Ultimate Zinger Burger",
price:"650",
category:"Burgers",
image:"item-1.png"
},

{
id:2,
name:"Beef Burger",
price:"750",
category:"Burgers",
image:"item-6.jpg"
},

{
id:3,
name:"Chicken Fajita Pizza",
price:"1499",
category:"Pizza",
image:"item-2.jpg"
},

{
id:4,
name:"Cheese Lovers Pizza",
price:"1699",
category:"Pizza",
image:"item-7.jpg"
},

{
id:5,
name:"Chicken Broast",
price:"699",
category:"Broast",
image:"item-11.jpg"
},

{
id:6,
name:"Family Broast Bucket",
price:"2299",
category:"Broast",
image:"item-12.jpg"
},

{
id:7,
name:"Loaded Fries",
price:"499",
category:"Fries",
image:"item-5.jpg"
},

{
id:8,
name:"Masala Fries",
price:"399",
category:"Fries",
image:"item-8.jpg"
},

{
id:9,
name:"Pepsi",
price:"120",
category:"Drinks",
image:"item-9.jpg"
},

{
id:10,
name:"Mint Margarita",
price:"350",
category:"Drinks",
image:"item-10.jpg"
}

];

const container = document.querySelector(".products");
const buttons = document.querySelectorAll(".category-filter button");
const search = document.getElementById("search");

let currentCategory = "All";

function showSkeletons() {

    container.innerHTML = "";

    for (let i = 0; i < 8; i++) {

        container.innerHTML += `

        <div class="skeleton-card">

            <div class="skeleton-image"></div>

            <div class="skeleton-content">

                <div class="skeleton-line title"></div>

                <div class="skeleton-line price"></div>

                <div class="skeleton-line small"></div>

                <div class="skeleton-btn"></div>

            </div>

        </div>

        `;

    }

}


function displayProducts(category, keyword = "") {

    container.innerHTML = "";

    let filtered = category === "All"
        ? products
        : products.filter(product => product.category === category);

    filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(keyword.toLowerCase())
    );

    filtered.forEach(product => {

        container.innerHTML += `
        <div class="product-card"
            onclick="window.location.href='${product.id === 1 ? "product.html" : `item${product.id}.html`}';"
            style="cursor:pointer;">

            <div class="product-image">

                <img src="${product.image}" alt="${product.name}">

                <button class="wishlist-btn"
                    onclick="event.stopPropagation(); toggleWishlist(this)">
                    <i class="fa-regular fa-heart"></i>
                </button>

                <span class="product-tag">Popular</span>

            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <div class="product-price">
                    <span>Rs. ${product.price}</span>
                    <div class="rating">⭐ 4.8</div>
                </div>

                <div class="product-buttons">

                    <button class="details-btn"
                        onclick="event.stopPropagation(); window.location.href='${product.id === 1 ? "product.html" : `item${product.id}.html`}';">
                        View Details
                    </button>

                    <button class="add-cart-btn"
                        onclick="event.stopPropagation(); addToCart('${product.name}')">
                        Add
                    </button>

                </div>

            </div>

        </div>
        `;

    });

    if(filtered.length === 0){

        container.innerHTML = `
        <div style="grid-column:1/-1;text-align:center;padding:60px;">
            <h2>No products found.</h2>
        </div>
        `;

    }

}

showSkeletons();

setTimeout(() => {

    displayProducts(currentCategory);

}, 1000);

buttons.forEach(button=>{

    button.addEventListener("click",()=>{

        buttons.forEach(btn=>btn.classList.remove("active"));

        button.classList.add("active");

        currentCategory = button.textContent.trim();

        displayProducts(currentCategory, search ? search.value : "");

    });

});

if(search){

    search.addEventListener("keyup",()=>{

        displayProducts(currentCategory, search.value);

    });

}

function toggleWishlist(button){

    const icon = button.querySelector("i");

    if(icon.classList.contains("fa-regular")){

        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color="#e63946";

    }else{

        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color="";

    }

}

function addToCart(productName){

    const product = products.find(item => item.name === productName);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === product.name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            name:product.name,
            price:Number(product.price),
            image:product.image,
            category:product.category,
            quantity:1

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    showPopup(product.name + " added to cart");

}

function showPopup(message){

    const popup=document.createElement("div");

    popup.className="cart-popup";

    popup.innerHTML=`
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(popup);

    setTimeout(()=>{

        popup.classList.add("show");

    },100);

    setTimeout(()=>{

        popup.classList.remove("show");

        setTimeout(()=>{

            popup.remove();

        },300);

    },2000);

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

    badge.textContent = totalItems;

    if (totalItems > 0) {

        badge.classList.add("show");

    } else {

        badge.classList.remove("show");

    }

}

/* ==========================
   PAGE LOAD
========================== */

updateCartBadge();

