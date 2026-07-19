// Navbar Scroll

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// Mobile Navigation Toggle

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
}

// Scroll Reveal

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show");

        }

    });

}, {

    threshold: 0.15

});

document.querySelectorAll("section").forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


// Product Quantity

const minusBtn = document.querySelector(".quantity button:first-child");
const plusBtn = document.querySelector(".quantity button:last-child");
const quantity = document.querySelector(".quantity span");

if (minusBtn && plusBtn && quantity) {

    let count = 1;

    plusBtn.addEventListener("click", () => {

        count++;
        quantity.textContent = count;

    });

    minusBtn.addEventListener("click", () => {

        if (count > 1) {

            count--;
            quantity.textContent = count;

        }

    });

}


// FAQ

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        item.classList.toggle("active");

    });

});



// ================= SEARCH =================

const products = [

    {name:"Ultimate Zinger Burger",price:650,image:"item-1.png",page:"product.html"},

    {name:"Beef Burger",price:750,image:"item-6.jpg",page:"item2.html"},

    {name:"Chicken Fajita Pizza",price:1499,image:"item-2.jpg",page:"item3.html"},

    {name:"Cheese Lovers Pizza",price:1699,image:"item-7.jpg",page:"item4.html"},

    {name:"Chicken Broast",price:699,image:"item-11.jpg",page:"item5.html"},

    {name:"Family Broast Bucket",price:2299,image:"item-12.jpg",page:"item6.html"},

    {name:"Loaded Fries",price:499,image:"item-5.jpg",page:"item7.html"},

    {name:"Masala Fries",price:399,image:"item-8.jpg",page:"item8.html"},

    {name:"Pepsi",price:120,image:"item-9.jpg",page:"item9.html"},

    {name:"Mint Margarita",price:350,image:"item-10.jpg",page:"item10.html"}

];

const searchBtn = document.getElementById("searchBtn");
const searchOverlay = document.getElementById("searchOverlay");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

if(searchBtn){

searchBtn.addEventListener("click",(e)=>{

    e.preventDefault();

    searchOverlay.classList.add("active");

    searchInput.focus();

    showProducts("");

});

closeSearch.addEventListener("click",()=>{

    searchOverlay.classList.remove("active");

});

searchOverlay.addEventListener("click",(e)=>{

    if(e.target===searchOverlay){

        searchOverlay.classList.remove("active");

    }

});

searchInput.addEventListener("keyup",()=>{

    showProducts(searchInput.value);

});

function showProducts(keyword){

    searchResults.innerHTML="";

    const filtered=products.filter(product=>

        product.name.toLowerCase().includes(keyword.toLowerCase())

    );

    if(filtered.length===0){

        searchResults.innerHTML="<p style='padding:25px;text-align:center;'>No products found.</p>";

        return;

    }

    filtered.forEach(product=>{

        searchResults.innerHTML+=`

        <div class="search-item" onclick="window.location.href='${product.page}'">

            <img src="${product.image}">

            <div>

                <h4>${product.name}</h4>

                <p>Rs. ${product.price}</p>

            </div>

        </div>

        `;

    });

}

}

/* ==========================
   PREMIUM LOADER
========================== */

window.addEventListener("load", function () {

    setTimeout(() => {

        const loader = document.getElementById("loader");

        if (loader) {

            loader.classList.add("hide");

        }

    }, 1200);

});
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

updateCartBadge();

window.addEventListener("storage", updateCartBadge);

/* ==========================
   BACK TO TOP BUTTON
========================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (!backToTop) return;

    if (window.scrollY > 400) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});

if (backToTop) {

    backToTop.addEventListener("click", () => {

        window.scrollTo({

            top: 0,
            behavior: "smooth"

        });

    });

}
