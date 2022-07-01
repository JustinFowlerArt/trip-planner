import React, { useState } from 'react';
import { Expense } from './tripManager';
import useClickedOutside from '../hooks/useClickedOutside';

interface Props {
	index: number;
	expense: Expense;
	handleUpdateExpense: (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number,
		id: number,
		updated: boolean
	) => void;
	handleDeleteExpense: (index: number, id: number) => void;
}

export default function Expense({
	index,
	expense,
	handleDeleteExpense,
	handleUpdateExpense,
}: Props) {
	const [newName, setNewName] = useState(false);
	const [newPrice, setNewPrice] = useState(false);
	const [updated, setUpdated] = useState(false);

	const toggleUpdated = () => {
		setUpdated(!updated);
		console.log(updated);
	};

	const nameRef = useClickedOutside(newName, setNewName, toggleUpdated);
	const priceRef = useClickedOutside(newPrice, setNewPrice, toggleUpdated);

	return (
		<li className='flex justify-between primary-bg-color rounded-xl p-4 mx-1 my-2'>
			<div ref={nameRef}>
				{newName ? (
					<input
						className='w-16 text-black '
						type='text'
						name='name'
						value={expense.name}
						onChange={e => handleUpdateExpense(e, index, expense.id, updated)}
					></input>
				) : (
					<p
						onClick={() => {
							setNewName(!newName);
							toggleUpdated();
						}}
					>
						{expense.name}
					</p>
				)}
			</div>
			<div className='flex items-center'>
				<div ref={priceRef}>
					{newPrice ? (
						<input
							className='w-16 text-black '
							type='number'
							name='price'
							value={expense.price}
							onChange={e => handleUpdateExpense(e, index, expense.id, updated)}
						></input>
					) : (
						<p
							className='mx-3'
							onClick={() => {
								setNewPrice(!newPrice);
								toggleUpdated();
							}}
						>
							{expense.price.toLocaleString('en-US', {
								style: 'currency',
								currency: 'USD',
							})}
						</p>
					)}
				</div>
				<button
					className='primary-bg-color border border-white m-auto px-1'
					onClick={() => handleDeleteExpense(index, expense.id)}
				>
					x
				</button>
			</div>
		</li>
	);
}
