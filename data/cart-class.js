/* Object-Oriented Programming Method: we organize our codes into object(s) . Using class is a better way to generate objects in OOP
Here, we are groupig data and functions together inside a Class - concept behind OOP: Tries to represent the real world 
Using class to generate object(s).
- The class is a blueprint that defines a nature of a future object.
- An instance is a specific object created from a particular class. 
- Classes are used to create and manage new objects and support inheritance— a key ingredient in object-oriented programming and a mechanism of reusing code.

Naming convention: PascalCase. E.g. class Cart{..};
*/
class Cart{       // initializing class => object generator --> cleaner than using a function to generate objects
  
  //initialing public property (can be accessed outside of this class)
  cartItems;     // same as cartItems = undefined;
  
  //initializing private property of the class
  #localStorageKey; // making localStorageKey :private(#) so that it cannot be accessed or modified from outside the class( intensionally or unintensionally...)

  // constructor: it's a special method that lets us put some setup code inside the class and runs automatically after initiazling/generating a new object (like const objcart = new Cart();)
  constructor(localStorageKey){  // constructor can take params
    this.#localStorageKey = localStorageKey; // Reminder: 'this' refers/points to the object that we generate (in future)
    
    this.#loadFromStorage(); //declaring private method
    // note: we should not return anything from a constructor!
  }

  #loadFromStorage() {       // using shorthand property: loadFromStorage: function (){..}

    //using 'this' keyword to represent 'cart.cartItems' i.e. this cartItems belong to object variable 'cart'. By using 'this' keyword...even if the variable name 'cart' gets changed somehow, it doesn't affect the codes inside the initializations for cartItems..
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
    /* if (!this.cartItems) => cart ==null, putting some default items in the cart: cartQuantity=3 */
    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        },
        {
          productId: "aad29d11-ea98-41ee-9285-b916638cac4a",
          quantity: 2,
          deliveryOptionId: '1'
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    // to clear the localStorage items to avoid storing garbage data:  run >localStorage.clear(); in console. Then refresh the page
    // to remove the localStorage items: run > localStorage.removeItem('cart-amazon'); in console. Then refresh the page!
    // to check the localStorage items : > loalStorage.getItem('cart-amazon');
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        // not a good practice to use productName for comparison (two products can hava same name from different brands..)
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1',
      });
    }
    this.saveToStorage();  //in order to access the function inside object (cart)
  }

  removeCartItem(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId)
        newCart.push(cartItem);
    })
    this.cartItems = newCart;
    this.saveToStorage();
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        // not a good practice to use productName for comparison (two products can hava same name from different brands..)
        matchingItem = cartItem;
      }
    });

    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
};

const cart = new Cart('cart-amazon'); // creating new object cart out of class Cart{} and passing a parameter for constructor
const businessCart = new Cart('cart-new-business'); // Each object generated from a class is called an instance of the class

//cart.localStorageKey ='cart-amazon'; //better to put these setup codes inside a constructor; cannot be accessed from outside the class
//businessCart.localStorageKey ='cart-new-business';
//cart.loadFromStorage();
//businessCart.loadFromStorage();

// let's check if the method addToCart() works inside an object as expected
//cart.addToCart('901eb2ca-386d-432e-82f0-6fb1ee7bf969');

//console.log(cart instanceof Cart); // to check if this object cart is an instance of class Class Cart 

// ---------------------------------************--------------------------------------------------
// Let's say we want to load the cart from the backend:
/*
export function loadCart(renderCart) { // here renderProducts value will act as a callback function(s) (to run in future; after loading the response from the backend)
  const xhr = new XMLHttpRequest();
  
  xhr.addEventListener('load',()=>{
  //xhr.response; //returns JSON string
    console.log(xhr.response); // For just practice: response from the backend is text: 'loaded cart'
    renderCart(); // callback argument/function
  })
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send(); // async code
  }
  */
  
  export function loadCart() {
    const promise = fetch('https://supersimplebackend.dev/cart').then((response)=>{
      return response.text() // note: response from backend is in text format
    }).then((cartItem)=>{
        console.log(cartItem); // actual response from backend: 'load cart'
     })
    return promise;
  }

export default cart;