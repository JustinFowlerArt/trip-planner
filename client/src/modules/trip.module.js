import { Expense } from "./expense.module";
import { TripManager } from "./tripManager.module";

// Blueprint to create new trip object
export class Trip {
    constructor(_args) {
        // Any args not passed in will have default values. Args that are defined override defaults.
        _args = {
            name: "New Trip",
            id: 0,
            ..._args,
        };

        // Set class variables.
        this.expenses = [];
        this.name = _args.name;
        this.id = _args.id;
        this.expenseIdCounter = 0;

        // Build HTML.
        this.generateTripTemplate();

        // Register events.
        this.registerDeleteTripEvent();
        this.registerAddExpenseEvent();
    }

    // Calculate total of trip expenses
    get total() {
        return this.expenses.length ? this.expenses.reduce((_previousValue, _expenseItem) => _previousValue += _expenseItem.price, 0) : 0;
    }

    get deleteTripButtonId() {
        return `delete-trip-button-${this.id}`
    }

    get addExpenseButtonId() {
        return `add-expense-button-${this.id}`;
    }

    get expenseListId() {
        return `expense-list-${this.id}`
    }

    get tripTotalId() {
        return `trip-total-${this.id}`
    }

    // Set HTML total
    updateTotal() {
        const tripTotal = this.template.querySelector(`#${this.tripTotalId}`);
        tripTotal.textContent = this.total.toLocaleString("en-US", {style:"currency", currency:"USD"});
    }
    
    addExpenseFromData(_name, _price) {
        const newExpense = new Expense({ name: _name, price: _price, id: this.expenseIdCounter, trip: this })
        this.expenses.push(newExpense);
        const expenseList = this.template.querySelector(`#${this.expenseListId}`);
        expenseList.appendChild(newExpense.template);
        this.updateTotal();
        this.expenseIdCounter++;
    }

    removeExpense(_id) {
        this.expenses = this.expenses.filter((_expenseItem) => _expenseItem.id !== _id);
        this.updateTotal();
    }

    generateTripTemplate() {
        const templateContainer = document.createElement('section');
        templateContainer.id = `trip-section-${this.id}`;
        templateContainer.className = "trip column center flex";
        const templateBody = `        
            <h2>${this.name}</h2>
            <ul class="expense-list column center flex" id="${this.expenseListId}">
            </ul>
            <button class="add-expense" id="${this.addExpenseButtonId}">Add Expense</button>
            <button class="delete-trip" id="${this.deleteTripButtonId}">x</button>
            <div class="trip-total center flex">
                <p>Trip Total</p>
                <p class="total" id="${this.tripTotalId}">$${this.total}</p>
            </div>
        `;
        templateContainer.innerHTML = templateBody;
        this.template = templateContainer;
    }

    generateFormTemplate() {
        const formTemplate = document.createElement("form");
        formTemplate.id = `trip-expense-form-${this.id}`;
        formTemplate.className = "trip column center flex";
        const formBody = `
            <label class="form-label" for="expense-name">Expense Name</label><br>
            <input type="text" id="expense-name-${this.id}" name="expense-name" placeholder="Airfare" required><br>
            <label class="form-label" for="expense-price">Expense Price</label><br>
            <input type="number" id="expense-price-${this.id}" name="expense-price" placeholder="$199" required><br>
            <input class="add-expense" id="submit-expense-${this.id}" type="submit" value="Add Expense">
        `;
        formTemplate.innerHTML = formBody;
        this.expenseForm = formTemplate;
    }

    registerDeleteTripEvent() {
        // Need to do this because "this" context changes inside of the addEventListener function.
        const self = this;
        const deleteButton = this.template.querySelector(`#${this.deleteTripButtonId}`);
        deleteButton.addEventListener('click', () => {
            TripManager.removeTrip(self);
        });
    }
    
    registerAddExpenseEvent() {
        // Need to do this because "this" context changes inside of the addEventListener function.
        const self = this;
        const addButton = this.template.querySelector(`#${this.addExpenseButtonId}`);
        const expenseList = this.template.querySelector(`#${this.expenseListId}`);
        addButton.addEventListener('click', () => {
            self.generateFormTemplate();
            expenseList.appendChild(self.expenseForm);
            addButton.classList.add("hidden");
            const submitExpense = document.querySelector(`#submit-expense-${this.id}`);
            submitExpense.addEventListener('click', (event) => {
                let _expenseName = document.querySelector(`#expense-name-${this.id}`).value;
                let _expensePrice = document.querySelector(`#expense-price-${this.id}`).value;
                if (_expenseName && _expensePrice) {
                    event.preventDefault();
                    self.addExpenseFromData(_expenseName, parseFloat(_expensePrice));
                    self.expenseForm.remove();
                    addButton.classList.remove("hidden");
                }
            });
        });
    }

}
