const navbar = document.querySelector(".navbar");
const home = document.querySelector(".home");

window.addEventListener("scroll", () => {
    if (window.scrollY > home.offsetHeight - 50) {
        navbar.classList.add("active");
    } else {
        navbar.classList.remove("active");
    }
});

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".inner-track");
    const carousel = document.querySelector(".inner-carousel");

    if (!track || !carousel) return;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let index = 0;

    const slideCount = track.children.length;

    const slideWidth = carousel.offsetWidth;

    /* ========================= */
    /* MOUSE EVENTS (DESKTOP) */
    /* ========================= */
    carousel.addEventListener("mousedown", startDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("mousemove", drag);

    /* ========================= */
    /* TOUCH EVENTS (MOBILE) */
    /* ========================= */
    carousel.addEventListener("touchstart", startDrag);
    carousel.addEventListener("touchend", endDrag);
    carousel.addEventListener("touchmove", drag);

    function startDrag(e) {
        isDragging = true;
        startX = getPositionX(e);
        carousel.style.cursor = "grabbing";
    }

    function drag(e) {
        if (!isDragging) return;
        const currentX = getPositionX(e);
        currentTranslate = prevTranslate + currentX - startX;
        track.style.transform = `translateX(${currentTranslate}px)`;
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;

        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -100 && index < slideCount - 1) index++;
        if (movedBy > 100 && index > 0) index--;

        setPositionByIndex();
        carousel.style.cursor = "grab";
    }

    function setPositionByIndex() {
        currentTranslate = -index * slideWidth;
        prevTranslate = currentTranslate;
        track.style.transition = "transform 0.3s ease";
        track.style.transform = `translateX(${currentTranslate}px)`;

        setTimeout(() => {
            track.style.transition = "none";
        }, 300);
    }

    function getPositionX(e) {
        return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
    }

});




