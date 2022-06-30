import React, { useState } from 'react';
import Expense from './expense';
import NewExpense from './newExpense';
import { Trip } from './tripManager';

interface Props {
	trip: Trip;
	index: number;
	handleDeleteTrip: (id: number) => void;
	handleAddExpense: (e: React.SyntheticEvent, index: number) => void;
	handleDeleteExpense: (index: number, id: number) => void;
}

export default function Trip({
	trip,
	index,
	handleDeleteTrip,
	handleAddExpense,
	handleDeleteExpense,
}: Props) {
	const [showForm, setShowForm] = useState(false);
	const [expenseInfo, setExpenseInfo] = useState({
		name: '',
		price: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		let input: string | number = value;
		if (name === 'price' && input !== null && input !== undefined) {
			input = parseFloat(input);
		}
		setExpenseInfo({ ...expenseInfo, [name]: input });
	};

	const handleResetForm = () => {
		setExpenseInfo({
			name: '',
			price: '',
		});
		setShowForm(false);
	};

	const total = trip.expenses.length
		? trip.expenses.reduce(
				(_previousValue, _expenseItem) =>
					(_previousValue += _expenseItem.price),
				0
		  )
		: 0;

	return (
		<section className='relative flex flex-col h-full min-h-[500px] sm:min-h-0 flex-none justify-start w-[272px] items-center secondary-bg-color rounded-xl m-2 p-2'>
			<h2 className='m-2'>{trip.name}</h2>
			<ul className='flex flex-col expense-list min-h-[300px] sm:min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain mb-3'>
				{trip.expenses?.map(expense => (
					<Expense
						key={expense.id}
						index={index}
						expense={expense}
						handleDeleteExpense={handleDeleteExpense}
					/>
				))}
			</ul>
			{showForm ? (
				<NewExpense
					index={index}
					expenseInfo={expenseInfo}
					handleChange={handleChange}
					handleAddExpense={handleAddExpense}
					handleResetForm={handleResetForm}
				/>
			) : (
				<button
					className='primary-bg-color rounded-2xl p-3 m-3 border border-white'
					onClick={() => setShowForm(true)}
				>
					Add Expense
				</button>
			)}
			<button
				className='primary-bg-color absolute top-4 right-4 px-1 border border-white'
				onClick={() => handleDeleteTrip(trip.id)}
			>
				x
			</button>
			<div className='flex justify-between items-center w-full px-6 my-3'>
				<p>Trip Total</p>
				<p className='primary-bg-color rounded-2xl p-3'>
					{total.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</p>
			</div>
		</section>
	);
}
