let overlay = document.querySelector(".top");
let cart = document.querySelector(".fa-bag-shopping");
let body = document.querySelector("body");

const onCartClick = () => {
  overlay.classList.add("overlay");
  body.style.overflow = "hidden";
};
const onCartOut = () => {
  overlay.classList.remove("overlay");
  body.style.overflow = "initial";

};
cart.addEventListener("click", onCartClick);
overlay.addEventListener("click", onCartOut);
