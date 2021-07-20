const bill = document.getElementById("bill");
const button = document.querySelectorAll(".btn");
const customTip = document.getElementById("customTip");
const people = document.getElementById("people");
const totalVal = document.querySelectorAll(".money__amount");
const reset = document.querySelector(".reset");

let billVal = "";
let customers = 1;
let tipVal = 0;

bill.addEventListener("input", validateBill);
customTip.addEventListener("input", customVal);
people.addEventListener("input", nPeople);
reset.addEventListener("click", handleReset);

function validateBill() {
  if (bill.value.includes(",")) {
    bill.value.replace(",", ".");
  }
  billVal = parseFloat(bill.value);
  calculate();
  console.log("Bill value:", billVal);
}

button.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});

function handleClick(event) {
  button.forEach((btn) => {
    btn.classList.remove("active");
    if (event.target.innerHTML === btn.innerHTML) {
      btn.classList.add("active");
      tipVal = parseFloat(btn.innerHTML) / 100;
      console.log("Tip value:", tipVal);
    }
  });
  customTip.value = "";
  calculate();
}

function customVal() {
  tipVal = parseFloat(customTip.value / 100);
  button.forEach((btn) => {
    btn.classList.remove("active");
  });
  if (customTip.value !== 0) {
    calculate();
  }
  console.log("Custom value:", tipVal);
}

function nPeople() {
  customers = parseFloat(people.value);
  if (customers <= 0) {
    error.innerHTML = "Can't be zero";
    document.getElementById("people").style.border = " 2px solid red";
  } else {
    error.innerHTML = "";
    document.getElementById("people").style.border = "none";
  }
  console.log("Customers:", customers);
  calculate();
}

function calculate() {
  if (customers >= 1) {
    let tip = (billVal * tipVal) / customers;
    let totalAmount = (billVal * (tipVal + 1)) / customers;
    totalVal[0].innerHTML = "$" + tip.toFixed(2);
    totalVal[1].innerHTML = "$" + totalAmount.toFixed(2);
    console.log(tip, totalAmount);
  }
}

function handleReset() {
  bill.value = 0.0;
  validateBill();
  button[0].click();
  people.value = 1;
  nPeople();
}
