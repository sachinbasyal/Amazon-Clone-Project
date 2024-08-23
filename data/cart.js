/* PROCEDURAL Programming Method: a set of step-by-step code instructions --> organize our code into function(s) */

export let cart;

loadFromStorage();

function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));
  /* if (!cart) => cart ==null, putting some default items in the cart */
  if (!cart) {
    cart = [
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


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
  //to clear the localStorage items to avoid storing garbage data:  run >localStorage.clear(); in console. Then refresh the page
  // To remove the localStorage items: run > localStorage.removeItem('cart'); in console. Then refresh the page!
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      // not a good practice to use productName for comparison (two products can hava same name from different brands..)
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1',
    });
  }

  saveToStorage();
}

export function removeCartItem(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId)
      newCart.push(cartItem);
  })
  cart = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      // not a good practice to use productName for comparison (two products can hava same name from different brands..)
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}

/* To understand objects and their references (equality)
let arr1=[{
  id:1,
  description: 'Hello'
},{
  id:2,
  description: 'JavaScript'
}];

let arr2=[{id:2,description: 'Programming'}];

let newArr;

arr1.forEach((array1)=>{
  arr2.forEach((array2)=>{
    if(array1.id ===array2.id){
     newArr = array1;
    }
   })
  })

if (newArr)
  {
   newArr.id+=1;
  }
else{
  arr1.push({
    id: 999,
    description: 'NodeJS'
   })
}
console.log('newArr',newArr)
console.log('new arr1',arr1)
*/