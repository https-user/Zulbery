const form = document.getElementById("contactForm");
const popup = document.getElementById("successPopup");
const overlay = document.getElementById("overlay");

form.addEventListener("submit", function (e) {

    e.preventDefault();

    popup.classList.add("active");
    overlay.classList.add("active");

    form.reset();

});

function closePopup() {

    popup.classList.remove("active");
    overlay.classList.remove("active");

}
