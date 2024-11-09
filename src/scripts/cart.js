let searchParams = new URLSearchParams(window.location.search);
let productIds = searchParams.get("ids").split(",");
let productQuantities = productIds.reduce((map, id) => {
  map[id] = (map[id] || 0) + 1;
  return map;
}, {});
var subtotal = 0;

displayProducts();

async function displayProducts() {
  let productsSection = document.getElementById("products");

  Object.entries(productQuantities).forEach(async ([id, quantity]) => {
    let response = await fetch(`https://fakestoreapi.com/products/${id}`);
    let product = await response.json();
    let { image, title, price, description } = product;
    subtotal += quantity * price;

    let productElement = document.createElement("div");
    productElement.innerHTML = `
      <div
        class="rounded-3xl border-2 border-gray-200 p-4 lg:p-8 grid grid-cols-12 mb-8 max-lg:max-w-lg max-lg:mx-auto gap-y-4"
      >
        <div class="col-span-12 lg:col-span-2 img box">
          <img
            src="${image}"
            alt="speaker image"
            class="max-lg:w-full lg:w-[180px] rounded-lg object-cover"
          />
        </div>
        <div class="col-span-12 lg:col-span-10 detail w-full lg:pl-3">
          <div class="flex items-center justify-between w-full mb-4">
            <h5 class="font-manrope font-bold text-2xl leading-9 text-gray-900">
              ${title}
            </h5>
            <button
              class="remove-item rounded-full group flex items-center justify-center focus-within:outline-red-500"
            >
              <svg
                width="34"
                height="34"
                viewBox="0 0 34 34"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  class="fill-red-50 transition-all duration-500 group-hover:fill-red-400"
                  cx="17"
                  cy="17"
                  r="17"
                  fill=""
                />
                <path
                  class="stroke-red-500 transition-all duration-500 group-hover:stroke-white"
                  d="M14.1673 13.5997V12.5923C14.1673 11.8968 14.7311 11.333 15.4266 11.333H18.5747C19.2702 11.333 19.834 11.8968 19.834 12.5923V13.5997M19.834 13.5997C19.834 13.5997 14.6534 13.5997 11.334 13.5997C6.90804 13.5998 27.0933 13.5998 22.6673 13.5997C21.5608 13.5997 19.834 13.5997 19.834 13.5997ZM12.4673 13.5997H21.534V18.8886C21.534 20.6695 21.534 21.5599 20.9807 22.1131C20.4275 22.6664 19.5371 22.6664 17.7562 22.6664H16.2451C14.4642 22.6664 13.5738 22.6664 13.0206 22.1131C12.4673 21.5599 12.4673 20.6695 12.4673 18.8886V13.5997Z"
                  stroke="#EF4444"
                  stroke-width="1.6"
                  stroke-linecap="round"
                />
              </svg>
            </button>
          </div>
          <p class="font-normal text-base leading-7 text-gray-500 mb-6">
            ${description}
          </p>
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <button
                class="minus-button group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
              >
                <svg
                  class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.5 9.5H13.5"
                    stroke=""
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <input
                id="number"
                type="text"
                class="quantity-input border border-gray-200 rounded-full w-10 aspect-square outline-none text-gray-900 font-semibold text-sm py-1.5 px-3 bg-gray-100 text-center"
                value="${quantity}"
                readonly
              />
              <button
                class="plus-button group rounded-[50px] border border-gray-200 shadow-sm shadow-transparent p-2.5 flex items-center justify-center bg-white transition-all duration-500 hover:shadow-gray-200 hover:bg-gray-50 hover:border-gray-300 focus-within:outline-gray-300"
              >
                <svg
                  class="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                  width="18"
                  height="19"
                  viewBox="0 0 18 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.75 9.5H14.25M9 14.75V4.25"
                    stroke=""
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <h6
              class="text-indigo-600 font-manrope font-bold text-2xl leading-9 text-right"
            >
              $${price}
            </h6>
          </div>
        </div>
      </div>
    `;

    let quantityInput = productElement.querySelector(".quantity-input");

    productElement
      .querySelector(".minus-button")
      .addEventListener("click", () => {
        updateQuantity(product.id, -1, price, quantityInput);
      });

    productElement
      .querySelector(".plus-button")
      .addEventListener("click", () => {
        updateQuantity(product.id, 1, price, quantityInput);
      });

    productElement
      .querySelector(".remove-item")
      .addEventListener("click", () => {
        removeItem(product.id, price);
      });

    productsSection.appendChild(productElement);

    refreshSubtotal();
  });
}

function updateQuantity(productId, quantityDiff, price, quantityInput) {
  if (productQuantities[productId] + quantityDiff == 0) {
    return;
  }

  productQuantities[productId] += quantityDiff;
  quantityInput.value = productQuantities[productId];

  subtotal += quantityDiff * price;
  refreshSubtotal();
}

function removeItem(productId, price) {
  subtotal -= productQuantities[productId] * price;
  delete productQuantities[productId];

  let productsSection = document.getElementById("products");
  productsSection.innerHTML = "";
  subtotal = 0;

  displayProducts();
  refreshSubtotal();
}

function refreshSubtotal() {
  let subtotalElement = document.getElementById("subtotal");
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
}

let cartButton = document.getElementById("checkout-button");
cartButton.addEventListener("click", openCheckoutPage);
function openCheckoutPage() {
  if (subtotal == 0) {
    alert("Your cart is empty!");
    return;
  }
  document.location.href = `./checkout.html?subtotal=${subtotal.toFixed(2)}`;
}
