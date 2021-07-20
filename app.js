// bill id
// button class
// active class
//tipButtons

// let button = document.querySelectorAll(".button");
// let active = document.querySelector(".active");

// function currentValue() {
//   button.forEach((button) => {
//     button.addEventListener("click", () => {
//       button.forEach((button) => {
//         button.classList.remove("active");
//       });
//       button.classList.toggle("active");
//       var current = parseFloat(button.innerHTML);
//       return current;
//     });
//   });
// }

const bill = document.getElementById("bill");
const button = document.querySelectorAll(".btn");
const customTip = document.getElementById("customTip");
const people = document.getElementById("people");
const totalVal = document.querySelectorAll(".money__amount");
const reset = document.querySelector(".reset");

let billVal = "";
let peopleVal = 1;
let tipVal = 0;

bill.addEventListener("input", validateBill);

function validateBill() {
  if (bill.value.includes(",")) {
    bill.value.replace(",", ".");
  }
  billVal = parseFloat(bill.value);
  calculate();
  console.log(billVal);
}

customTip.addEventListener("input", tipCustomVal);
people.addEventListener("input", setPeopleVal);
reset.addEventListener("click", handleReset);

button.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

function handleClick(event) {
  button.forEach((btn) => {
    btn.classList.remove("active");
    if (event.target.innerHTML === btn.innerHTML) {
      btn.classList.add("active");
      tipVal = parseFloat(btn.innerHTML) / 100;
      console.log(tipVal);
    }
  });
  customTip.value = "";
  calculate();
}

function tipCustomVal() {
  tipVal = parseFloat(customTip.value / 100);
  button.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (customTip.value !== 0) {
    calculate();
  }
  console.log(tipVal);
}

function setPeopleVal() {
  peopleVal = parseFloat(people.value);
  if (peopleVal <= 0) {
    error.innerHTML = "Can't be zero";
    document.getElementById("people").style.border = " 2px solid red";
  } else {
    error.innerHTML = "";
    document.getElementById("people").style.border = "none";
  }
  console.log(peopleVal);
  calculate();
}

function calculate() {
  if (peopleVal >= 1) {
    let tip = (billVal * tipVal) / peopleVal;
    let totalAmount = (billVal * (tipVal + 1)) / peopleVal;

    totalVal[0].innerHTML = "$" + tip.toFixed(2);
    totalVal[1].innerHTML = "$" + totalAmount.toFixed(2);
    console.log(tip, totalAmount);
  }
}

function handleReset() {
  bill.value = "";
  validateBill();
  button[0].click();
  people.value = 1;
  setPeopleVal();
}
