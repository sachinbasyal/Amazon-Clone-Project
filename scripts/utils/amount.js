function formatAmount(priceCents){
  return (Math.round(priceCents)/100).toFixed(2); // toFixed() is used to show up number or 0's after decimal point
}
export default formatAmount;

//export default: another way of exporting function
// We can use default export when we want to export only one thing (i.e. only one default function) from the file!
// No need of curly brackets{} to import default export function!
//Each file can only have one default export.

//Note: calling/importing the functions inside curly brackets{} are 'named export functions'