const burgerImages = ["assets/images/cheesyBurger.png", "assets/images/classicburgerHood.png", "assets/images/peperroniburgerhood.png"];

let currentIndex = 0;
const container = document.querySelector(".burger-container");
const mainImg = document.getElementById("cheesyBurgerImg");
const leftArrow = document.querySelector(".nav-arrow.left");
const rightArrow = document.querySelector(".nav-arrow.right");
let isAnimating = false;

function slide(direction) {
    if (isAnimating) return;
    isAnimating = true;

    const nextImg = document.createElement("img");
    nextImg.src = burgerImages[currentIndex];
    nextImg.style.position = "absolute";
    nextImg.style.top = "0";
    nextImg.style.left = "0";
    nextImg.style.width = mainImg.offsetWidth + "px";
    nextImg.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    nextImg.style.borderRadius = "20px";

    nextImg.style.transform = direction === "right" ? "translateX(100%)" : "translateX(-100%)";
    nextImg.style.opacity = "0";

    container.appendChild(nextImg);

    void nextImg.offsetWidth;

    mainImg.style.transition = "transform 0.6s ease, opacity 0.6s ease";
    mainImg.style.transform = direction === "right" ? "translateX(-100%)" : "translateX(100%)";
    mainImg.style.opacity = "0";

    nextImg.style.transform = "translateX(0)";
    nextImg.style.opacity = "1";

    nextImg.addEventListener(
        "transitionend",
        () => {
            mainImg.src = nextImg.src;
            mainImg.style.transition = "none";
            mainImg.style.transform = "translateX(0)";
            mainImg.style.opacity = "1";

            nextImg.remove();

            isAnimating = false;
        },
        { once: true }
    );
}

rightArrow.addEventListener("click", () => {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % burgerImages.length;
    slide("right");
});

leftArrow.addEventListener("click", () => {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + burgerImages.length) % burgerImages.length;
    slide("left");
});