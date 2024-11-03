let overlay = document.querySelector(".top")
let cart = document.querySelector(".fa-bag-shopping")
let banner = document.querySelector(".banner-content")

const onCartClick=()=>{
    overlay.classList.add("overlay")
    console.log(66);
    
}
const onCartOut=()=>{
    overlay.classList.remove("overlay")
    
}
cart.addEventListener("click",onCartClick)
overlay.addEventListener("click",onCartOut)
