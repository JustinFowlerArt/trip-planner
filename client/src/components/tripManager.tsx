import React, { useState, useEffect } from 'react';
import { getTrips } from '../api/tripsApi';
import NewTrip from './newTrip';
import Trip from './trip';
import SkeletonLoader from './skeletonLoader';

export interface Trip {
	id: number;
	name: string;
	expenses: Expense[];
}

export interface Expense {
	id: number;
	name: string;
	price: number;
}

export default function TripManager() {
	const [trips, setTrips] = useState<Array<Trip>>([]);
	const [error, setError] = useState<unknown | null>(null);
	const [loading, setLoading] = useState(true);
	const [newTrip, setNewTrip] = useState('');

	useEffect(() => {
		async function init() {
			try {
				const response = await getTrips();
				setTrips(response.data);
			} catch (error: unknown) {
				setError(error);
			} finally {
				setLoading(false);
			}
		}
		init();
	}, []);

	const handleNewTrip = (e: React.ChangeEvent<HTMLInputElement>) => {
		setNewTrip(e.currentTarget.value);
	};

	const handleSubmitTrip = (e: React.SyntheticEvent) => {
		e.preventDefault();
		setTrips([
			...trips,
			{
				id: trips.length + 1,
				name: newTrip,
				expenses: [],
			},
		]);
		// createTrip({
		// 	id: newTrip.id,
		// 	name: newTrip.name,
		// 	expenses: newTrip.expenses,
		// });
	};

	const handleDeleteTrip = (id: number) => {
		setTrips(trips.filter(trip => trip.id !== id));
	};

	const handleAddExpense = (e: React.SyntheticEvent, index: number) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			name: { value: string };
			price: { value: string };
		};
		const updatedTrips = [...trips];
		updatedTrips[index].expenses.push({
			id: trips[index].expenses.length + 1,
			name: target.name.value,
			price: parseFloat(target.price.value),
		});
		setTrips(updatedTrips);
	};

	const handleDeleteExpense = (index: number, id: number) => {
		const updatedTrips = [...trips];
		const updatedTrip = updatedTrips[index];
		updatedTrip.expenses = updatedTrip.expenses.filter(
			expenseItem => expenseItem.id !== id
		);
		setTrips(updatedTrips);
	};

	// const handleUpdateExpense = e => {
	// 	const { name, value } = e.target;
	// 	const updatedTrip = [...trips];
	// 	updatedTrip[value][name] = value;
	// 	setTrips(updatedTrip);
	// };

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
					trips.map((trip, index) => (
						<Trip
							key={trip.id}
							index={index}
							trip={trip}
							handleDeleteTrip={handleDeleteTrip}
							handleAddExpense={handleAddExpense}
							handleDeleteExpense={handleDeleteExpense}
							// handleUpdateExpense={handleUpdateExpense}
						/>
					))
				)}
				{!loading && (
					<NewTrip
						newTrip={newTrip}
						handleNewTrip={handleNewTrip}
						handleSubmitTrip={handleSubmitTrip}
					/>
				)}
			</div>
		</main>
	);
}
