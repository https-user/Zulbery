const counters = document.querySelectorAll(".counter");

let started = false;

function startCounters() {

    if (started) return;

    const stats = document.querySelector(".stats");

    const statsTop = stats.getBoundingClientRect().top;

    if (statsTop < window.innerHeight - 100) {

        started = true;

        counters.forEach(counter => {

            const target = Number(counter.dataset.target);

            let count = 0;

            const speed = target / 80;

            const update = () => {

                if (count < target) {

                    count += speed;

                    if (count > target) count = target;

                    if (target === 49) {

                        counter.textContent = (count / 10).toFixed(1);

                    } else {

                        counter.textContent = Math.floor(count);

                    }

                    requestAnimationFrame(update);

                } else {

                    if (target === 49) {

                        counter.textContent = "4.9";

                    } else {

                        counter.textContent = target;

                    }

                }

            };

            update();

        });

    }

}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);
