import { orders } from "../data/orders.js";
import formatAmount from "./utils/amount.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import cart from "../data/cart-class.js";

async function loadOrderPage() {
  try {
    await loadProductsFetch();
  } catch (error) {
    console.log(error);
  }
  const cartQuantity = updateCartQuantity();
  document.querySelector('.js-cart-quantity').innerText = cartQuantity;

  renderOrderSummary();
}

function renderOrderSummary() {
  let orderSummaryHTML = "";

  orders.forEach((order) => {
    const orderDate = new Date(order.orderTime);

    orderSummaryHTML +=
      `
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${orderDate.toDateString()}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatAmount(order.totalCostCents)}</div>
        </div>
      </div>

      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${order.id}</div>
      </div>
    </div>
    ${getProductDetailsHTML()}`

    function getProductDetailsHTML() {
      let productDetailsHTML = "";
      order.products.forEach((product) => {

        const estDeliveryTime = dayjs(product.estimatedDeliveryTime);
        const productId = product.productId;
        const matchingProduct = getProduct(productId);

        productDetailsHTML += `<div class="order-details-grid">
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${estDeliveryTime.format("dddd, MMMM DD")}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <!--Adding URL Parameters-->
        <a href="tracking.html?orderId=${order.id}&productId=${productId}">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
      </div>
    </div>`;
      });

      return productDetailsHTML;
    }
    console.log(order);
  });

  document.querySelector(".js-order-summary").innerHTML = orderSummaryHTML;
}

function updateCartQuantity() {
  let cartQuantity = 0;
  cart.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

loadOrderPage();





