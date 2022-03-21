import './normalize.css';
import './index.css';
import { getTrips, } from './api/tripsApi';
// { getTrips, createTrips, updateTrip, deleteTrips }

// Selectors
const tripList = document.querySelector('.trip-list');
const newTripButton = document.querySelector('.new-trip');
const hambugerMenuButton = document.querySelector('.hamburger');
const navItems = document.querySelectorAll('.item');

// Counters for id generation
let tripCounter = 0;
let expenseCounter = 0;

// Blueprint to create new trip object
class Trip {
    constructor(name) {
        this.name = name;
        this.expenses = [];
        this.id = tripCounter;
    }

    // Add new expense object to expenses array
    addExpense(name, price) {
        this.expenses.push( new Expense(name, price) );
    }

    removeExpense(id = 1) {
        // this.expenses = this.expenses.filter(e => e.id !== id);

        let found = this.expenses.find(e => e.id = id);
        console.log(found);
        // let index = this.expenses.indexOf(found);
        // console.log(index);
        // if (index > -1) {
        //     this.expenses.splice(index, 1);
        // }
        // updateTotal(this);
        // console.log(this.expenses);
    }

    // Calculate total of trip expenses
    get total() {
        let total = 0;
        for ( let i = 0; i < this.expenses.length; i++) {
            total += this.expenses[i].price;
        } return total;
    }
}

// Blueprint to create new expense object
class Expense {
    constructor(name, price) {
        this.id = expenseCounter;
        this.name = name;
        this.price = price;
    }
}

// Generate trip section element and contents
function getTripSectionElement (trip) {
    const section = document.createElement('section');
    section.id = `trip-section-${trip.id}`;
    section.className = "trip column center flex";
    const tripHTMLContent = `        
        <h2>${trip.name}</h2>
        <ul class="expense-list column center flex" id="expense-list-${trip.id}">
        </ul>
        <button class="add-expense" id="expense-button-${trip.id}">Add Expense</button>
        <button data-id="${trip.id}" class="delete-trip">x</button>
        <div class="trip-total center flex">
            <p>Trip Total</p>
            <p class="total" id="trip-total-${trip.id}">$${trip.total}</p>
        </div>
    `;
    section.innerHTML = tripHTMLContent;
    return section
}

// Generate expense li elements and contents 
function getExpenseListItemElement(trip) {
    const li = document.createElement("li");
    li.className = "expense flex";
    for (let i = 0; i < trip.expenses.length; i++ ) {
        li.id = `expense-item-${trip.expenses[i].id}`;
        li.innerHTML = `                
            <p>${trip.expenses[i].name}.</p> 
            <p>${trip.expenses[i].price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
            <button data-id="${trip.expenses[i].id}" class="delete-expense">x</button>
        `;
    }
    li.children[0].addEventListener('click', () => {
        let newName = prompt("Enter a new name")
        li.children[0].textContent = `${newName}`;
    });
    li.children[1].addEventListener('click', () => {
        let newPrice = parseFloat(prompt("Enter a new price")).toLocaleString("en-US", {style:"currency", currency:"USD"});
        li.children[1].textContent = `${newPrice}`;
    });
    return li;
}

// Generate expense form
function getTripExpenseForm (trip) {
    const form = document.createElement("form");
    form.className = "trip column center flex";
    form.id = `trip-expense-form-${trip.id}`;
    form.innerHTML = `
        <label class="form-label" for="expense-name">Expense Name</label><br>
        <input type="text" id="expense-name-${trip.id}" name="expense-name" placeholder="Airfare" required><br>
        <label class="form-label" for="expense-price">Expense Price</label><br>
        <input type="number" id="expense-price-${trip.id}" name="expense-price" placeholder="$199" required><br>
        <input class="add-expense" id="submit-expense-${trip.id}" type="submit" value="Add Expense">
        `;
    return form;
}

// Delete trips expenses
function deleteTrip() {
    const deleteTripsLink = global.document.getElementsByClassName("delete-trip");
    Array.from(deleteTripsLink, element => { element.addEventListener('click', (event) => {
        removeElement(event);
        });
    });
}

