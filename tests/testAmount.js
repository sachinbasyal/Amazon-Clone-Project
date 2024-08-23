/* TESTING: Essential part of programming (QA). Need to perform testing by the programmer/developer in all cases!

Types of Testing: 
1. Manual testing: Open the webpage and test the code..to check if its working properly, as expected..
2. Automated testing: using code to test code!

Disadvantages of Manual Testing:
1. Hard to test every situation
2. Hard to re-test

Best Practice: Automated Testing --> using code to test code(s)

Types of Autamated Test Cases:
1. Basic test cases -> tests if the code is working as expected
2. Edge cases -> test with values that are tricky

Group of related tests = test suite
*/

//Automated Tests 
import formatAmount from "../scripts/utils/amount.js";

console.log('test suite: formatCurrency')
console.log('converts cents into dollars')
if (formatAmount(2099) =='20.99'){   //besic test case
  console.log('passed')
}
else console.log('failed')

console.log('works with 0')
if (formatAmount(0) =='0.00'){   //edge test case
  console.log('passed')
}
else console.log('failed')

console.log('rounds up to the nearest cent')
if (formatAmount(3000.5) =='30.01'){   //edge test case
  console.log('passed')
}
else console.log('failed')

 console.log('rounds down to the nearest cent')
if (formatAmount(3000.4) =='30.00'){   //edge test case
  console.log('passed')
}
else console.log('failed')

//-----------------------------------------------------
console.log('test suite: calculateTax')
console.log('calculates a 10% tax with rounds up')
if (formatAmount(2099*0.1) =='2.10'){   //edge test case
  console.log('passed')
}
else console.log('failed')

console.log('calculates a 10% tax with rounds down')
if (formatAmount(3004*0.1) =='3.00'){   //edge test case
  console.log('passed')
}
else console.log('failed')

console.log('it works with 0')
if (formatAmount(0*0.1) =='0.00'){   //edge test case
  console.log('passed')
}
else console.log('failed')