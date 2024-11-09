main();

async function main() {
  let products = await fetchProducts();
  displayProducts(products);
}

async function fetchProducts() {
  let response = await fetch("https://fakestoreapi.com/products");
  let products = await response.json();
  return products;
}

function displayProducts(products) {
  let productsSection = document.getElementById("products");
  products.forEach((product) => {
    let { image, title, price } = product;

    let productElement = document.createElement("div");
    productElement.innerHTML = `
      <div class="flex font-sans">
        <div class="flex-none w-56 relative">
          <img
            src="${image}"
            class="absolute inset-0 w-full h-full object-cover rounded-lg"
            loading="lazy"
          />
        </div>
        <form class="flex-auto p-6">
          <div class="flex flex-wrap">
            <h1 class="flex-auto font-medium text-slate-900">${title}</h1>
            <div
              class="w-full flex-none mt-2 order-1 text-3xl font-bold text-indigo-600"
            >
              $${price}
            </div>
          </div>
          <div class="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200"></div>
          <div class="flex space-x-4 mb-5 text-sm font-medium">
            <div class="flex-auto flex space-x-4">
              <button
                class="buy-now h-10 px-4 sm:px-6 font-semibold rounded-md bg-indigo-600 text-white whitespace-nowrap"
                type="button"
              >
                Buy Now
              </button>
              <button
                class="add-to-cart h-10 px-4 sm:px-6 font-semibold rounded-md border border-slate-200 text-slate-900 whitespace-nowrap"
                type="button"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <p class="text-sm text-slate-500"></p>
        </form>
      </div>
    `;

    productElement.querySelector(".buy-now").addEventListener("click", () => {
      buyNow(product.id);
    });

    productElement
      .querySelector(".add-to-cart")
      .addEventListener("click", () => {
        addToCart(product.id);
      });

    productsSection.appendChild(productElement);
  });
}

let cartItems = [];

function buyNow(productId) {
  cartItems = [productId];
  openCartPage();
}

function addToCart(productId) {
  cartItems.push(productId);
  alert(
    `Product was added to the cart successfully! Number of products in the cart: ${cartItems.length}.`
  );
}

let cartButton = document.getElementById("cart-button");
cartButton.addEventListener("click", openCartPage);
function openCartPage() {
  if (cartItems.length == 0) {
    alert("Your cart is empty!");
    return;
  }
  let ids = cartItems.join(",");
  document.location.href = `./cart.html?ids=${ids}`;
}
