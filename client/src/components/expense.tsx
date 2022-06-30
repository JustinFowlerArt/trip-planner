import React from 'react';
import { Expense } from './tripManager';

interface Props {
	index: number;
	expense: Expense;
	handleDeleteExpense: (index: number, id: number) => void;
}

export default function Expense({
	index,
	expense,
	handleDeleteExpense,
}: Props) {
	return (
		<li className='flex justify-between primary-bg-color rounded-xl p-4 mx-1 my-2'>
			<p>{expense.name}</p>
			<div className='flex items-center'>
				<p className='mx-3'>
					{expense.price.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD',
					})}
				</p>
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
