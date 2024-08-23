/* Main idea of JavaScript:
(1) Save the data (data =information...information about our products)
(2) Generate the HTML
(3) Make it interactive

Object {..} - group multiple values together
*/
// import { cart, addToCart } from "../data/cart.js"; 
import cart from "../data/cart-class.js"; // using cart object from Class Cart{..} indeed!
//import { products, loadProducts} from "../data/products.js";
import { products, loadProductsFetch} from "../data/products.js";
import { Clothing } from "../data/products.js"; //used in case of not using inheritance feature

//loadProducts(); // simply loading the function loadProducts() send the request to backend but due to async code request, the page will be displayed blank as data hasn't arrived from the backend server to products.forEach((product) array
// we need to use callback funciton to retrieve the code from the backend
//loadProducts(renderProductsGrid); // In JS functions are also values and here we are passing function as an argument value

// using fetch() to render products grid
loadProductsFetch().then(()=>{
  renderProductsGrid();
});

function renderProductsGrid() {

  updateCartQuantity();

  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="${product.getStartUrl()}">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      ${product.getPrice()}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <!--Without using inheritance
    <div class="clothing-size-chart">
      ${
        product instanceof Clothing
        ?`<a href="${product.sizeChartLink} target ="_blank">Clothing Size</a>`
        : ""
      }
      </div>-->

      <!---Using Inheritance & Polymorphism to add Size chart--->
      ${product.extraInfoHTML()} <!--Polymorphism: using a method without knowing the class-->

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>
    <!--initializing data attribute-->
    <button class="add-to-cart-button button-primary js-add-to-cart"
    data-product-id ="${product.id}"
    data-product-name="${product.name}">
      Add to Cart
    </button>
  </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      /* how do we know which product to add in the cart?
        Data Attribute: Syntax: data-[name] ="<product.name>"
        - is just another HTML attribute
        - allows us to attach any information to an element
        console.log(button.dataset.productName) .dataset -> gives all the data attributes attached to an element
        */
      const productId = button.dataset.productId;
      //const productName = button.dataset.productName; // no need to store other details as Id is used to retrieve other details.
      cart.addToCart(productId);
      updateCartQuantity();
    });
  });

  function updateCartQuantity(){
    let cartQuantity = 0;
    cart.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    })
    document.querySelector(".js-cart-qty").innerText = cartQuantity;
  }

}