// Delete expenses
function deleteExpense(trip) {
    const deleteExpenseLink = global.document.getElementsByClassName("delete-expense");
    Array.from(deleteExpenseLink, e => { e.addEventListener('click', (event) => {
            removeElement(event);
            trip.removeExpense(trip);
        });
    });
}

// Delete element
function removeElement(event) {
    const element = event.target;
    event.preventDefault();
    const expense = element.parentNode;
    if (expense.parentNode) {
        expense.parentNode.removeChild(expense);
    }
}

// Button to create new trip object and populate it with content
newTripButton.addEventListener('click', (event, trip) => {
    const tripForm = document.querySelector("#trip-form");
    let tripName = document.querySelector("#new-trip").value;
    if (tripName) {
        event.preventDefault();
        const newTrip = new Trip(tripName);
        const sectionElement = getTripSectionElement(newTrip);
        tripList.appendChild(sectionElement);
        expenseButton(newTrip);
        tripCounter++;
        tripForm.reset();
        deleteTrip(trip);
    }
});

// Button to create add new expenses
function expenseButton(trip) {
    const newTripExpenseButton = document.querySelector(`#expense-button-${trip.id}`);
    newTripExpenseButton.addEventListener('click', () => {
        const newExpenseForm = getTripExpenseForm(trip);
        const newTripExpenseList = document.querySelector(`#expense-list-${trip.id}`);
        newTripExpenseList.appendChild(newExpenseForm);
        newTripExpenseButton.classList.add("hidden");
        const submitExpense = document.querySelector(`#submit-expense-${trip.id}`);
        submitExpense.addEventListener('click', (event) => {
            const expenseForm = document.querySelector(`#trip-expense-form-${trip.id}`);
            let expenseName = document.querySelector(`#expense-name-${trip.id}`).value;
            let expensePrice = document.querySelector(`#expense-price-${trip.id}`).value;
            if (expenseName && expensePrice) {
                event.preventDefault();
                trip.addExpense(expenseName, parseFloat(expensePrice));
                const newExpenseItemElement = getExpenseListItemElement(trip);
                newTripExpenseList.appendChild(newExpenseItemElement);
                updateTotal(trip);
                expenseForm.remove();
                newTripExpenseButton.classList.remove("hidden");
                deleteExpense(trip);
            }
        });
    });
    deleteExpense(trip);
}

// Hamburger Menu
hambugerMenuButton.addEventListener('click', () => { 
    for ( let i = 0; i < navItems.length; i++ ) {
        if ( navItems[i].classList.contains("hidden") ) {
            navItems[i].classList.remove("hidden");
        } else {
            navItems[i].classList.add("hidden");
        }
    }
});

// Populate list of trips via API call.
getTrips().then(result => {
    result.forEach(trip => {
        const newTrip = new Trip(trip.name)
        const sectionElement = getTripSectionElement(newTrip);
        tripList.appendChild(sectionElement);
        const newTripExpenseList = document.querySelector(`#expense-list-${newTrip.id}`);
        for (let i in trip.expenses) {
            newTrip.addExpense(trip.expenses[i].name, trip.expenses[i].price);
            const newExpenseItemElement = getExpenseListItemElement(newTrip);
            newTripExpenseList.appendChild(newExpenseItemElement);
            expenseCounter++;
        }
        updateTotal(newTrip);
        expenseButton(newTrip);
        tripCounter++;
    });
    deleteTrip(result);
});

// Trip Total Helper
function updateTotal(trip) {
    const newTripTotalElement = document.querySelector(`#trip-total-${trip.id}`);
    newTripTotalElement.textContent = trip.total.toLocaleString("en-US", {style:"currency", currency:"USD"});
}

// TODO: 
// Delete correct expense
// Delete trip object
// onClick Errors
// Connect to API















