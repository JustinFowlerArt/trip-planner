import React, { useState } from 'react';
import NewTrip from './newTrip';
import Trip from './trip';
import PageNotFound from './pageNotFound';
import useTrips from '../hooks/useTrips';
import SkeletonLoader from './skeletonLoader';

export default function MainContent() {
  // const [trips, setTrips] = useState([]);
  // const [error, setError] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [newTrip, setNewTrip] = useState('');

  const { trips, error, loading } = useTrips();

  const handleChangeTrip = e => {
    setNewTrip(e.target.value);
  };

  // const handleSubmitTrip = e => {
  //   e.preventDefault();
  //   setTrips([
  //     ...trips,
  //     {
  //       id: trips.length + 1,
  //       name: newTrip,
  //       expenses: [],
  //     },
  //   ]);
  // };

  // const handleDeleteTrip = id => {
  //   setTrips(trips.filter(trip => trip.id !== id));
  // };

  // const handleAddExpense = e => {
  //   const { name, value } = e.target;
  //   const updatedTrip = [...trips];
  //   updatedTrip[value][name] = value;
  //   setTrips(updatedTrip);
  // }

  if (error) throw error;
  if (loading) {
    return (
      <main
        className='flex flex-grow items-center lg:p-5 md:items-start'
        role='main'
      >
        <div className='flex overflow-x-auto overflow-y-clip' id='trips'>
          <SkeletonLoader />
        </div>
      </main>
    );
  }

  return (
    <main
      className='flex flex-grow items-center lg:p-5 md:items-start'
      role='main'
    >
      <div className='flex overflow-x-auto overflow-y-clip' id='trips'>
        {trips?.length > 1
          ? trips.map(trip => (
              <Trip
                key={trip.id}
                trip={trip}
                // handleDeleteTrip={handleDeleteTrip}
              />
            ))
          : null}
      </div>
      <NewTrip
        newTrip={newTrip}
        handleChange={handleChangeTrip}
        // handleSubmit={handleSubmitTrip}
      />
    </main>
  );
}
