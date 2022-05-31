import { Trip } from "./trip.module";

export class TripManager {
    // Static means that there is a single global value for this, no matter how many instances of this class exist.
    // Static values are always globally accessible. 
    static instance = null;

    constructor() {
        // Ensure that the static instance is a singleton and does not get blown away by new instances.
        if (TripManager.instance === null) {
            TripManager.instance = this;
            this.roster = {};
            this.tripCounter = 0;
            this.template = document.getElementById('trips');
        } else {
            return TripManager.instance;
        }
    }

    static addTrip(_tripName) {
        const manager = TripManager.instance;
        const newTrip = new Trip({ name: _tripName, id: manager.tripCounter })
        manager.template.appendChild(newTrip.template);
        manager.roster[manager.tripCounter] = newTrip;
        manager.tripCounter++;
        
        return newTrip;
    }

    static removeTrip(_trip) {
        const manager = TripManager.instance;
        const tripId = `${_trip.id}`;
        const newRoster = {};

        // Delete the Trip's DOM element.
        _trip.template.remove();

        // Iterate over every property on the roster object and compare the key to the trip ID.
        // Do not include the trip that is to be removed.
        Object.entries(manager.roster).forEach(([_key, _value]) => {
            if (_key !== tripId) {
                newRoster[_key] = _value;
            }
        });

        // Assign the new roster without the Trip class we want to remove.
        manager.roster = newRoster;
    }
}
