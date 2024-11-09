let searchParams = new URLSearchParams(window.location.search);
let subtotal = searchParams.get("subtotal");
let total = subtotal * 1.2;

let productsTotal = document.getElementById("products-total");
let smallTotal = document.getElementById("small-total");
let bigTotal = document.getElementById("big-total");

productsTotal.textContent = `$${subtotal}`;
smallTotal.textContent = `$${total.toFixed(2)}`;
bigTotal.textContent = `$${total.toFixed(2)}`;
