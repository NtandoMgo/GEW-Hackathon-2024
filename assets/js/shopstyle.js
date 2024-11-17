// let iconCart = document.querySelector
// Show the cart when the cart button is clicked
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.shop-basket').addEventListener('click', function() {
        document.body.classList.add('showCart');
    });

    document.querySelector('.cart-close').addEventListener('click', function() {
        document.body.classList.remove('showCart');
    });
});
