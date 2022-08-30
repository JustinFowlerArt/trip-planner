import { useState } from 'react';
import { Expense } from './tripManager';

interface Props {
    index: number;
    expense: Expense;
    handleUpdateExpense: (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number,
        id: number
    ) => void;
    handleSaveExpense: (index: number) => void;
    handleDeleteExpense: (index: number, id: number) => void;
}

export default function Expense({
    index,
    expense,
    handleUpdateExpense,
    handleSaveExpense,
    handleDeleteExpense,
}: Props) {
    const [newName, setNewName] = useState(false);
    const [newPrice, setNewPrice] = useState(false);

    return (
        <li className='flex justify-between bg-primary-color rounded-xl p-4 mx-1 my-2'>
            <div>
                {newName ? (
                    <input
                        className='w-16 text-black '
                        type='text'
                        name='name'
                        value={expense.name}
                        onBlur={() => {
                            setNewName(false);
                            handleSaveExpense(index);
                        }}
                        onChange={e =>
                            handleUpdateExpense(e, index, expense.id)
                        }
                    ></input>
                ) : (
                    <p onClick={() => setNewName(true)}>{expense.name}</p>
                )}
            </div>
            <div className='flex items-center'>
                <div>
                    {newPrice ? (
                        <input
                            className='w-16 text-black '
                            type='number'
                            name='price'
                            value={expense.price}
                            onBlur={() => {
                                setNewPrice(false);
                                handleSaveExpense(index);
                            }}
                            onChange={e =>
                                handleUpdateExpense(e, index, expense.id)
                            }
                        ></input>
                    ) : (
                        <p className='mx-3' onClick={() => setNewPrice(true)}>
                            {expense.price.toLocaleString('en-US', {
                                style: 'currency',
                                currency: 'USD',
                            })}
                        </p>
                    )}
                </div>
                <button
                    className='bg-primary-color border border-white m-auto px-1'
                    onClick={() => handleDeleteExpense(index, expense.id)}
                >
                    x
                </button>
            </div>
        </li>
    );
}
