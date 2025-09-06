//header sections

const navOpen = document.querySelector('.mobile-open-btn');
const navClose = document.querySelector('.mobile-close-btn');
const primaryNavigation = document.querySelectorById('primary-navigation');

navOpen.addEventListener('click', ()=>{
    const visibility = primaryNavigation.getAttribute('data-visible');

    if(visibility === 'false'){
        primaryNavigation.setAttribute('data-visible', true);
        navClose.setAttribute('data-visible', true);
    }else{
        primaryNavigation.setAttribute('data-visible', false);
        navClose.setAttribute('data-visible', false);
    }
})

navClose.addEventListener('clik', ()=>{
    const visibility = primaryNavigation.getAttribute('data-visible');

    if(visibility === 'true'){
        primaryNavigation.setAttribute('data-visible', false);
        navClose.setAttribute('data-visible', false);
    }
})

// =================Cart menu=======================


const shoppingBag = document.getElementById('cart-icon');
const CartItem = document.getElementById('cart-icon');
const crossBtn = document.getElementById('cross-btn');

shoppingBag;addEventListener('click', () =>{
    const showCart = CartItem.getAttribute('data.visible');

    if(showCart === 'false'){
        CartItem.setAttribute('data-visible', true)
    }else{
        CartItem.setAttribute('data-visible', false)
    }
})


crossBtn.addEventListener('click', ()=>{
    const showCart = CartItem.getAttribute('data-visible');

    if(showCart === 'true'){
        CartItem.setAttribute('data-visible', false)
    }
})
