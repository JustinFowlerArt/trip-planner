import React from 'react';

interface Props {
	newTrip: string;
	handleNewTrip: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSubmitTrip: (e: React.SyntheticEvent) => void;
}

export default function NewTrip({
	newTrip,
	handleNewTrip,
	handleSubmitTrip,
}: Props) {
	return (
		<section className='flex flex-col flex-none h-full items-center w-[272px] secondary-bg-color rounded-xl m-2 p-2'>
			<form
				onSubmit={handleSubmitTrip}
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
					onChange={handleNewTrip}
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
