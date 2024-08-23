export const orders = JSON.parse(localStorage.getItem('orders')) || []; 

export function addOrder(order) {
  orders.unshift(order); // putting the most recent order on the top/front of the orders array
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders))
  //to check if the order(s) are stored in localStorage, run in windows' console:
  // > localStorage.getItem('orders');

  // to remove the items from localStorage:
  // > localStorage.removeItem('orders');
}