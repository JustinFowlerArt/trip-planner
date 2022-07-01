import React, { useState } from 'react';
import useClickedOutside from '../hooks/useClickedOutside';
import Expense from './expense';
import NewExpense from './newExpense';
import { Trip } from './tripManager';

interface Props {
	trip: Trip;
	index: number;
	handleDeleteTrip: (id: number) => void;
	handleUpdateTrip: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		updated: boolean
	) => void;
	handleAddExpense: (e: React.SyntheticEvent, index: number) => void;
	handleUpdateExpense: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		id: number,
		updated: boolean
	) => void;
	handleDeleteExpense: (index: number, id: number) => void;
}

export default function Trip({
	trip,
	index,
	handleDeleteTrip,
	handleUpdateTrip,
	handleAddExpense,
	handleDeleteExpense,
	handleUpdateExpense,
}: Props) {
	const [showExpenseForm, setShowExpenseForm] = useState(false);
	const [renameTrip, setRenameTrip] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [expenseInfo, setExpenseInfo] = useState({
		name: '',
		price: '',
	});

	const toggleUpdated = () => {
		setUpdated(!updated);
		console.log(updated);
	};

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
		setShowExpenseForm(!showExpenseForm);
	};

	const total = trip.expenses.length
		? trip.expenses.reduce(
				(_previousValue, _expenseItem) =>
					(_previousValue += _expenseItem.price),
				0
		  )
		: 0;

	const ref = useClickedOutside(renameTrip, setRenameTrip, toggleUpdated);

	return (
		<section className='relative flex flex-col h-full min-h-[500px] sm:min-h-0 flex-none justify-start w-[272px] items-center secondary-bg-color rounded-xl m-2 p-2'>
			<div ref={ref}>
				{renameTrip ? (
					<input
						className='m-2 text-center text-black '
						type='text'
						name='name'
						value={trip.name}
						onChange={e => handleUpdateTrip(e, index, updated)}
					></input>
				) : (
					<h2
						className='m-2'
						onClick={() => {
							setRenameTrip(!renameTrip);
							toggleUpdated();
						}}
					>
						{trip.name}
					</h2>
				)}
			</div>
			<ul className='flex flex-col expense-list w-full min-h-[300px] sm:min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain mb-3'>
				{trip.expenses?.map(expense => (
					<Expense
						key={expense.id}
						index={index}
						expense={expense}
						handleUpdateExpense={handleUpdateExpense}
						handleDeleteExpense={handleDeleteExpense}
					/>
				))}
			</ul>
			{showExpenseForm ? (
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
					onClick={() => setShowExpenseForm(!showExpenseForm)}
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
