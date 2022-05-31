import React, { useState } from 'react';
import Expense from './expense';
import NewExpense from './newExpense';

export default function Trip({ trip, handleDeleteTrip }) {
  // setTrips(trip.expenses.filter((expenseItem) => expenseItem.id !== id))
  // const [newExpense, setNewExpense] = useState('');

  // const handleChangeExpense = e => {
  //   setNewExpense(e.target.value);
  // };

  // const handleSubmitExpense = e => {
  //   e.preventDefault();
  // setTrips([
  //   ...trips,
  //   {
  //     id: trips.length + 1,
  //     name: newTrip,
  //     expenses: [],
  //   },
  // ]);
  // };

  // const handleAddExpense = () => {
  //   <NewExpense
  //     trip={trip}
  //     newExpense={newExpense}
  //     handleChangeExpense={handleChangeExpense}
  //     handleSubmitExpense={handleSubmitExpense}
  //   />;
  // };

  //   function handleAddExpense() {
  //     setDebts([
  //         ...debts,
  //         {
  //             id: debts.length + 1,
  //             name: "",
  //             balance: 0,
  //             payment: 0,
  //             interest: 0,
  //         },
  //     ]);
  // }

  const total = trip.expenses.length
    ? trip.expenses.reduce(
        (_previousValue, _expenseItem) =>
          (_previousValue += _expenseItem.price),
        0
      )
    : 0;

  return (
    <section className='relative flex flex-col h-full flex-none justify-start w-[272px] items-center secondary-bg-color rounded-xl m-2 p-2'>
      <h2 className='m-2'>{trip.name}</h2>
      <ul className='flex flex-col expense-list overflow-y-auto overflow-x-hidden overscroll-contain mb-3'>
        {trip.expenses?.map(expense => (
          <Expense key={expense.id} expense={expense} />
        ))}
      </ul>
      <button
        className='primary-bg-color rounded-2xl p-3 m-3 border border-white'
        // onClick={() => handleAddExpense}
      >
        Add Expense
      </button>
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
