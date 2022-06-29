import React, { useState } from 'react';
import NewTrip from './newTrip';
import Trip from './trip';
import useTrips from '../hooks/useTrips';
import SkeletonLoader from './skeletonLoader';

export default function MainContent() {
	const [newTrip, setNewTrip] = useState('');

	const { trips, error, loading } = useTrips();

	const handleChangeTrip = e => {
		setNewTrip(e.target.value);
	};

	// const handleSubmitTrip = e => {
	// 	e.preventDefault();
	// 	setTrips([
	// 		...trips,
	// 		{
	// 			id: trips.length + 1,
	// 			name: newTrip,
	// 			expenses: [],
	// 		},
	// 	]);
	// };

	// const handleDeleteTrip = id => {
	//   setTrips(trips.filter(trip => trip.id !== id));
	// };

	// const handleAddExpense = e => {
	//   const { name, value } = e.target;
	//   const updatedTrip = [...trips];
	//   updatedTrip[value][name] = value;
	//   setTrips(updatedTrip);
	// }

	if (error) throw error;
	return (
		<main
			className='flex flex-grow items-center lg:p-5 md:items-start'
			role='main'
		>
			<div className='flex overflow-x-auto overflow-y-clip' id='trips'>
				{loading ? (
					<SkeletonLoader />
				) : (
					trips &&
					trips.map(trip => (
						<Trip
							key={trip.id}
							trip={trip}
							// handleDeleteTrip={handleDeleteTrip}
						/>
					))
				)}
				{!loading && (
					<NewTrip
						newTrip={newTrip}
						handleChange={handleChangeTrip}
						// handleSubmit={handleSubmitTrip}
					/>
				)}
			</div>
		</main>
	);
}