/*
// Populate list of trips via API call.
const populateTrips = result => {
    let tripBody = "";

    // result.data.forEach needed for real API
    result.forEach(trip => {
        let expensesList = "";
        let total = 0;
        for (let i in trip.expenses) {
            expensesList+= `<li class="expense flex" id="expense-item">
                <p>${trip.expenses[i].name}</p> 
                <p>$${trip.expenses[i].price}</p>
                <button data-id="${trip.expenses[i].id}" class="deleteExpense">x</button>
            </li>`
            total += trip.expenses[i].price
        }
        tripBody+= `<section id="trip-section-${trip.id}" class="trip column center flex">       
            <h2>${trip.name}</h2>
            <ul class="expense-list column center flex" id="expense-list-${trip.id}">
                ${expensesList}
            </ul>
            <button class="add-expense" id="expense-button-${trip.id}">Add Expense</button>
            <button data-id="${trip.id}" class="deleteTrips">x</button>
            <div class="trip-total center flex">
                <p>Trip Total</p>
                <p class="total" id="trip-total-${trip.id}">$${total}</p>
            </div>
        </section>`
    });

    global.document.getElementById("trips").innerHTML = tripBody;
      
    const deleteTripsLink = global.document.getElementsByClassName("deleteTrips");

    // Delete trips
    // Must use array.from to create a real array from a DOM collection
    // getElementsByClassname only returns and "array like" object
    Array.from(deleteTripsLink, link => {
        link.onclick = function(event) {
            const element = event.target;
            event.preventDefault();
            deleteTrips(element.attributes["data-id"].value);
            const trip = element.parentNode;
            trip.parentNode.removeChild(trip);
        };
    });

    // Delete expenses
    // Must use array.from to create a real array from a DOM collection
    // getElementsByClassname only returns and "array like" object
    const deleteExpenseLink = global.document.getElementsByClassName("deleteExpense");
    
    Array.from(deleteExpenseLink, link => {
        link.onclick = function(event) {
            const element = event.target;
            event.preventDefault();
            updateTrip(element.attributes["data-id"].value, "FIX");
            const expense = element.parentNode;
            expense.parentNode.removeChild(expense);
        };
    });
};

getTrips().then(populateTrips);

// Add new expenses
// const newTripExpenseButton = document.querySelector(`#expense-button-${newTrip.id}`)
// getSingleTrip(id).then(result => {
// });

// Button to create new trip object and populate it with content
const newTripButton = document.querySelector('.new-trip');
// Counter for id generation
let tripCounter = 0;
let expenseCounter = 1000;

newTripButton.addEventListener('click', () => {
    let tripName = prompt("Please name your trip");
    if (tripName) {
        const newTrip = {
            "id": `${tripCounter}`,
            "name": `${tripName}`,
            "expenses": [],
            "total": 0
        }
        createTrips(newTrip);
        getTrips().then(populateTrips);
        tripCounter++;
        console.log(tripCounter);

        const newTripExpenseButton = document.querySelector(`#expense-button-${newTrip.id}`);
        newTripExpenseButton.addEventListener('click', () => {
            console.log("expense button");
            let expenseName = prompt("Please name your expense");
            if (expenseName) {
                let expensePrice = parseFloat( prompt("Please enter the expense amount") );
                if ( isNaN(expensePrice) ) {
                    alert("Please enter a numeric value.")
                } else {
                    const newExpense = {
                        "id": `${expenseCounter}`,
                        "name": `${expenseName}`,
                        "price": `${expensePrice}`,
                    }
                    updateTrip(tripCounter, newExpense);
                    getTrips().then(populateTrips);
                }
                expenseCounter++;
            } else {
                alert("Please enter an expense name.")
            }
        });
    } else {
        alert("Please enter a trip name.")
    }
});

// Hamburger Menu
const hambugerMenuButton = document.querySelector('.hamburger');
const navItems = document.querySelectorAll('.item');

hambugerMenuButton.addEventListener('click', () => { 
    for ( let i = 0; i < navItems.length; i++ ) {
        if ( navItems[i].classList.contains("hidden") ) {
            navItems[i].classList.remove("hidden");
        } else {
            navItems[i].classList.add("hidden");
        }
    }
});
*/