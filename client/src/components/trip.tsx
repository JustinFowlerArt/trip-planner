import { useState } from 'react';
import Expense from './expense';
import NewExpense from './newExpense';
import { Trip } from './tripManager';

interface Props {
    trip: Trip;
    index: number;
    handleDeleteTrip: (id: number) => void;
    handleRenameTrip: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => void;
    handleSaveTrip: (index: number) => void;
    handleAddExpense: (
        e: React.FormEvent<HTMLFormElement>,
        index: number
    ) => void;
    handleUpdateExpense: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        id: number
    ) => void;
    handleSaveExpense: (index: number) => void;
    handleDeleteExpense: (index: number, id: number) => void;
}

export default function Trip({
    trip,
    index,
    handleDeleteTrip,
    handleRenameTrip,
    handleSaveTrip,
    handleAddExpense,
    handleDeleteExpense,
    handleSaveExpense,
    handleUpdateExpense,
}: Props) {
    const [showExpenseForm, setShowExpenseForm] = useState(false);
    const [renameTrip, setRenameTrip] = useState(false);
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
        setShowExpenseForm(!showExpenseForm);
    };

    const total = trip.expenses.length
        ? trip.expenses.reduce(
              (_previousValue, _expenseItem) =>
                  (_previousValue += _expenseItem.price),
              0
          )
        : 0;

    return (
        <section className='relative flex flex-col h-full flex-none justify-start w-[272px] items-center bg-secondary-color rounded-xl m-2 p-2'>
            <div>
                {renameTrip ? (
                    <input
                        className='m-2 text-center text-black '
                        type='text'
                        name='name'
                        value={trip.name}
                        autoFocus={true}
                        onBlur={() => {
                            setRenameTrip(false);
                            handleSaveTrip(index);
                        }}
                        onChange={e => handleRenameTrip(e, index)}
                    ></input>
                ) : (
                    <h2
                        className='m-2'
                        onClick={() => {
                            setRenameTrip(true);
                        }}
                    >
                        {trip.name}
                    </h2>
                )}
            </div>
            <ul className='flex flex-col expense-list w-full overflow-y-auto overflow-x-hidden overscroll-contain mb-3'>
                {trip.expenses?.map(expense => (
                    <Expense
                        key={expense.id}
                        index={index}
                        expense={expense}
                        handleUpdateExpense={handleUpdateExpense}
                        handleSaveExpense={handleSaveExpense}
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
                    className='bg-primary-color rounded-2xl p-3 m-3 border border-white'
                    onClick={() => setShowExpenseForm(!showExpenseForm)}
                >
                    Add Expense
                </button>
            )}
            <button
                className='bg-primary-color absolute top-4 right-4 px-1 border border-white'
                onClick={() => handleDeleteTrip(trip.id)}
            >
                x
            </button>
            <div className='flex justify-between items-center w-full px-6 my-3'>
                <p>Trip Total</p>
                <p className='bg-primary-color rounded-2xl p-3'>
                    {total.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    })}
                </p>
            </div>
        </section>
    );
}
