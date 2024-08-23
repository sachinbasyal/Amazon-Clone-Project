/* Object-Oriented Programming Method: we organize our codes into object(s) 
Here, we are groupig data and functions together inside an object cart - concept behind OOP: Tries to represent real world 
Benifits of OOP: Easy to create multiple objects 
Naming convention: 
- In JavaSCript, we tend to use camelCase to denote variables and functions
- In OOP, we use PascalCase for things that generate objects. Eg. function Cart(){..} */


// creating a function that generates object(s) => however, not a even better way as generating objects using "class"
function Cart(localStorageKey) {
  // Note: Let cart; => let cart = undefined;
  const cart = {              // initializing cart as an object
    cartItems: undefined,     // converting let cart; to let cart = undefined; --> cartItems: undefined, [cart <-> cartItems to avoid noming conflict of object name]
    loadFromStorage() {       // using shorthand property: loadFromStorage: function (){..}

      //using 'this' keyword to represent 'cart.cartItems' i.e. this cartItems belong to object variable 'cart'. By using 'this' keyword...even if the variable name 'cart' gets changed somehow, it doesn't affect the codes inside the initializations for cartItems..
      this.cartItems = JSON.parse(localStorage.getItem(localStorageKey));
      /* if (!this.cartItems) => cart ==null, putting some default items in the cart */
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
    },

    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
      // to clear the localStorage items to avoid storing garbage data:  run >localStorage.clear(); in console. Then refresh the page
      // to remove the localStorage items: run > localStorage.removeItem('cart'); in console. Then refresh the page!
    },

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
    },

    removeCartItem(productId) {
      const newCart = [];
      this.cartItems.forEach((cartItem) => {
        if (cartItem.productId !== productId)
          newCart.push(cartItem);
      })
      this.cartItems = newCart;
      this.saveToStorage();
    },

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

    },

  };

  return cart;
}

const cart = Cart('cart-amazon'); // creating a function that generates objects
cart.loadFromStorage();

// let's check if the method addToCart() works inside an object as expected
// cart.addToCart('901eb2ca-386d-432e-82f0-6fb1ee7bf969');
console.log('cart Object:', cart); //working as expected!

//------------------------------------------------------------------------------------------
// OOP -> easy to create multiple objects --> let's consider we have a another business
// we can simply create a new/separate business cart by simply copying the cart object..with the help of same function Cart();
const businessCart = Cart('cart-new-business');
businessCart.loadFromStorage();
console.log('businessCart Object:', businessCart);
   