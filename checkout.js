const checkoutItems = document.getElementById("checkoutItems");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const placeOrderBtn = document.getElementById("placeOrderBtn");

const successPopup = document.getElementById("successPopup");
const overlay = document.getElementById("overlay");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const deliveryFee = 200;

function loadCheckout(){

    checkoutItems.innerHTML = "";

    if(cart.length === 0){

        checkoutItems.innerHTML = "<h3>Your cart is empty.</h3>";

        subtotal.innerText = "Rs. 0";
        total.innerText = "Rs. 200";

        placeOrderBtn.disabled = true;
        placeOrderBtn.style.opacity = ".6";

        return;

    }

    let sub = 0;

    cart.forEach(item=>{

        sub += item.price * item.quantity;

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <img src="${item.image}" alt="${item.name}">

            <div style="flex:1;">

                <h4>${item.name}</h4>

                <p>Rs. ${item.price}</p>

                <small>Quantity: ${item.quantity}</small>

            </div>

            <strong>Rs. ${item.price * item.quantity}</strong>

        </div>

        `;

    });

    subtotal.innerText = "Rs. " + sub;

    total.innerText = "Rs. " + (sub + deliveryFee);

}

loadCheckout();

placeOrderBtn.addEventListener("click",()=>{

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();

    if(name==="" || phone==="" || address==="" || city===""){

        alert("Please fill all fields.");

        return;

    }

    successPopup.classList.add("show");
    overlay.classList.add("show");

    localStorage.removeItem("cart");

});

function goHome(){

    window.location.href="index.html";

}
const cityInput = document.getElementById("city");
const cityList = document.getElementById("cityList");
const cityOptions = document.querySelectorAll(".city-option");

cityInput.addEventListener("focus", () => {
    cityList.classList.add("show");
});

cityInput.addEventListener("input", () => {

    const value = cityInput.value.toLowerCase();

    cityList.classList.add("show");

    cityOptions.forEach(option => {

        option.style.display =
            option.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";

    });

});

cityOptions.forEach(option => {

    option.addEventListener("click", () => {

        cityInput.value = option.textContent;

        cityList.classList.remove("show");

    });

});

document.addEventListener("click", e => {

    if(!e.target.closest(".city-select")){

        cityList.classList.remove("show");

    }

});
