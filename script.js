

const images = [
  "assets/slider1.jpg",
  "assets/slider2.jpg",
  "assets/slider3.jpg"
];

let index = 0;

setInterval(() => {
  index = (index + 1) % images.length;
  document.getElementById("slider").style.backgroundImage = `url(${images[index]})`;
}, 6000);


const header = document.getElementById("header");
function checkScrollHeader() {
    if (window.scrollY > 0) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}
window.addEventListener("scroll", checkScrollHeader);
checkScrollHeader();



const items = document.querySelectorAll('.fade-on-scroll');
function checkVisibility() {
    const viewportHeight = window.innerHeight;
    items.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementHeight = rect.height;
        const visiblePx = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        const requiredForElement = elementHeight * 1;
        const requiredForViewport = viewportHeight * 0.5;
        const requiredVisiblePx = Math.min(requiredForElement, requiredForViewport);
        if (visiblePx >= requiredVisiblePx) {
            el.classList.add('show');
        } else {
            el.classList.remove('show');
        }
    });
}
window.addEventListener('scroll', checkVisibility);
window.addEventListener('resize', checkVisibility);
checkVisibility();


