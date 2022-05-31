import React from 'react';

export default function NewTrip({ newTrip, handleChange, handleSubmit }) {
  return (
    <section className='flex flex-col flex-none items-center w-[272px] secondary-bg-color rounded-xl m-2 p-2'>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col w-full items-center'
      >
        <label className='m-2' htmlFor='trip'>
          Trip Name
        </label>
        <input
          className='my-2 px-2 secondary-color'
          type='text'
          name='trip'
          value={newTrip}
          placeholder='Cancun'
          required
          onChange={handleChange}
        />
        <input
          className='primary-bg-color rounded-2xl p-3 m-3 border border-white'
          type='submit'
          value='Add New'
        />
      </form>
    </section>
  );
}
