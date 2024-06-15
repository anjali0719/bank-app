'use strict';
//DATA

const account1 = {
    owner: 'Jonas Schmedtmann',
    movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
    interestRate: 1.2, // %
    pin: 1111,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT",
};

const account2 = {
    owner: 'Jessica Davis',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const account3 = {
    owner: 'Steven Thomas Williams',
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
    movementsDates: [
        "2019-11-18T21:31:17.178Z",
        "2019-12-23T07:42:02.383Z",
        "2020-01-28T09:15:04.904Z",
        "2020-04-01T10:17:24.185Z",
        "2020-05-08T14:11:59.604Z",
        "2020-07-26T17:01:17.194Z",
        "2020-07-28T23:36:17.929Z",
        "2020-08-01T10:51:36.790Z",
    ],
    currency: "EUR",
    locale: "pt-PT", // de-DE
};

const account4 = {
    owner: 'Sarah Smith',
    movements: [430, 1000, 700, 50, 90],
    interestRate: 1,
    pin: 4444,
    movementsDates: [
        "2019-11-01T13:15:33.035Z",
        "2019-11-30T09:48:16.867Z",
        "2019-12-25T06:04:23.907Z",
        "2020-01-25T14:18:46.235Z",
        "2020-02-05T16:33:06.386Z",
        "2020-04-10T14:43:26.374Z",
        "2020-06-25T18:49:59.371Z",
        "2020-07-26T12:01:20.894Z",
    ],
    currency: "USD",
    locale: "en-US",
};

const accounts = [account1, account2, account3, account4];

const mainContainer = document.querySelector('.app');
const welcomeMsg = document.querySelector('.welcome');
const logoImg = document.querySelector('.logo');
const movementsElement = document.querySelector('.movements');
const loginInputUser = document.querySelector('.login__input--user');
const loginInputPin = document.querySelector('.login__input--pin');
const loginBtn = document.querySelector('.login__btn');
const currentBalanceBtn = document.querySelector('.balance__label');
const displayDate = document.querySelector('.balance__date');
const displayBalanceValue = document.querySelector('.balance__value');
const displayDepositAmt = document.querySelector('.movements__type--deposit');
const displayWithdrawlAmt = document.querySelector('.movements__type--withdrawal');
const movementsDate = document.querySelector('.movements__date');
const movementsValue = document.querySelector('.movements__value');
const summaryValueIn = document.querySelector('.summary__value--in');
const summaryValueOut = document.querySelector('.summary__value--out');
const summaryValueInterest = document.querySelector('.summary__value--interest');
const sortBtn = document.querySelector('.btn--sort');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmt = document.querySelector('.form__input--amount');
const transferBtn = document.querySelector('.form__btn--transfer');
const inputLoanAmt = document.querySelector('.form__input--loan-amount');
const requestLoanBtn = document.querySelector('.form__btn--loan');
const inputCloseUser = document.querySelector('.form__input--user');
const inputUserPin = document.querySelector('.form__input--pin');
const closeBtn = document.querySelector('.form__btn--close');
const logoutTimer = document.querySelector('.logout-timer');
const countDownTimer = document.querySelector('.timer');


// SHOW THE AMOUNTS IN THE GRID
const showAmountInGrid = (accMovements, sort=false) => {
    movementsElement.innerHTML = '';

    const movsArray = sort ? accMovements.movements.slice().sort((num1, num2) => {
        return num1 - num2;
    }) : accMovements.movements;

    movsArray.forEach(function (mov, i) {
        const movementType = mov > 0 ? 'deposit' : 'withdrawal';

        const newDate = new Date(accMovements.movementsDates[i]);
        const todaysDate = `${newDate.getDate()}`.padStart(2, 0);
        const todayMonth = `${newDate.getMonth() + 1}`.padStart(2, 0);
        const todayYear = newDate.getFullYear();
        const formattedDate = `${todaysDate}/${todayMonth}/${todayYear}`

        const movementsElementHtml = `
            <div class="movements__row">
                <div class="movements__type movements__type--${movementType}">${i + 1} ${movementType}</div>
                <div class="movements__date">${formattedDate}</div>
                <div class="movements__value">${mov.toFixed(2)}€</div>
            </div>
        `;
        movementsElement.insertAdjacentHTML('afterbegin', movementsElementHtml);
    });
};
// showAmountInGrid(account1.movements);



//NOTE: create username: if user's name is "Kareena Kapoor Khan" then username would be --> kkk (the initials)

// const getOwnerName = (accounts) => {
//     const ownerName = accounts.forEach((acc) => {
//         return (acc.owner);
//     });
//     return ownerName;
// };

const createUsername = (accounts) => {
    accounts.forEach((acc) => {
        // create username as a new property 
        acc.username = acc.owner.toLowerCase().split(' ').map((name) => {
            return name[0]
        }).join('');
    });
};
createUsername(accounts);
// console.log(accounts);

// display the total balance of the GRID
const showBalance = (acc) => {
    const balance = acc.movements.reduce((accumulator, amt) => {
        // accumulator is same as a value initialization (let accumulator = 0;) when using for loop or any other loops
        return accumulator + amt;
    }, 0);
    // save the balance
    acc.balance = balance;
    displayBalanceValue.textContent = `${balance}€`
};
// showBalance(account1.movements);


const calcSummaryValue = (acc) => {
    // Summariazed In amt will be calc based on how much is deposited (+ve values of the movements array)
    const depositedAmount = acc.movements.filter((movs) => {
        return movs > 0;
    }).reduce((accum, movs) => {
        return accum + movs;
    }, 0);
    summaryValueIn.textContent = `${depositedAmount}€`;

    // Summariazed Out amt will be calc based on how much is withdrawl (-ve values of the movements array)
    const withdrawalAmount = acc.movements.filter((movs) => {
        return movs < 0;
    }).reduce((accum, movs) => {
        return accum + movs;
    }, 0);
    summaryValueOut.textContent = `${Math.abs(withdrawalAmount)}€`; //the withdrawalAmount will result in -ve so to remove -ve sign we're considering absolute value

    // Considering interestRate calculate the total interest (don't include the interest if it's less that 1)
    const interestAmount = acc.movements.filter(
        mov => mov > 0
    ).map(deposit => (deposit * acc.interestRate) / 100)
    .reduce((accum, int) =>
        accum + int, 0
    );
    summaryValueInterest.textContent = `${interestAmount}€`;
};
// calcSummaryValue(account1.movements);


const updateUI = (user) => {
    // Display Movements
    showAmountInGrid(user);
        
    // Display Balance
    showBalance(user);
    
    // Display Summary
    calcSummaryValue(user);
};


// TIMER

const logOutUser = () => {

    // set logout time to 5mins
    let logOutTime = 300;
    const countTime = () => {
        const min = String(Math.trunc(logOutTime / 60)).padStart(2, 0);
        const sec = String(logOutTime % 60).padStart(2, 0);
        // in each call, print the remaining time to UI
        countDownTimer.textContent = `${min}:${sec}`;
        
        // at 0 sec, stop the timer & logout the user
        if (logOutTime ==- 0) {
            clearInterval(timeInterval);
            welcomeMsg.textContent = "Log in to get started";
            mainContainer.style.opacity = 0;
        }
        logOutTime--;
    };
    countTime();
    // call the timer every second
    const timeInterval = setInterval(countTime, 1000);
    return timeInterval;

};



// PERFORM USER LOGIN
let currentLoggedInUser, timeInterval;
const validateUser = (event) => {
    event.preventDefault();
    const enteredUsername = loginInputUser.value;
    const enteredPin = loginInputPin.value;
    // Get the correct user based on the provided unm & pin
    currentLoggedInUser = accounts.find((acc) => {
        return acc.username === enteredUsername.toLowerCase();
    });
    
    // validate if unm matches with the pin
    if (currentLoggedInUser?.pin === Number(enteredPin)) {
        // User Logged In. Display Welcome User Msg
        welcomeMsg.textContent = `Welcome Back, ${currentLoggedInUser.owner.split(' ')[0]}`;
        mainContainer.style.opacity = 100;
        loginInputUser.value = '';
        loginInputPin.value = '';
        loginInputUser.blur();
        loginInputPin.blur();
        
        const currentDate = new Date();
        const todayDate = `${currentDate.getDate()}`.padStart(2, 0);
        const currentMonth = `${currentDate.getMonth() + 1}`.padStart(2, 0);
        const currentYear = currentDate.getFullYear();
        displayDate.textContent = `As of ${todayDate}/${currentMonth}/${currentYear}`

        // // Display Movements
        // showAmountInGrid(currentLoggedInUser.movements);
        
        // // Display Balance
        // showBalance(currentLoggedInUser);
        
        // // Display Summary
        // calcSummaryValue(currentLoggedInUser);

        if (timeInterval) {
            clearInterval(timeInterval)
        }
        timeInterval = logOutUser();
        
        
        // DRY: create one common method
        updateUI(currentLoggedInUser);

    }else {
        welcomeMsg.textContent = `Incorrect Credentials Provided`;
        loginInputUser.value = loginInputPin.value = '';
        mainContainer.style.opacity = 0;
    }
    return currentLoggedInUser;
};
loginBtn.addEventListener('click', validateUser);


let findUserAccToTransfer;
const handleTransfer = (e) => {
    e.preventDefault();
    const transferAmount = Number(inputTransferAmt.value);
    const transferToUser = inputTransferTo.value;

    // clear out the input field values
    inputTransferAmt.value = inputTransferTo.value = ' ';
    
    // find the Receiver's Acc with the unm provided
    findUserAccToTransfer = accounts.find((acc) => {
        return acc.username === transferToUser.toLowerCase();
    });
    
    // if loggedInUser's balance is greater than the transferAmount then only send money to receiver
    if (findUserAccToTransfer && transferAmount > 0 && currentLoggedInUser?.balance >= transferAmount && currentLoggedInUser?.username !== transferToUser.toLowerCase()) {
        // add +ve to receiver's movements array
        findUserAccToTransfer?.movements.push(transferAmount)
        
        // add -ve to movements array of loggedIn User
        currentLoggedInUser?.movements.push(-transferAmount)

        // push transfer dates to the array of logged in user and receiver user
        currentLoggedInUser?.movementsDates.push(new Date().toISOString());
        findUserAccToTransfer?.movementsDates.push(new Date().toISOString());

        // update Summary, Balance & Grid(Movements) amounts
        updateUI(currentLoggedInUser);

        // A new timer should start after every action performed. since the user will be logged out only due to inactivity
        clearInterval(timeInterval)
        timeInterval = logOutUser();
    }
};
transferBtn.addEventListener('click', handleTransfer);


const deleteUser = (e) => {
    e.preventDefault();
    const userToClose = inputCloseUser.value;
    const userPinToClose = Number(inputUserPin.value);

    // the user logged in should be only able to delete themselves not any other user
    if (currentLoggedInUser?.username === userToClose && currentLoggedInUser?.pin === userPinToClose) {
        const accountToDelete = accounts.findIndex((acc) => {
            return acc.username === currentLoggedInUser?.username
        });
        // remove user account from the array
        accounts.splice(accountToDelete, 1);
        
        // Log Out the user
        mainContainer.style.opacity = 0;
    }

    // clear out the input field values
    inputCloseUser.value = inputUserPin.value = ' ';
};
closeBtn.addEventListener('click', deleteUser);


const handleLoanRequest = (e) => {
    e.preventDefault();
    const loanAmount = Number(inputLoanAmt.value);
    
    // check if any deposit for the current user is >= 10%
    if (loanAmount > 0 && currentLoggedInUser?.movements.some((movs) => {
        movs >= loanAmount * 0.1
    })) {
        // add +ve movement to array & update UI
        currentLoggedInUser.movements.push(loanAmount);
        currentLoggedInUser.movementsDates.push(new Date().toISOString());
        updateUI(currentLoggedInUser);
        // A new timer should start after every action performed. since the user will be logged out only due to inactivity
        clearInterval(timeInterval)
        timeInterval = logOutUser();
    }
    
    inputLoanAmt.value = '';
    
};
requestLoanBtn.addEventListener('click', handleLoanRequest);


// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// set a default value, based on which sorting can be applied 
let sortingApplied = false;
const applySorting = (e) => {
    e.preventDefault();
    // Ascending Order
    // currentLoggedInUser?.movements.sort((pos, neg) => {
    //     // if (pos > neg) {
    //     //     return 1;
    //     // }else if (pos < neg) {
    //     //     return -1;
    //     // }
    //     return pos - neg;
    // });

    // Descending Order
    // currentLoggedInUser?.movements.sort((pos, neg) => {
    //     // if (pos > neg) {
    //     //     return -1;
    //     // }else if (pos < neg){
    //     //     return 1;
    //     // }
    //     return neg - pos;
    // });

    // call this method with sort=true
    showAmountInGrid(currentLoggedInUser, !sortingApplied);
    sortingApplied = !sortingApplied;
    // A new timer should start after every action performed. since the user will be logged out only due to inactivity
    clearInterval(timeInterval)
    timeInterval = logOutUser();
};
sortBtn.addEventListener('click', applySorting);





