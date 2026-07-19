let quantity = 1;

const qty = document.getElementById("qty");
const cartBadge = document.getElementById("cartBadge");

function changeQty(value){

    quantity += value;

    if(quantity < 1){
        quantity = 1;
    }

    qty.textContent = quantity;

}

function addToCart(){

    const name = document.querySelector(".product-details h1").textContent;

    const price = Number(
        document.querySelector(".price-rating h2").textContent.replace("Rs.","").trim()
    );

    const image = document.querySelector(".product-image img").getAttribute("src");

    const category = document.querySelector(".category").textContent;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find(item => item.name === name);

    if(existing){

        existing.quantity += quantity;

    }else{

        cart.push({

            name: name,
            price: price,
            image: image,
            category: category,
            quantity: quantity

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartBadge();

    showPopup(name + " added to cart");

}

function buyNow(){

    addToCart();

    window.location.href = "cart.html";

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

function showPopup(message){

    const popup = document.createElement("div");

    popup.className = "cart-popup";

    popup.innerHTML = `
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

function updateCartBadge(){

    if(!cartBadge) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {

        total += item.quantity;

    });

    cartBadge.textContent = total;

    if(total > 0){

        cartBadge.style.display = "flex";

    }else{

        cartBadge.style.display = "none";

    }

}

updateCartBadge();
