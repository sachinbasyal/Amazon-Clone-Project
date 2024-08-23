// import { cart, removeCartItem, updateDeliveryOption } from "../../data/cart.js";
import cart from "../../data/cart-class.js"
import { getProduct } from "../../data/products.js";
import formatAmount from "../utils/amount.js";
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //Using ESM version & JS modules - Practice!
import { renderPaymentSummary } from "./paymentSummary.js";

  //Working with dayjs()
  const today = dayjs();
  //const deliveryDate = today.add(7, "days");

export function renderOrderSummary() {
  let ordersSummaryHTML = "";
  cart.cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);// De-duplicating or normalizing the data
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

    ordersSummaryHTML += `<div class="cart-item-container js-cart-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${today.add(deliveryOption.deliveryDays,'days').format('dddd, DD-MMMM-YY')}
        </div>
      
        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">
      
          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              ${matchingProduct.getPrice()}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id ="${matchingProduct.id}"> 
                Delete
              </span>
            </div>
          </div>
      
          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
        </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days").format("dddd, MMMM DD");
      const priceString = deliveryOption.priceCents === 0   //terneray operator
        ? 'FREE'
        : `$${formatAmount(deliveryOption.priceCents)} -`

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      
      html +=
        `<div class="delivery-option js-delivery-option"
          data-product-id =${matchingProduct.id}
          data-delivery-option-id =${deliveryOption.id}>
        <input type="radio" 
        ${isChecked ? 'checked' :''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}"> <!--name should be different for each loop so that we can select particular radio buttons in the different ordersSummary-->
        <div>
          <div class="delivery-option-date js-delivery-date">
          ${deliveryDate}
          </div>
          <div class="delivery-option-price">
          ${priceString} Shipping
          </div>
        </div>
      </div>`
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = ordersSummaryHTML;

  /* document.querySelectorAll(".js-delivery-date").forEach((delivDate) => {
    delivDate.innerHTML = deliveryDate.format("dddd, DD MMMM YY");
  }); */

  document.querySelectorAll(".js-delete-link").forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      cart.removeCartItem(productId);
      const cartContainer = document.querySelector(`.js-cart-container-${productId}`);
      cartContainer.remove(); //remove this cartContainer-codes from the dom HTML page.
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener('click', ()=>{
      // const productId = element.dataset.productId;
      // const deliveryOptionId = element.dataset.deliveryOptionId;
      // OR using shorthand property
      const {productId, deliveryOptionId} = element.dataset;

      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary(); // a function can call/re-run itself => recursion function
      // (1) Update the data, (2) Regenerate the HTML ==> MVC (Model-View-Controller)
      //Model: Saves and manages the data (ex. codes/files in data folder [database])
      //View: takes the data and displays it on the page (ex. scripts/files [like checkout.js, amazon.js..] )
      //Controller: runs some code when we interact with the page (ex. EventListerners, buttons)
      renderPaymentSummary();

    })
  });
}
