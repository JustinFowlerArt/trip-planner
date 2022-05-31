import React from 'react';

export default function NewExpense({ newExpense, handleSubmitExpense }) {
  return (
    <form className='flex flex-col items-center' onSubmit={handleSubmitExpense}>
      <label htmlFor='expense-name'>Expense Name</label>
      <input
        className='my-2 px-2 secondary-color'
        type='text'
        name='expense-name'
        placeholder='Airfare'
        required
      />
      <label htmlFor='expense-price'>Expense Price</label>
      <input
        className='my-2 px-2 secondary-color'
        type='number'
        name='expense-price'
        placeholder='$199'
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
