
// Blueprint to create new expense object
export class Expense {
    constructor(_args) {
        // Any args not passed in will have default values. Args that are defined override defaults.
        _args = {
            id: 0,
            name: 'New Expense',
            price: 0,
            ..._args,
        };

        // Set class variables.
        this.id = _args.id;
        this.name = _args.name;
        this.price = _args.price;

        // Build HTML.
        this.generateExpenseTemplate();

        // Register events.
        this.registerDeleteExpenseEvent(_args.trip);
    }

    get deleteExpenseButtonId() {
        return `delete-expense-button-${this.id}`
    }

    generateExpenseTemplate() {
        const templateContainer = document.createElement('li');
        templateContainer.id = `expense-item-${this.id}`;
        templateContainer.className = 'flex justify-between primary-bg-color rounded-xl p-4 mx-1 my-2';
        const templateBody = `
            <p>${this.name}</p>
            <div class="flex items-center">
                <p class="mx-3">${this.price.toLocaleString('en-US', {style:'currency', currency:'USD'})}</p>
                <button id='${this.deleteExpenseButtonId}' class='primary-bg-color border border-white m-auto px-1'>x</button>
            </div>
        `;
        templateContainer.innerHTML = templateBody;
        this.template = templateContainer;

        // TODO: Come back to this.
        // li.children[0].addEventListener('click', () => {
        //     let newName = prompt('Enter a new name')
        //     li.children[0].textContent = `${newName}`;
        // });
        // li.children[1].addEventListener('click', () => {
        //     let newPrice = parseFloat(prompt('Enter a new price')).toLocaleString('en-US', {style:'currency', currency:'USD'});
        //     li.children[1].textContent = `${newPrice}`;
        // });
        // return li;
    }

    registerDeleteExpenseEvent(_trip) {
        // Need to do this because 'this' context changes inside of the addEventListener function.
        const self = this;
        const deleteButton = this.template.querySelector(`#${this.deleteExpenseButtonId}`);
        deleteButton.addEventListener('click', () => {
            _trip.removeExpense(self.id);
            self.template.remove();
        });
    }
}