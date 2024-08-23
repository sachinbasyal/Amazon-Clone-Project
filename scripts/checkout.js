import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
//import { loadProducts} from "../data/products.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart-class.js";
//import "../data/cart-oop.js"; //way to load and inspect the cart-opp.js file in checkout.html page's console window
//import "../data/cart-class.js";
//import "../data/backend-practice.js"

// renderOrderSummary();
// renderPaymentSummary();
// -----------------------------------------------------
// Lets retrieve the products using the backend API
// loadProducts(()=>{
//   loadCart(()=>{
//     renderOrderSummary(); // passing callback functions( to run in future)
//     renderPaymentSummary(); // multiple callbacks cause nesting
//   })
// });
// ------------------------------------------------------

// Promise built-in Class: A better way to handle async code; lets us wait for some code to finish, before going to the next step
// It allows JS to run multiple codes at the same time
/* new Promise((resolve)=>{  // resolve is a function: lets us control when to go to the next step
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
// Why do we use Promises? 
// use of multiple callbacks cause a lot of nesting (having code inside code)

/*
new Promise((resolve) => {  // resolve is a function: lets us control when to go to the next step
  loadProducts(() => {
    resolve();
  });

}).then(() => {
  return new Promise((resolve) => {
    loadCart(()=>{
      resolve();
    });
  })

}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/
// Promise.all() - lets us run multiple promises at the same time, and wait for all of them to finish
// more efficient way to use Promise(): using callback()
/*
Promise.all([
  new Promise((resolve) => {  // resolve is a function: lets us control when to go to the next step
  loadProducts(() => {
    resolve();
  });
}),

  new Promise((resolve) => {
    loadCart(()=>{
      resolve();
    });
  })

]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
}) */

//Let's use loadProductsFetch() - Better & efficent way to use Promise class.
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(()=>{
      resolve();
    });
  })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
})
*/
// Async await: A most efficient and best way to handle promises (shortcut for promises)
// async() -> makes a function return a promise
// await -lets us wait for a promise to finish, before going to the next line
// await -lets us write async code like normal code 
// we can only use await when we are inside async() function

async function loadPage() {
  try {     // try-catch: it's meant to handle unexpected errors (our code is correct,but outside our control)
    
    //throw ('sending manual error'); // if required to pass manaul error directly to catch()..
    await loadProductsFetch();    
    await loadCart();
  }

  //OR if used callback
  // const cartValue = await new Promise((resolve, reject) => {
  //   loadCart(()=>{
        //reject('mannual error'); // to pass manual error message in future, before resolve()
  //     resolve('cart value'); //acts like a return()
  //   });
      //console.log(cartValue) --> returns: 'cart value'
  // })
  catch (error) {
    console.log(error);
  }
  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();