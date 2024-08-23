//import { cart} from "../../data/cart.js";
import cart from "../../data/cart-class.js"
import { getProduct } from "../../data/products.js";
import formatAmount from "../utils/amount.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let totalCartQty = 0;
  let totalPrice = 0;
  let shippingPrice = 0;

  cart.cartItems.forEach((cartItem) => {
    totalCartQty += cartItem.quantity;
    const matchingProduct = getProduct(cartItem.productId);
    totalPrice += matchingProduct.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.priceCents
  })
  const paymentSummaryHTML =
    `<div class="payment-summary-title">
  Order Summary
</div>

<div class="payment-summary-row">
  <div>Items (${totalCartQty}):</div>
  <div class="payment-summary-money">$${formatAmount(totalPrice)}</div>
</div>

<div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${formatAmount(shippingPrice)}</div>
</div>

<div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${formatAmount(totalPrice + shippingPrice)}</div>
</div>

<div class="payment-summary-row">
  <div>Estimated tax (10%):</div>
  <div class="payment-summary-money">$${formatAmount((totalPrice + shippingPrice) * 0.1)}</div>
</div>

<div class="payment-summary-row total-row">
  <div>Order total:</div>
  <div class="payment-summary-money">$${formatAmount(totalPrice + shippingPrice + ((totalPrice + shippingPrice) * 0.1))}</div>
</div>

<button class="place-order-button button-primary js-place-order">
  Place your order
</button>`

  document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
  document.querySelector('.js-checkout-items').innerText = `${totalCartQty} Items`;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    try {
      const response = await fetch('https://supersimplebackend.dev/orders', {
        method: 'POST',
        headers: {   // headers: gives the backend more information about our request
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cart: cart   // we can't send an object directly, so need to convert this cart object into a JSON string
        })
      })
      const order = await response.json(); // response.json() -> a promise: to get data attached to the response
      console.log(order) // order response fetched to/from backend successfully!
      addOrder(order);

    } catch (error) {
      console.log('Unexpected Error! Try again later.', error)
    }
    // after we create an order, redirect the link to the orders.html page
    // window.location is a special JS object which controls the URL at the top of the browser
    window.location.href ="orders.html" ; // orders.html is a new filepath replaced after '/' at the browser (i.e. checkout.html)
  });
}
 