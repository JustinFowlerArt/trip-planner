import { Expense } from './expense.module';
import { TripManager } from './tripManager.module';
import { deleteTrip, updateTrip } from '../api/tripsApi';

// Blueprint to create new trip object
export class Trip {
    constructor(_args) {
        // Any args not passed in will have default values. Args that are defined override defaults.
        _args = {
            name: 'New Trip',
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
        // this.registerRenameTrip();
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

    get tripNameId () {
        return `trip-name-${this.id}`
    }

    get tripTotalId() {
        return `trip-total-${this.id}`
    }

    // Set HTML total
    updateTotal() {
        const tripTotal = this.template.querySelector(`#${this.tripTotalId}`);
        tripTotal.textContent = this.total.toLocaleString('en-US', {style:'currency', currency:'USD'});
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
        updateTrip(this.id,
            {
                "expenses": this.expenses
            }
        );
        this.updateTotal();
    }

    generateTripTemplate() {
        const templateContainer = document.createElement('section');
        templateContainer.id = `trip-section-${this.id}`;
        templateContainer.className = 'relative flex flex-col h-full flex-none justify-start w-[272px] items-center secondary-bg-color rounded-xl m-2 p-2';
        const templateBody = `
            <h2 class='m-2' id='trip-name-${this.id}'>${this.name}</h2>
            <ul class='flex flex-col expense-list overflow-y-auto overflow-x-hidden overscroll-contain mb-3' id='${this.expenseListId}'>
            </ul>
            <button class='primary-bg-color rounded-2xl p-3 m-3 border border-white' id='${this.addExpenseButtonId}'>Add Expense</button>
            <button class='primary-bg-color absolute top-4 right-4 px-1 border border-white' id='${this.deleteTripButtonId}'>x</button>
            <div class='flex justify-between items-center w-full px-6 my-3'>
                <p>Trip Total</p>
                <p class='primary-bg-color rounded-2xl p-3' id='${this.tripTotalId}'>$${this.total}</p>
            </div>
        `;
        templateContainer.innerHTML = templateBody;
        this.template = templateContainer;
    }

    generateFormTemplate() {
        const formTemplate = document.createElement('form');
        formTemplate.id = `trip-expense-form-${this.id}`;
        formTemplate.className = 'flex flex-col items-center';
        const formBody = `
            <label for='expense-name'>Expense Name</label>
            <input class='my-2 px-2 secondary-color' type='text' id='expense-name-${this.id}' name='expense-name' placeholder='Airfare' required>
            <label for='expense-price'>Expense Price</label>
            <input class='my-2 px-2 secondary-color' type='number' id='expense-price-${this.id}' name='expense-price' placeholder='$199' required>
            <input class='primary-bg-color rounded-2xl p-3 m-3 border border-white' id='submit-expense-${this.id}' type='submit' value='Add Expense'>
        `;
        formTemplate.innerHTML = formBody;
        this.expenseForm = formTemplate;
    }

    generateRenameTemplate() {
        const formTemplate = document.createElement('form');
        formTemplate.id = `trip-rename-form-${this.id}`;
        formTemplate.className = 'flex flex-col items-center';
        const formBody = `
            <label for='trip-name'>${this.name}</label><br>
            <input class='my-2 px-2 secondary-color' type='text' id='new-name-${this.id}' name='trip-name' placeholder='Trip Name' required><br>
            <input class='add-expense' id='rename-button-${this.id}' type='submit' value='Update'>
        `
        formTemplate.innerHTML = formBody;
        this.renameForm = formTemplate;
    }

    registerDeleteTripEvent() {
        // Need to do this because 'this' context changes inside of the addEventListener function.
        const self = this;
        const deleteButton = this.template.querySelector(`#${this.deleteTripButtonId}`);
        deleteButton.addEventListener('click', () => {
            deleteTrip(self.id);
            TripManager.removeTrip(self);
        });
    }
    
    registerAddExpenseEvent() {
        // Need to do this because 'this' context changes inside of the addEventListener function.
        const self = this;
        const addButton = this.template.querySelector(`#${this.addExpenseButtonId}`);
        const expenseList = this.template.querySelector(`#${this.expenseListId}`);
        addButton.addEventListener('click', () => {
            self.generateFormTemplate();
            expenseList.appendChild(self.expenseForm);
            addButton.classList.add('hidden');
            const submitExpense = document.querySelector(`#submit-expense-${this.id}`);
            submitExpense.addEventListener('click', (event) => {
                let _expenseName = document.querySelector(`#expense-name-${this.id}`).value;
                let _expensePrice = document.querySelector(`#expense-price-${this.id}`).value;
                if (_expenseName && _expensePrice) {
                    event.preventDefault();
                    self.addExpenseFromData(_expenseName, parseFloat(_expensePrice));
                    updateTrip(self.id, 
                        {
                            "expenses": self.expenses
                        }
                    );
                    self.expenseForm.remove();
                    addButton.classList.remove('hidden');
                }
            });
        });
    }

    /*
    // TODO: Come back to this.
    registerRenameTrip() {
        // Need to do this because 'this' context changes inside of the addEventListener function.
        const self = this;
        const tripName = this.template.querySelector(`#${this.tripNameId}`);
        tripName.addEventListener('click', () => {
            tripName.textContent = '';
            self.generateRenameTemplate();
            self.template.prepend(self.renameForm);
            const renameButton = document.querySelector(`#rename-button-${this.id}`);
            let _tripName = document.querySelector(`#new-name-${this.id}`).value;
            renameButton.addEventListener('click', (event) => {
                if (_tripName) {
                    event.preventDefault();
                    self.name = _tripName;
                    tripName.textContent = _tripName;
                }
            });
        });
    }
    */
}
