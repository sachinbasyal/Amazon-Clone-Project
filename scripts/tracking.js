import { orders } from "../data/orders.js";
import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";
import cart from "../data/cart-class.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

//URL Parameters => search parameters
// URL params lets us save different data in each URL
const url = new URL(window.location.href);
const orderId =url.searchParams.get("orderId");
const productId =url.searchParams.get("productId"); // retrieving multiple URL params from the URL path

async function loadTrackingPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log(error);
  }
  const cartQuantity = updateCartQuantity();
  document.querySelector('.js-cart-quantity').innerText = cartQuantity;

  renderTracking();
}

function renderTracking() {
  const matchingProduct = getProduct(productId)
  const matchingOrder = matchOrder(orderId);
  console.log(matchingOrder)
  let productQuantity;
  let estDeliveryTime;
  matchingOrder.products.forEach((product)=>{
    if(product.productId ===productId) {
      productQuantity =product.quantity;
      estDeliveryTime = product.estimatedDeliveryTime;
    }
  })
const trackingHTML = 
` <a class="back-to-orders-link link-primary" href="orders.html">
View all orders
</a>

<div class="delivery-date">
Arriving on ${dayjs(estDeliveryTime).format('dddd, MMMM DD')}
</div>

<div class="product-info">
${matchingProduct.name}
</div>

<div class="product-info">
Quantity: ${productQuantity}
</div>

<div class="order-date">
Order Placed: ${dayjs(matchingOrder.orderTime).format('dddd, MMMM DD')}
</div>

<img class="product-image" src="${matchingProduct.image}">

<div class="progress-labels-container">
<div class="progress-label">
  Preparing
</div>
<div class="progress-label current-status">
  Shipped
</div>
<div class="progress-label">
  Delivered
</div>
</div>

<div class="progress-bar-container">
<div class="progress-bar"></div>
</div>`;

function matchOrder(orderId) {
  let matchingOrder;  // initializaing variable name inside function scope
  orders.forEach((order)=>{
    if (order.id ===orderId) {
      matchingOrder = order;
    }
  })
  return matchingOrder;
}
document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

loadTrackingPage();