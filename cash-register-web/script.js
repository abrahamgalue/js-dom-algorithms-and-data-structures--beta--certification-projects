let price = 3.26;

let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const UNIT_AMOUNT = {
  "PENNY": 0.01,
  "NICKEL": 0.05,
  "DIME": 0.10,
  "QUARTER": 0.25,
  "ONE": 1,
  "FIVE": 5,
  "TEN": 10,
  "TWENTY": 20,
  "ONE HUNDRED": 100
}

const displayChangeDue = document.getElementById('change-due');
const cash = document.getElementById('cash');
const purchaseBtn = document.getElementById('purchase-btn');

function formatResults(status, change) {
  displayChangeDue.innerHTML = `<p>Status: ${status}</p>`

  change.map(item => {
    displayChangeDue.innerHTML += `<p>${item[0]}: $${item[1]}</p>`
  })
  return
}

function checkCashRegister() {
  if (Number(cash.value) < price) {
    alert("Customer does not have enough money to purchase the item")
    cash.value = ''
    return
  }

  if (price === Number(cash.value)) {
    displayChangeDue.innerHTML = '<p>No change due - customer paid with exact cash</p>'
    cash.value = ''
    return
  }

  const changeArray = [];
  let changeToGive = Number(cash.value) - price;


  let totalCID = cid
    .reduce((sum, [, amount]) => sum + amount, 0)
    .toFixed(2);

  if (changeToGive > totalCID) {
    return displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>"
  } else if (changeToGive.toFixed(2) === totalCID) {
    return formatResults("CLOSED", cid)
  } else {
    cid = cid.reverse();

    for (let elem of cid) {
      let temp = [elem[0], 0];
      while (changeToGive >= UNIT_AMOUNT[elem[0]] && elem[1] > 0) {
        elem[1] -= UNIT_AMOUNT[elem[0]];
        temp[1] += UNIT_AMOUNT[elem[0]];

        changeToGive -= UNIT_AMOUNT[elem[0]];
        changeToGive = changeToGive.toFixed(2);
      }
      if (temp[1] > 0) {
        changeArray.push(temp);
      }
    }
  }

  cash.value = ''
  return changeToGive > 0 ?
    (displayChangeDue.innerHTML = "<p>Status: INSUFFICIENT_FUNDS</p>") :
    formatResults("OPEN", changeArray)
}

const checkResults = () => {
  if (!cash.value) {
    return
  }
  checkCashRegister()
}

purchaseBtn.addEventListener('click', checkResults)

cash.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    checkResults()
  }
})