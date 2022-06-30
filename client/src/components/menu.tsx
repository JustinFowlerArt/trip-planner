import React, { useState } from 'react';

export default function Menu() {
	const [navbarOpen, setNavbarOpen] = useState(false);
	const links = [
		{
			id: 1,
			name: 'Features',
			path: '#',
		},
		{
			id: 2,
			name: 'Pricing',
			path: '#',
		},
		{
			id: 3,
			name: 'Sign Up',
			path: '#',
		},
	];

	const handleToggle = () => {
		setNavbarOpen(!navbarOpen);
	};

	return (
		<nav className='flex justify-center' role='navigation'>
			<button
				onClick={handleToggle}
				className='absolute right-6 top-5 text-4xl md:hidden'
			>
				<a href='#'>
					<i className='fa fa-bars'></i>
				</a>
			</button>
			<ul
				className={`${
					navbarOpen ? 'flex' : 'hidden'
				} flex-col items-center md:flex-row md:flex`}
			>
				{links.map(link => (
					<li
						key={link.id}
						className='p-2 text-xl underline md:block md:ml-3 hover:primary-color hover:bg-white hover:rounded'
					>
						<a href={link.path}>{link.name}</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
