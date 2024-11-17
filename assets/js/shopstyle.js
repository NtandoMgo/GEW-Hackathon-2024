document.addEventListener("DOMContentLoaded", () => {
    const cartItems = [];
    const cartList = document.querySelector(".cart-items");
    const totalPriceElement = document.getElementById("total");

    const products = document.querySelectorAll(".product");
    products.forEach(product => {
        product.querySelector(".add-to-cart").addEventListener("click", () => {
            const name = product.querySelector("h3").textContent;
            const price = parseFloat(product.querySelector(".price").textContent.replace("R", ""));
            const id = product.getAttribute("data-id");

            addToCart({ id, name, price });
        });
    });

    function addToCart(product) {
        // Check if product already in cart
        const existingItem = cartItems.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }
        renderCart();
    }

    function renderCart() {
        cartList.innerHTML = ""; // Clear cart
        let total = 0;

        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} (x${item.quantity})`;
            const price = document.createElement("span");
            price.textContent = `R${(item.price * item.quantity).toFixed(2)}`;
            li.appendChild(price);
            cartList.appendChild(li);

            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);
    }
});
