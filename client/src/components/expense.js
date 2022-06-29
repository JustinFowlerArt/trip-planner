import React from 'react';

export default function Expense({ expense }) {
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
				<button className='primary-bg-color border border-white m-auto px-1'>
					x
				</button>
			</div>
		</li>
	);
}
