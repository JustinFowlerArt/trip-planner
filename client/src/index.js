import './normalize.css';
import './index.css';
import { getTrips, createTrips, updateTrip, deleteTrips } from './api/tripsApi';

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

// TODO: 
// Fix page reload
// Patch Total field after calculation
// Add expense delete
// Fix expense add













/*
// Selectors
const tripList = document.querySelector('.trip-list');
const newTripButton = document.querySelector('.new-trip');
const hambugerMenuButton = document.querySelector('.hamburger');
const navItems = document.querySelectorAll('.item');

// Counter for id generation
let counter = 0;

// Blueprint to create new trip object
class Trip {
    constructor(name) {
        this.name = name;
        this.expenses = [];
        this.total = 0;
        this.id = counter;
    }

    // Add new expense object to expenses array
    addExpense(name, price) {
        this.expenses.push( new Expense(name, price) );
    }

    // Calculate total of trip expenses
    sumTotal() {
        this.total = 0;
        for ( let i = 0; i < this.expenses.length; i++) {
            this.total += this.expenses[i].price;
        } return this.total;
    }
}

// Blueprint to create new expense object
class Expense {
    constructor(name, price) {
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
        <div class="trip-total center flex">
            <p>Trip Total</p>
            <p class="total" id="trip-total-${trip.id}">$${trip.total}</p>
        </div>
    `;
    section.innerHTML = tripHTMLContent;
    return section
}

// Button to create new trip object and populate it with content
newTripButton.addEventListener('click', () => {
    let tripName = prompt("Please name your trip");
    if (tripName) {
        const newTrip = new Trip(tripName)
        const sectionElement = getTripSectionElement(newTrip);
        tripList.appendChild(sectionElement);
        const newTripExpenseButton = document.querySelector(`#expense-button-${newTrip.id}`);
        newTripExpenseButton.addEventListener('click', () => {
            const newTripExpenseList = document.querySelector(`#expense-list-${newTrip.id}`);
            let expenseName = prompt("Please name your expense");
            if (expenseName) {
                let expensePrice = parseFloat( prompt("Please enter the expense amount") );
                if ( isNaN(expensePrice) ) {
                    alert("Please enter a numeric value.")
                } else {
                    newTrip.addExpense(expenseName, expensePrice);
                    const newExpenseItemElement = getExpenseListItemElement(newTrip);
                    newTripExpenseList.appendChild(newExpenseItemElement);
                    const newTripTotalElement = document.querySelector(`#trip-total-${newTrip.id}`);
                    newTripTotalElement.textContent = newTrip.sumTotal().toLocaleString("en-US", {style:"currency", currency:"USD"});
                }
            } else {
                alert("Please enter an expense name.")
            }
        });
        counter++;
    } else {
        alert("Please enter a trip name.")
    }
});

// Generate expense li elements and contents 
function getExpenseListItemElement(trip) {
    const li = document.createElement("li");
    li.className = "expense flex";
    li.id = `expense-item-${trip.id}`;
    for (let i = 0; i < trip.expenses.length; i++ ) {
        li.innerHTML = `                
            <p>${trip.expenses[i].name}</p> 
            <p>${trip.expenses[i].price.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
        `;
    }
    return li;
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
*/