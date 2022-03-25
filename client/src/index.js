import './normalize.css';
import './index.css';
import { getTrips, } from './api/tripsApi';
import { TripManager } from './modules/tripManager.module';

// Singleton pattern for fun.
new TripManager();

// Populate list of trips via API call.
getTrips().then(_result => {
    let tripsData = _result.data;

    if (tripsData) {
        tripsData.forEach(_trip => {
            const newTrip = TripManager.addTrip(_trip.name);

            if (Array.isArray(_trip.expenses)) {
                for (let _expenseData of _trip.expenses) {
                    newTrip.addExpenseFromData(_expenseData.name, _expenseData.price);
                }
            }
        });
    }
});

// Button to create new trip object and populate it with content
const newTripButton = document.querySelector('.new-trip');
newTripButton.addEventListener('click', (event) => {
    const tripForm = document.querySelector("#trip-form");
    let _tripName = document.querySelector("#new-trip").value;
    if (_tripName) {
        event.preventDefault();
        TripManager.addTrip(_tripName);
        tripForm.reset();
    }
});

// Hamburger Menu
const hambugerMenuButton = document.querySelector('.hamburger');
hambugerMenuButton.addEventListener('click', () => { 
    const navItems = document.querySelectorAll('.item');
    for ( let i = 0; i < navItems.length; i++ ) {
        if ( navItems[i].classList.contains("hidden") ) {
            navItems[i].classList.remove("hidden");
        } else {
            navItems[i].classList.add("hidden");
        }
    }
});

// TODO: 
// Connect to API
