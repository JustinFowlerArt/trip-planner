import React from 'react';
import Footer from './components/footer';
import Header from './components/header';
import TripManager from './components/tripManager';

export default function App() {
    return (
        <div className='flex flex-col h-screen max-h-screen font-serif text-white'>
            <Header title='Trip Planner' />
            <TripManager />
            <Footer />
        </div>
    );
}
