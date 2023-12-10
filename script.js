'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

///////////////////// display movments
const displayMovments = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

///////////////////// display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

///////////////////// display summary
const calcDisplaysummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = account.movements
    .filter(mov => mov > 0)
    // Only for amounts greater than 1€
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((interest, i, arr) => interest > 1)
    .reduce((acc, interest) => acc + interest, 0);

  labelSumInterest.textContent = `${interest}€`;
};

///////////////////// create username
const creatUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(fragmentedName => fragmentedName[0])
      .join('');
  });
};
creatUserName(accounts);

//update UI
const updateUI = function (acc) {
  console.log('updating');
  //display movments
  displayMovments(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaysummary(acc);
};

// event handler
// login
let currentAccount;

btnLogin.addEventListener('click', function (eventObj) {
  eventObj.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log(`hi ${currentAccount.owner}`);

    // display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input fields
    inputLoginUsername.value = '';
    inputLoginPin.value = '';

    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferTo.value = '';
  inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    updateUI(currentAccount);
    console.log(currentAccount);
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername?.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // console.log('yo');
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    accounts.splice(index, 1);
  }

  inputCloseUsername.value = '';
  inputClosePin.value = '';
  inputClosePin.blur();

  labelWelcome.textContent = `Log in to get started`;
  containerApp.style.opacity = 0;
});

// const arr = ['yo', 'drod', 'salam'];
// arr.splice(1, 1);
// console.log(arr);
// console.log(arr.findIndex(item => item === 'salam'));

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const arr = ['a', 'v', 'c', 'e', '2'];

// const newArr = arr.slice();
// const newArr = [...arr];
// console.log(newArr);

// newArr.splice(-2);
// newArr.splice(0, 1);
// console.log(newArr);

// newArr.forEach(function (item, i) {
//   console.log(`Im processing on the "${item}", the ${i + 1} item.`);
// });

// const actualName = 'Amir Mahdi';
// const userName = actualName
//   .toLowerCase()
//   .split(' ')
//   .map(fragmentedName => fragmentedName[0])
//   .join('');

// console.log(userName);

// const arr = [5, 2, 4, 1, 15, 8, 3];
// const arr2 = [16, 6, 10, 5, 6, 1, 4];

// const calcAvgDogToHumanAge = function (ages) {
//   const dogsToHuman = ages.map(dog => {
//     let dogToHuman;
//     if (dog <= 2) {
//       return (dogToHuman = 2 * dog);
//     } else if (dog > 2) {
//       return (dogToHuman = 16 + dog * 4);
//     }
//   });
//   // console.log(dogsToHuman);

//   const adultDogs = dogsToHuman.filter(dog => dog >= 18);
//   // console.log(adultDogs);

//   const avgDogs = function (adultDogs) {
//     const dogsSumination = adultDogs.reduce((acc, dog) => acc + dog);
//     const avg = dogsSumination / adultDogs.length;
//     return avg;
//   };
//   // console.log(avgDogs(adultDogs));
//   return avgDogs(adultDogs);
// };
// console.log(calcAvgDogToHumanAge(arr2));

/////////////////// Coding Challeng 3
// const calcAvgDogToHumanAgeRemake = ages => {
//   const avg = ages
//     .map(dog => (dog <= 2 ? dog * 2 : 16 + dog * 4))
//     .filter(dogsHumanAge => dogsHumanAge >= 18)
//     .reduce((acc, adultDog, i, arr) => adultDog / arr.length + acc, 0);

//   return avg;
// };

// console.log(calcAvgDogToHumanAgeRemake(arr2));

/////////////// v18
// let result;
// for (const account of accounts) {
//   account.owner === 'Jessica Davis' ? (result = account) : -1;
// }
// console.log(result);
