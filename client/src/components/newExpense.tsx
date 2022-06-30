import React from 'react';
import blockInvalidChar from './common/blockInvalidChar';

interface Props {
	index: number;
	expenseInfo: {
		name: string;
		price: string | number;
	};
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAddExpense: (e: React.SyntheticEvent, index: number) => void;
	handleResetForm: () => void;
}

export default function NewExpense({
	index,
	expenseInfo,
	handleChange,
	handleAddExpense,
	handleResetForm,
}: Props) {
	return (
		<form
			className='flex flex-col items-center'
			onSubmit={e => {
				handleAddExpense(e, index);
				handleResetForm();
			}}
		>
			<label htmlFor='expense-name'>Expense Name</label>
			<input
				className='my-2 px-2 secondary-color'
				type='text'
				name='name'
				value={expenseInfo.name}
				placeholder='Airfare'
				onChange={e => handleChange(e)}
				required
			/>
			<label htmlFor='expense-price'>Expense Price</label>
			<input
				className='my-2 px-2 secondary-color'
				type='number'
				name='price'
				value={expenseInfo.price}
				placeholder='$199'
				onChange={e => handleChange(e)}
				onKeyDown={e => blockInvalidChar(e)}
				required
			/>
			<input
				className='primary-bg-color rounded-2xl p-3 m-3 border border-white'
				type='submit'
				value='Add Expense'
			/>
		</form>
	);
}
